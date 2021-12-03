import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuid, v4 } from 'uuid';
//create the context
export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
  //this variable will be responsible for the inistalstate of the  application.
  //so that if we reload the page then the task which were there previously would be there.

  const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

  const [tasks, setTasks] = useState(initialState);

  //state for editing the item
  const [editItem, setEditItem] = useState(null);

  //this useEffect hook will work to set the value in the localstorage.
  //json.stringfy used to set the value in json format.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  //add task
  const addTask = (title) => {
    setTasks([...tasks, { title, id: v4() }]);
  };

  //remove task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //clearentire list task
  const clearList = () => {
    setTasks([]);
  };

  //function to find the item that we want to edit
  const findItem = (id) => {
    const item = tasks.find((task) => task.id === id);
    setEditItem(item);
  };

  //editTask
  const editTask = (title, id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { title, id } : task
    );
    setTasks(newTasks);
    setEditItem(null);
  };

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editItem,
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
};
export default TaskListContextProvider;
