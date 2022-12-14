import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  minHeight: "100vh",
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: "calc(100vw - (100vw - 1180px)/2)",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const HeaderText = styled("span", {
  fontSize: "$2xl",
  fontWeight: "bold",
  cursor: "pointer",
});

export const LogoContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
