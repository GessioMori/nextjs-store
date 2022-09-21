import { AppProps } from "next/app";
import { globalStyle } from "../styles/global";

import logoImg from "../assets/logo.svg";
import { Container, Header, HeaderText } from "../styles/pages/app";

import Image from "next/future/image";
import Link from "next/link";

globalStyle();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Link href="/">
        <Header>
          <Image src={logoImg.src} alt="" width={80} height={80} />
          <HeaderText>MyStore</HeaderText>
        </Header>
      </Link>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
