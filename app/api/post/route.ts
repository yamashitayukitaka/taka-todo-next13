import prisma from "../../../lib/prismaClient";
import { NextResponse } from "next/server";


// https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware
// https://www.prisma.io/docs/orm/reference/prisma-client-reference（下記コード左2つのURL参照）


// export async function GET(req: Request) 関数はさまざまな用途があるがその一例として
// フロントエンドからfechでリクエストを受けた場合のサーバーサイドでの
// App Router独自の動作定義であり。データを取得する。

export async function GET(req: Request) {
  // POSTリクエストしたい場合はasync function GET()をasync function POST()に変更する
  const allBBSPosts = await prisma.post.findMany();
  // prisma-->データベースにアクセス
  // post-->schema.prismaで定義しSupabaseにマイグレーションしたSupabaseのデータベース内のpostというテーブルにアクセスする。
  // findMany()-->Supabaseのデータベースに入力した全てのデータをJSON形式で取得する。
  return NextResponse.json(allBBSPosts);
  // クライアントサイドに取得したデータを返す
  // JSオブジェクト → JSON文字列に変換
  // サーバーサイドからクライアントサイドにデータを返す時はJSON文字列である必要がある。
}

// app/api/post/route.ts というディレクトリ構成は、Next.js 13 以降の App Router における API ルートの公式な推奨構成

// app/api/post/route.ts という場所に置かなくても、正しくエンドポイントとしてルーティングされるように設定すれば操作は可能です。
// ただし、Next.js（App Router）ではそれが推奨された構成であり、守らないと予期しない挙動や保守性の低下につながります。

// 「ルーティングされる」とは、特定のURLにアクセスされたときに、対応する処理（関数・コンポーネントなど）が呼び出されること
// ルーティングされる＝アクセスされたURLに対して、指定された処理が実行されるように結びつけられている状態
// ルーティング=>「このURLにアクセスが来たら、この処理を動かす」と結びつけること


// ==========================================================