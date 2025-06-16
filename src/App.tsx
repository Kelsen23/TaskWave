import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import TaskManager from "./components/TaskManager";
import Authentication from "./components/Authentication";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <TaskManager />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </div>
  );
};

export default App;
