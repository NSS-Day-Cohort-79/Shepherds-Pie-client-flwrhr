import { useEffect, useState } from 'react'
import { getAllOrders } from '../../services/orderService'
import './Orders.css'

export const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [filterDate, setFilterDate] = useState(new Date())
  const [filteredOrders, setFilteredOrders] = useState([])

  useEffect(() => {
    getAllOrders().then(setOrders)
  }, [])

  useEffect(() => {
    setFilteredOrders(
      orders.filter(
        (order) => order.date === filterDate.toLocaleDateString('en-us')
      )
    )
  }, [orders, filterDate])

  const handleFilter = (event) => {
    let copy = structuredClone(filterDate)
    if (event.target.id === 'year-input') {
      copy.setFullYear(event.target.value)
    }
    if (event.target.id === 'month-input') {
      copy.setMonth(event.target.value - 1)
    }
    if (event.target.id === 'day-input') {
      copy.setDate(event.target.value)
    }
    setFilterDate(copy)
  }

  return (
    <>
      <div className="filter-bar">
        <label className="filter-info">
          Year :
          <input
            type="number"
            className="filter-input"
            id="year-input"
            value={filterDate.getFullYear()}
            onChange={handleFilter}
          />
        </label>
        <label className="filter-info">
          Month :
          <input
            type="number"
            className="filter-input"
            id="month-input"
            value={filterDate.getMonth() + 1}
            onChange={handleFilter}
          />
        </label>
        <label className="filter-info">
          Day :
          <input
            type="number"
            className="filter-input"
            id="day-input"
            value={filterDate.getDate()}
            onChange={handleFilter}
          />
        </label>
      </div>
      <div className="order-list">
        {filteredOrders.map((order) => {
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
    </>
  )
}
