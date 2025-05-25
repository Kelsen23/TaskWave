import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import TaskManager from "./components/TaskManager";
import Authentication from "./components/Authentication";

const App = () => {
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
