import sizes from "./sizes"
import bg from "./bg.svg";
export default {
//using global u can use the cls styles anywhere, it doenst get prefixed with JSX
  "@global": {
    ".fade-exit": {
      opacity: 1
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-out"
    }
  },  
    root: {
      backgroundColor: "blue",
      height: "100vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
         /* background by SVGBackgrounds.com */
      backgroundColor: "#331010",
      backgroundImage: `url(${bg})`,
      overflow: "scroll"
    },
    heading:{
      fontSize : "1.5rem"
    },
    container: {
      width: "50%",
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column",
      flexWrap: "wrap",
      [sizes.down("xl")]: {
        width: "80%"
      },
      [sizes.down("xs")]: {
        width: "75%"
      }
    },
    nav: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      color: "white",
      alignItems: 'center',
      "& a": {
        color: "white"
      }
    },
    palettes: {
      boxSizing: "border-box",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(3, 30%)",
      gridGap: "5%",
      [sizes.down("md")]: {
        gridTemplateColumns: "repeat(2, 50%)"
      },
      [sizes.down("xs")]: {
        gridTemplateColumns: "repeat(1, 100%)",
        gridGap: "1rem"
      }
    }
  };