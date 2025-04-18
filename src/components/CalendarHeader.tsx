'use client';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarHeader({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth 
}: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <button 
        onClick={onPrevMonth}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
      >
        &lt;
      </button>
      
      <div className="text-xl font-bold">
        {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
      </div>
      
      <button 
        onClick={onNextMonth}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
      >
        &gt;
      </button>
    </div>
  );
} 