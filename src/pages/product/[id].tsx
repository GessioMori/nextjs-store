import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/future/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import SkeletonScreen from "../../components/SkeletonScreen";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import Head from "next/head";
import { useContextSelector } from "use-context-selector";
import { CartContext } from "../../contexts/CartContext";

interface ProductProps {
  product: {
    productId: string;
    name: string;
    imageUrl: string;
    price: number;
    formatedPrice: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { isFallback, push } = useRouter();
  const changeItemQuantity = useContextSelector(
    CartContext,
    (context) => context.changeItemQuantity
  );

  if (isFallback) {
    return <SkeletonScreen />;
  }

  return (
    <>
      <Head>
        <title>{product.name} | MyStore</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={300}
            height={300}
            alt={`Image of ${product.name}`}
          />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formatedPrice}</span>
          <p>{product.description}</p>
          <button
            onClick={() => {
              changeItemQuantity({
                action: "add",
                imageUrl: product.imageUrl,
                name: product.name,
                formatedPrice: product.formatedPrice,
                price: product.price,
                priceId: product.defaultPriceId,
                productId: product.productId,
              });
              push("/cart");
            }}
          >
            Add to cart
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        productId: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        formatedPrice: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
