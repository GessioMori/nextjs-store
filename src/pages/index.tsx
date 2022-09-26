import Image from "next/future/image";
import { HomeContainer, Product } from "../styles/pages/home";
import Link from "next/link";
import Head from "next/head";

import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import { Arrow } from "../components/Arrow";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: 1,
      spacing: 48,
    },

    breakpoints: {
      "(min-width: 560px)": {
        slides: {
          perView: 2,
          spacing: 48,
        },
      },
      "(min-width: 980px)": {
        slides: {
          perView: 3,
          spacing: 48,
        },
      },
    },
  });

  return (
    <>
      <Head>
        <title>MyStore</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        <Arrow
          left
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
        />
        <Arrow
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.next()
          }
        />
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} alt="" width={300} height={300} />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
