import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: 20, background: "#222" }}>
      <Link to="/" style={{ color: "#fff", marginRight: 15 }}>Home</Link>
      <Link to="/add" style={{ color: "#fff", marginRight: 15 }}>Add Product</Link>
      <Link to="/products" style={{ color: "#fff", marginRight: 15 }}>Products</Link>
      <Link to="/scan" style={{ color: "#fff" }}>Scan QR</Link>
    </nav>
  );
}

export default Navbar;
