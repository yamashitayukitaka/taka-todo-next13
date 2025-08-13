import React from 'react'
import { BBSData } from "@/app/types/types";
import BBSCard from '@/app/components/layouts/BBSCard';

interface BBSAllDataProps {
  bbsAllData: BBSData[];
}

// props で受け取るオブジェクトの構造を明示するため、キー名（bbsAllData）を含めた型定義が必要
const BBSCardList = ({ bbsAllData }: BBSAllDataProps) => {
  return (
    <div className="grid lg:grid-cols-3 px-4 py-4 gap-4">
      {bbsAllData.map((bbsData: BBSData) => (
        <BBSCard
          key={bbsData.id}// ← React専用の識別子

          // key は親コンポーネントで、map関数のように繰り返し処理する 
          // JSX 要素に直接指定する必要がある。子コンポーネントに分離しても、
          // key は子コンポーネント内で JSX に記述しても React には認識されない。
          // key は props として渡すこともできない（React により内部で処理され、子には渡らない）
          // なので子コンポネントに分離する場合は親コンポネント内の
          // 繰り返し処理の中で<子コンポネント名　key = {}/>
          // とかく必要がある

          bbsData={bbsData} // ← これはprops
        />
      ))}
    </div>
  )
}


export default BBSCardList


