# Instcryp

## What is instcryp?
Instcryp is crypto wallet library. you can create your own crypto wallet in easy steps and you can integrate this wallet in your dapp or app as a payment gatway or any other use case.


## Installation

`npm i instcryp --save`

Then...

## Steps to create wallet and how to add token.  

1. First Create wallet  
```
import {createWallet} from 'instcryp';

// use this method to create wallet 
// pass your web3 instance as a parameter
await createWallet(web3); 

```

2. Get Wallet address  
```
import {getWalletAddressbyOwner} from 'instcryp';

// use this method to get your wallet address 
// pass your web3 instance as a parameter
// pass your metamask account address
const walletAddress = await getWalletAddressbyOwner(web3, accounts[0]);
```

3. Use your wallet address to add your token
4. add token using,  
    - tokensymbol
    - tokenaddress
```
import {addNewTokenToWallet} from 'instcryp';

// use this method to get your wallet address 
// pass your web3 instance as a parameter
// pass tokensymbol (e.g. DAI, KNC etc.)
// pass tokenaddress of token 
const walletAddress = await addNewTokenToWallet(web3, tokensymbol, tokenaddress);

```
#### Your wallet is created:)

## How to use after wallet creation?

1. approve token to wallet address from your address
```
import {approve} from 'instcryp';

// use this method to get your wallet address 
// pass your web3 instance as a parameter
// pass tokensymbol (e.g. DAI, KNC etc.)
// pass spender address to give allowance to this address
// pass value to give allowance to spend
await approve(web3, tokensymbol, spender, value);
```

2. After approve transfer approved token to recipient(toaddress) address. 
```
import {transfer} from 'instcryp';

// use this method to get your wallet address 
// pass your web3 instance as a parameter
// pass walletaddress
// pass tokensymbol (e.g. DAI, KNC etc.)
// pass toaddress address to send value
// pass value 
await transfer(web3, walletAddress, tokenSymbol, toaddress, value);
```

#### [Click here to Instcryp npmjs link](https://www.npmjs.com/package/instcryp)

*This wallet library is only on kovan network.*


