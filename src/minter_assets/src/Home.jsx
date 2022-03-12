import { idlFactory  } from "./minter";
import { Principal } from "@dfinity/principal";
import React, { useEffect, useState } from "react"
import index from "./index.css";
import {styles} from "./styles";
import pic from "./icflowwersacc.gif";




export function Home() {

  return (

    <main style={styles.app}>
        <a href="#" target="_blank"><img id="nft" src={pic} alt="NFT logo" style={styles.img}></img></a>
        <button id="gomint" type="submit"><a href="/mint">Click here to mint a random NFT!</a></button>
        <button id="gocheck" type="submit"><a href="/check">Click here to check NFT details</a></button>
        <div className="result">
        </div>
        <section id="sayhi"></section>
    </main>

    )
}