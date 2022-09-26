import { styled } from "..";

export const ArrowSvg = styled("svg", {
  width: "30px",
  height: "30px",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  "-webkit-transform": "translateY(-50%)",
  fill: "#fff",
  cursor: "pointer",
  zIndex: "1",

  variants: {
    side: {
      left: {
        left: "5px",
      },
      right: {
        left: "auto",
        right: "5px",
      },
    },
    disabled: {
      isDisabled: {
        fill: "rgba(100, 100, 100, 0.5)",
      },
    },
  },
});
