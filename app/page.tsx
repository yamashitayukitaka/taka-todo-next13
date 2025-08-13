// App Router（app/ディレクトリ）のReactコンポーネントは
// 基本的にデフォルトでサーバーコンポーネント（'use server'相当）
// Supabaseの認証情報を安全に取得し、その結果に応じてUIを切り替えるため
// このコンポーネントはサーバーコンポーネントとして実装する必要がある


import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import BBSCardList from "@/app/components/layouts/BBSCardList";
import { BBSData } from "./types/types";

// ------------------------------------------------------------------------------
// ※クライアントサイドの処理
async function getAllBBSData() {
  const response = await fetch("http://localhost:3000/api/post", { cache: "no-store" })
  //   route.ts は 「そのディレクトリのエンドポイントを担当する特別なファイル」 として Next.js が認識している。
  // 　第一引数にエンドポイントを指定
  //   このURLの「/api/post」がエンドポイントです。
  // 　たとえばこのエンドポイントにアクセスすると、Prisma経由でDBの投稿一覧が取得できる処理が動く、ということ。




  // { cache: "no-store" }を指定することで、SSRになる
  // { cache: "force-cache" }を指定することで、SSGになる
  // {next: { revalidate: 秒数 }}を指定することで、ISRになる;
  const bbsAllData: BBSData[] = await response.json();
  // 配列で返ってくるのでBBSData[]とすること
  // さらにJSON文字列 → JSオブジェクトに変換

  // BBSData[]の構造
  // [
  //   {
  //   id: number;
  //   username: string;
  //   title: string;
  //   content: string;
  //   createdAt: Date
  //   }
  // ]
  console.log(bbsAllData);


  return bbsAllData;
}

// 1　await fetch("http://localhost:3009/api/post", { cache: "no-store" })で
// api/post/route.tsにアクセスし、export async function GET(req: Request)関数が動く
// 2　const allBBSPosts = await prisma.post.findMany();でSupabaseのデータベースから全てのデータを取得
// 3　return NextResponse.json(allBBSPosts);で取得したデータをJSON形式で返す
// 4　変数responseに３で返されたデータが入る
// 5　await response.json()でサーバーサイドから送られてきたデータはJSON形式なのでJSオブジェクト形式に変換する
// 6　return bbsAllDataでgetAllBBSData関数実行時に取得データを使用可能にする為に値を返す

// メインページ
const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const bbsAllData = await getAllBBSData()
  // 非同期関数である getAllBBSData() にさらに await を付ける必要がある
  // 後続の処理を待たせるため
  // awaitはjsxのレンダリングをデータfetchの完了まで待たせる為

  return (
    <div className="text-center text-xl">
      {session ? <BBSCardList bbsAllData={bbsAllData} /> : <div>未ログイン</div>}
    </div>
  )
}

export default Home