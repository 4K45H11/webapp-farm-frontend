
const RangeFilter = ({range,setRange}) => {


    //console.log(range)

    return (
        <>
            <div className="range-wrapper my-4">
                <label htmlFor="priceRange">Price - ₹({range})</label><br />
                <input
                    onChange={(e)=>setRange(e.target.value)}
                    value={range}
                    type="range"
                    name="priceRange"
                    id="priceRange"
                    min={0}
                    max={2000}
                    step={100}
                    list="tickmarks"
                    className="form-range"
                />
                <div className="d-flex justify-content-between small text-muted mt-2">
                    <span>0</span><span>500</span><span>1000</span><span>1500</span><span>2000</span>
                </div>
                <datalist id="tickmarks">
                    <option value="0"></option>
                    <option value="500"></option>
                    <option value="1000"></option>
                    <option value="1500"></option>
                    <option value="2000"></option>
                </datalist>
            </div>
        </>
    )
}

export default RangeFilter;