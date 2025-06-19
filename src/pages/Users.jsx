import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
    const { data, loading, error } = useFetch(`https://farm-webapp-backend.vercel.app/users/all`);
    const [history, setHistory] = useState([]);
    const [show, setShow] = useState(false);

    if (loading) return <div className="container py-3"><h4>Loading...</h4></div>;
    if (error) return <div className="container py-3"><h4>An error occurred!</h4></div>;

    const handleHistory = async (userId) => {
        const response = await fetch(`https://farm-webapp-backend.vercel.app/order/${userId}`);
        if (!response.ok) {
            toast.error('Something went wrong!');
            return;
        }

        const data = await response.json();
        if (data) {
            setShow(true);
            setHistory(data);
        }
    };

    return (
        <div className="container py-3">
            <div className="row">
                <div className="col-12 col-md-6 mb-4">
                    <h4>Users</h4>
                    {data.map((u) => (
                        <div key={u._id} className="mb-3 p-2 border rounded d-flex justify-content-between align-items-center flex-wrap">
                            <span className="fw-bold">{u.name}</span>
                            <button
                                onClick={() => handleHistory(u._id)}
                                className="btn btn-sm btn-info mt-2 mt-md-0"
                            >
                                Order History
                            </button>
                        </div>
                    ))}
                </div>

                {show && (
                    <div className="col-12 col-md-6">
                        <h4>Order History</h4>
                        {history.orders?.length !== 0 ? (
                            history.orders.map((order) => (
                                <div key={order._id} className="mb-3 p-3 border rounded">
                                    <h6 className="fw-semibold">Order ID: {order.orderId}</h6>
                                    <ul className="mb-1">
                                        <li><strong>Address:</strong> {order.address}</li>
                                        <li>
                                            <strong>Items:</strong>
                                            <pre className="text-break small bg-light p-2 rounded">{JSON.stringify(order.items, null, 2)}</pre>
                                        </li>
                                        <li><strong>Date:</strong> {order.orderDate}</li>
                                        <li>
                                            <strong>User:</strong>
                                            <pre className="text-break small bg-light p-2 rounded">{JSON.stringify(order.user, null, 2)}</pre>
                                        </li>
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>No orders from this user.</p>
                        )}
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Users;
