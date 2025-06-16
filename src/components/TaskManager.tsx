import Nav from "./Nav";
import Filters from "./Filters";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { CirclePlus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTaskStore, type TaskProps } from "@/store/useTaskStore";
import { useEffect } from "react";
import Task from "./Task";
import { motion } from "motion/react";
import EditingModal from "./EditingModal";

const TaskManager = () => {
  const { tasks, setTasks, isEditing, stopEditing } = useTaskStore();

  const getTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks");

      if (!res.ok) throw new Error("Error fetching tasks");

      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const addTasks = async (newTask: TaskProps) => {
    try {
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error("Error adding new task");

      return res.json();
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error deleting task");
      }

      return res.json();
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const updateTask = async (updatedTask: TaskProps) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) throw new Error("Failed to update task");
      return res.json();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: addTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskMutation = useMutation({
  mutationFn: updateTask,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    stopEditing(); 
  },
});

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      setTasks(data);
    }
  }, [data]);

  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center">
        <Filters />
        <div className="flex flex-row gap-4">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="cursor-pointer bg-white text-black flex items-center space-x-2"
          >
            <CirclePlus size={16} />
            <span>Create New Task</span>
          </HoverBorderGradient>

          <button className="flex flex-row gap-2 items-center bg-red-500 px-4 py-2 rounded-full text-white shadow-sm cursor-pointer hover:bg-white hover:text-red-500 transition-all ease-in duration-150">
            <Trash2 size={20} />
            <span>Delete All Tasks</span>
          </button>
        </div>
      </div>

      <div className="ml-20 mt-20">
        <p className="font-semibold text-3xl">My Tasks</p>

        {tasks && tasks.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-gray-100 rounded-md my-10 mr-20 flex flex-col gap-2"
          >
            {tasks.map((task) => (
              <Task
                key={task.id}
                deleteTaskMutation={deleteTaskMutation}
                task={task}
              />
            ))}
          </motion.div>
        ) : (
          <p className="font-semibold text-lg mt-20 ml-10 text-gray-400">
            No tasks yet
          </p>
        )}
      </div>

      {isEditing && <EditingModal updateTaskMutation={updateTaskMutation} />}
    </div>
  );
};

export default TaskManager;
