import { idlFactory  } from "./minter";
import { Principal } from "@dfinity/principal";
import React, { useEffect, useState } from "react"
import logo from "./logo.png";
import index from "./index.css";
import { styles } from "./styles";




export function Mint() {

  
  async function main() {

  
    const generatebut = document.getElementById("mintbut");

    generatebut.addEventListener("click", genrateNft);
  }
  
  const whitelist = ["7thjk-byaaa-aaaah-abdfa-cai", "6xkgy-yyaaa-aaaah-abdda-cai"]; //for mainnet deployment
  const host = "https://7ugp6-maaaa-aaaah-abdfq-cai.raw.ic0.app"; //for mainnet deployment
  
  let princOfCaller = "";
  
  
  async function genrateNft(el) {

    const isConnected = await window.ic.plug.isConnected();

    if(!isConnected) {
      console.log("not connected");
      el.target.textContent = "Please connect your wallet";
      el.target.disabled = false;
      setTimeout(function () {
        el.target.textContent = "Click me!";
        
      }, 5000);
    } else if(isConnected){
      console.log("is connected, initiating transfer")
      await window.ic.plug.createAgent({whitelist, host});
  
      await window.ic.plug.agent.fetchRootKey();
      
      const Actor = await window.ic.plug?.createActor({
        canisterId: whitelist[0],
        interfaceFactory: idlFactory,
      });
    
      console.log('minting actor created...')

      el.target.textContent = "Preparing"
    

      const prin = await window.ic.plug.agent.getPrincipal();
      var principalId = prin.toString();
      princOfCaller = principalId;

      //get 4 random nums, this code is based from a stack overflow answer, i'm not the author
      //my random in motoko was being very weird to work with (vessel OS13 not permitted as well), so i decided to pass from JS.
      //passing randnum from frontend poses security risks, so I will probably update this repo with a new method

      const pRnd = (p) => {
        const mul = (n, m) => {
          return Math.floor(n * m);
        };
        const sfc32 = (a, b, c, d) => {
          return function () {
            a >>>= 0;
            b >>>= 0;
            c >>>= 0;
            d >>>= 0;
            var t = (a + b) | 0;
            a = b ^ (b >>> 9);
            b = (c + (c << 3)) | 0;
            c = (c << 21) | (c >>> 11);
            d = (d + 1) | 0;
            t = (t + d) | 0;
            c = (c + t) | 0;
            return (t >>> 0) / 4294967296;
          };
        };
        const xmur3 = (str) => {
          for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
            h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
            h = (h << 13) | (h >>> 19);
          }
          return function () {
            h = Math.imul(h ^ (h >>> 16), 2246822507);
            h = Math.imul(h ^ (h >>> 13), 3266489909);
            return (h ^= h >>> 16) >>> 0;
          };
        };
        // eslint-disable-next-line
            const getRandomNumbersFromSeed = (params) => {
          let seed = xmur3(params);
          let rand = sfc32(seed(), seed(), seed(), seed());
          return {
            seed_used: params,
            output: [
              mul(rand(), 3000),
              mul(rand(), 3000),
              mul(rand(), 3000),
              mul(rand(), 3000),
            ],
          };
        };
        return getRandomNumbersFromSeed(p);
      };

      
      const randomElement = Math.random().toString(36).slice(2, 5); //minimal chance of returning an empty string, note to self: implement new rand string algo
      
      el.target.textContent = "Generating..."
      
      const randomArr = pRnd(randomElement);

      console.log(randomArr);

      const bigar = [BigInt(randomArr.output[0]), BigInt(randomArr.output[1]), BigInt(randomArr.output[2]), BigInt(randomArr.output[3])]

      const mint1 = await Actor.mintWithFlowers(bigar);
      
      console.log("end of mint")

      el.target.textContent = "Serving..."

      console.log(mint1)

      

      if(mint1 != 9999) {

        
        
        const princ = await window.ic?.plug?.getPrincipal()

        el.target.textContent = "Success..."

        const newBal = await Actor.getBalanceFlowers(princ)

        document.getElementById("flowerBalance").innerHTML = newBal.toString() + "$FLOWERS"
        document.getElementById("nftAnch").href = "https://7thjk-byaaa-aaaah-abdfa-cai.raw.ic0.app/?tokenid=" + mint1.toString();
        document.getElementById("idframe").src = "https://7thjk-byaaa-aaaah-abdfa-cai.raw.ic0.app/?tokenid=" + mint1.toString();
        document.getElementById("nftAnch").innerHTML = "Your NFT has been generated, please click here to see it on-chain"
      } else {
        el.target.textContent = "Error!"
        document.getElementById("nftAnch").innerHTML = "";
        document.getElementById("greeting").innerHTML = "Something went wrong, check you have enough $FLOWERS";
        
      }
    }



    


  };

  document.addEventListener("DOMContentLoaded", main);
  
  return (

    <main style={styles.app}>
      <img id="nft" src={logo} alt="DFINITY logo" style={styles.img}></img>
      <div id="mintDialog">
        <label for="add" style={styles.mintxt}>Mint your ICFlowers NFT here. &nbsp;</label>
        <button id="mintbut" type="submit">Click Me!</button>
      </div>
      <div id="shadowBox">
        <h2 id="greeting"><a id="nftAnch" target="_blank"></a></h2>
      </div>
      <iframe id="idframe" style={styles.appframe} src="" title="NFT"></iframe> 
      <section id="balance"></section>
    </main>

    )
  

}

  

