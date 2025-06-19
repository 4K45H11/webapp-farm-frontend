import { useParams } from "react-router-dom";
import useProductContext from "../contexts/ProductContext";
import { toast, ToastContainer } from 'react-toastify'

const SearchResult = () => {

    const { value } = useParams()
    const { agriProducts, categories, itemDetails, addToCartButton, addToWishlistButton } = useProductContext()

    if (value === 'All Products') {
        return <p className="container py-3">Look at the home section.</p>
    }

    //handling search result
    let visibleProducts = [];
    if (categories.includes(value.toLowerCase())) {
        visibleProducts = agriProducts.filter(p => p.
            category === value.toLowerCase())

    }
    else {
        let filterArray = value.split(' ')
        filterArray = filterArray.map(f => f.slice(0, 1).toUpperCase() + f.slice(1).toLowerCase())
        const filter = filterArray.join(' ')

        const temp = agriProducts.find(p => p.title === filter)
        //handling unmatched search result.
        if (!temp) {
            return <h4 className="container py-3">No result found for {value}</h4>
        }

        visibleProducts.push(temp)
    }
    //console.log(visibleProducts)



    const itemList = visibleProducts?.map(i => (
        <div key={i.itemId} className="col-md-4">
            <div className="p-3 farm-card-wrapper" style={{ cursor: 'pointer' }}>
                <div className="card farm-card">
                    <div onClick={() => itemDetails(i.itemId)}>
                        <img src={i.imgUrl}
                            // style={{height:'15rem', width:'auto'}}
                            className="card-img-top" alt="product" />
                        <div className="card-body">
                            <h5 className="card-title">{i.title}</h5>
                            <span>Rating: <span style={{ color: 'gold', fontSize: '1rem' }}>★</span> {i.rating}</span>
                            <p className="card-text">price/kg : ₹ {i.pricePerKg}</p>
                        </div>
                        {/* <hr /> */}
                    </div>
                    {/* button part */}
                    <div className="card-body d-flex justify-content-between">
                        <button onClick={() => {
                            if (i.inCart) {
                                toast.info(`${i.title} is already added to the cart.`)
                            }
                            else {
                                toast.success(`${i.title} added to cart.`)
                            }
                            return addToCartButton(i.itemId)
                        }} className="custom-btn green-btn">Add to Cart</button>
                        <button onClick={() => {
                            if (i.inWishlist) {
                                toast.info(`${i.title} is already added to the wishlist.`)
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
        <div className="container py-3">
            <ToastContainer />
            <h4 className="my-3">Search result for {value}: </h4>
            <div className="row">
                {itemList}
            </div>
        </div>
    )
}

export default SearchResult;