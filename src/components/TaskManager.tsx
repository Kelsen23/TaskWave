import { Route, Routes } from "react-router-dom";
import Authentication from "./Authentication";
import PrivateRoute from "./PrivateRoute";

const TaskManager = () => {
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

export default TaskManager;
