import { useTaskStore, type TaskProps } from "@/store/useTaskStore";
import type { UseMutationResult } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CreatingModal = ({ addTaskMutation }: { addTaskMutation: UseMutationResult<any, Error, TaskProps> }) => {
  const { isCreatingTask, stopCreatingTask } = useTaskStore();

  const [isAdding, setIsAdding] = useState(isCreatingTask);

  useEffect(() => {
    setIsAdding(isCreatingTask);
  }, [isCreatingTask]);

  return (
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -200 }}
          transition={{ ease: "easeInOut", duration: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-xl font-semibold mb-4">Create Task</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isAdding) addTaskMutation.mutate(isAdding);
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Task Title"
              value={isAdding?.title}
              onChange={(e) =>
                setIsAdding((prev) =>
                  prev ? { ...prev, title: e.target.value } : prev
                )
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <select
              value={isAdding?.status}
              onChange={(e) =>
                setIsAdding((prev) =>
                  prev ? { ...prev, status: e.target.value } : prev
                )
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={isAdding?.priority}
              onChange={(e) =>
                setIsAdding((prev) =>
                  prev ? { ...prev, priority: e.target.value } : prev
                )
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="date"
              value={
                isAdding?.dueDate
                  ? new Date(isAdding.dueDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setIsAdding((prev) =>
                  prev ? { ...prev, dueDate: e.target.value } : prev
                )
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={stopCreatingTask}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              >
                Create
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
  );
};

export default CreatingModal;
