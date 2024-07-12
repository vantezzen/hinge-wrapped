import React from "react";
import WrappedContainer from "./WrappedContainer";
import FatHeading from "./FatHeading";
import InfoText from "./InfoText";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Faq from "../Preparation/Faq";
import Footer from "../Footer";
import Projects from "../Projects";
import Serif from "../Serif";
import { Badge } from "../ui/badge";
import Creator from "../Creator";

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

          <Creator />

          <FatHeading className="mt-12 mb-6 text-xl">
            Frequently Asked Questions
          </FatHeading>
          <Faq />

          <Projects />

          <Footer />
        </WrappedContainer>
      </div>
    </div>
  );
}

export default IntroInformation;
