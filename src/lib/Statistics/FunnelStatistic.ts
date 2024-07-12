import Statistic from "./Statistic";

export type FunnelStatisticResult = {
  profilesLiked: number;
  matches: number;
  chats: number;
  blocks: number;
  met: number;
};

export default class FunnelStatistic extends Statistic<FunnelStatisticResult> {
  name = "FunnelStatistic";
  calculateResult(): FunnelStatisticResult {
    const result = this.getDefaultValue();

    for (const match of this.wrapped.userData.matches) {
      result.profilesLiked++;

      if ("match" in match) {
        result.matches++;
      }
      if ("chats" in match) {
        result.chats++;
      }
      if ("block" in match) {
        result.blocks++;
      }
      if ("we_met" in match) {
        result.met++;
      }
    }

    return result;
  }

  getDefaultValue(): FunnelStatisticResult {
    return {
      profilesLiked: 0,
      matches: 0,
      chats: 0,
      blocks: 0,
      met: 0,
    };
  }
}
