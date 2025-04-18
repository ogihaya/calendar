"use client";//データの更新が必要な要素だからクライアントコンポーネントとして認識させる

import { useState } from 'react';
import { Event } from '@/types/event';
import EventForm from '@/components/EventForm';
import Modal from '@/components/Modal';
import CalendarHeader from '@/components/CalendarHeader';
import EventList from '@/components/EventList';
import AddEventButton from '@/components/AddEventButton';
import CalendarGrid from './components/CalendarGrid';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());//[定数,定数を更新する関数]=useState(初期値)
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
    setEvents(prev => [...prev, event]);//prevは前のstateの値、後ろに追加してる
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="イベントを追加"
        >
          <EventForm onSubmit={handleAddEvent} /> {/* EventFormがchildrenになる */} 
        </Modal>

        <div className="max-w-2xl mx-auto">
          <CalendarHeader
            currentDate={currentDate}
            onPrevMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
          />
          <CalendarGrid currentDate={currentDate} />
        </div>

        <div className="flex justify-between items-center mb-8">
          <AddEventButton onClick={() => setIsModalOpen(true)} />
        </div>

        <EventList events={events} />
      </div>
    </main>
  );
}
