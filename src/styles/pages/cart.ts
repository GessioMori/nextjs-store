import { styled } from "..";

export const CartContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "4rem",
  maxWidth: 1180,
  margin: "0 auto",
});

export const CartImgContainer = styled("a", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,

  img: {
    width: "auto",
    height: "auto",
  },
});

export const CartItemContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
