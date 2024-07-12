// - Images and prompts uploaded
// - Days since sinceup

import Statistic from "./Statistic";

export type ProfileStatisticResult = {
  images: number;
  prompts: number;
  daysSinceSignup: number;
  mostEditedPrompt: {
    prompt: string;
    timesEdited: number;
  } | null;
  numberOfDealbreakers: number;

  ageRange: {
    yearsYounger: number;
    youngCreepBorder: number;
    youngCreep: boolean;

    yearsOlder: number;
    oldCreepBorder: number;
    oldCreep: boolean;
  };

  preferenceOutsideEthnicity: string | null;
};

export default class ProfileStatistic extends Statistic<ProfileStatisticResult> {
  name = "ProfileStatistic";
  calculateResult(): ProfileStatisticResult {
    const result = this.getDefaultValue();

    const images = this.wrapped.userData.media.length;
    const prompts = this.wrapped.userData.prompts.length;
    const daysSinceSignup = Math.floor(
      (new Date().getTime() -
        new Date(this.wrapped.userData.user.account.signup_time).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const promptCounts: Record<string, number> = {};
    for (const prompt of this.wrapped.userData.prompts) {
      promptCounts[prompt.prompt] = (promptCounts[prompt.prompt] || 0) + 1;
    }

    let mostEditedPrompt: {
      prompt: string;
      timesEdited: number;
    } | null = null;
    for (const [prompt, timesEdited] of Object.entries(promptCounts)) {
      if (!mostEditedPrompt || timesEdited > mostEditedPrompt.timesEdited) {
        mostEditedPrompt = {
          prompt,
          timesEdited,
        };
      }
    }

    for (const preference in this.wrapped.userData.user.preferences) {
      if (
        preference.includes("dealbreaker") &&
        this.wrapped.userData.user.preferences[
          preference as keyof typeof this.wrapped.userData.user.preferences
        ]
      ) {
        result.numberOfDealbreakers++;
      }
    }

    result.images = images;
    result.prompts = prompts;
    result.daysSinceSignup = daysSinceSignup;
    result.mostEditedPrompt = mostEditedPrompt;
    result.numberOfDealbreakers = result.numberOfDealbreakers;

    result.ageRange = {
      yearsYounger:
        this.wrapped.userData.user.profile.age -
        this.wrapped.userData.user.preferences.age_min,
      youngCreep:
        this.wrapped.userData.user.preferences.age_min <
        this.wrapped.userData.user.profile.age / 2 + 7,
      youngCreepBorder: this.wrapped.userData.user.profile.age / 2 + 7,

      yearsOlder:
        this.wrapped.userData.user.preferences.age_max -
        this.wrapped.userData.user.profile.age,
      oldCreep:
        this.wrapped.userData.user.profile.age <
        this.wrapped.userData.user.preferences.age_max / 2 + 7,
      oldCreepBorder: this.wrapped.userData.user.preferences.age_max / 2 + 7,
    };

    const ownEthnicities = JSON.parse(
      this.wrapped.userData.user.profile.ethnicities || "[]"
    );
    const preferenceEthnicities = JSON.parse(
      this.wrapped.userData.user.preferences.ethnicity_preference || "[]"
    );
    if (
      preferenceEthnicities.length > 1 ||
      !preferenceEthnicities.includes("Open to All")
    ) {
      const outsideEthnicity = preferenceEthnicities.filter(
        (ethnicity: string) => !ownEthnicities.includes(ethnicity)
      );
      if (outsideEthnicity.length > 0) {
        result.preferenceOutsideEthnicity = outsideEthnicity[0];
      }
    }

    return result;
  }

  getDefaultValue(): ProfileStatisticResult {
    return {
      images: 0,
      prompts: 0,
      daysSinceSignup: 0,
      mostEditedPrompt: null,
      numberOfDealbreakers: 0,
      ageRange: {
        yearsYounger: 0,
        youngCreep: false,
        youngCreepBorder: 0,

        yearsOlder: 0,
        oldCreep: false,
        oldCreepBorder: 0,
      },
      preferenceOutsideEthnicity: null,
    };
  }
}
