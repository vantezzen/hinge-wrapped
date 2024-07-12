import React from "react";
import FatHeading from "../FatHeading";
import SlideContainer from "../SlideContainer";
import DotPattern from "@/components/ui/dot-pattern";
import { WrappedSectionProps } from ".";
import { BorderBeam } from "@/components/ui/border-beam";
import InfoText from "../InfoText";
import RetroGrid from "@/components/ui/retro-grid";

function MessageHero(props: WrappedSectionProps) {
  return (
    <SlideContainer bg="bg-brand-dark z-10 relative">
      <RetroGrid />
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000 z-10 text-xl">
        Now let's take a look at your messages
      </FatHeading>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500 z-10">
        to see if you're really such a smooth talker.
      </InfoText>
    </SlideContainer>
  );
}

export default MessageHero;
