import React from "react";
import WrappedContainer from "../WrappedContainer";
import { WrappedSectionProps } from ".";
import SlideContainer from "../SlideContainer";
import RetroGrid from "@/components/ui/retro-grid";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import { ChevronDown } from "lucide-react";

function Hero(props: WrappedSectionProps) {
  return (
    <SlideContainer>
      <RetroGrid />
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000 z-10 text-3xl">
        {props.wrapped.userData.user.profile.first_name}, you've been on Hinge
        for{" "}
        <span className="text-orange-600">
          {props.statistics.profile.daysSinceSignup}
        </span>{" "}
        days!
      </FatHeading>

      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500 z-10">
        Let's see what you accomplished in that time.
      </InfoText>

      <ChevronDown className="h-8 w-8 absolute bottom-8 animate-bounce text-zinc-600" />
    </SlideContainer>
  );
}

export default Hero;
