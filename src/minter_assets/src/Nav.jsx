import { idlFactory  } from "./minter";
import React, { useEffect, useState } from "react"
import index from "./index.css";
import {styles} from "./styles";
import pic from "./icflowwersacc.gif";




export function Nav() {

    function main() {
        const button = document.getElementById("connect");
      
        button.addEventListener("click", onButtonPress);
      }

            
    const whitelist = ["7thjk-byaaa-aaaah-abdfa-cai"]; //for mainnet deployment
    const host = "https://7ugp6-maaaa-aaaah-abdfq-cai.raw.ic0.app"; //for mainnet deployment
    
    let princOfCaller = "";
    
    var thisActor = undefined;
    

    async function onButtonPress(el) {
        el.target.disabled = true;
      
        const isConnected = await window.ic.plug.isConnected();
      
        console.log('requesting connection..');
      
        if(!isConnected) {
          const pubKey = await window.ic.plug.requestConnect({
            whitelist: ["7thjk-byaaa-aaaah-abdfa-cai"],
            host: "https://7ugp6-maaaa-aaaah-abdfq-cai.raw.ic0.app",
      });
          console.log("plug connected");
        } else if (isConnected) {
          const pubKey = await window.ic.plug.requestConnect({
            whitelist: ["7thjk-byaaa-aaaah-abdfa-cai"],
            host: "https://7ugp6-maaaa-aaaah-abdfq-cai.raw.ic0.app",});
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
      
        console.log('actor created');
      
        thisActor = Actor;

        let num = await Actor.getRand();
        console.log(num);
      
        
        
      
      
        setTimeout(function () {
          el.target.disabled = false;
        }, 5000);
      }

      document.addEventListener("DOMContentLoaded", main);


  return (

    <body>
        <li>
            <button type="submit">Buy $FLOWER</button>
        </li>
        <li>
            <button id="connect" type="submit">Connect to plug</button>
        </li>
        <li>
        </li>
        <li>
        </li>
    </body>
    )
}