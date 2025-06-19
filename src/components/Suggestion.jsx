import useProductContext from "../contexts/ProductContext"
import { toast } from 'react-toastify'

const Suggestion = ({ items }) => {

    const { itemDetails, addToCartButton, addToWishlistButton } = useProductContext()

    //rendered item lists
    const itemList = items.map(i => (
        <div key={i.itemId} className="col-md-3 d-inline-block">
            <div className="p-3 farm-card-wrapper" style={{ cursor: 'pointer' }}>
                <div className="card farm-card" >
                    <div onClick={() => itemDetails(i.itemId)}>
                        <img src={i.imgUrl}  className="card-img-top img-fluid" alt="product" />
                        <div className="card-body">
                            <h5 className="card-title">{i.title}</h5>
                            <span>Rating: <span style={{ color: 'gold', fontSize: '1rem' }}>★</span> {i.rating}</span>
                            <p className="card-text">price/kg : ₹ {i.pricePerKg}</p>
                        </div>
                    </div>

                    <div className="card-body d-flex justify-content-between">
                        <button className="custom-btn green-btn" onClick={() => {
                            if (i.inCart) {
                                toast.info(`${i.title} already added to the cart.`)
                            }
                            else {
                                toast.success(`${i.title} added to cart.`)
                            }
                            return addToCartButton(i.itemId)

                        }}>Add to Cart</button>
                        <button onClick={() => {
                            if (i.inWishlist) {
                                toast.info(`${i.title} already added to the wishlist.`)
                            }
                            else {
                                toast.success(`${i.title} added to wishlist.`)
                            }
                            return addToWishlistButton(i.itemId)
                        }} className="custom-btn blue-btn">Wishlist</button>
                    </div>
                </div>
            </div>
        </div>
    ))

    return (
        <div>

            <h5 className="text-center mt-1 sticky-top farm-banner">
                Similar Products...
            </h5>
            <div className="row" style={{ height: '65vh', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                {itemList}
            </div>
        </div>
    )
}

export default Suggestion;