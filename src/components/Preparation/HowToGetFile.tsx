import React from "react";
import WrappedContainer from "../Wrapped/WrappedContainer";
import Serif from "../Serif";
import InfoText from "../Wrapped/InfoText";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

function HowToGetFile({ onContinue }: { onContinue: () => void }) {
  return (
    <WrappedContainer>
      <div className="p-12 rounded-xl bg-brand-light overflow-hidden max-w-xl mx-auto">
        <Serif>
          <h1 className="text-4xl md:text-5xl font-bold">
            How to get your Hinge data
          </h1>
        </Serif>

        <InfoText className="mt-6">
          Wrapped for Hinge gives you stats on your Hinge activity.
        </InfoText>
        <InfoText className="mt-3">
          To use it, you'll need your Hinge data export. To get this, in the
          Hinge app, open your profile tab in the bottom right corner, click on
          settings, and then click on "Download My Data" at the bottom of the
          page.
        </InfoText>
        <InfoText className="mt-3">
          You'll need to wait while Hinge prepares your data. You'll get an
          email and notification when it's ready!
        </InfoText>
        <InfoText className="mt-3">
          Your exported data does not include login credentials! For more info
          on how to verify this, look at the FAQ section on the home page.
        </InfoText>

        <Button onClick={onContinue} className="mt-6 w-full">
          I have my Hinge file <ChevronRight size={16} className="ml-2" />
        </Button>
      </div>
    </WrappedContainer>
  );
}

export default HowToGetFile;
