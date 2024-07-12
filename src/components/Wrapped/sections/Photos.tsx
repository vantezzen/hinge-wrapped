import React from "react";
import { WrappedSectionProps } from ".";
import Serif from "@/components/Serif";
import InfoText from "../InfoText";
import { cn } from "@/lib/utils";
import SlideContainer from "../SlideContainer";
import Marquee from "@/components/ui/marquee";
import FatHeading from "../FatHeading";
import CountUp from "../CountUp";
import Image from "next/image";

function Photos(props: WrappedSectionProps) {
  return (
    <SlideContainer bg="bg-transparent z-10 relative">
      <div
        className={cn(
          "pointer-events-none absolute h-full w-full opacity-40 flex flex-col gap-3 flex-grow"
        )}
      >
        {Array.from({ length: 4 }).map((_, i) => {
          const photos = props.wrapped.userData.media
            .filter((photo) => photo.type === "photo")
            .map((photo) => photo.url);

          return (
            <Marquee
              className="[--duration:90s] min-w-[100px]"
              reverse={i % 2 === 1}
              key={i}
            >
              {photos.map((photo, i) => (
                <Image
                  src={photo}
                  alt="user photo"
                  width="200"
                  height="200"
                  className="rounded-xl object-cover"
                  key={i}
                />
              ))}
            </Marquee>
          );
        })}
      </div>

      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500 z-10">
        You've uploaded
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000 z-10 text-2xl text-center">
        <Serif>
          <div className="text-6xl text-orange-500 my-3">
            <CountUp end={props.wrapped.userData.media.length} />
          </div>
        </Serif>
        photos
      </FatHeading>
    </SlideContainer>
  );
}

export default Photos;
