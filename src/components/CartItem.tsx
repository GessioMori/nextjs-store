import Image from "next/future/image";
import Link from "next/link";
import { XSquare } from "phosphor-react";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "../contexts/CartContext";
import { CartImgContainer, CartItemContainer } from "../styles/pages/cart";

export interface CartItemProps {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  priceId: string;
  quantity: number;
  formatedPrice: string;
}

export function CartItem({
  productId,
  imageUrl,
  name,
  price,
  quantity,
  priceId,
  formatedPrice,
}: CartItemProps) {
  const changeItemQuantity = useContextSelector(
    CartContext,
    (context) => context.changeItemQuantity
  );

  return (
    <CartItemContainer>
      <td>
        <Link href={`/product/${productId}`}>
          <CartImgContainer>
            <Image src={imageUrl} alt="" width={20} height={20} />
          </CartImgContainer>
        </Link>
      </td>
      <td>
        <p>{name}</p>
      </td>
      <td>
        <span>{quantity}x</span>
      </td>
      <td>
        <span>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price / 100)}
        </span>
      </td>
      <td>
        <XSquare
          size={20}
          color={"#ff6961"}
          style={{ cursor: "pointer" }}
          onClick={() =>
            changeItemQuantity({
              action: "decrease",
              formatedPrice,
              imageUrl,
              name,
              price,
              priceId,
              productId,
            })
          }
        />
      </td>
    </CartItemContainer>
  );
}
