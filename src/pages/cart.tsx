import Head from "next/head";
import { useContextSelector } from "use-context-selector";
import { CartItem } from "../components/CartItem";
import { CartContext } from "../contexts/CartContext";
import { CartContainer } from "../styles/pages/cart";

export default function Cart() {
  const lineItems = useContextSelector(
    CartContext,
    (context) => context.lineItems
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
              priceId={item.priceId}
              imageUrl={item.imageUrl}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          );
        })}
      </CartContainer>
    </>
  );
}
