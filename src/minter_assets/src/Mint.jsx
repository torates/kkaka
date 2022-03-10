import { idlFactory  } from "./minter";
import { Principal } from "@dfinity/principal";
import React, { useEffect, useState } from "react"
import logo from "./logo.png";
import index from "./index.css";
import { styles } from "./styles";
const mintamount = 0; //Will be changed in the future so user has to pay to mint



export function Mint() {
  function main() {

  
    const generatebut = document.getElementById("mintbut");

    generatebut.addEventListener("click", genrateNft);
  }
  
  const whitelist = ["7thjk-byaaa-aaaah-abdfa-cai"]; //for mainnet deployment
  const host = "https://7ugp6-maaaa-aaaah-abdfq-cai.raw.ic0.app"; //for mainnet deployment
  
  let princOfCaller = "";
  
  var thisActor = undefined;
  
  async function genrateNft() {
  
    await window.ic.plug.createAgent({whitelist, host});
  
    await window.ic.plug.agent.fetchRootKey();
  
    const Actor = await window.ic.plug?.createActor({
      canisterId: whitelist[0],
      interfaceFactory: idlFactory,
    });
  
    console.log('minting actor created...')
  
    const name = document.getElementById("name").value.toString();
    const mint = await Actor.mint(name);
    console.log("minted...");
    const mintId = mint.toString();
    console.log("this id is" + mintId);

    const prin = await window.ic.plug.agent.getPrincipal();
    var principalId = prin.toString();
    princOfCaller = principalId;
  
    document.getElementById("nft").src = await Actor.tokenURI(mint);
    document.getElementById("greeting").innerText = "this nft owner is " + princOfCaller + "\nthis token id is " + mintId;
  }

  document.addEventListener("DOMContentLoaded", main);
  
  return (

    <main>
      <img id="nft" src={logo} alt="DFINITY logo"/>
      <form action="#">
        <label for="add" style={styles.mintxt}>Mint your ICFlowers NFT here. &nbsp;</label>
        <button id="mintbut" type="submit">Click Me!</button>
      </form>
      <section id="greeting"></section>
      <section id="balance"></section>
    </main>

    )
  

}


  //const name = document.getElementById("name").value.toString();

  //button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  //const greeting = await minter.greet(name);

  //button.removeAttribute("disabled");

  

