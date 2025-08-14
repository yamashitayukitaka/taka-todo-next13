import prisma from "../../../../lib/prismaClient";
import { NextResponse } from "next/server";



export async function GET(req: Request, { params }: { params: { bbsId: string } }) {
  // { params } は、Next.js App Router の API ルート関数で、動的パラメータを受け取るためのオブジェクトです。
  // bbsId はフォルダ名 [bbsId] と一致する必要があります。
  // 現在ブラウザで表示されているURL の動的パラメータをフロントエンド側から受け取っているではなく、
  // fetch('/api/post/3') でリクエストされたときに、
  // api / post / [bbsId] の[bbsId] に一致したパスパラメータを取得している。


  const bbsId = params.bbsId
  const bbsDetailData = await prisma.post.findUnique({
    where: { id: parseInt(bbsId) },
    // parseIntで整数に変換
  });
  // https://www.prisma.io/docs/guides/nextjs(findUniqueについて公式ドキュメント参照)
  // findUniqueは条件を指定してあてはまるものを取得する



  return NextResponse.json(bbsDetailData);
  // JSオブジェクト → JSON文字列に変換
}

