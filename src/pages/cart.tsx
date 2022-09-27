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

      <CartContainer>
        {lineItems.map((item) => {
          return (
            <CartItem
              key={item.priceId}
              productId={item.productId}
              imageUrl={item.imageUrl}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          );
        })}
        <h1>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalPrice / 100)}
        </h1>
      </CartContainer>
    </>
  );
}
