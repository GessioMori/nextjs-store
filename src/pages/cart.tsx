import Head from "next/head";
import { useContextSelector } from "use-context-selector";
import { CartItem } from "../components/CartItem";
import { CartContext } from "../contexts/CartContext";
import { CartContainer } from "../styles/pages/cart";

export default function Cart() {
  const { lineItems, totalPrice } = useContextSelector(
    CartContext,
    (context) => {
      return {
        lineItems: context.lineItems,
        totalPrice: context.totalPrice,
      };
    }
  );
  return (
    <>
      <Head>
        <title>Cart | MyStore</title>
      </Head>
      {totalPrice === 0 ? (
        <h1>Your cart is empty!</h1>
      ) : (
        <CartContainer>
          <table>
            <tr>
              <th>{""}</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>{""}</th>
            </tr>
            {lineItems.map((item) => {
              return (
                <CartItem
                  key={item.priceId}
                  productId={item.productId}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  priceId={item.priceId}
                  formatedPrice={item.formatedPrice}
                  quantity={item.quantity}
                />
              );
            })}
          </table>

          <h2>
            Total amount:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalPrice / 100)}
          </h2>
          <button>Proceed to checkout</button>
        </CartContainer>
      )}
    </>
  );
}
