import React from "react";
import { WrappedSectionProps } from ".";
import Serif from "@/components/Serif";
import InfoText from "../InfoText";
import { round } from "@/lib/utils";
import lookup from "@/lib/lookup";

function Profile(props: WrappedSectionProps) {
  return (
    <div className="p-12 m-8 rounded-xl w-[80vw] mx-auto flex justify-center items-center flex-col gap-6 relative">
      <h2 className="text-2xl text-center font-bold">
        You have
        <Serif>
          <div className="text-6xl text-orange-500 my-3">
            {props.statistics.profile.numberOfDealbreakers}
          </div>
        </Serif>
        dealbreakers
      </h2>
      <InfoText className="text-center">
        {lookup(props.statistics.profile.numberOfDealbreakers, {
          0: "You're truly a jugemental-free spirit, I see.",
          1: "Everyone has at least one, right?",
          2: "A bit picky but that's okay.",
          6: "You know what you want - and I can respect that.",
        })}
      </InfoText>

      {props.statistics.profile.mostEditedPrompt && (
        <>
          <div style={{ height: "200px" }}></div>

          <h2 className="text-2xl text-center font-bold">
            <Serif>
              <div className="text-4xl text-violet-500 my-3">
                {props.statistics.profile.mostEditedPrompt.prompt}...
              </div>
            </Serif>
          </h2>
          <InfoText className="text-center">
            Seems to be a difficult prompt, right? You edited that prompt{" "}
            <b>{props.statistics.profile.mostEditedPrompt.timesEdited} times</b>
          </InfoText>
        </>
      )}

      {props.statistics.profile.ageRange.youngCreep && (
        <>
          <div style={{ height: "200px" }}></div>
          <Serif>
            <h2 className="text-3xl text-center font-bold text-blue-500">
              Your age / 2 + 7 ={" "}
              {round(props.statistics.profile.ageRange.youngCreepBorder)}
            </h2>
          </Serif>
          <InfoText className="text-center">
            You know the rule, right? Well, you've set your preference at{" "}
            <b>{props.wrapped.userData.user.preferences.age_min} years old</b> -
            what a creep.
          </InfoText>
        </>
      )}
    </div>
  );
}

export default Profile;
