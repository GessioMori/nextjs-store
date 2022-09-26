import { ReactNode, useState } from "react";
import { createContext } from "use-context-selector";

export const CartContext = createContext({} as CartContextValues);

interface CartContextValues {
  lineItems: {
    priceId: string;
    name: string;
    imageUrl: string;
    price: string;
    quantity: number;
  }[];
  numOfItems: number;
  changeItemQuantity: (
    priceId: string,
    name: string,
    imageUrl: string,
    price: string,
    action: "add" | "decrease" | "remove"
  ) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartProviderProps) {
  const [lineItems, setLineItems] = useState<
    {
      priceId: string;
      name: string;
      imageUrl: string;
      price: string;
      quantity: number;
    }[]
  >([]);
  const [numOfItems, setNumOfItems] = useState(0);

  console.log(lineItems, numOfItems);

  function changeItemQuantity(
    priceId: string,
    name: string,
    imageUrl: string,
    price: string,
    action: "add" | "decrease" | "remove"
  ) {
    const isAlreadyInCart = lineItems.some((item) => item.priceId === priceId);
    if (isAlreadyInCart) {
      const newItemsList = lineItems.map((item) => {
        if (item.priceId !== priceId) {
          return item;
        }
        return {
          priceId,
          name,
          imageUrl,
          price,
          quantity:
            action === "add"
              ? item.quantity + 1
              : action === "decrease"
              ? item.quantity - 1
              : 0,
        };
      });
      setLineItems(newItemsList);
      setNumOfItems(newItemsList.reduce((acc, cur) => acc + cur.quantity, 0));
    } else {
      const newItemsList = [
        ...lineItems,
        { priceId, name, imageUrl, price, quantity: 1 },
      ];
      setLineItems(newItemsList);
      setNumOfItems(newItemsList.reduce((acc, cur) => acc + cur.quantity, 0));
    }
  }

  return (
    <CartContext.Provider value={{ lineItems, numOfItems, changeItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
