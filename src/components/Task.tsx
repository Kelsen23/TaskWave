import { useTaskStore, type TaskProps } from "@/store/useTaskStore";
import { motion } from "motion/react";
import { Calendar, Pencil, Trash } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";

const Task = ({
  task,
  deleteTaskMutation,
  index,
}: {
  task: TaskProps;
  deleteTaskMutation: UseMutationResult<any, Error, string>;
  index: number;
}) => {
  const { setIsEditing } = useTaskStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{
        ease: "easeInOut",
        duration: 300,
        type: "spring",
        stiffness: 400,
        delay: index * 0.1,
      }}
      className="w-full bg-white backdrop-blur-md rounded-md py-4 px-3 flex  justify-between items-center"
    >
      <div className="flex flex-row gap-5">
        <div className="font-bold">{task.title}</div>

        <div>ID: {task.id}</div>

        <div className="flex flex-row gap-2 items-center">
          Due Date: <span className="text-gray-500">{task.dueDate}</span>
          <Calendar size={18} />
        </div>

        <div>
          <span>Priority:</span>{" "}
          <span
            className={`${
              task.priority === "low"
                ? "text-green-400"
                : task.priority === "medium"
                ? "text-yellow-400"
                : "text-red-500"
            }`}
          >
            {task.priority}
          </span>
        </div>

        <div>
          Status:{" "}
          <span
            className={`font-semibold ${
              task.status === "pending" ? "text-yellow-400" : "text-green-400"
            }`}
          >
            {task.status}
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <button
          onClick={() => setIsEditing(task)}
          type="button"
          className="bg-white hover:bg-gray-100 cursor-pointer p-2 rounded-md"
        >
          <Pencil size={20} />
        </button>
        <button
          onClick={() => deleteTaskMutation.mutate(task.id)}
          className="bg-white text-red-500 hover:bg-gray-100 cursor-pointer p-2 rounded-md"
        >
          <Trash size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default Task;
