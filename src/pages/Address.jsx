import { useState } from "react";
import useUserContext from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import useFetch from '../hooks/useFetch'
import { useEffect } from "react";

const Address = () => {
    const { id } = useParams();
    const { users, addresses, orderedItems, finalCheckout, setAddresses } = useUserContext();
    const [show, setShow] = useState(false);
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('');
    const [pin, setPin] = useState('');
    const [currUser, setCurrUser] = useState('')
    const navigate = useNavigate();
    //server handling of address.
    const [existingAddress, setExistingAdd] = useState([]);
    const [loading, setLoading] = useState(false);

    //fetching all the addresses for future filtering.
    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://farm-webapp-backend.vercel.app/address/all');
            const data = await res.json();
            setExistingAdd(data);
        } catch (err) {
            console.error("Failed to fetch addresses", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleUser = async (e) => {
        e.preventDefault();
        try {
            //server

            const formData = { name: user, email, phone }
            //console.log(formData)

            const response = await fetch(`https://farm-webapp-backend.vercel.app/users/new`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw "Failed to add user";
            }

            const userData = await response.json()
            if (userData) {
                if (userData.message === 'User already exists.') {
                    toast.info(userData.message)
                }
                else {
                    toast.success(userData.message)
                }

                setCurrUser(userData.user._id)
            }
            //console.log(currentUser)

            //maual
            const existingUser = users.find(u => u.name === user);
            if (!existingUser) {
                users.push({ id: users.length + 1, name: user, email });
            }
            setShow(true);
        } catch (error) {
            toast.error('Some error occurred!')
        }
    };

    // const handleAddress = async (e) => {
    //     e.preventDefault();
    //     try {
    //         //server
    //         const formData = { address, pin, owner: currUser }
    //         //console.log(formData)

    //         const response = await fetch(`https://farm-webapp-backend.vercel.app/address/new`, {
    //             method: "POST",
    //             body: JSON.stringify(formData),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         if (!response.ok) {
    //             throw new Error('Something went wrong')
    //         }

    //         const addressData = await response.json()
    //         if (addressData) {
    //             console.log(addressData)
    //             setExistingAdd(prev => [...prev, addressData]);

    //             // clearing input fields
    //             setAddress('');
    //             setPin('');

    //             toast.success('new address added')
    //         }

    //         console.log(existingAddress)

    //         //manual
    //         const newAddress = {
    //             id: addresses.length + 1,
    //             address,
    //             pin,
    //             userName: user
    //         };
    //         if (newAddress.address !== '' && newAddress.pin !== '') {
    //             addresses.push(newAddress);
    //             setAddress('');
    //             setPin('');
    //         }
    //     } catch (error) {
    //         toast.error('somthing went wrong.')
    //     }

    // };

    const handleAddress = async (e) => {
    e.preventDefault();
    try {
        const formData = { address, pin, owner: currUser };

        const response = await fetch('https://farm-webapp-backend.vercel.app/address/new', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to add address');

        const addressData = await response.json();
        toast.success('New address added');

        // fetching addresses after adding the address again
        await fetchAddresses();

        // reset inputs
        setAddress('');
        setPin('');
    } catch (err) {
        toast.error('Something went wrong');
        console.error(err);
    }
};


    const handleSelect = (add) => {
        const temp = orderedItems.map(o =>
            o.orderId === Number(id)
                ? { ...o, address: add, email, phone, userDetails: user, currUser }
                : o
        );
        const finalDetails = temp.find(i => i.orderId === Number(id));
        finalCheckout.push(finalDetails);
        return navigate(`/cart/order`);
    };

    const handleDelete = async (add) => {
        try {
            //server

            const response = await fetch(`https://farm-webapp-backend.vercel.app/address/${add}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                throw new Error('Failed to delete address.')
            }

            const deletedData = await response.json();

            if (deletedData) {
                toast.error('address deleted.')
            }

            const updated = existingAddress.filter(a => a._id !== add);
            setExistingAdd(updated);

            //manual
            // const index = addresses.indexOf(add)
            // console.log(index)
            // if (index !== -1) {
            //     const updated = addresses.filter(a => a !== add)
            //     setAddresses(updated)
            // }
        } catch (error) {
            toast.error('something went wrong')
        }

    }



    const existedAddressList = existingAddress.filter(a => a.owner?.name === user);
    return (
        <div className="container py-4">
            <ToastContainer />
            <div className="row g-4">
                <div className="col-md-6">
                    <form onSubmit={handleUser} className="p-4 border rounded shadow-sm bg-light">
                        <h4 className="mb-3">User Information</h4>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                required
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                type="text"
                                id="name"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="number"
                                id="phone"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Next</button>
                    </form>
                </div>

                {show && (
                    <div className="col-md-6">
                        <form onSubmit={handleAddress} className="p-4 border rounded shadow-sm bg-light mb-4">
                            <h4 className="mb-3">Add New Address</h4>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <textarea
                                    rows={3}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control"
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Pin</label>
                                <input
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    type="number"
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Add Address</button>
                        </form>

                        <h5 className="mb-3">Existing Addresses</h5>
                        <div className="row g-3">
                            {existedAddressList.length > 0 ? (
                                existedAddressList.map(a => (
                                    <div key={a._id} className="col-md-6">
                                        <div className="p-3 border rounded bg-white shadow-sm h-100">
                                            <ul className="list-unstyled small mb-3">
                                                <li><strong>Address:</strong> {a.address}</li>
                                                <li><strong>Pin:</strong> {a.pin}</li>
                                            </ul>
                                            <div className="d-flex gap-2">
                                                <button onClick={() => handleSelect(a)} className="btn btn-sm btn-primary">Select</button>
                                                <button
                                                    onClick={() => handleDelete(a._id)}
                                                    className="btn btn-sm btn-danger">Delete</button>

                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No existing address, please add one.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    //here data is the fetched addresses from DB.
};

export default Address;
