import { styled } from "..";

export const CartContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "2rem",
  maxWidth: 1180,
  margin: "0 auto",
  alignItems: "end",

  table: {
    borderCollapse: "collapse",
    th: {
      padding: "1rem",

      "&:first-child, &:last-child": {
        width: "5%",
      },
    },
  },

  button: {
    maxWidth: 300,
    marginTop: "auto",
    backgroundColor: "$green500",
    border: 0,
    color: "$white",
    borderRadius: 8,
    padding: "1.25rem",
    fontWeight: "bold",
    fontSize: "$md",

    "&:hover": {
      backgroundColor: "$green300",
    },

    "&:disabled": {
      filter: "brightness(0.6)",
      cursor: "not-allowed",
    },
  },
});

export const CartImgContainer = styled("a", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 80,
  height: 80,

  img: {
    width: "auto",
    height: "auto",
  },
});

export const CartItemContainer = styled("tr", {
  td: {
    borderTop: "1px solid white",
    borderBottom: "1px solid white",
    padding: "1rem",
    textAlign: "center",

    a: {
      display: "flex",
    },
  },
});
