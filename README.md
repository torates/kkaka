# minter
![MINTER](https://7ugp6-maaaa-aaaah-abdfq-cai.raw.ic0.app/assets/icflowwersacc.2f37c91e.gif)
## Test live version [here](https://7ugp6-maaaa-aaaah-abdfq-cai.raw.ic0.app/) 

Thank you for the Motoko bootcamp!

DISCLAIMER: The code needs to be cleaned by a LOT, so please be prepared to read very badly written code.

The minter let's you mint a random NFT, by generating an array of numbers from a random seed and using it to determine each trait, then generating them as an SVG. The functionality to show the pictures on the site will be improved later as sadly time ran out before I could do so, for now a simple but powerful iFrame (that https serves you the token) should suffice!

The $FLOWERS token is an actual token on the Internet Computer, using a heavily modified DIP20 standard. It could be improved with functionalities, like NFT staking, liquidity mining and so on so on. The only way to get it is by buying with ICP, currently at a set price of 500FLOWERS per 0.01 ICP (each mint). It works as a great access control mechanism as well.

The integration with the IC Ledger and the Token were hard to implement, but by far the hardest thing was to verify the ICP payments > transfer $FLOWERS > mint NFT. The verification system could be hugely improved and can scale if instead of receiving payments to one single account, received payments to different generated subaccounts each time.



I sadly softbricked my linux in the middle of the project, so there may be some issues cloning the repo/with the package json, so after running 
```npm install```
You might need to run
```npm install react-router-dom```
and 
```npm install vite```

My discord is iri#1598.
Thank you a lot for the huge opportunity, love you guys!

# Usage

The first thing to do is deploying your fungible token.
You can deploy the $FLOWERS token canister with 

```dfx deploy token --network ic --argument "(\"$logo\", \"Flowers\", \"FLOWERS\", 3, 99999, principal \"$(dfx identity get-principal)\")"``` 

Then, you need to deploy the minter like this:

```dfx deploy minter_assets --network ic --argument "(principal \"$(dfx identity get-principal)\", \"FlowersNFT\", \"NFLOWERT\")"```

After your canister is up and running, you have to initialize the verification balance chain with

```dfx canister --network ic call minter setBalance```

# Regarding verification

The current system, as exposed before can be made to scale 'horizontally' so to say, if a generation of subaccounts is implemented and one is created for each particular payment to verify. This would let (theoretically) the system not break under such a low volume of TXs.

Current system presents problems if as little as 3 people try to mint at very close intervals of time.

# $FLOWERS

As stated before, this token works under a modified DIP20 standard. It currently posesses no special functionality, but they could be freely implemented - making the NFT collection much more complete.

For example, could make users who stake their flower (isInStakingPool) receive a set amount every epoch, or could make them have to pay in $FLOWERS to buy an accessory and add to [Nat] of properties. (Would love to have implemente the later option, but time was scarce)

# Why ICP?

I decided to not use the bootcamp faucet, as I believe that working with ICP is a mandatory skill needed to actually fund projects on the IC, what this means is if the payment verification system is improved (via the method I proposed before), this site could be used as a template to make public sales with more volume. It also adds a degree of complexity, especially since working with the ledger can be such a hassle sometimes.
