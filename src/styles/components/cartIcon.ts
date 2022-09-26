import { styled } from "..";

export const CartIconContainer = styled("a", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

export const CartNumber = styled("div", {
  width: "2rem",
  height: "2rem",
  borderRadius: "50%",
  backgroundColor: "$gray800",
  color: "$gray100",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
});
