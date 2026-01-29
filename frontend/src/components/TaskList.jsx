import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

console.log("TaskList running");

const TaskList = () => {
  let filter = "all";

  const filteredTasks = [
    {
      _id: 1,
      title: "hoc js",
      status: "active",
      completedAt: null,
      createdAt: new Date(),
    },
    {
      _id: 2,
      title: "hoc react",
      status: "completed",
      completedAt: new Date(),
      createdAt: new Date(),
    },
  ];

  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <TaskCard key={task._id ?? index} task={task} index={index} />
      ))}
    </div>
  );
};

export default TaskList;
