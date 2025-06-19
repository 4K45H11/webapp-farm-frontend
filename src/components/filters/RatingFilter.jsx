import { useEffect, useState } from "react";

const RatingFilter = ({ ratings, ratFilter, setRatFilter }) => {

    const initialRatings = ratings.reduce((acc,curr)=>{
        acc[curr.rating] = false
        return acc;
    },{})

    const [ratBox,setRatBox] = useState(initialRatings)

    useEffect(()=>{
        const updatedCheckBox = {...initialRatings}
        ratFilter.forEach(r=>{
            const rating = r.toString()
            updatedCheckBox[rating] = true
        })

        setRatBox(updatedCheckBox)

    },[ratings,ratFilter])

    const handleCheckBoxRating = (e) => {
        const {checked,value} = e.target;
        setRatBox((prev)=>({...prev, [value]:checked}))

        if(checked){
            setRatFilter((prev)=>([...prev,value]))
        }
        else{
            setRatFilter(prev=>prev.filter(p=>p!==value))
        }
    }

    //dom view of rating filters
    const ratingFilter = ratings.map(r => (
        <div key={r.id}>
            <label ><input onChange={(e) => handleCheckBoxRating(e)} checked={ratBox[r.rating]|| false} type="checkbox" name="rating" value={r.rating} /> {r.rating} and Above </label>
            <br />
        </div>
    ))


    return (
        <div>
            <h5>Filter by Rating</h5>
            {ratingFilter}
        </div>
    )
}

export default RatingFilter;