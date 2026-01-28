export const getPizzasByOrderId = (orderId) => {
  return fetch(
    `http://localhost:8088/pizzas?orderId=${orderId}&_embed=pizzaToppings&_expand=size&_expand=cheese&_expand=sauce`
  ).then((res) => res.json())
}
