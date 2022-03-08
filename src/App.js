import React, {useState, useCallback, useEffect} from "react";
import "./App.css";
import ListPanel from "./components/ListPanel";
import Form from "./components/Form";

export default function App() {
  const [todoData, setTodoData] = useState(JSON.parse(localStorage.getItem("todoData")) || []);
  const [value, setValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
  }, [todoData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodoData = {
      id: Date.now(),
      title: value,
      completed: false,
      isEdit: false,
    }

    setTodoData(prev => [...prev, newTodoData]);
    setValue("");
  };

  const deleteAll = () => {
    setTodoData([]);
  }

  const handleClick = useCallback((id) => {
    let newTodoData = todoData.filter(data => data.id !== id);
    setTodoData(newTodoData);
  }, [todoData]);

  return(
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg"> 
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
              <button 
                className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200" 
                onClick={deleteAll}>모두 지우기
              </button>
        </div>
        <ListPanel handleClick={handleClick} todoData={todoData} setTodoData={setTodoData}/>
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>
      </div>
    </div>
  )
  
}