'use client';

import { useState } from 'react';
import { Event, EventType, Schedule, Task } from '@/types/event';

interface EventFormProps {
  onSubmit: (event: Event) => void;
}

interface BaseFormData {
  type: EventType;
  name: string;
  memo?: string;
}

interface ScheduleFormData extends BaseFormData {
  type: 'schedule';
  startTime?: string;
  endTime?: string;
  repeat?: string;
  location?: string;
}

interface TaskFormData extends BaseFormData {
  type: 'task';
  deadline?: string;
  estimatedTime?: number;
}

type FormData = ScheduleFormData | TaskFormData;

export default function EventForm({ onSubmit }: EventFormProps) {
  const [eventType, setEventType] = useState<EventType>('schedule');
  const [formData, setFormData] = useState<FormData>({
    type: 'schedule',
    name: '',
    memo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション
    if (!formData.name) {
      alert('イベント名を入力してください');
      return;
    }

    // イベントの種類に応じて必要なフィールドをチェック
    if (formData.type === 'schedule') {
      const schedule = formData as ScheduleFormData;
      if (!schedule.startTime || !schedule.endTime) {
        alert('開始時刻と終了時刻を入力してください');
        return;
      }
    } else {
      const task = formData as TaskFormData;
      if (!task.deadline || !task.estimatedTime) {
        alert('締め切り日と所要時間を入力してください');
        return;
      }
    }

    // 新しいイベントを作成
    let newEvent: Event;
    if (formData.type === 'schedule') {
      const schedule = formData as ScheduleFormData;
      newEvent = {
        id: crypto.randomUUID(),
        type: 'schedule',
        name: schedule.name,
        startTime: new Date(schedule.startTime!),
        endTime: new Date(schedule.endTime!),
        repeat: schedule.repeat as any,
        location: schedule.location,
        memo: schedule.memo,
      };
    } else {
      const task = formData as TaskFormData;
      newEvent = {
        id: crypto.randomUUID(),
        type: 'task',
        name: task.name,
        deadline: new Date(task.deadline!),
        estimatedTime: task.estimatedTime!,
        memo: task.memo,
      };
    }

    onSubmit(newEvent);
    setFormData({
      type: eventType,
      name: '',
      memo: '',
    } as FormData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as EventType;
    setEventType(newType);
    setFormData({
      type: newType,
      name: '',
      memo: '',
    } as FormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">イベントの種類</label>
        <select
          name="type"
          value={eventType}
          onChange={handleTypeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="schedule">予定</option>
          <option value="task">タスク</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">イベント名</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {formData.type === 'schedule' ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">開始時刻</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">終了時刻</label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">繰り返し</label>
            <select
              name="repeat"
              value={formData.repeat}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="none">なし</option>
              <option value="daily">毎日</option>
              <option value="weekly">毎週</option>
              <option value="monthly">毎月</option>
              <option value="yearly">毎年</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">場所</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">締め切り日</label>
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">所要時間（分）</label>
            <input
              type="number"
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              min="1"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">メモ</label>
        <textarea
          name="memo"
          value={formData.memo}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        イベントを追加
      </button>
    </form>
  );
} 