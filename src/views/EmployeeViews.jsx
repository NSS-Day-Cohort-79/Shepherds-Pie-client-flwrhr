import { Outlet, Route, Routes } from 'react-router-dom'
import { EmployeeNav } from '../components/Nav/EmployeeNav'
import { OrderList } from '../components/orders/OrderList'
import { OrderDetails } from '../components/orders/OrderDetails'

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
        <Route path="orders" element={<Outlet />}>
          <Route index element={<OrderList />} />
          <Route path=":orderId" element={<OrderDetails />} />
        </Route>
      </Route>
    </Routes>
  )
}
