import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Coffee Arabica", origin: "Da Lat" },
  { id: 2, name: "Rice ST25", origin: "Soc Trang" },
];

function ProductList() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Product List</h2>

      {products.map(p => (
        <div key={p.id}>
          <Link to={`/products/${p.id}`}>
            {p.name} - {p.origin}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
