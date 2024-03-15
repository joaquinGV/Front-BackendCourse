import { useEffect } from "react";
import { useState } from "react";
import { getProducts } from "../../services/api";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const updateProducts = async () => {
      const response = await getProducts();
      setProducts(response);
    };

    updateProducts();
  }, []);

  return (
    <>
      <h3>Products</h3>
      {products.length > 0 ? (
        <div>
          {products.map((product) => {
            if (product.status)
              return <ProductCard product={product} key={product._id} />;
          })}
        </div>
      ) : (
        <p>No hay productos por mostrar</p>
      )}
    </>
  );
};

export default Products;
