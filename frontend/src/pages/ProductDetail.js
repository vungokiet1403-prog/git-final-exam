import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <h2>Product Detail</h2>
      <p>ID: {id}</p>
      <p>Name: Demo Product</p>
      <p>Origin: Vietnam</p>
      <p>Status: Verified on Blockchain</p>
    </div>
  );
}

export default ProductDetail;
