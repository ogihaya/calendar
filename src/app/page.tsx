import CalendarGrid from './components/CalendarGrid';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* カレンダーのヘッダー部分 */}
        <div className="flex justify-between items-center mb-4">
          {/* 前月ボタン */}
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600">
            &lt;
          </button>
          
          {/* 年月表示部分 */}
          <div className="text-xl font-bold">
          </div>
          
          {/* 次月ボタン */}
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600">
            &gt;
          </button>
        </div>

        {/* CalendarGridコンポーネントを使用 */}
        <CalendarGrid />
      </div>
    </main>
  );
}
