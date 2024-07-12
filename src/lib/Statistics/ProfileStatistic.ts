// - Images and prompts uploaded
// - Days since sinceup

import Statistic from "./Statistic";

export type ProfileStatisticResult = {
  images: number;
  prompts: number;
  daysSinceSignup: number;
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

    result.images = images;
    result.prompts = prompts;
    result.daysSinceSignup = daysSinceSignup;

    return result;
  }

  getDefaultValue(): ProfileStatisticResult {
    return {
      images: 0,
      prompts: 0,
      daysSinceSignup: 0,
    };
  }
}
