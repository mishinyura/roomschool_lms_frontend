import { z } from "zod";

// Схема ответа токена
export const TokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number().optional(),
  user: z.object({
      id: z.number(),
      name: z.string()
  }).optional()
});