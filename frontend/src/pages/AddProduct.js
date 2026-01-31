import { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      origin,
      price,
    });

    alert("Product added (mock)!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setName(e.target.value)} /><br /><br />
        <input placeholder="Origin" onChange={e => setOrigin(e.target.value)} /><br /><br />
        <input placeholder="Price" onChange={e => setPrice(e.target.value)} /><br /><br />

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddProduct;
