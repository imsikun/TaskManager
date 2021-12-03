import React, { useContext, useState, useEffect } from 'react';
import { TaskListContext } from '../context/TaskListContext';

const TaskForm = () => {
  const { addTask, clearList, editItem, editTask } =
    useContext(TaskListContext);

  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editItem) {
      addTask(title);
      setTitle('');
    } else {
      editTask(title, editItem.id);
    }
  };

  //useeffect hook will run only if the edit item value changes
  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
    } else {
      setTitle('');
    }
  }, [editItem]);

  return (
    <form onSubmit={handleSubmit} className='form'>
      <input
        type='text'
        className='task-input'
        placeholder='Add task'
        required
        value={title}
        onChange={handleChange}
      />

      <div className='buttons'>
        <button type='submit' className='btn add-task-btn'>
          {editItem ? 'Edit Task' : 'Add Task'}
        </button>
        <button onClick={clearList} type='submit' className='btn clear-btn'>
          Clear
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
