import { useState, useRef } from 'react';
import type { Priority } from '../types';

interface Props {
  onAdd: (text: string, priority: Priority) => void;
}

export function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!text.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      inputRef.current?.focus();
      return;
    }
    onAdd(text, priority);
    setText('');
    inputRef.current?.focus();
  }

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <div className={`input-row${shake ? ' shake' : ''}`}>
        <input
          ref={inputRef}
          className="todo-input"
          type="text"
          placeholder="新しいタスクを入力..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          aria-label="優先度"
        >
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
        <button className="add-btn" type="submit" aria-label="タスクを追加">
          追加
        </button>
      </div>
    </form>
  );
}
