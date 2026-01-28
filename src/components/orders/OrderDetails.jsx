// Order Details
// get orderId from useParams
// use orderId to fetch details from service
// display details on page
import { useParams } from 'react-router-dom'

export const OrderDetails = () => {
  const { orderId } = useParams()
  return <>Order Details {orderId}</>
}
