/* eslint-disable react/prop-types */
import { useState } from "react";
import { addProductToCart } from "../../services/api";

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    await addProductToCart(product._id, quantity);
  };

  const handlePlus = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div key={product.id}>
      <p>
        Title: {product._id} | code: {product.code}
      </p>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Id: ${product._id}</p>
      <p>
        Quantity:
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
          -
        </button>
        {quantity}
        <button onClick={handlePlus}>+</button>
      </p>
      <button onClick={addToCart}>Add 1 to Cart</button>
      <hr />
    </div>
  );
}

export default ProductCard;
