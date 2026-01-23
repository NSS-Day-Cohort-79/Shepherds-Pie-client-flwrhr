import { Outlet, Route, Routes } from "react-router-dom";
import { EmployeeNav } from "../components/Nav/EmployeeNav";

export const EmployeeViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <EmployeeNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<>welcome Employee</>} />
      </Route>
    </Routes>
  );
};
