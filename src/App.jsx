import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", completed: false },
    { id: 1, content: "코딩 공부하기", completed: false },
    { id: 2, content: "잠 자기", completed: true },
  ]);

  return (
    <div className="app-container">
      <header>
        <h1>나의 멋진 투두 앱</h1>
      </header>
      <main className="main-content">
        <TodoList todoList={todoList} setTodoList={setTodoList} />
        <hr className="divider" />
        <TodoInput todoList={todoList} setTodoList={setTodoList} />
      </main>
    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddClick = () => {
    if (inputValue.trim() === "") {
      alert("할 일을 입력해주세요!");
      return;
    }
    const newTodo = { id: Number(new Date()), content: inputValue, completed: false };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setInputValue("");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddClick();
    }
  };

  return (
    <div className="todo-input-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="새로운 할 일을 입력하세요"
      />
      <button className="add-button" onClick={handleAddClick}>
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          setTodoList={setTodoList}
        />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);

  const handleCheckboxChange = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, completed: !el.completed } : el
      )
    );
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setInputValue(todo.content);
  };

  const handleSaveClick = () => {
     if (inputValue.trim() === "") {
      alert("할 일 내용을 입력해주세요!");
      return;
    }
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, content: inputValue } : el
      )
    );
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setTodoList((prev) => {
      return prev.filter((el) => el.id !== todo.id);
    });
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCheckboxChange}
        className="todo-checkbox"
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="edit-input"
          />
          <button className="save-button" onClick={handleSaveClick}>
            저장
          </button>
        </>
      ) : (
        <>
          <span className="todo-content">{todo.content}</span>
          <button className="edit-button" onClick={handleEditClick}>
            수정
          </button>
        </>
      )}
      <button className="delete-button" onClick={handleDeleteClick}>
        삭제
      </button>
    </li>
  );
}

export default App;

//d