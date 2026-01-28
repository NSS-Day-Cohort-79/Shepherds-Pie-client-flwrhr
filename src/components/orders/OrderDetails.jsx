// Order Details
// get orderId from useParams
// use orderId to fetch details from service
// display details on page
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrderById } from '../../services/orderService'
import './Orders.css'
import { getPizzasByOrderId } from '../../services/pizzaService'
import { getAllToppings } from '../../services/toppingService'

export const OrderDetails = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState({})
  const [pizzas, setPizzas] = useState([])
  const [allToppings, setAllToppings] = useState([])

  useEffect(() => {
    getAllToppings().then(setAllToppings)
  }, [])

  useEffect(() => {
    getOrderById(orderId).then(setOrder)
    getPizzasByOrderId(orderId).then(setPizzas)
  }, [orderId])

  const calculatePizzaCost = (pizza) => {
    let pizzaCost = 0

    pizzaCost += pizza.size?.baseCost * 100

    for (const pizzaTopping of pizza.pizzaToppings) {
      const topping = allToppings.find(
        (topping) => topping.id === pizzaTopping.toppingId
      )
      pizzaCost += topping?.cost * 100
    }

    return pizzaCost / 100
  }

  const calculateTotalCost = (pizzas) => {
    let totalCost = 0
    for (const pizza of pizzas) {
      totalCost += calculatePizzaCost(pizza) * 100
    }
    return totalCost / 100
  }

  return (
    <div className="order-details">
      <div className="details-card">
        <h2 className="order-title">Order #{order.id}</h2>
        <p className="order-info">Table Number: {order.tableNumber}</p>
        <p className="order-info">
          Date: {new Date(order.date).toLocaleDateString()}
        </p>
        <p className="order-info">
          Time: {new Date(order.date).toLocaleTimeString()}
        </p>
        <p className="order-info">Customer: {order.customerName}</p>
        <p className="order-info">Phone: {order.phoneNumber}</p>
        <p className="order-info">Address: {order.address}</p>
        <p className="order-info">Pizza Count: {pizzas.length}</p>
        <p className="order-info">Total Cost: ${calculateTotalCost(pizzas)}</p>
      </div>
      <div className="pizza-list">
        {pizzas.map((pizza) => {
          return (
            <div className="pizza-item" key={pizza.id}>
              <div className="pizza-details">
                <h3 className="pizza-title">Pizza #{pizza.id}</h3>
                <p className="pizza-info">Size: {pizza.size.name}</p>
                <p className="pizza-info">Sauce: {pizza.sauce.name}</p>
                <p className="pizza-info">Cheese: {pizza.cheese.name}</p>
                <p className="pizza-info">Cost: ${calculatePizzaCost(pizza)}</p>
              </div>
              <div className="topping-list">
                <h4 className="topping-title">Toppings:</h4>
                {pizza.pizzaToppings.map((pizzaTopping) => {
                  const foundTopping = allToppings.find(
                    (topping) => topping.id === pizzaTopping.toppingId
                  )
                  return <p className="topping-item">{foundTopping.name}</p>
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
