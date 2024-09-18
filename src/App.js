import React, { useState } from "react";

const App = () => {
  const [taskDescription, setTaskDescription] = useState("");
  const [task, setTask] = useState([]);
  const [editTaskId, setEditTaskId] = useState(0);
  const [updateTaskDescription, setUpdateTaskDescription] = useState("");

  const hanldeChange = (e) => {
    setTaskDescription(e.target.value);
    setEditTaskId(0);
  };
  const handleAddTaskBtn = () => {
    setEditTaskId(0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var newTask = {
      id: Date.now(),
      taskDescription,
    };
    setTask((task) => [...task, newTask]);
    setTaskDescription("");
  };
  const handleDelete = (id) => {
    setTask((task) => task.filter((item) => item.id !== id));
    setTaskDescription("");
  };
  const handleEdit = (item) => {
    setEditTaskId(item.id);
    setTaskDescription("");
    setUpdateTaskDescription(item.taskDescription)
  };
  const handleUpdateTaskDescription = (data) => {
    setUpdateTaskDescription(data.target.value);
  };
  const handleUpdate = (data) => {
    setTask(
      task.map((item) => {
        if (item.id === data.id) {
          return {
            ...item,
            taskDescription:
              updateTaskDescription === ""
                ? item.taskDescription
                : updateTaskDescription,
          };
        } else {
          return item;
        }
      })
    );
    setEditTaskId(0);
    setUpdateTaskDescription("");
  };
  const handleEditCancel = () => {
    setEditTaskId(0);
    setUpdateTaskDescription("");
  };
  return (
    <div className="flex-col md:w-9/12 sm:w-full mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold p-3 my-3 md:p-5 md:my-5 text-center">
        TASK MANAGEMENT
      </h1>

      <form
        onSubmit={handleSubmit}
        className="p-3 my-3 md:p-5 md:my-5 w-full flex justify-center"
      >
        <input
          required
          autoFocus
          type="text"
          placeholder="Enter your task"
          value={taskDescription}
          onChange={(e) => hanldeChange(e)}
          className="border-2 border-inherit outline-sky-500 rounded-md px-1 py-1 md:px-2 md:py-2 mr-3 md:mr-5 w-2/4"
        ></input>
        <button
          onClick={() => handleAddTaskBtn()}
          className="bg-green-300 px-2 py-1 md:px-4 md:py-2 font-bold rounded-md text-sm md:text-lg hover:text-white"
        >
          ADD TASK
        </button>
      </form>

      <div className="p-3 my-3 md:p-5 md:my-5">
        {task.length <= 0 && (
          <p className="text-lg md:text-xl text-center">
            Add your task to Task List
          </p>
        )}
        {task.length > 0 && (
          <h3 className="text-lg md:text-2xl font-semibold text-center">
            TASK LIST
          </h3>
        )}
      </div>

      {task.map((item, index) => (
        <div className="flex justify-start w-full flex-wrap my-1 md:my-3 p-2">
          <div className="w-full mb-2 md:mb-4 bg-slate-100">
            <h4 className="font-bold text-lg md:text-xl capitalize">
              Task {index + 1} : {item?.taskDescription}
            </h4>
          </div>
          {item.id === editTaskId && (
            <div className="w-full my-2">
              <input
                autoFocus
                type="text"
                value={updateTaskDescription}
                onChange={(e) => handleUpdateTaskDescription(e)}
                className="border-inherit border-2 rounded-md outline-blue-500  px-1 md:px-2 md:py-1 mr-2 md:mr-5 w-2/4"
              ></input>
              <button
                onClick={() => handleUpdate(item)}
                className="bg-green-100 hover:text-green-900 px-2 py-1 md:px-4 md:py-1 font-bold rounded-md text-sm md:text-lg  mr-2 md:mr-5"
              >
                Update
              </button>
              <button
                onClick={() => handleEditCancel()}
                className="bg-red-100 hover:text-red-900 px-2 py-1 md:px-4 md:py-1 font-bold rounded-md text-sm md:text-lg"
              >
                Cancel
              </button>
            </div>
          )}

          {editTaskId !== item.id && (
            <button
              onClick={() => handleEdit(item)}
              className="bg-yellow-300 px-6 py-1 rounded-md mr-5 hover:text-white"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => handleDelete(item.id)}
            className="bg-red-600 px-6 py-1 rounded-md hover:text-white"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
