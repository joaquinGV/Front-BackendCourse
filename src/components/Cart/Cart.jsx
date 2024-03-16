import { useState, useEffect } from "react";
import { getCartData, purchaseCart } from "../../services/api";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [ticket, setTicket] = useState();
  useEffect(() => {
    const updateCart = async () => {
      const response = await getCartData();
      setCart(response);
    };

    updateCart();
  }, [ticket]);

  const handleShopping = async () => {
    const response = await purchaseCart();
    console.log(response);
    setTicket(response);
  };

  return (
    <>
      <h3>Cart page</h3>
      {cart.length > 0 ? (
        <div>
          {cart.map(({ product, quantity }) => (
            <p key={product?.code}>
              Producto {product.title}| Cantidad: {quantity} | Total: $
              {(product.price * quantity).toFixed(2)}
            </p>
          ))}
          <p>
            Total:{" "}
            {cart
              .reduce(
                (total, { product, quantity }) =>
                  total + product.price + quantity,
                0
              )
              .toFixed(2)}
          </p>
        </div>
      ) : (
        <p>No hay productos añadidos al carrito</p>
      )}
      <button onClick={handleShopping}>Generar Ticket</button>
      {ticket && (
        <div>
          <p>Felicidades compra realizada con exito!</p>
          <section>
            <h3>Detalles de compra:</h3>
            <p>
              Codigo de compra: <b>{ticket?.code}</b> | Total: $
              <b>{ticket?.amount.toFixed(2)}</b>
            </p>
            <p>
              Fecha: <b>{ticket?.purchase_datetime}</b>
            </p>
            <p>
              Comprador: <b>{ticket?.purchaser}</b>
            </p>
          </section>
        </div>
      )}
    </>
  );
};

export default Cart;
