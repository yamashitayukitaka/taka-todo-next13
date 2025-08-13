//npm i @prisma/client でPrismaのクライアントをインストールする
//下記コードでPrismaのクライアントを利用可能に（インスタンス化）
//インスタンス化とは利用可能にすること
// ---------------------------------------------------------------------------------
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;


// 上記コード Next.jsでPrisma Clientを使用するためのベストプラクティス
// 開発環境でのHot Reload時に新しいインスタンスが作成されるのを防ぐ
// ---------------------------------------------------------------------------------

// このファイルは App Router でファイル名・設置場所が決まっているわけではありませんが、慣習的に `lib/prismaClient.ts` に置くことが多いです。
// そのため、`lib/prismaClient.ts` というパスで Prisma Client をイン
// ポートすることが一般的です。