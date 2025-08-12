// App Router（app/ディレクトリ）のReactコンポーネントは
// 基本的にデフォルトでサーバーコンポーネント（'use server'相当）
// Supabaseの認証情報を安全に取得し、その結果に応じてUIを切り替えるため
// このコンポーネントはサーバーコンポーネントとして実装する必要がある


import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'

// メインページ
const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="text-center text-xl">
      {session ? <div>ログイン済</div> : <div>未ログイン</div>}
    </div>
  )
}

export default Home