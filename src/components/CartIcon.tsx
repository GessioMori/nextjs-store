import Image from "next/future/image";
import Link from "next/link";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "../contexts/CartContext";
import { CartIconContainer, CartNumber } from "../styles/components/cartIcon";
import cartSvg from "./../assets/cart.svg";

export function CartIcon() {
  const numOfItems = useContextSelector(
    CartContext,
    (context) => context.numOfItems
  );

  return (
    <Link href={"/cart"}>
      <CartIconContainer>
        {numOfItems !== 0 && <CartNumber>{numOfItems}</CartNumber>}
        <Image src={cartSvg} alt="" width={50} height={50} />
      </CartIconContainer>
    </Link>
  );
}
