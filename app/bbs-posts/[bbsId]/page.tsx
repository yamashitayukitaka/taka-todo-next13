// [bbsid] の名前は任意に設定可能だが、意味を持たせた方がよい
// []の意味	動的ルーティング。URLの一部をパラメータとして受け取る
// ✔ おすすめ
// 投稿IDなら → [postId] や [bbsid]
// ユーザー名なら → [username]
// ページ番号なら → [page]

import React from 'react'
import { BBSData } from "../../types/types";
import Link from 'next/link';


async function getDetailBBSData(id: number) {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, { cache: "no-store" })
  const bbsdetailData: BBSData = await response.json();
  // getDetailBBSData は id を指定して fetch しており、エンドポイントが /api/post/${id} になっているため、そのIDに対応する1件の投稿データを取得することが想定されます。
  // したがって、戻り値も通常は**配列ではなく、オブジェクト（単体のデータ）**で返ってきます。
  // なのでBBSData[]としないこと
  console.log(bbsdetailData);

  return bbsdetailData;

}





const BBSDetailPage = async ({ params }: { params: { bbsId: number } }) => {
  // params には、Next.js のルーティングで [bbsId] にマッチした URL パラメータの値が入る
  // paramsには[id]直下のファイルの関数の引数にparamsを取れば、自動でマッチしたURL パラメータの値が入る
  // paramsで現在ブラウザに表示されているURLのbbsIdを受け取る
  // 「現在ブラウザで表示されているURL の動的パラメータ」。
  const bbsdetailData = await getDetailBBSData(params.bbsId)
  // params に渡されるオブジェクトのキーは ディレクトリ名の [ ] の中に書いた名前 になります。
  // 現在ブラウザに表示されているURLのbbsIdを渡す
  const { title, content, username } = bbsdetailData
  console.log(bbsdetailData)
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-700">{username}</p>
      </div>
      <div className='mb-8'>
        <p className='text-gray-900'>{content}</p>
      </div>

      <Link href={"/"} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">戻る</Link>
    </div>
  )
}

export default BBSDetailPage
