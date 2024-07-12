import React from "react";
import FatHeading from "../FatHeading";
import SlideContainer from "../SlideContainer";
import { WrappedSectionProps } from ".";
import InfoText from "../InfoText";
import { cn } from "@/lib/utils";
import { getRandomMessages } from "@/lib/data";
import Marquee from "@/components/ui/marquee";

function MessageHero(props: WrappedSectionProps) {
  return (
    <SlideContainer bg="bg-transparent z-10 relative">
      <div
        className={cn(
          "pointer-events-none absolute h-full w-full opacity-40 flex flex-col gap-3 flex-grow"
        )}
      >
        {Array.from({ length: 4 }).map((_, i) => {
          const messages = getRandomMessages(props.wrapped.userData);

          return (
            <Marquee
              className="[--duration:90s] min-w-[100px]"
              reverse={i % 2 === 1}
              key={i}
            >
              {messages.map((message, i) => (
                <figure
                  className={cn(
                    "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                    // light styles
                    "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                    // dark styles
                    "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
                  )}
                  key={i}
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-medium dark:text-white">
                        {props.wrapped.userData.user.profile.first_name}
                      </figcaption>
                    </div>
                  </div>
                  <blockquote className="mt-2 text-sm">
                    {message?.body}
                  </blockquote>
                </figure>
              ))}
            </Marquee>
          );
        })}
      </div>

      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000 z-10 text-2xl">
        Now let's take a look at your messages
      </FatHeading>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500 z-10">
        to see if you're really such a smooth talker.
      </InfoText>
    </SlideContainer>
  );
}

export default MessageHero;
