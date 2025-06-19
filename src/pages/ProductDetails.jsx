import { useParams } from "react-router-dom";
import useProductContext from "../contexts/ProductContext";
import Suggestion from "../components/Suggestion";
import { ToastContainer, toast } from 'react-toastify'

const ProductDetails = () => {

    const { id } = useParams()
    const { agriProducts, addToCartButton, addToWishlistButton, loading, error } = useProductContext()

    if (loading) return <div className="container py-3"><h4>Loading...</h4></div>;
    if (error) return <div className="container py-3"><h4>An error occurred!</h4></div>;

    //product details
    const visibleProduct = agriProducts.find(i => i.itemId === Number(id))

    //same category products
    const similarProducts = agriProducts.filter(p => p.category === visibleProduct.category && p.itemId !== Number(id))

    //console.log(visibleProduct)


    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="row">
                {/* img section */}
                <div className="col-md-4">
                    <div className="p-3">
                        <img src={visibleProduct?.imgUrl} className="img-fluid" alt="" />

                        <button className="custom-btn green-btn mt-2 w-100" onClick={() => {
                            toast.success(`${visibleProduct?.title} added to cart.`)
                            return addToCartButton(visibleProduct.itemId)
                        }}>Add to cart</button>
                        <button onClick={() => {
                            toast.success(`${visibleProduct.title} added to wishlist.`)
                            return addToWishlistButton(visibleProduct.itemId)
                        }} className="custom-btn blue-btn mt-2 w-100">Add to wishlist</button>
                    </div>
                </div>
                {/* details section */}
                <div className="col-md-8">
                    <div className="product-detail-box mt-3">
                        <h3 className="product-title">{visibleProduct?.title}</h3>
                        <p className="product-price">

                            <strong>Price: </strong>₹{visibleProduct?.pricePerKg} /kg
                        </p>
                        <ul className="product-details-list py-3">
                            <li><strong>Rating: </strong>
                                <span style={{ color: 'gold', fontSize: '1.5rem' }}>★</span>
                                {visibleProduct?.rating}</li>
                            <li><strong>Category: </strong>{visibleProduct?.category}</li>
                            <li><strong>Description: </strong>{visibleProduct?.description}</li>
                            <li><strong>Harvesting Date: </strong>{visibleProduct?.harvestingDate}</li>
                            <li><strong>Expiration Date: </strong>{visibleProduct?.expirationDate}</li>
                            <li><strong>Micronutrients: </strong>{visibleProduct?.micronutrients.join(', ')}</li>
                            <li><strong>Can Be Consumed/Used By: </strong>{visibleProduct?.canBeUsedBy}</li>
                        </ul>
                    </div>

                </div>
            </div>
            <hr />
            <Suggestion items={similarProducts} />
        </div>
    )
}

export default ProductDetails;