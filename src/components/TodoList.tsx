import { useRef, useState } from 'react';
import type { Todo } from '../types';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onReorder: (from: number, to: number) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit, onReorder }: Props) {
  const dragIndex = useRef<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  function handleDragStart(index: number) {
    dragIndex.current = index;
    setDraggingIndex(index);
  }

  function handleDragEnter(index: number) {
    setDragOverIndex(index);
  }

  function handleDragEnd() {
    if (dragIndex.current !== null && dragOverIndex !== null && dragIndex.current !== dragOverIndex) {
      onReorder(dragIndex.current, dragOverIndex);
    }
    dragIndex.current = null;
    setDraggingIndex(null);
    setDragOverIndex(null);
  }

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">&#10003;</div>
        <p>タスクがありません</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragEnd={handleDragEnd}
          isDragging={draggingIndex === index}
          isDragOver={dragOverIndex === index}
        />
      ))}
    </ul>
  );
}
