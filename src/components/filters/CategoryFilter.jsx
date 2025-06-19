import { useEffect,useState } from "react";

const CategoryFilter = ({ categories, catFilter, setCatFilter }) => {
    const initialCatBox = categories.reduce((acc, curr) => {
        acc[curr] = false;
        return acc;
    }, {});

    const [catBox, setCatBox] = useState(initialCatBox);

    //syncronising the checkboxes
    useEffect(() => {
        const updatedBox = { ...initialCatBox }

        catFilter.forEach(cat => {
            updatedBox[cat] = true;
        });
        setCatBox(updatedBox);
    }, [catFilter, categories]);

    const handleCheckBoxCategory = (e) => {
        const { checked, value } = e.target;
        setCatBox(prev => ({ ...prev, [value]: checked }));

        if (checked) {
            setCatFilter(prev => [...prev, value]);
        } else {
            setCatFilter(prev => prev.filter(i => i !== value));
        }
    };

    return (
        <div>
            <h5>Filter by Category</h5>
            {categories.map(c =>
                (c !== "All Products") && (
                    <div key={c}>
                        <label>
                            <input
                                type="checkbox"
                                value={c}
                                checked={catBox[c]}
                                onChange={handleCheckBoxCategory}
                            />{" "}
                            {c}
                        </label>
                        <br />
                    </div>
                )
            )}
        </div>
    );
}

export default CategoryFilter;