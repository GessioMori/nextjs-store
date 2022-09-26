import Image from "next/future/image";
import { CartImgContainer, CartItemContainer } from "../styles/pages/cart";

interface CartItemProps {
  priceId: string;
  name: string;
  imageUrl: string;
  price: string;
  quantity: number;
}

export function CartItem({
  priceId,
  imageUrl,
  name,
  price,
  quantity,
}: CartItemProps) {
  return (
    <CartItemContainer>
      <CartImgContainer href={`/product/${priceId}`}>
        <Image src={imageUrl} alt="" width={20} height={20} />
      </CartImgContainer>
    </CartItemContainer>
  );
}
