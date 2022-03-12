const app = {
    borderRadius:"15px",
    boxShadow:"0px 15px 35px rgba(0,0,0,.3)",
    margin:"2em auto",
    maxWidth:"600px",
    width:"100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    width: "100%"
  }

  const appframe = {
    borderRadius:"15px",
    boxShadow:"0px 15px 35px rgba(0,0,0,.3)",
    margin:"2em auto",
    maxWidth:"600px",
    width:"100%",
    height: "640px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
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
    marginTop: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }

const img = {
  objectFit: "cover",  
  margin: "1em",
  borderRadius: "15px",
  maxWidth: "50vw",
  maxHeight: "25vw",
  display: "block",
  margin: "auto"
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
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%"
}

const about = {
    fontFamily: 'sans-serif',
    fontSize: '1.5rem',
    color: "antiquewhite",
    width: "100%"
    
}

const flowerLogo = {
  width: "40px",
  height: "40px",
  objectFit: "cover"
}

const flowerStatus = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "nowrap"
}

  export const styles = {
      app: app,
      appframe: appframe,
      img: img,
      mintxt: mintxt,
      main: main,
      about: about,
      column: column,
      foot: foot,
      navbar: navbar,
      flowerLogo: flowerLogo,
      flowerStatus: flowerStatus
  }