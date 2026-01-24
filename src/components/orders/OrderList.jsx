import { useEffect, useState } from 'react'
import { getAllOrders } from '../../services/orderService'
import './Orders.css'

export const OrderList = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getAllOrders().then(setOrders)
  }, [])
  return (
    <div className="order-list">
      {orders.map((order) => {
        return (
          <div className="order-item" key={order.id}>
            <h2 className="order-title">Order #{order.id}</h2>
            <p className="order-info">Customer Name: {order.customerName}</p>
            <p className="order-info">
              Status: {order.delivererId ? 'Out for Delivery' : 'in Progress'}
            </p>
          </div>
        )
      })}
    </div>
  )
}
