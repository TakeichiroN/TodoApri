import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { FilterBar } from './components/FilterBar';
import { TodoList } from './components/TodoList';
import './App.css';

export default function App() {
  const {
    filteredTodos,
    filter,
    setFilter,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    reorderTodos,
  } = useTodos();

  return (
    <div className="app">
      <div className="card">
        <header className="app-header">
          <h1>TodoApri</h1>
          <p className="subtitle">タスクをシンプルに管理</p>
        </header>

        <TodoInput onAdd={addTodo} />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onReorder={reorderTodos}
        />
      </div>
    </div>
  );
}
