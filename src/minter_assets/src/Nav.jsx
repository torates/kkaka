import { idlFactory  } from "./minter";
import React, { useEffect, useState } from "react";
import flowerLogo from "./png.png";
import index from "./index.css";
import {styles} from "./styles";
import pic from "./icflowwersacc.gif";





export function Nav() {

  const flowerAmount = 1_000_000;
  const whitelist = ["7thjk-byaaa-aaaah-abdfa-cai", "6xkgy-yyaaa-aaaah-abdda-cai"]; //for mainnet deployment
  const host = "https://7ugp6-maaaa-aaaah-abdfq-cai.raw.ic0.app"; //for mainnet deployment

    async function main() {
        const button = document.getElementById("connect");
      
        button.addEventListener("click", onButtonPress);

        const buyflow = document.getElementById("buyflow");
      
        buyflow.addEventListener("click", buyFlow);

        const refbut = document.getElementById("butRes");

        refbut.addEventListener("click", refere);

        await refere();        
      }
      
/*     async function getFlowBalance() {
      const isConnected = await window.ic.plug.isConnected();
      if(isConnected) {
        return await Actor.
      };
    } */

    async function refere() {
      await window.ic.plug.createAgent({whitelist, host});
        console.log("agent creat")
        const isConnected = await window.ic.plug.isConnected();
        if(isConnected) {
          const Actor = await window.ic.plug?.createActor({
            canisterId: whitelist[0],
            interfaceFactory: idlFactory,
          });
          console.log("actor created")
          const princ = await window.ic?.plug?.getPrincipal()
          console.log("princ set")
          const newBal = await Actor.getBalanceFlowers(princ)
          document.getElementById("flowerBalance").innerHTML = newBal.toString() + " $FLOWERS"
        }
    }
    
    async function onButtonPress(el) {
        el.target.disabled = true;
      
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
      
        console.log('actor created');
      
        const princ = await window.ic?.plug?.getPrincipal()

        const newBal = await Actor.getBalanceFlowers(princ)

        document.getElementById("flowerBalance").innerHTML = newBal.toString() + " $FLOWERS"

        setTimeout(function () {
          el.target.disabled = false;
        }, 5000);
      };

    async function buyFlow(el) {
      el.target.disabled = true;
      const isConnected = await window.ic.plug.isConnected();

      if(!isConnected) {
        console.log("not connected");
        el.target.textContent = "Please connect your wallet";
        el.target.disabled = false;
        setTimeout(function () {
          el.target.textContent = "Buy $FLOWER";
          
        }, 5000);
      } else if(isConnected){
        console.log("is connected, initiating transfer")
        const requestTransferArg = {
          to: "hhrey-ownwx-arrfr-hsr3l-qr566-qzdzo-2xn2l-q5amz-qetzm-3zjvn-tae",
          amount: flowerAmount,
        };

        console.log("Will transfer now...")

        await window.ic.plug.createAgent({whitelist, host});
      
        await window.ic.plug.agent.fetchRootKey();
        const Actor = await window.ic.plug?.createActor({
          canisterId: whitelist[0],
          interfaceFactory: idlFactory,
        });

        el.target.textContent = "Preparing"
        console.log("Agent/Actor live")

        const princ = await window.ic?.plug?.getPrincipal()

        const prevBal = await Actor.getBalanceFlowers(princ);
        console.log(prevBal);
        el.target.disabled = false;
        el.target.textContent = "Transfer requested"
        const transfer = await window.ic?.plug?.requestTransfer(requestTransferArg);

        el.target.textContent = "Waiting for ledger..."; 

        if (transfer['height'] !== undefined) {
          console.log("transfer completed, now to verify")
          if(await Actor.confirmPayed(500)) {
            const newBal = await Actor.getBalanceFlowers(princ);
            console.log("in verification loop")
            document.getElementById("flowerBalance").innerHTML = newBal.toString() + " $FLOWERS"
            el.target.textContent = `500 $FLOWERS bought for ${flowerAmount} e8s (0.01 ICP)`;
          };
        } else if (transferStatus === 'PENDING') {
          el.target.textContent = "Plug wallet is pending.";
        } else {
          el.target.textContent = "Plug wallet failed to transfer";
        }
      }
      

    };

      document.addEventListener("DOMContentLoaded", main);


  return (

    <main id="mainnav" style={styles.main}>
        <div id="flowerStatus" style={styles.flowerstatus}>
          <img id="flowerLogo" src={flowerLogo} alt="Flower Coin Logo" style={styles.flowerLogo}></img>
          <div id="flowerBalance" style={styles.mintxt}>(loading) $FLOWERS</div>
          <button id="butRes" type="submit">Refresh</button>
        </div>
        <li>
            <button id="buyflow" type="submit">Buy $FLOWER</button>
        </li>
        <li>
            <button id="connect" type="submit">Connect to plug</button>
        </li>
    </main>
    )
}