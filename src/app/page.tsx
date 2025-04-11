"use client";

import { useState } from 'react';
import { Event } from '@/types/event';
import EventForm from '@/components/EventForm';
import Modal from '@/components/Modal';
import CalendarGrid from './components/CalendarGrid';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  // 前月に移動する関数
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 次月に移動する関数
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = (event: Event) => {
    setEvents(prev => [...prev, event]);
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Todoリストカレンダー</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            イベントを追加
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="イベントを追加"
        >
          <EventForm onSubmit={handleAddEvent} />
        </Modal>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {events.map(event => (
            <div
              key={event.id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <h3 className="font-semibold">{event.name}</h3>
              {event.type === 'schedule' ? (
                <div>
                  <p>開始: {event.startTime.toLocaleString()}</p>
                  <p>終了: {event.endTime.toLocaleString()}</p>
                  {event.location && <p>場所: {event.location}</p>}
                </div>
              ) : (
                <div>
                  <p>締め切り: {event.deadline.toLocaleString()}</p>
                  <p>所要時間: {event.estimatedTime}分</p>
                </div>
              )}
              {event.memo && <p className="mt-2 text-gray-600">{event.memo}</p>}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
