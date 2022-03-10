const app = {
    border: "2px solid red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }

  const column = {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  }

const main = {
    minHeight: "100%",
    maxHeight: "auto",
    width: "100%",
    backgroundColor: "#272c34",
    marginTop: "1rem",
  }

const img = {
  width: "320px",
  height: "180px",
  objectFit: "cover",
  padding: "0.75rem",   
  margin: "1em",
  borderRadius: "15px"
}

const mintxt = {
    fontFamily: 'sans-serif',
    fontSize: '1.5rem',
    color: "antiquewhite"
}

const foot = {
    width: "100%"
}

const navbar = {
    width: "100%"
}

const about = {
    fontFamily: 'sans-serif',
    fontSize: '1.5rem',
    color: "antiquewhite",
    width: "100%",
}

  export const styles = {
      app: app,
      img: img,
      mintxt: mintxt,
      about: about,
      column: column,
      foot: foot,
      navbar: navbar
  }