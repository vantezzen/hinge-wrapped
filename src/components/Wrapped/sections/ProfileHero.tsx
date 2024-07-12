import React from "react";
import FatHeading from "../FatHeading";
import SlideContainer from "../SlideContainer";
import { WrappedSectionProps } from ".";
import InfoText from "../InfoText";
import { cn } from "@/lib/utils";
import Image from "next/image";

function ProfileHero(props: WrappedSectionProps) {
  return (
    <SlideContainer bg="bg-transparent z-10 relative">
      <div
        className={cn(
          "pointer-events-none absolute h-full w-full opacity-40 flex flex-col gap-3 flex-grow"
        )}
      >
        <Image
          src={
            props.wrapped.userData.media.find((m) => m.type === "photo")?.url
          }
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000 z-10 text-2xl">
        So that profile, huh?
      </FatHeading>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500 z-10">
        Let's see what we're working with there.
      </InfoText>
    </SlideContainer>
  );
}

export default ProfileHero;
