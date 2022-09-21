import { AppProps } from "next/app";
import { globalStyle } from "../styles/global";

import logoImg from "../assets/logo.svg";
import { Container, Header, HeaderText } from "../styles/pages/app";

import Image from "next/future/image";

globalStyle();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg.src} alt="" width={80} height={80} />
        <HeaderText>MyStore</HeaderText>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
