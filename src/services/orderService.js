export const getAllOrders = () => {
  return fetch('http://localhost:8088/orders').then((res) => res.json())
}

export const getOrderById = (id) => {
  return fetch(`http://localhost:8088/orders/${id}`).then((res) => res.json())
}
