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

  async function setTrol(el) {
        const isConnected = await window.ic.plug.isConnected();
      
        console.log('requesting connection..');
      
        if(!isConnected) {
          const pubKey = await window.ic.plug.requestConnect({
            whitelist: ["7thjk-byaaa-aaaah-abdfa-cai", "6xkgy-yyaaa-aaaah-abdda-cai"],
            host: "https://7ugp6-maaaa-aaaah-abdfq-cai.raw.ic0.app",
      });
          console.log("plug connected");
        } else if (isConnected) {
          console.log('Plug wallet is already connected');
        } else {
          console.log('Plug wallet connection was refused')
        }
      
        await window.ic.plug.createAgent({whitelist, host});
      
        await window.ic.plug.agent.fetchRootKey();
      
        console.log('agent created');
      
      
        const Actor = await window.ic.plug?.createActor({
          canisterId: whitelist[0],
          interfaceFactory: idlFactory,
        });

        el.target.textContent = "Loading";
      
        console.log('actor created');
      
        const princ = await window.ic?.plug?.getPrincipal()

        const last = await Actor.tokenPknow();

        const lastOwner = await Actor.ownerOf(last);

        const totalSpent = await Actor.totalSpent(princ);


        document.getElementById("nftAnch2").href = "https://7thjk-byaaa-aaaah-abdfa-cai.raw.ic0.app/?tokenid=" + last.toString();
        document.getElementById("nftAnch2").innerHTML = "Last NFT minted"

        document.getElementById("heowns").innerHTML = "Owned by " + lastOwner;

        document.getElementById("spent").innerHTML = "You have spent " + totalSpent.toString() + " :)";







        el.target.textContent = "Success";
  }
  document.addEventListener("DOMContentLoaded", main);

  return (
    <main style={styles.app}>
      <div id="checkDialog">
        <button id="check" type="submit">Click here to show stats!</button>
      </div>
      <div className="result">
        <a id="nftAnch2" target="_blank"></a>
        <h2 id="heowns" style={styles.mintxt}></h2>
        <h2 id="spent" style={styles.mintxt}></h2>
      </div>
      <img id="show"></img>
      <section id="sayhi"></section>
    </main>
    )
}