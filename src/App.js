import { useState } from "react";
import "./App.css";


 export default function Table() {
    const [todos, setTodos] = useState(
        [{id: 1, text: "开始一个新的计划!", isEditing: false}]
    );
    const [newTodo, setNewTodo] = useState("");
    function handleAdd() {
        if(newTodo.trim() === "") return;
        const nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id))+1 : 1;
        const newItem = {id: nextId, text: newTodo, isEditing: false}
        setTodos([...todos, newItem])
        setNewTodo("")
    }

    function handleEdit(id) {
        setTodos(todos.map( todo =>
            todo.id === id ? {...todo, isEditing: true} : todo) 
        )
    }

    function handleChange(id, nextText) {
        setTodos(todos.map(todo => 
            todo.id === id ? {...todo, text: nextText} : todo
        ))
    }

    function handleSave(id) {
        setTodos(todos.map( todo =>
            todo.id === id ? {...todo, isEditing: false} : todo) 
        )
    }

    function handleDelete(id) {
        setTodos(todos.filter(todo => todo.id !== id)
        )
    }

    return (
        <>  
            <h1>KingTrain's react-todoList</h1>
            <div style={{marginBottom: "1rem" }}>
                <input 
                    type="text"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    onKeyDown={e => e.key === "Enter" ? handleAdd() : null}
                    placeholder="添加新的代办事项"
                />
                <button onClick={handleAdd}>添加</button>
            </div>
            <table>
                <thead>
                    <tr className="firstrow">
                        <th>代办事项</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo =>
                        (<tr className="row" key={todo.id}>
                            <td>
                                {todo.isEditing ? ( 
                                    <input 
                                        value={todo.text}
                                        onChange={e => handleChange(todo.id, e.target.value)}
                                    />
                                ) : todo.text}
                            </td>
                            <td>
                                {todo.isEditing ? (
                                    <button onClick={() =>handleSave(todo.id)}>保存</button>
                                ) : (
                                    <div className="button-groups">
                                        <button onClick={() =>handleEdit(todo.id)}>编辑</button>
                                        <button onClick={() =>handleDelete(todo.id)}>删除</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}