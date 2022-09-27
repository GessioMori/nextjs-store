import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import {
  ImageContainer,
  ImagesContainer,
  SuccessContainer,
} from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  products: {
    images: string[];
    id: string;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Success | MyStore</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Your purchase was confirmed!</h1>
        <ImagesContainer>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <Image src={product.images[0]} width={120} height={120} alt="" />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <p>Hey {customerName}, your products are on the way.</p>
        <Link href={"/"}>Back to catalog</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  let session: Stripe.Response<Stripe.Checkout.Session>;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });
  } catch {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const customerName = session.customer_details.name;
  const products = session.line_items.data.map(
    (item) => item.price.product
  ) as Stripe.Product[];
  return {
    props: {
      customerName,
      products,
    },
  };
};
