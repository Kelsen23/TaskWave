import { create } from "zustand";

interface TaskProps {
  id: string;
  title: string;
  status: string;
  dueDate: string;
  priority: string;
}

interface TaskStoreProps {
  allTasks: TaskProps[];
  tasks: TaskProps[];
  searchTerm: string;
  status: string | null;
  priority: string | null;
  isEditing: null | string;

  setSearchTerm: (newSearchTerm: string) => void;
  setStatus: (newStatus: string | null) => void;
  setPriority: (newPriority: string | null) => void;
  setTasks: (newTasks: TaskProps[]) => void;
  filterTasks: () => void;
  setIsEditing: (id: string) => void;
  stopEditing: () => void;
  updateTask: (updatedTask: TaskProps) => void;
}

export const useTaskStore = create<TaskStoreProps>((set, get) => ({
  allTasks: [],
  tasks: [],
  searchTerm: "",
  status: null,
  priority: null,
  isEditing: null,

  setSearchTerm: (newSearchTerm) => set({ searchTerm: newSearchTerm }),
  setStatus: (newStatus) => set({ status: newStatus }),
  setPriority: (newPriority) => set({ priority: newPriority }),
  setTasks: (newTasks) => set({ allTasks: newTasks, tasks: newTasks }),
  filterTasks: () => {
    const { searchTerm, status, priority, allTasks } = get();
    let filtered = allTasks;

    if (searchTerm !== "") {
      filtered = filtered.filter(
        (task) =>
          task.title.includes(searchTerm.toLowerCase()) ||
          task.dueDate.includes(searchTerm)
      );
    }

    if (status !== null) {
      filtered = filtered.filter((task) => task.status === status);
    }

    if (priority !== null) {
      filtered = filtered.filter((task) => task.priority === priority);
    }

    set({
      tasks: filtered,
    });
  },
  setIsEditing: (id) => set({ isEditing: id }),
  stopEditing: () => set({ isEditing: null }),
  updateTask: (updatedTask) => {
    const { allTasks, isEditing } = get();
    const updatedTasks = allTasks.map((task) =>
      task.id === isEditing ? updatedTask : task
    );

    set({ allTasks: updatedTasks, tasks: updatedTasks, isEditing: null });
  },
}));
