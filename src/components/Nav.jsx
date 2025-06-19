import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import useProductContext from '../contexts/ProductContext';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { agriProducts } = useProductContext()
  const [searchVal,setSearchVal] = useState('')
  const navigate = useNavigate()

  const totalCartItems = agriProducts.filter(i => i.inCart).length;
  const totalWishlistItems = agriProducts.filter(i => i.inWishlist).length;

  const handleSearch = (e)=>{
    e.preventDefault()
   // console.log(searchVal)
    navigate(`/products/search/${searchVal}`)

  }

  return (

    <div className="nav-container sticky-top">
      <nav className="navbar navbar-expand-md custom-navbar px-3 shadow-sm">
        {/* toggle on the left */}
        <button
          className="navbar-toggler me-3"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* logo */}
        <h1 className="navbar-brand mb-0 h4 logo-text">🌾 Basundhara Organic Farm</h1>

        {/* nav bar */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto gap-3 pt-2 pt-md-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link px-3">Home</NavLink>
            </li>
            <li className="nav-item">
              <form onSubmit={(e)=>handleSearch(e)} className="d-flex" role="search">
                <input value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} className="form-control me-2" type="search" placeholder="type category/name..." aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link px-3">Cart {(totalCartItems > 0) && <span>({totalCartItems})</span>}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/wishlist" className="nav-link px-3">Wishlist {(totalWishlistItems > 0) && <span>({totalWishlistItems})</span>}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/users" className="nav-link px-3">Admin</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
