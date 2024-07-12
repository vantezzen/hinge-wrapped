import React from "react";
import WrappedContainer from "../WrappedContainer";
import { WrappedSectionProps } from ".";
import SlideContainer from "../SlideContainer";
import RetroGrid from "@/components/ui/retro-grid";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import { ChevronDown } from "lucide-react";

function FirstMessage(props: WrappedSectionProps) {
  if (!props.statistics.messages.mostUsedFirstMessage) return null;

  return (
    <SlideContainer>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000 z-10 text-3xl">
        "{props.statistics.messages.mostUsedFirstMessage.text}"
      </FatHeading>

      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500 z-10">
        Is that what get's them? Because you used that as a first message{" "}
        <b>{props.statistics.messages.mostUsedFirstMessage.count}</b> times.
      </InfoText>
    </SlideContainer>
  );
}

export default FirstMessage;
