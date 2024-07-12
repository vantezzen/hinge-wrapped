import React from "react";
import { WrappedSectionProps } from ".";
import Serif from "@/components/Serif";
import InfoText from "../InfoText";
import { round } from "@/lib/utils";
import lookup from "@/lib/lookup";

function Profile(props: WrappedSectionProps) {
  return (
    <div className="p-12 m-8 rounded-xl w-full max-w-[80vw] mx-auto flex justify-center items-center flex-col gap-6 relative">
      <h2 className="text-2xl text-center font-bold">
        You have
        <Serif>
          <div className="text-6xl text-orange-500 my-3">
            {props.statistics.profile.numberOfDealbreakers}
          </div>
        </Serif>
        dealbreakers set
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

          <div>
            <iframe
              src="https://giphy.com/embed/3owzW5c1tPq63MPmWk"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <a
              href="https://giphy.com/gifs/filmeditor--the-hangover-movie-3owzW5c1tPq63MPmWk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 float-right"
            >
              via GIPHY
            </a>
          </div>
          <Serif>
            <h2 className="text-3xl text-center font-bold text-blue-500">
              {props.wrapped.userData.user.profile.age} (your age) / 2 + 7 ={" "}
              {round(props.statistics.profile.ageRange.youngCreepBorder)} years
            </h2>
          </Serif>
          <InfoText className="text-center">
            You know the rule, right? Well, you've set your preference at{" "}
            <b>{props.wrapped.userData.user.preferences.age_min} years old</b> -
            what a creep.
          </InfoText>
        </>
      )}

      {props.statistics.profile.ageRange.oldCreep && (
        <>
          <div style={{ height: "200px" }}></div>
          <Serif>
            <h2 className="text-3xl text-center font-bold text-blue-500">
              Their age / 2 + 7 ={" "}
              {round(props.statistics.profile.ageRange.oldCreepBorder)} years
            </h2>
          </Serif>
          <InfoText className="text-center">
            That's the highest age before its considered creepy. You've set your
            preference at{" "}
            <b>{props.wrapped.userData.user.preferences.age_max} years old</b>{" "}
            instead - you like them old, huh?
          </InfoText>
        </>
      )}

      {props.statistics.profile.preferenceOutsideEthnicity && (
        <>
          <div style={{ height: "200px" }}></div>
          <Serif>
            <h2 className="text-3xl text-center font-bold text-emerald-500">
              So you've got a thing for{" "}
              <b>{props.statistics.profile.preferenceOutsideEthnicity}'s?</b>
            </h2>
          </Serif>
          <InfoText className="text-center">
            Looks like someone got some clear preferences.
          </InfoText>
        </>
      )}
    </div>
  );
}

export default Profile;
