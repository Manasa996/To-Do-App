import React, { useState, useEffect } from 'react';
import "./todostyle.css";

// TodoApp component
const TodoApp = () => {
    // State to store tasks
    let [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    // State to store input value
    let [newTask, setNewTask] = useState('');

    // Save tasks to LocalStorage whenever `tasks` state changes
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Handle input change
    const handleTask = (e) => {
        setNewTask(e.target.value);
    };

    // Add new task to the list
    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, newTask]); // Append new task to the array
            setNewTask(''); // Clear input field
        }
    };

    // Delete a specific task from the list
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    // Clear all tasks
    const freshStart = () => {
        setTasks([]);
    };

    return (
        <div className='container'>
            <h1>To-Do Tasks</h1>

            {/* Input field for adding new tasks */}
            <input
                type="text"
                placeholder='Add a new task'
                value={newTask}
                onChange={handleTask}
            />

            {/* Button to add a task */}
            <button onClick={addTask} className='addTask'>Add</button>

            {/* Button to clear all tasks */}
            <button onClick={freshStart} className='freshStart'>Clear All</button>

            {/* Ordered list to display tasks */}
            <ol>
                {tasks.map((task, index) => {
                    return (
                        <li key={index}>
                            {/* Display task number and text */}
                            <span>{(index + 1) + '. ' + task}</span>

                            {/* Delete button to remove task */}
                            <button className='delete' onClick={() => deleteTask(index)}>❌</button>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default TodoApp;
