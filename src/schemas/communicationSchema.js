import { z } from "zod";

export const HistoryMessageSchema = z
  .object({
    text: z.string(),
    sender_type: z.string(),
  })
  .transform(({ sender_type, ...rest }) => ({
    ...rest,
    sender: sender_type,
  }));

export const HistoryMessagesSchema = z.object({
  messages: z.array(HistoryMessageSchema),
});