import React, { useEffect, useState } from "react"
import index from "./index.css";
import {styles} from "./styles";
import pic from "./icflowwersacc.gif";




export function About() {

  return (
      <main>
        <head>
            <link type="text/css" rel="stylesheet" href={index} />
        </head>
        <body>
            <div id='about' style={styles.about}>This minter was made for the Motoko Bootcamp, to mint you need to buy $FLOWER tokens, to get them you need to blick on the button at the left of the screen please read more about it in my <a href="https://github.com/torates" target="_blank">github</a></div>
            
        </body>
      </main>
    )
}