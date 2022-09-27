import { ReactNode, useState } from "react";
import { createContext } from "use-context-selector";

export const CartContext = createContext({} as CartContextValues);

interface changeItemQuantityArgs {
  productId: string;
  priceId: string;
  name: string;
  imageUrl: string;
  formatedPrice: string;
  price: number;
  action: "add" | "decrease" | "remove";
}

interface CartContextValues {
  lineItems: {
    productId: string;
    priceId: string;
    name: string;
    imageUrl: string;
    formatedPrice: string;
    price: number;
    quantity: number;
  }[];
  numOfItems: number;
  totalPrice: number;
  changeItemQuantity: (args: changeItemQuantityArgs) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartProviderProps) {
  const [lineItems, setLineItems] = useState<
    {
      productId: string;
      priceId: string;
      name: string;
      imageUrl: string;
      formatedPrice: string;
      price: number;
      quantity: number;
    }[]
  >([]);
  const [numOfItems, setNumOfItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  function calculateTotal(items: { price: number; quantity: number }[]) {
    return items.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);
  }

  function changeItemQuantity({
    action,
    imageUrl,
    name,
    price,
    formatedPrice,
    priceId,
    productId,
  }: changeItemQuantityArgs) {
    const isAlreadyInCart = lineItems.some((item) => item.priceId === priceId);
    if (isAlreadyInCart) {
      const newItemsList = lineItems
        .map((item) => {
          if (item.priceId !== priceId) {
            return item;
          }

          return {
            priceId,
            productId,
            name,
            imageUrl,
            price,
            formatedPrice,
            quantity:
              action === "add"
                ? item.quantity + 1
                : action === "decrease"
                ? item.quantity - 1
                : 0,
          };
        })
        .filter((item) => item.quantity > 0);
      setLineItems(newItemsList);
      setNumOfItems(newItemsList.reduce((acc, cur) => acc + cur.quantity, 0));
      setTotalPrice(calculateTotal(newItemsList));
    } else {
      const newItemsList = [
        ...lineItems,
        {
          productId,
          priceId,
          name,
          imageUrl,
          formatedPrice,
          price,
          quantity: 1,
        },
      ];
      setLineItems(newItemsList);
      setNumOfItems(newItemsList.reduce((acc, cur) => acc + cur.quantity, 0));
      setTotalPrice(calculateTotal(newItemsList));
    }
  }

  return (
    <CartContext.Provider
      value={{ lineItems, numOfItems, changeItemQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
