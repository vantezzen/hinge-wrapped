import Statistic from "./Statistic";

export type ChatStatisticResult = {
  totalMessages: number;
  averageMessages: number;
  highestMessages: number;
  averageTimeBetweenMessages: number;
  averageTimeToFirstMessage: number;
  averageChatLengthBasedOnFirstMessageTime: number[];

  messagesAskingForInstagram: number;
  messagesWithApologies: number;
  messagesAskingForMySpace: number;

  longestTimeBetweenMessages: number;
};

const apologies = ["sorry", "apologize", "apology", "forgive", "forgiveness"];

export default class ChatStatistic extends Statistic<ChatStatisticResult> {
  name = "ChatStatistic";
  calculateResult(): ChatStatisticResult {
    const result = this.getDefaultValue();

    const timeBetweenMessages: number[] = [];
    let totalMessagesPerChat: number[] = [];
    let highestMessagesInAChat = 0;
    let timeToFirstMessage: number[] = [];
    let messagesAskingForInstagram = 0;
    let messagesWithApologies = 0;
    let messagesAskingForMySpace = 0;

    const chatLengthByFirstMessageTime: number[][] = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];

    for (const user of this.wrapped.userData.matches) {
      if (!user.chats) {
        continue;
      }

      totalMessagesPerChat.push(user.chats.length);
      highestMessagesInAChat = Math.max(
        highestMessagesInAChat,
        user.chats.length
      );

      if (user.chats.length > 0) {
        const firstMessageHour = new Date(user.chats[0].timestamp).getHours();
        chatLengthByFirstMessageTime[firstMessageHour].push(user.chats.length);
      }
      let lastMessageTime: number | null = null;
      for (const chat of user.chats) {
        if (chat.body.toLowerCase().includes("insta")) {
          messagesAskingForInstagram++;
        }

        if (chat.body.toLowerCase().includes("myspace")) {
          messagesAskingForMySpace++;
        }

        if (
          apologies.some((apology) => chat.body.toLowerCase().includes(apology))
        ) {
          messagesWithApologies++;
        }

        const time = new Date(chat.timestamp).getTime();

        if (lastMessageTime) {
          timeBetweenMessages.push(time - lastMessageTime);

          if (result.longestTimeBetweenMessages < time - lastMessageTime) {
            result.longestTimeBetweenMessages = time - lastMessageTime;
          }
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
    result.messagesAskingForInstagram = messagesAskingForInstagram;
    result.averageChatLengthBasedOnFirstMessageTime =
      chatLengthByFirstMessageTime.map((chatLengths) => {
        if (chatLengths.length === 0) {
          return 0;
        }
        return chatLengths.reduce((a, b) => a + b, 0) / chatLengths.length;
      });
    result.messagesWithApologies = messagesWithApologies;
    result.messagesAskingForMySpace = messagesAskingForMySpace;

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
      averageChatLengthBasedOnFirstMessageTime: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      messagesWithApologies: 0,
      messagesAskingForMySpace: 0,
      longestTimeBetweenMessages: 0,
    };
  }
}
