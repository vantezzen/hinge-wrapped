import ChatStatistic, { ChatStatisticResult } from "./Statistics/ChatStatistic";
import FunnelStatistic, {
  FunnelStatisticResult,
} from "./Statistics/FunnelStatistic";
import Statistic from "./Statistics/Statistic";
import { HingeData } from "./types";

export type Statistics = {
  funnel: FunnelStatisticResult;
  chat: ChatStatisticResult;
};

// @ts-ignore
export const SAMPLE_STATISTICS: Statistics = {};

export default class Wrapped {
  public demoMode = false;

  constructor(public userData: HingeData) {}

  public getStatistics(): Statistics {
    console.log("Getting statistics", this.userData);

    if (this.demoMode) {
      return SAMPLE_STATISTICS;
    }

    return {
      funnel: this.calculateStatistic(FunnelStatistic),
      chat: this.calculateStatistic(ChatStatistic),
    };
  }

  private calculateStatistic<T>(
    statistic: new (wrapped: Wrapped) => Statistic<T>
  ): T {
    const statisticInstance = new statistic(this);

    try {
      return statisticInstance.calculateResult();
    } catch (e) {
      console.log(`Failed to calculate statistic ${statistic.name}`, e);
      return statisticInstance.getDefaultValue();
    }
  }
}
