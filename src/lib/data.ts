import { HingeData } from "./types";

export function getRandomMessages(data: HingeData, count = 10) {
  const messages = data.matches
    .flatMap((match) => match.chats)
    .sort(() => Math.random() - 0.5);
  return messages.slice(0, count);
}
