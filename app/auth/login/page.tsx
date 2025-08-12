import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Login from '@/app/components/login'
import type { Database } from '@/lib/database.types'

// ログインページ
const LoginPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 認証している場合、リダイレクト
  if (session) {
    redirect('/')
  }

  return <Login />
  // ログインしている場合（cookieにセッション情報が保存されている場合）
  // はトップページに遷移し
  // ログインしていない場合（cookieにセッション情報が保存されていない場合）
  // はloginコンポネントを返す
}

export default LoginPage