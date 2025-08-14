import { z } from "zod"

export const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "ユーザー名は2文字以上で入力してくだい" }),
  title: z
    .string()
    .min(2, { message: "タイトルは2文字以上で入力してくだい" }),
  content: z
    .string()
    .min(10, { message: "本文は10文字以上で入力してくだい" })
    .max(140, { message: "本文は10文字以内で入力してくだい" }),
})