const TokenInfoArray = [
    {
      'DAI': {
          "token_symbol":"DAI",
          "token_contract_address":"0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
          "decimals": 18
      },'ETH': {
          "token_symbol":"ETH",
          "token_contract_address":"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          "decimals": 18
      },'SAI': {
          "token_symbol":"SAI",
          "token_contract_address":"0xC4375B7De8af5a38a93548eb8453a498222C4fF2",
          "decimals": 18
      },'KNC': {
          "token_symbol":"KNC",
          "token_contract_address":"0xad67cB4d63C9da94AcA37fDF2761AaDF780ff4a2",
          "decimals": 18
      },'ZIL': {
          "token_symbol":"ZIL",
          "token_contract_address":"0xAb74653cac23301066ABa8eba62b9Abd8a8c51d6",
          "decimals": 18
      }
    }
  ];

export async function approve(web3, tokensymbol, spender, value) {
    try{
        const accounts = await web3.eth.getAccounts();
        const contractInstance = getERCContractInstance(web3, tokensymbol);
        await contractInstance.methods.approve(
            spender,
            value
        ).send({
            from:accounts[0]
        }).on("transactionHash", (hash) => {
            alert("Transaction hash: " +  hash);
        }).once("confirmation", (confirmationCount, receipt) => {   
            alert("Transaction confirmed!")
        }).on("error", (error)=>{
            console.log(error);
        });
    }catch(err){
        console.log(err);
    }
}

export async function transfer(web3, walletAddress, tokenSymbol, to, value) {
    try{
        const accounts = await web3.eth.getAccounts();
        const contractInstance = getWalletContractInstance(web3, walletAddress);
        await contractInstance.methods.transferTokens(
            web3.utils.fromAscii(tokenSymbol),
            to,
            value
        ).send({
            from:accounts[0]
        }).on("transactionHash", (hash) => {
            alert("Transaction hash: " +  hash);
        }).once("confirmation", (confirmationCount, receipt) => {
            alert("Transaction confirmed!")
        }).on("error", (error)=>{
            console.log(error);
        });
    }catch(err){
        console.log(err);
    }
}

export async function createWallet(web3) {
    try {
        const accounts = await web3.eth.getAccounts();
        const contractInstance = getWalletFactoryContractInstance(web3);
        const addr = await contractInstance.methods.createWallet().send({
            from:accounts[0]
        }).on("transactionHash", (hash) => {
            alert("Transaction hash: " +  hash);
        }).once("confirmation", (confirmationCount, receipt) => {
            alert("Transaction confirmed!")
            alert(addr);
        }).on("error", (error)=>{
            console.log(error);
        });
    } catch(err) {
        console.log(err);
    }
}

export async function addNewTokenToWallet(web3, tokenSymbol, tokenAddress, walletAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        const contractInstance = getWalletContractInstance(web3, walletAddress);
        const addr = await contractInstance.methods.addNewToken(
            web3.utils.fromAscii(tokenSymbol),
            tokenAddress
        ).send({
            from:accounts[0]
        }).on("transactionHash", (hash) => {
            alert("Transaction hash: " +  hash);
        }).once("confirmation", (confirmationCount, receipt) => {
            alert("Transaction confirmed!")
            alert(addr);
        }).on("error", (error)=>{
            console.log(error);
        });
    } catch(err) {
        console.log(err);
    }
}

export async function removeTokenToWallet(web3, tokenSymbol, walletAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        const contractInstance = getWalletContractInstance(web3, walletAddress);
        const addr = await contractInstance.methods.removeToken(
            web3.utils.fromAscii(tokenSymbol)
        ).send({
            from:accounts[0]
        }).on("transactionHash", (hash) => {
            alert("Transaction hash: " +  hash);
        }).once("confirmation", (confirmationCount, receipt) => {
            alert("Transaction confirmed!")
            alert(addr);
        }).on("error", (error)=>{
            console.log(error);
        });
    } catch(err) {
        console.log(err);
    }
}

export async function getWalletAddressbyOwner(web3, address) {
    try {
        const accounts = await web3.eth.getAccounts();
        const contractInstance = getWalletFactoryContractInstance(web3);
        const addr = await contractInstance.methods.getWalletAddressbyOwner(address).call();
        return addr;
    } catch(err) {
        console.log(err);
    }
    return;
}

export async function getOwnerAddressByWallet(web3, address) {
    try {
        const contractInstance = getWalletFactoryContractInstance(web3);
        const addr = await contractInstance.methods.getOwnerAddressByWallet(address).call();
        return addr;
    } catch(err) {
        console.log(err);
    }
    return;
}

function getERCContractInstance(web3, tokenSymbol) {
    const abi ='[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]';
    const address = TokenInfoArray[0][tokenSymbol].token_contract_address;
    const jsonAbi = JSON.parse(abi);
    const contract = new web3.eth.Contract(jsonAbi, address);    
    return contract;
}

function getWalletContractInstance(web3, address) {
    const abi ='[{"constant":false,"inputs":[{"internalType":"bytes32","name":"symbol_","type":"bytes32"},{"internalType":"address","name":"address_","type":"address"}],"name":"addNewToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"symbol_","type":"bytes32"}],"name":"removeToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from_","type":"address"},{"indexed":true,"internalType":"address","name":"to_","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"TransferFailed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from_","type":"address"},{"indexed":true,"internalType":"address","name":"to_","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"TransferSuccessful","type":"event"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"symbol_","type":"bytes32"},{"internalType":"address","name":"to_","type":"address"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"transferTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ERC20Interface","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gets","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner2","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"tokens","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"transactionIndexesToSender","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"transactions","outputs":[{"internalType":"address","name":"contract_","type":"address"},{"internalType":"address","name":"to_","type":"address"},{"internalType":"uint256","name":"amount_","type":"uint256"},{"internalType":"bool","name":"failed_","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]';
    const jsonAbi = JSON.parse(abi);
    const contract = new web3.eth.Contract(jsonAbi, address);    
    return contract;
}

function getWalletFactoryContractInstance(web3) {
    const abi ='[{"constant":false,"inputs":[],"name":"createWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_walletAddress","type":"address"}],"name":"getOwnerAddressByWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_ownerAddress","type":"address"}],"name":"getWalletAddressbyOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWalletAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isOwnerHasWallet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ownerToWalletMapping","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"walletToOwnerMapping","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]';
    const address = '0xe81e7A72e8fB9D20ceC14c82De3e0252e64d9093';
    const jsonAbi = JSON.parse(abi);
    const contract = new web3.eth.Contract(jsonAbi, address);    
    return contract;
}