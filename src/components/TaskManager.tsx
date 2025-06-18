import Nav from "./Nav";
import Filters from "./Filters";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { CirclePlus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTaskStore, type TaskProps } from "@/store/useTaskStore";
import { useEffect, useState } from "react";
import Task from "./Task";
import EditingModal from "./EditingModal";
import CreatingModal from "./CreatingModal";
import Menu from "./Menu";
import { AnimatePresence } from "framer-motion";

const TaskManager = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    tasks,
    isEditing,
    isCreatingTask,
    startCreatingTask,
    setTasks,
    stopEditing,
  } = useTaskStore();

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

  const deleteAllTasks = async () => {
    const res = await fetch("http://localhost:3000/tasks");
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const tasks = await res.json();

    await Promise.all(
      tasks.map((task: TaskProps) =>
        fetch(`http://localhost:3000/tasks/${task.id}`, {
          method: "DELETE",
        })
      )
    );
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

  const deleteAllTasksMutation = useMutation({
    mutationFn: deleteAllTasks,
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
    <div className="relative">
      <AnimatePresence mode="wait">
        {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
      </AnimatePresence>

      <Nav setIsMenuOpen={setIsMenuOpen} />

      <div className="flex flex-col items-center">
        <Filters />
        <div className="flex flex-row gap-4">
          <HoverBorderGradient
            onClick={startCreatingTask}
            containerClassName="rounded-full"
            as="button"
            className="cursor-pointer bg-white text-black flex items-center space-x-2"
          >
            <CirclePlus size={16} />
            <span>Create New Task</span>
          </HoverBorderGradient>

          <button
            onClick={() => deleteAllTasksMutation.mutate()}
            className="flex flex-row gap-2 items-center bg-red-500 px-4 py-2 rounded-full text-white shadow-sm cursor-pointer hover:bg-white hover:text-red-500 transition-all ease-in duration-150"
          >
            <Trash2 size={20} />
            <span>Delete All Tasks</span>
          </button>
        </div>
      </div>
      <div className="ml-20 mt-20">
        <p className="font-semibold text-3xl">My Tasks</p>

        {tasks && tasks.length > 0 ? (
          <div className="w-full p-3 rounded-md my-10 mr-20 justify-items-center grid grid-cols-1 sm:grid-cols-1 justify-center md:grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence>
              {tasks.map((task, index) => (
                <Task
                  key={task.id}
                  deleteTaskMutation={deleteTaskMutation}
                  task={task}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="font-semibold text-lg mt-20 ml-10 text-gray-400">
            No tasks yet
          </p>
        )}
      </div>
      <AnimatePresence>
        {isEditing && <EditingModal updateTaskMutation={updateTaskMutation} />}
      </AnimatePresence>

      <AnimatePresence>
        {isCreatingTask && <CreatingModal addTaskMutation={addTaskMutation} />}
      </AnimatePresence>
    </div>
  );
};

export default TaskManager;
