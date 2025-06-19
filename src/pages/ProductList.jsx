import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import useProductContext from "../contexts/ProductContext";
import { useState } from "react";
import useProductFilter from "../hooks/useProductFilter";
import CategoryFilter from "../components/filters/CategoryFilter";
import RatingFilter from "../components/filters/RatingFilter";
import RangeFilter from "../components/filters/RangeFilter";

const ProductList = () => {

    const { category = 'all' } = useParams()
    const { categories, ratings, agriProducts, itemDetails, addToCartButton, addToWishlistButton, loading, error } = useProductContext()

    const { filterCategory_Rating, applySorting, rangeFiltering } = useProductFilter(category)

    //selected category filter
    const [catFilter, setCatFilter] = useState([])
    //selected rating filter
    const [ratFilter, setRatFilter] = useState([])
    //console.log(ratFilter)

    //selected sorting type
    const [sorting, setSorting] = useState('none')
    const handleSorting = (e) => {
        setSorting(e.target.value)
    }
    //console.log(sorting)

    //selected pricerRange value
    const [range, setRange] = useState(0)

    //filter function states
    const [showFilter, setShowFilter] = useState(0)
    const [filterText, setFilterText] = useState('Apply Filter')

    //applying the filters 
    const filterAppliedItems = filterCategory_Rating([...catFilter, ...ratFilter])


    //filter button
    const handleFilter = () => {
        if (catFilter.length == 0 && ratFilter.length == 0) {
            return toast.error('Please select a filter first!')
        }

        //console.log(catFilter) 
        //console.log(filterAppliedItems)
        setFilterText('Filter Applied')
        setShowFilter(filterAppliedItems.length)
    }

    //clear button
    const handleClear = () => {
        setFilterText('Apply Filter')
        setCatFilter([])
        setRatFilter([])
        setShowFilter(0)
        setRange(0)
        setSorting('none')
        console.log('clear')
    }

    //loading and error handling part:
    //note: I had to place it here , see the learnings for 
    //more details.

    if (loading) return <div className="container py-3"><h4>Loading...</h4></div>;
    if (error) return <div className="container py-3"><h4>An error occurred!</h4></div>;

    //visible item lists in the dom;
    let visibleProducts = (showFilter === 0) ? (category === 'all' ? agriProducts : agriProducts.filter(p => p.category === category)) : ([...filterAppliedItems]);

    // sorting the items

    if (sorting !== 'none') {
        applySorting(sorting, visibleProducts)
    }
    else {
        visibleProducts.sort((a, b) => a.itemId - b.itemId)
    }

    if (range != 0) {
        visibleProducts = rangeFiltering(range, visibleProducts)
    }

    //console.log(visibleProducts)

    // console.log(filterAppliedItems)

    //visible item lists in the dom
    const itemList = visibleProducts.map(i => (
        <div key={i.itemId} className="col-md-4">
            <div className="p-3 farm-card-wrapper" style={{ cursor: 'pointer' }}>
                <div className="card farm-card">
                    <div onClick={() => itemDetails(i.itemId)}>
                        <img src={i.imgUrl}
                            style={{ height: '15rem', width: 'auto' }}
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
        <div className="container-fluid py-3">
            <ToastContainer />
            <div className="row" style={{ height: '100vh' }}>
                {/* Sidebar */}
                <div className="col-md-3 d-flex flex-column overflow-auto border-end" style={{ maxHeight: '100vh' }}>
                    <div className="border p-3">
                        {/* filter and clear button */}
                        <div className="row">
                            <div className="col-6 ">
                                <strong style={{ cursor: 'pointer' }}
                                    onClick={() => handleFilter()}
                                >{filterText}</strong></div>
                            <div className="col-6 text-center">
                                <button onClick={() => handleClear()} className="btn btn-outline-secondary btn-sm">Clear</button>
                            </div>
                        </div>

                        {/* range filter */}
                        <RangeFilter range={range} setRange={setRange} />

                        {/* filter by category */}
                        {
                            (category === 'all') ? <div>
                                <CategoryFilter
                                    categories={categories}
                                    catFilter={catFilter}
                                    setCatFilter={setCatFilter} />
                            </div> : <></>
                        }
                        <hr />
                        {/* filter by rating */}
                        <div>
                            <RatingFilter ratings={ratings} ratFilter={ratFilter}
                                setRatFilter={setRatFilter} />
                        </div>
                        <hr />
                        {/* sorting type */}
                        <div>
                            <h5>Sort By</h5>
                            <input onChange={handleSorting} type="radio" name="sortBy" value={'descending'} checked={sorting === 'descending'} /> High to Low <br />
                            <input onChange={handleSorting} type="radio" name="sortBy" value={'ascending'} checked={sorting === 'ascending'} /> Low to High
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div className="col-md-9 overflow-auto" style={{ maxHeight: '100vh' }}>
                    <h5 className="text-center mt-1 sticky-top farm-banner">
                        Click on any product to get more details...
                    </h5>

                    <div className="p-3">
                        <div className="row g-3">
                            {itemList}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductList;