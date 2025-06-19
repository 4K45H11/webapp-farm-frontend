import { useNavigate } from "react-router-dom";
import useProductContext from "../contexts/ProductContext";
import useScreenSize from "../hooks/useScreenSize";
import '/src/Home.css'; // Optional: for custom CSS
import Footer from "../components/Footer";
import heroImg from '../resources/heroImage.png'

const Home = () => {
    const { categories, features } = useProductContext();
    const navigate = useNavigate();
    const { width } = useScreenSize();

    const categoryHandler = (categoryName) => {
        if (categoryName === "All Products") return navigate(`/products`);
        return navigate(`/products/${categoryName}`);
    };

    const categoryList = categories.map((c) => (
        <div
            onClick={() => categoryHandler(c)}
            key={c}
            className="col-md-3 col-6 mt-3"
        >
            <div className="p-4 border rounded category-card text-center shadow-sm hover-shadow">
                <p className="mb-0 fs-5 fw-semibold text-success">{c}</p>
            </div>
        </div>
    ));

    const mobileCategoryList = categories.map((c) => (
        <option key={c} value={c}>
            {c}
        </option>
    ));

    const featureList = features.map((f) => (
        <div key={f.id} className="col-md-6 col-lg-4 my-3">
            <div className="product-card shadow-sm p-3 rounded h-100">
                <div className="card-content animate-fade-in d-flex flex-column h-100">
                    <img
                        src={f.imgUrl}
                        alt={`feat${f.id}`}
                        className="img-fluid mb-3 rounded"
                    />
                    <h5 className="product-title text-success">{f.title}</h5>
                    <p className="product-description text-muted">{f.feat}</p>
                </div>
            </div>
        </div>
    ));

    return (
        <>
        <div className="container-fluid px-3 px-md-5">
            

            {/* Category Section */}
            {/* <h3 className="text-success mt-3 mb-3">Explore Categories</h3> */}
            {width > 600 ? (
                <div className="row">{categoryList}</div>
            ) : (
                <div>
                    <select
                        onChange={(e) => categoryHandler(e.target.value)}
                        className="form-select my-4"
                    >
                        <option value="">Select a category</option>
                        {mobileCategoryList}
                    </select>
                </div>
            )}
            {/* Hero Section */}
            <div className="hero-section mt-3 mb-5 position-relative text-white text-center">
                <img
                    src={heroImg}
                    alt="heroImg"
                    className="img-fluid w-100 rounded shadow"
                />
                {/* <div className="hero-overlay position-absolute top-50 start-50 translate-middle">
                    <h1 className="display-4 fw-bold">Fresh & Organic Agro Products</h1>
                    <p className="fs-5">From Farm to Your Home – Sustainably Sourced</p>
                </div> */}
            </div>

            {/* Features Section */}
            <h3 className="text-success my-4">Featured Activities</h3>
            <div className="row">{featureList}</div>

            {/* Why Choose Us Section */}
            <div className="my-5 py-5 bg-light rounded shadow-sm">
                <h3 className="text-center text-success mb-4">Why Choose Us?</h3>
                <div className="row text-center">
                    <div className="col-md-4 mb-3">
                        <div className="p-3">
                            <i className="bi bi-truck fs-1 text-success"></i>
                            <h5 className="mt-2">Fast Delivery</h5>
                            <p>Fresh products delivered to your doorstep quickly.</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="p-3">
                            <i className="bi bi-leaf fs-1 text-success"></i>
                            <h5 className="mt-2">100% Organic</h5>
                            <p>We offer certified organic produce without chemicals.</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="p-3">
                            <i className="bi bi-emoji-smile fs-1 text-success"></i>
                            <h5 className="mt-2">Customer Satisfaction</h5>
                            <p>Thousands of happy customers trust our quality.</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <Footer/>
        </>
    );
};

export default Home;
