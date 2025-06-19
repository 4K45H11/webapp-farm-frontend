import { useParams } from "react-router-dom";
import useProductContext from "../contexts/ProductContext";

const useProductFilter = (categoryName) => {

    //console.log(categoryName)

    const { agriProducts } = useProductContext()

    const finalProductArray =(categoryName!=='all')? agriProducts.filter(i=>i.category===categoryName):agriProducts

    //applying filter based on category and rating

    function filterCategory_Rating(args) {

        const ratingFilter = args.filter(i => i === '3' || i === '4')
        // console.log('rat', ratingFilter)
        const categoryFilter = args.filter(i => i !== '3' && i !== '4')
        // console.log('cat', categoryFilter)
        
        const maxRating = ratingFilter.reduce((acc, curr) => Number(curr) > acc ? Number(curr) : acc, 0)
        

        if (ratingFilter.length !== 0 && categoryFilter.length !== 0) {
            const initialFilter = finalProductArray.filter(i => categoryFilter.indexOf(i.category) !== -1)

            //finding max from the rating array.

            return initialFilter.filter(i => i.rating >= maxRating)
        }

        else if (ratingFilter.length !== 0 && categoryFilter.length === 0) {
            return finalProductArray.filter(i => i.rating >= maxRating)
        }
        return finalProductArray.filter(i => categoryFilter.indexOf(i.category) !== -1)
    }


    //applying sort based on type

    function applySorting(sorting_type,arr){
        if(sorting_type==='ascending'){
            arr.sort((a,b)=>a.pricePerKg-b.pricePerKg)
        }
        else arr.sort((a,b)=>b.pricePerKg-a.pricePerKg)
    }

    //applying filter based on range

    function rangeFiltering(arg,arr){
        return arr.filter(i=>i.pricePerKg<=arg)
    }


    return { filterCategory_Rating,applySorting,rangeFiltering }

}

export default useProductFilter;