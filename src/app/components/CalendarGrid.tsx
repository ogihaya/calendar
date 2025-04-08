"use client";

// 日付の型定義
type DateInfo = {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
};

type CalendarGridProps = {
  currentDate: Date;
};

export default function CalendarGrid({ currentDate }: CalendarGridProps) {
  // カレンダーの日付を生成する関数
  const generateCalendarDates = (): DateInfo[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // 月の最初の日
    const firstDay = new Date(year, month, 1);
    // 月の最後の日
    const lastDay = new Date(year, month + 1, 0);
    
    // 月の最初の日の曜日（0: 日曜日, 6: 土曜日）
    const firstDayOfWeek = firstDay.getDay();
    // 月の日数
    const daysInMonth = lastDay.getDate();
    
    // 前月の残りの日数
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    const dates: DateInfo[] = [];
    
    // 前月の残りの日付を追加
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      dates.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    // 今月の日付を追加
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push({
        date: i,
        isCurrentMonth: true,
        isToday: today.getDate() === i && 
                 today.getMonth() === month && 
                 today.getFullYear() === year
      });
    }
    
    // 必要な週数を計算（7日で割って切り上げ）
    const totalDays = dates.length;
    const weeksNeeded = Math.ceil(totalDays / 7);
    const cellsNeeded = weeksNeeded * 7;
    
    // 翌月の日付を追加（必要なマス目を完成させるため）
    const remainingDays = cellsNeeded - dates.length;
    for (let i = 1; i <= remainingDays; i++) {
      dates.push({
        date: i,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    return dates;
  };

  return (
    <div className="grid grid-cols-7 p-4 bg-white border border-gray-200 rounded-lg">
      {/* 曜日のヘッダー */}
      {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
        <div key={day} className={`
          text-center font-bold p-2 border-b border-gray-200
          ${index === 0 ? 'text-red-500' : ''}  
          ${index === 6 ? 'text-blue-500' : ''}
          ${index !== 0 && index !== 6 ? 'text-black' : ''}
        `}>
          {day}
        </div>
      ))}
      
      {/* 日付グリッド */}
      {generateCalendarDates().map((dateInfo, index) => (
        <div
          key={index}
          className={`
            p-2 text-center border border-gray-200
            ${dateInfo.isCurrentMonth 
              ? index % 7 === 0 
                ? 'text-red-500'  // 日曜日
                : index % 7 === 6 
                  ? 'text-blue-500'  // 土曜日
                  : 'text-black'  // 平日
              : index % 7 === 0 
                ? 'text-red-300'  // 前後月の日曜日
                : index % 7 === 6 
                  ? 'text-blue-300'  // 前後月の土曜日
                  : 'text-gray-400'  // 前後月の平日
            }
            ${dateInfo.isToday ? 'bg-blue-500 text-white' : 'bg-white'}
            hover:bg-gray-100 cursor-pointer
          `}
        >
          {dateInfo.date}
        </div>
      ))}
    </div>
  );
} 