import Link from "next/link";
import { ShoppingCart } from "phosphor-react";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "../contexts/CartContext";
import { CartIconContainer, CartNumber } from "../styles/components/cartIcon";

export function CartIcon() {
  const numOfItems = useContextSelector(
    CartContext,
    (context) => context.numOfItems
  );

  return (
    <Link href={"/cart"}>
      <CartIconContainer>
        {numOfItems !== 0 && <CartNumber>{numOfItems}</CartNumber>}
        <ShoppingCart size={32} />
      </CartIconContainer>
    </Link>
  );
}
