'use client';

interface AddEventButtonProps {
  onClick: () => void;
}

export default function AddEventButton({ onClick }: AddEventButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
    >
      イベントを追加
    </button>
  );
} 