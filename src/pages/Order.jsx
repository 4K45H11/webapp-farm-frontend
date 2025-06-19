import { useState } from "react";
import useUserContext from "../contexts/UserContext";
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom";


const Order = () => {
    const { finalCheckout } = useUserContext();
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    if (!finalCheckout || finalCheckout.length === 0) {
        return <p className="text-center mt-5 text-muted">No order details found.</p>;
    }

    //console.log(finalCheckout)

    const order = finalCheckout[finalCheckout.length - 1];
    const itemList = order.items.map(i => (
        <li key={i.itemId} className="list-group-item">{i.title} ---- {i.numbers}</li>
    ));

    const handleOrder = async () => {

        const newOrder = {
            address: `ADDRESS: ${order.address.address}, PIN: ${order.address.pin}`,
            items: order.items.map(o => ({
                title: o.title,
                quantity: o.numbers,
                price: o.pricePerKg
            })),
            orderId: order.orderId,
            orderDate: new Date().toLocaleDateString(),
            user: order.currUser
        }

        const response = await fetch(`https://farm-webapp-backend.vercel.app/order/new`, {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            toast.error('An error occurred, please try again.')
        }

        const data = await response.json()

        if (data) {
            toast.success('Your order placed successfully!')
            setShow(true)
        }
    }

    const backHome = ()=>{
       return  navigate('/')
    }

    return (
        <div className="container py-4">
            <ToastContainer />
            {(!show) ? (<div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Review Your Order</h2>

                            <p><strong>Name:</strong> {order.userDetails}</p>
                            <p><strong>Phone No: </strong>{order.
                                phone}
                            </p>
                            <p><strong>Email: </strong>{order.email}</p>
                            <p>
                                <strong>Address:</strong> {order.address.address}, {order.address.pin}
                            </p>


                            <h5 className="mt-4">Ordered Items</h5>
                            <ul className="list-group mb-3">
                                {itemList}
                            </ul>
                            <hr />

                            <h5>Total Payment: ₹ {order.payment
                            }
                            </h5>

                            <div className="text-end">
                                <button onClick={() => handleOrder()} className="btn btn-success mt-3">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>) :
                (
                    <div className="text-light">
                        <h2 className="bg-success p-2">Your order is placed successfully!</h2>
                        <button onClick={()=>backHome()} className="btn btn-outline-success mt-3">continue shopping</button>
                    </div>
                )}
        </div>
    );
};

export default Order;
