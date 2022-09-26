import { AppProps } from "next/app";
import { globalStyle } from "../styles/global";

import logoImg from "../assets/logo.svg";
import {
  Container,
  Header,
  HeaderText,
  LogoContainer,
} from "../styles/pages/app";

import Image from "next/future/image";
import Link from "next/link";
import { CartContextProvider } from "../contexts/CartContext";
import { CartIcon } from "../components/CartIcon";

globalStyle();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Link href="/">
          <Header>
            <LogoContainer>
              <Image src={logoImg.src} alt="" width={80} height={80} />
              <HeaderText>MyStore</HeaderText>
            </LogoContainer>
            <CartIcon />
          </Header>
        </Link>
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  );
}

export default MyApp;
