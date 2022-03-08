import React, { useState } from 'react'

function ListText({ id, isEdit, title, completed, todoData, setTodoData }) {
    const [editText, setEditText] = useState(title)

    const onEditChange = (e) => {
        setEditText(e.target.value)
    }

    const editTodoData = () => {
        let newTodoData = todoData.map(data => {
            if (data.id === id) {
                data.title = editText;
                data.isEdit = !data.isEdit;
            }
            return data;
        });

        setTodoData(newTodoData);
    };

    if (!isEdit) {
        return (
          <span className={`${completed ? "line-through" : undefined} px-2`}>{title}</span>
        )
      }
      else {
        return (
          <form className="p-2"
            onSubmit={(e) => {
            e.preventDefault();
            editTodoData()}}>
            <input className="rounded-md" value={editText} onChange={onEditChange}/>
            <button className="px-4" type="submit">확인</button>
          </form>
        )
      }
}

export default ListText