import React from 'react'
import Link from 'next/link';


import { BBSData } from "@/app/types/types";
import {
  Card,
  // CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface BBSDataProps {
  bbsData: BBSData;
}

const BBSCard = ({ bbsData }: BBSDataProps) => {
  const { id, username, title, content } = bbsData;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{username}</CardDescription>
        {/* <CardAction>
        </CardAction> */}
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex-col gap-2">
        <Link href={`/bbs-posts/${id}`} className="text-blue-500">Read More</Link>
        {/* このように バッククオート（``）で囲んだテンプレートリテラルはJavaScriptの式なので、
        JSX内では中括弧 {} で囲んで式として渡す必要があります。 */}
      </CardFooter>
    </Card>
  )
}

export default BBSCard
