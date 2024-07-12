import Statistic from "./Statistic";

export type ChatStatisticResult = {
  totalMessages: number;
  averageMessages: number;
  highestMessages: number;
  averageTimeBetweenMessages: number;
  averageTimeToFirstMessage: number;
  messagesAskingForInstagram: number;
};

export default class ChatStatistic extends Statistic<ChatStatisticResult> {
  name = "ChatStatistic";
  calculateResult(): ChatStatisticResult {
    const result = this.getDefaultValue();

    const timeBetweenMessages: number[] = [];
    let totalMessagesPerChat: number[] = [];
    let highestMessagesInAChat = 0;
    let timeToFirstMessage: number[] = [];
    let messagesAskingForInstagram = 0;

    for (const user of this.wrapped.userData.matches) {
      if (!user.chats) {
        continue;
      }

      totalMessagesPerChat.push(user.chats.length);
      highestMessagesInAChat = Math.max(
        highestMessagesInAChat,
        user.chats.length
      );

      let lastMessageTime: number | null = null;
      for (const chat of user.chats) {
        if (chat.body.toLowerCase().includes("insta")) {
          messagesAskingForInstagram++;
        }

        const time = new Date(chat.timestamp).getTime();

        if (lastMessageTime) {
          timeBetweenMessages.push(time - lastMessageTime);
        } else {
          const matchTime = new Date(user.match![0].timestamp).getTime();
          timeToFirstMessage.push(time - matchTime);
        }

        lastMessageTime = time;
      }
    }

    result.totalMessages = totalMessagesPerChat.reduce((a, b) => a + b, 0);
    result.averageMessages = result.totalMessages / totalMessagesPerChat.length;
    result.highestMessages = highestMessagesInAChat;
    result.averageTimeBetweenMessages =
      timeBetweenMessages.reduce((a, b) => a + b, 0) /
      timeBetweenMessages.length;
    result.averageTimeToFirstMessage =
      timeToFirstMessage.reduce((a, b) => a + b, 0) / timeToFirstMessage.length;

    return result;
  }

  getDefaultValue(): ChatStatisticResult {
    return {
      averageMessages: 0,
      highestMessages: 0,
      averageTimeBetweenMessages: 0,
      averageTimeToFirstMessage: 0,
      totalMessages: 0,
      messagesAskingForInstagram: 0,
    };
  }
}
