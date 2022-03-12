# minter

Thank you for the Motoko bootcamp!

DISCLAIMER: The code needs to be cleaned by a LOT, so please be prepared to read very badly written code.

The minter let's you generate a random NFT, by generating an array of numbers from a random seed and using it to determine each trait, then generating them as a SVG. The functionality to show the pictures on the site will be added later as sadly time ran out before I could implement it, for now to see the NFTs you will be taken to another page which will https serve it to you.

The $FLOWERS token is an actual token on the Internet Computer using a heavily modified DIP20 standard. It could be improved with functionalities, like NFT staking, liquidity mining and so on so on. The only way to get it is by buying with ICP, currently at a set price of 500FLOWERS per 0.01 ICP (each mint).

The integration with the IC Ledger and the Token were hard to implement, but by far the hardest thing was to verify the ICP payments > transfer $FLOWERS > mint NFT. The verification system could be hugely improved and can scale if instead of receiving payments to one single account, received payments to different generated subaccounts each time.



I sadly softbricked my linux in the middle of the project, so there may be some issues cloning the repo/with the package json, so after running 
```npm install```
You might need to run
```npm install react-router-dom```
and 
```npm install vite```

My discord is iri#1598.
Thank you a lot for the huge opportunity, love you guys!
