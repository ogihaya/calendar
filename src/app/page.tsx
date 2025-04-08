"use client";

import { useState } from 'react';
import CalendarGrid from './components/CalendarGrid';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 前月に移動する関数
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 次月に移動する関数
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* カレンダーのヘッダー部分 */}
        <div className="flex justify-between items-center mb-4">
          {/* 前月ボタン */}
          <button 
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            &lt;
          </button>
          
          {/* 年月表示部分 */}
          <div className="text-xl font-bold">
            {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
          </div>
          
          {/* 次月ボタン */}
          <button 
            onClick={goToNextMonth}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            &gt;
          </button>
        </div>

        {/* CalendarGridコンポーネントを使用 */}
        <CalendarGrid currentDate={currentDate} />
      </div>
    </main>
  );
}
