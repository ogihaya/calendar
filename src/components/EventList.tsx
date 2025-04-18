'use client';

import { Event } from '@/types/event';

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  return (
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
  );
} 