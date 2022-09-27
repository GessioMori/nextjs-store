import Image from "next/future/image";
import Link from "next/link";
import { CartImgContainer, CartItemContainer } from "../styles/pages/cart";

interface CartItemProps {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export function CartItem({
  productId,
  imageUrl,
  name,
  price,
  quantity,
}: CartItemProps) {
  return (
    <CartItemContainer>
      <Link href={`/product/${productId}`}>
        <CartImgContainer>
          <Image src={imageUrl} alt="" width={20} height={20} />
        </CartImgContainer>
      </Link>
      <span>{name}</span>
      <span>{quantity}x</span>
      <span>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price / 100)}
      </span>
    </CartItemContainer>
  );
}
