import { useEffect, useState } from 'react'
import { getAllOrders } from '../../services/orderService'
import './Orders.css'
import { useNavigate } from 'react-router-dom'

export const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [filterDate, setFilterDate] = useState(new Date())
  const [filteredOrders, setFilteredOrders] = useState([])
  const [showPages, setShowPages] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageOrders, setPageOrders] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getAllOrders().then(setOrders)
  }, [])

  useEffect(() => {
    const filteredArray = orders.filter((order) => {
      const orderDate = new Date(order.date)
      return (
        orderDate.toLocaleDateString('en-us') ===
        filterDate.toLocaleDateString('en-us')
      )
    })
    const sortedArray = filteredArray.sort((order1, order2) => {
      return new Date(order2.date).getTime() - new Date(order1.date).getTime()
    })
    setFilteredOrders(sortedArray)
  }, [orders, filterDate])

  useEffect(() => {
    if (filteredOrders.length > 20) {
      setShowPages(true)
    } else {
      setShowPages(false)
    }
    setCurrentPage(1)
  }, [filteredOrders])

  useEffect(() => {
    const pageStart = (currentPage - 1) * 20
    setPageOrders(filteredOrders.slice(pageStart, pageStart + 20))
  }, [currentPage, filteredOrders])

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

  const handlePage = (event) => {
    if (event.target.id === 'prev-page') {
      setCurrentPage((oldPage) => oldPage - 1)
    }
    if (event.target.id === 'next-page') {
      setCurrentPage((oldPage) => oldPage + 1)
    }
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
        {pageOrders.map((order) => {
          return (
            <div
              className="order-item"
              key={order.id}
              onClick={() => navigate(`${order.id}`)}
            >
              <h2 className="order-title">Order #{order.id}</h2>
              <p className="order-info">Customer Name: {order.customerName}</p>
              <p className="order-info">
                Status: {order.delivererId ? 'Out for Delivery' : 'in Progress'}
              </p>
            </div>
          )
        })}
      </div>
      {showPages && (
        <footer className="page-bar">
          {currentPage > 1 && (
            <button className="page-btn" id="prev-page" onClick={handlePage}>
              Prev
            </button>
          )}
          Page: {currentPage}
          {currentPage * 20 < filteredOrders.length && (
            <button className="page-btn" id="next-page" onClick={handlePage}>
              Next
            </button>
          )}
        </footer>
      )}
    </>
  )
}
