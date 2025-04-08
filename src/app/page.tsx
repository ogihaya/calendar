export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* カレンダーのヘッダー部分 */}
        <div className="flex justify-between items-center mb-4">
          {/* 前月ボタン */}
          <button className="p-2 rounded-lg hover:bg-gray-100">
            &lt;
          </button>
          
          {/* 年月表示部分 */}
          <div className="text-xl font-bold">
          </div>
          
          {/* 次月ボタン */}
          <button className="p-2 rounded-lg hover:bg-gray-100">
            &gt;
          </button>
        </div>

        {/* カレンダー本体 */}
        <div className="grid grid-cols-7 gap-1">
          {/* 曜日のヘッダー */}
          {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
            <div key={day} className="text-center font-bold py-2">
              {day}
            </div>
          ))}
          
          {/* カレンダーの日付部分 */}
          <div className="col-span-7 grid grid-cols-7 gap-1">
            {/* ここに日付が入ります */}
          </div>
        </div>
      </div>
    </main>
  );
}
