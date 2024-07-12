"use client";
import Wrapped from "@/lib/Wrapped";
import React from "react";
import FileUpload from "@/components/Preparation/FileUpload";
import WrappedCreator from "@/lib/WrappedCreator";
import WrappedContainer from "@/components/Wrapped/WrappedContainer";
import FatHeading from "@/components/Wrapped/FatHeading";
import InfoText from "@/components/Wrapped/InfoText";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import IntroInformation from "@/components/Wrapped/IntroInformation";
import MutedText from "@/components/Wrapped/MutedText";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { trackEvent } from "@/lib/analytics";
import HideForTime from "@/components/Wrapped/HideForTime";
import HowToGetFile from "@/components/Preparation/HowToGetFile";
import Serif from "@/components/Serif";
import WrappedComponent from "@/components/Wrapped/Wrapped";
dayjs.extend(localizedFormat);

function HingeWrappedAppPage() {
  const [page, setPageRaw] = React.useState("intro");
  const setPage = (page: string) => {
    setPageRaw(page);
    window.scrollTo(0, 0);
    trackEvent("page_" + page);
  };
  const [wrapped, setWrapped] = React.useState<Wrapped | null>(null);

  return (
    <div>
      {page === "intro" && (
        <IntroInformation
          onContinue={() => setPage("howto")}
          onDemo={async () => {
            trackEvent("demo");
            setPage("loading");

            const creator = new WrappedCreator();
            const wrapped = creator.forDemoMode();
            setWrapped(wrapped);

            trackEvent("demo_ready");
            setPage("demo");
          }}
        />
      )}

      {page === "howto" && (
        <HowToGetFile onContinue={() => setPage("upload")} />
      )}

      {page === "upload" && (
        <FileUpload
          onFileSelect={async (file) => {
            setPage("loading");
            trackEvent("file_selected");

            if (file.name.endsWith(".txt")) {
              setPage("text");
              trackEvent("text_error");
              return;
            }

            if (!file.name.endsWith(".zip")) {
              setPage("unknown_file");
              trackEvent("unknown_file_error");
              trackEvent("unknown_file_error_" + file.name.split(".").pop());
              return;
            }

            const creator = new WrappedCreator();
            let wrapped: Wrapped;
            try {
              wrapped = await creator.fromZip(file);
              setWrapped(wrapped);

              trackEvent("file_loaded");
            } catch (e) {
              trackEvent("load_error");
              console.error(e);
              setPage("error");
              return;
            }

            try {
              console.log("stats", wrapped?.getStatistics());
            } catch (e) {
              console.error("Exception when calculating statistics", e);
            }

            setPage("ready");
          }}
        />
      )}

      {page === "error" && (
        <WrappedContainer>
          <div className="p-12 rounded-xl bg-brand-dark overflow-hidden max-w-xl mx-auto">
            <Serif>
              <h1 className="text-4xl md:text-5xl font-bold">
                Something doesn't look right
              </h1>
            </Serif>

            <InfoText className="mt-6">
              We couldn't read your data export. Please make sure you selected
              the correct file format and try again.
            </InfoText>

            <Button
              onClick={() => {
                setPage("upload");
                trackEvent("try_again");
              }}
              className="mt-6 w-full"
            >
              Try again
            </Button>
          </div>
        </WrappedContainer>
      )}

      {page === "unknown_file" && (
        <WrappedContainer>
          <FatHeading>Unknown file format</FatHeading>
          <MutedText className="max-w-lg mx-auto">
            It looks like you selected an unknown file format. Please make sure
            you select the ".zip" file.
            <br />
            If you modified the file, make sure your file has the correct file
            extension.
          </MutedText>
          <Button
            onClick={() => {
              setPage("intro");
              trackEvent("text_error_go_back");
            }}
          >
            Go back
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </WrappedContainer>
      )}

      {page === "demo" && (
        <WrappedContainer>
          <div className="p-12 rounded-xl bg-brand-dark overflow-hidden max-w-xl mx-auto">
            <Serif>
              <h1 className="text-4xl md:text-5xl font-bold">
                View Demo Wrapped
              </h1>
            </Serif>

            <InfoText className="mt-6">
              You can view a demo of Wrapped for Hinge with sample data if you
              want to.
            </InfoText>
            <InfoText className="mt-3">
              <strong>
                This is NOT your Wrapped, but a demo of what it could look like.
                <br />
                It does not use your Hinge data export.
              </strong>
            </InfoText>

            <Button
              onClick={() => {
                setPage("play");
                trackEvent("play_demo_click");
              }}
              className="mt-6 w-full"
            >
              Play demo
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </WrappedContainer>
      )}

      {page === "loading" && (
        <WrappedContainer>
          <Loader2 size={32} className="animate-spin" />
          <InfoText className="text-base">
            We're preparing your Wrapped...
          </InfoText>
          <HideForTime time={8000}>
            <MutedText className="text-sm">
              Uh oh, this is taking longer than expected...
            </MutedText>
          </HideForTime>
          <HideForTime time={15000}>
            <MutedText className="text-sm text-center">
              This should've been done by now...
              <br />
              If it doesn't start soon try reloading
              <br />
              the page and uploading your data export again.
            </MutedText>
          </HideForTime>
        </WrappedContainer>
      )}

      {page === "ready" && (
        <WrappedContainer>
          <div className="p-12 rounded-xl bg-brand-light overflow-hidden max-w-xl mx-auto">
            <Serif>
              <h1 className="text-4xl md:text-5xl font-bold">
                Your Wrapped is ready!
              </h1>
            </Serif>

            <InfoText className="mt-6">
              We've crunched the numbers and found some...interesting insights.
            </InfoText>
            <InfoText className="mt-3">Are you ready to see them?</InfoText>

            <Button
              onClick={() => {
                setPage("play");
                trackEvent("play");
              }}
              className="mt-6 w-full"
            >
              Show me!
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </WrappedContainer>
      )}

      {page === "play" && (
        <WrappedComponent
          statistics={wrapped!.getStatistics()}
          wrapped={wrapped!}
          isDemo={wrapped!.demoMode}
        />
      )}

      {/* {page === "play" && wrapped?.demoMode && (
        <div className="fixed bottom-12 left-12 right-12 z-0 opacity-60 text-zinc-500 break-words">
          <h2 className="text-2xl md:text-4xl font-bold">Demo Mode</h2>
          <p className="text-sm">
            This is a demo of Wrapped for Hinge. It does not use your real
            Hinge data.
            <br />
            To see your own Wrapped, reload the page and upload your Hinge
            data.
          </p>
        </div>
      )} */}
    </div>
  );
}

export default HingeWrappedAppPage;
