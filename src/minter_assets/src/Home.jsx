import { idlFactory  } from "./minter";
import { Principal } from "@dfinity/principal";
import React, { useEffect, useState } from "react"
import index from "./index.css";
import {styles} from "./styles";
import pic from "./icflowwersacc.gif";




export function Home() {

  return (

    <main>
        <img id="nft" src={pic} alt="NFT logo"/>
        <button id="mintbut" type="submit"><a href="/mint">Click here to mint a random NFT!</a></button>
        <button id="mintbut" type="submit"><a href="/check">Click here to check your NFTs</a></button>
        <div className="result">
        </div>
        <section id="sayhi"></section>
    </main>

    )
}