import {
  ProductContainer,
  ImageContainer,
  ProductDetails,
} from "../styles/pages/product";
import Image from "next/future/image";

import loading from "../assets/loading.svg";

export default function SkeletonScreen() {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          src={loading}
          width={300}
          height={300}
          alt={"placeholder image"}
        />
      </ImageContainer>
      <ProductDetails>
        <div
          style={{
            width: "100%",
            height: "3rem",
            backgroundColor: "#202024",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        ></div>
        <div
          style={{
            width: "50%",
            height: "3rem",
            backgroundColor: "#202024",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        ></div>
        <p>{"        "}</p>
        <button>Buy now</button>
      </ProductDetails>
    </ProductContainer>
  );
}
