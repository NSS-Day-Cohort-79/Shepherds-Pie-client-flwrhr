import { Outlet, Route, Routes } from "react-router-dom";
import { AdminNav } from "../components/Nav/AdminNav";

export const AdminViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <AdminNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<>welcome Admin</>} />
      </Route>
    </Routes>
  );
};
