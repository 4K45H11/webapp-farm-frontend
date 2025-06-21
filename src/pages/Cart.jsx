import { toast, ToastContainer } from 'react-toastify';
import useProductContext from "../contexts/ProductContext";
import { useNavigate } from 'react-router-dom';
import useUserContext from '../contexts/UserContext';

const Cart = () => {
  const {
    agriProducts, quantity,
    handleAddQuantity, handleMinusQuantity,
    removeFromCartButton, moveToWishlist, loading, error,setAgriProducts
  } = useProductContext();

  const { orderedItems } = useUserContext();
  const navigate = useNavigate();

  if (loading) return <div className="container py-3"><h4>Loading...</h4></div>;
  if (error) return <div className="container py-3"><h4>An error occurred!</h4></div>;

  const cartItems = agriProducts.filter(p => p.inCart);
  const totalCartItems = cartItems.length;

  const cartItemsIdWithCount = [3, 11, 21, 22, 23, 24];

  const visibleItems = cartItems.map(i => ({
    ...i,
    numbers: quantity[i.itemId] || 1
  }));

  const totalBillAmount = visibleItems.reduce((acc, curr) =>
    acc + curr.pricePerKg * curr.numbers, 0
  );

  const discountedBill = visibleItems.reduce((acc, curr) =>
    acc + (curr.pricePerKg * curr.numbers * (100 - curr.discountPercentage) / 100), 0
  );

  const totalSavings = Math.ceil(totalBillAmount - discountedBill);
  const taxPercentage = 5;
  const deliveryCharge = discountedBill >= 500 ? 0 : 50;

  const billItems = visibleItems.map(b => (
    <tr key={b.itemId}>
      <td className="border px-2 py-2">{b.title}</td>
      <td className="border px-2 py-2">₹{Math.floor(b.pricePerKg * (100 - b.discountPercentage) / 100)}</td>
      <td className="border px-2 py-2">
        {b.numbers}
        {(cartItemsIdWithCount.includes(b.itemId)) ? (
          b.numbers > 1 ? ' Pcs' : ' Pc'
        ) : (
          b.numbers > 1 ? ' Kgs' : ' Kg'
        )}
      </td>
      <td className="border px-2 py-2">₹{Math.floor(b.pricePerKg * (100 - b.discountPercentage) / 100) * b.numbers}</td>
    </tr>
  ));

  const itemList = visibleItems.map(i => (
    <div className="p-1" key={i.itemId}>
      <div className="card">
        <div className="row g-0 flex-column flex-sm-row">
          <div className="col-12 col-sm-4 text-center">
            <img src={i.imgUrl} className="img-fluid p-2 mt-3" alt="cartImg" />
          </div>
          <div className="col-12 col-sm-8">
            <div className="card-body">
              <h5 className="card-title">{i.title}</h5>
              <p className="card-text">
                <span style={{ textDecoration: 'line-through', color: 'gray' }}>₹{i.pricePerKg}</span>
                - ₹{Math.floor(i.pricePerKg * ((100 - i.discountPercentage) / 100))}
                <span> ({i.discountPercentage}% off)</span>
              </p>

              <div className="mt-1 d-flex align-items-center">
                <button onClick={() => handleAddQuantity(i.itemId)} className="blue-btn">+</button>
                <span className="mx-2">{quantity[i.itemId]}</span>
                <button onClick={() => handleMinusQuantity(i.itemId)} className="blue-btn px-2">-</button>
              </div>

              <div className="mt-2">
                <button onClick={() => {
                  toast.success(`${i.title} moved to wishlist.`);
                  moveToWishlist(i.itemId);
                }} className="custom-btn green-btn mt-2 w-100">Move to Wishlist</button>

                <button onClick={() => {
                  toast.info(`${i.title} removed from cart`);
                  removeFromCartButton(i.itemId);
                }} className="custom-btn blue-btn mt-2 w-100">Remove from Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const handleCheckout = () => {
    const orderId = Math.floor(Math.random() * 1000);
    orderedItems.push({
      orderId,
      items: visibleItems,
      payment: Math.floor((discountedBill * (1 + taxPercentage / 100)) + deliveryCharge),
      userDetails: '',
      address: ''
    });
    setAgriProducts([])
    return navigate(`/cart/address/${orderId}`);
  };

  return (
    <div className="container-fluid px-3">
      {totalCartItems === 0 ? (
        <h2 className='text-center mt-5'>Cart is empty!</h2>
      ) : (
        <div className="py-3">
          <div className="row flex-column flex-md-row">
            <div className="col-12 col-md-5 mb-3">
              <div className="product-detail-box py-3">
                {itemList}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="product-detail-box px-3 py-3">
                <h4 className="fs-5">Cart Summary</h4>

                <div className="table-responsive">
                  <table className="table table-bordered table-sm">
                    <thead className="bg-green-100">
                      <tr>
                        <th className="border px-2 py-2">Item</th>
                        <th className="border px-2 py-2">Price</th>
                        <th className="border px-2 py-2">Qty</th>
                        <th className="border px-2 py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>{billItems}</tbody>
                  </table>
                </div>

                <hr />
                <div className="d-flex justify-content-between"><h6>Total Bill</h6><h6>₹ {totalBillAmount}</h6></div>
                <div className="d-flex justify-content-between"><h6>Discount</h6><h6>- ₹ {totalSavings}</h6></div>
                <div className="d-flex justify-content-between"><h6>Tax</h6><h6>+ {taxPercentage}%</h6></div>
                <div className="d-flex justify-content-between">
                  <h6>Delivery Charge:</h6>
                  {deliveryCharge === 0 ? <h6>Free delivery</h6> : <h6>+ ₹ {deliveryCharge}</h6>}
                </div>
                <p className="text-muted small">Note: Order over ₹500 to avail free delivery!</p>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Payable Amount:</h6>
                  <h6>₹ {Math.floor((discountedBill * (1 + taxPercentage / 100)) + deliveryCharge)}</h6>
                </div>
                <p className='text-muted small'>please don't refresh the page before placeing order!</p>
                <button onClick={handleCheckout} className="btn btn-success w-100 mt-3">Check out</button>

              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
