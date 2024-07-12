import React from "react";
import WrappedContainer from "./WrappedContainer";
import FatHeading from "./FatHeading";
import InfoText from "./InfoText";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Faq from "../Preparation/Faq";
import Image from "next/image";
import Footer from "../Footer";
import Projects from "../Projects";
import Serif from "../Serif";
import { Badge } from "../ui/badge";
import AnimatedGradientText from "../ui/animated-gradient-text";
import { cn } from "@/lib/utils";

function IntroInformation({
  onContinue,
  onDemo,
}: {
  onContinue: () => void;
  onDemo: () => void;
}) {
  return (
    <div className="mx-6">
      <div className="max-w-xl mx-auto my-6">
        <WrappedContainer>
          <div className="p-12 rounded-xl bg-brand-light overflow-hidden w-full">
            <Badge className="mb-6 mx-auto">Wrapped for Hinge</Badge>

            <Serif>
              <h1 className="text-4xl md:text-5xl font-bold">
                Your time on Hinge
              </h1>
            </Serif>

            <InfoText className="my-6">
              Get personalized insights into your Hinge activity and find our
              how you spent your time swiping
            </InfoText>

            <div className="grid grid-cols-7 gap-3">
              <Button onClick={onContinue} className="col-span-4">
                <Serif>
                  <div className="flex gap-2 justify-center items-center">
                    Start now <ArrowRight size={16} />
                  </div>
                </Serif>
              </Button>
              <Button
                onClick={onDemo}
                variant="secondary"
                className="bg-white col-span-3"
              >
                <Serif>
                  <div className="flex gap-2 justify-center items-center">
                    Show demo
                  </div>
                </Serif>
              </Button>
            </div>
          </div>

          <FatHeading className="mt-12 mb-6 text-xl">
            Frequently Asked Questions
          </FatHeading>
          <Faq />

          <Projects />

          <div className="max-w-lg mx-auto mt-6 text-sm font-medium text-zinc-600 text-left">
            <strong>For the Search Engines:</strong>
            <p>
              Welcome to Wrapped for TikTok - Your Ultimate Source for TikTok
              Activity Insights:
            </p>
            <p>
              Are you looking to gain valuable insights into your TikTok
              activity? Look no further than Wrapped for TikTok! It offers
              comprehensive stats and analytics to help you understand your
              presence on TikTok.
            </p>
            <p>
              With Wrapped for TikTok, you can easily access in-depth
              information about your TikTok performance, including total videos
              viewed, watch session length, and much more.
            </p>
            <p>
              To get started, you'll need to download your TikTok data export
              from the official TikTok website. Simply visit{" "}
              <a href="https://www.tiktok.com/setting/download-your-data">
                https://www.tiktok.com/setting/download-your-data
              </a>{" "}
              and request your data in the "JSON - Machine-readable file"
              format. Don't worry, this file does not contain any sensitive
              information or login credentials. For additional reassurance,
              please refer to our FAQ section for a detailed explanation of how
              we handle your data.
            </p>
            <p>
              At Wrapped for TikTok, we prioritize your privacy and security.
              Unlike other platforms, your TikTok data is never uploaded or
              stored on our servers. Our tool operates exclusively within your
              browser, ensuring that your information remains confidential. We
              take pride in being a privacy-centered service, committed to
              protecting your data at all times.
            </p>
            <p>
              To provide complete transparency, we have made the full source
              code of Wrapped for TikTok available on GitHub. You can visit our
              GitHub repository at{" "}
              <a href="https://github.com/vantezzen/wrapped">
                https://github.com/vantezzen/wrapped
              </a>{" "}
              to review the code and verify its integrity. We believe in
              openness and accountability, and we want our users to have full
              confidence in our platform.
            </p>
            <p>
              Embrace the power of Wrapped for TikTok and uncover the insights
              that will propel your TikTok journey forward. Join our growing
              community of TikTok enthusiasts who use Wrapped for TikTok to
              deliver accurate, reliable, and actionable statistics.
            </p>
          </div>

          <Footer />
        </WrappedContainer>
      </div>
    </div>
  );
}

export default IntroInformation;
