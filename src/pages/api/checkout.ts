import { NextApiRequest, NextApiResponse } from "next";
import { CartItemProps } from "../../components/CartItem";
import { stripe } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lineItems = req.body.lineItems as CartItemProps[];

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!lineItems) {
    return res.status(400).json({ error: "Price not found." });
  }

  const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${process.env.NEXT_URL}/cart`;
  const checkoutSession = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["BR"],
    },
    success_url,
    cancel_url,
    mode: "payment",
    line_items: lineItems.map((item) => {
      return { price: item.priceId, quantity: item.quantity };
    }),
  });
  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
