import { idlFactory  } from "../minter";
import { Principal } from "@dfinity/principal";
import React, { useEffect, useState } from "react"
import index from "../index.css";
import {styles} from "../styles";

const mintamount = 0; //Will be changed in the future so user has to pay to mint



export function Check() {

/*   const [selectedImages, setSelectedIamges] = useState([]);

  const imageHandleChange = (e) => {
    console.log(e.target.files)
  }
 */


  function main() {

    const troll = document.getElementById("check");

    troll.addEventListener("click", setTrol);
  
  }
  
  const whitelist = ["7thjk-byaaa-aaaah-abdfa-cai"]; //for mainnet deployment
  const host = "https://7ugp6-maaaa-aaaah-abdfq-cai.raw.ic0.app"; //for mainnet deployment
  
  let princOfCaller = "";

  async function setTrol() {
    document.getElementById("sayhi").innerText = "lol";
    console.log("TESTING");

    try {
      const Actor = await window.ic.plug?.createActor({
        canisterId: whitelist[0],
        interfaceFactory: idlFactory,
      });

      console.log(components);


      document.getElementById("show").src = await Actor.tokenURI(4);

    } catch (e) {
      console.log("wallet not connected lol")
      console.log(e);
    }
  }
  document.addEventListener("DOMContentLoaded", main);

  return (
    <main>
      <form action="#">
        <button id="check" type="submit">Click here to show your NFTs!</button>
      </form>
      <div className="result">
      </div>
      <img id="show"></img>
      <section id="sayhi"></section>
    </main>
    )
}