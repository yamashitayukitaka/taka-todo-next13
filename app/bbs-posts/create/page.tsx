'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
// 上記はShadcn UI（新しい名前では shadcn） を使って npx shadcn@latest add コマンドでコンポーネントを追加したときに、
// @/components/ui/ 以下に生成されるコンポーネントたちです。
import { z } from "zod"
// これをインポートしないとzが見つかりませんと出る
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
// import { postBBS } from "@/app/actions/postBBSActions"


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

const createBBSPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      title: "",
      content: "",
    }
  })

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const { username, title, content } = value
    try {
      await fetch("http://localhost:3009/api/post", {
        // フロントエンドからエンドポイントのファイルにアクセスした場合
        // ファイルはVSコード内にあるが、
        // エンドポイントにfetchしたということはサバ―にアクセスしたと考える
        // エンドポイントのファイルはNext.js の開発サーバー（next dev や next start）
        // がそのファイルを読み込んで動かしている

        method: "POST",
        // フロンドエンドからからエンドポイントのPOST関数にheaders,body送るPOST
        // エンドポイントのPOSTとは別物
        headers: {
          "Content-Type": "application/json"
          // このリクエストボディは JSON形式のデータ ですよという記述
        },
        body: JSON.stringify({ username, title, content })
        // JavaScriptのオブジェクトをJSONに変換する
        // JSON.stringifyでひとつのメソッド
      });

      router.push("/");
      router.refresh()
      // refreshはpushでページ遷移後に動作させるので後に書く
    } catch (err) {
      console.error(err);
    }
    postBBS({ username, title, content });
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/2 px-7">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input placeholder="ユーザー名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input placeholder="タイトル" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>本文</FormLabel>
              <FormControl>
                <Textarea placeholder="投稿内容" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default createBBSPage
