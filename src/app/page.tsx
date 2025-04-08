
export default function Home() {
  return (
    <main>
      
        {/* 表示している年と月 */}
        <div id="displayedYM"></div>

        {/* 月の切り替えボタン */}
        <button id="prevMonthBtn">&lt;</button>
        <button id="nextMonthBtn">&gt;</button>
        
        {/* カレンダーの表示場所 */}
        <div id="calendar"></div>
      
    </main>
  );
}
