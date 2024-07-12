import React from "react";
import { WrappedSectionProps } from ".";
import SlideContainer from "../SlideContainer";
import RetroGrid from "@/components/ui/retro-grid";
import FatHeading from "../FatHeading";
import { ChevronDown } from "lucide-react";

function RoundupHero(props: WrappedSectionProps) {
  return (
    <SlideContainer>
      <RetroGrid />
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000 z-10 text-3xl">
        Now let's wrap this up, {props.wrapped.userData.user.profile.first_name}
        !
      </FatHeading>

      <ChevronDown className="h-8 w-8 absolute bottom-8 animate-bounce text-zinc-600" />
    </SlideContainer>
  );
}

export default RoundupHero;
