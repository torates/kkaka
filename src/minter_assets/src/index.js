import { minter } from "../../declarations/minter";
const mintamount = 0; //Will be changed in the future so user has to pay to mint



function main() {
  const button = document.getElementById("connect");

  const addbutton = document.getElementById("add");

  const generatebut = document.getElementById("generate");

  button.addEventListener("click", onButtonPress);
  addbutton.addEventListener("click", getBalances);
  generatebut.addEventListener("click", genrateNft);
}

const canisters = ["ai7t5-aibaq-aaaaa-aaaaa-c"]; //for mainnet deployment
const host = "https://mainnet.dfinity.network"; //for mainnet deployment

let princOfCaller = "";

async function onButtonPress(el) {
  el.target.disabled = true;

  const isConnected = await window.ic.plug.isConnected();

  if(!isConnected) {
    await window.ic.plug.requestConnect();
  }

  console.log('requesting connection..');

  if (!window.ic.plug.agent) {
    await window.ic.plug.createAgent();
    console.log('agent created');
  }
  
  const prin = await window.ic.plug.agent.getPrincipal();
  var principalId = prin.toString();
  princOfCaller = prin;

  if (isConnected) {
    console.log('Plug wallet is connected');
  } else {
    console.log('Plug wallet connection was refused')
  }

  setTimeout(function () {
    el.target.disabled = false;
  }, 5000);
}

async function genrateNft() {
  const name = document.getElementById("name").value.toString();
  const mint = await minter.mint(name);
  console.log("minted...");
  const mintId = mint.toString();
  console.log("this id is" + mintId);

  document.getElementById("nft").src = await minter.tokenURI(mint);
  document.getElementById("greeting").innerText = "this nft owner is " + princOfCaller + "\nthis token id is " + mintId;
}

async function getBalances() {
  // doenst work yet

  const name = document.getElementById("add").value.toString();
  const balances = await minter.balanceOf(princOfCaller);
  
  console.log("balances");



}



document.addEventListener("DOMContentLoaded", main);

  //const name = document.getElementById("name").value.toString();

  //button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  //const greeting = await minter.greet(name);

  //button.removeAttribute("disabled");

  

