import { useEffect, useState } from "react";
import { EmployeeViews } from "./EmployeeViews";
import { AdminViews } from "./AdminViews";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const pizzaUser = localStorage.getItem("pizza_user");
    const pizzaUserObj = JSON.parse(pizzaUser);

    setCurrentUser(pizzaUserObj);
  }, []);

  return currentUser.isAdmin ? (
    <AdminViews currentUser={currentUser} />
  ) : (
    <EmployeeViews currentUser={currentUser} />
  );
};
