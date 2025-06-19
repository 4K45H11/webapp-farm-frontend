import { ToastContainer, toast } from "react-toastify";
import useProductContext from "../contexts/ProductContext";

const WishList = () => {

    const { agriProducts, itemDetails, addToCartButton, removeFromWishlistButton } = useProductContext()

    const wishListItems = agriProducts.filter(i => i.inWishlist)

    const visibleItems = [...wishListItems]

    const itemList = visibleItems.map(i => (
        <div key={i.itemId} className="col-md-3" >
            <div className="p-3 farm-card-wrapper" style={{ cursor: 'pointer' }}>
                <div className="card farm-card">
                    {/* imgae */}
                    <div className="" onClick={() => itemDetails(i.itemId)}>
                        <img  src={i.imgUrl} className="card-img-top" alt="product" />
                        <div className="card-body">
                            <h5 className="card-title">{i.title}</h5>
                            <p className="card-text">price/kg : ₹ {i.pricePerKg}</p>
                        </div>
                        {/* <hr /> */}
                    </div>

                    <div className="card-body d-flex justify-content-between">
                        <button onClick={() => {
                            toast.success(`${i.title} added to cart.`)
                            return addToCartButton(i.itemId)
                        }} className="custom-btn green-btn">Add to Cart</button>
                        <button onClick={() => {
                            toast.info(`${i.title} removed wishlist.`)
                            return removeFromWishlistButton(i.itemId)
                        }} className="custom-btn blue-btn">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    ))

    return (
        <div className="container-fluid" >
            <ToastContainer />
            <div className="p-5">
                <div className="row">

                    {
                        (visibleItems.length>0)?
                        itemList : <h2>Wishlist is empty!</h2>
                    }
                </div>
            </div>

        </div>
    )
}

export default WishList;