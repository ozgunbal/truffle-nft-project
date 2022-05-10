# ND1309 C2 Ethereum Smart Contracts, Tokens and Dapps - Project Starter 
**PROJECT: Decentralized Star Notary Service Project** - For this project, you will create a DApp by adding functionality with your smart contract and deploy it on the public testnet.

### Project Details

1) ERC-721 Token Name: Star Notary
2) ERC-721 Token Symbol: STN
3) Version of the Truffle and OpenZeppelin (and other dependencies) used
    - truffle: 5.5.13
    - @openzeppelin/contracts: 4.6.0
    - @truffle/hdwallet-provider: 2.0.8
4) Token Address on the Rinkeby Network: 0xc37D6be1F3D521591A38f69859dD7B1e234761a9
5) Additional Info:
    - Default Development RPC URL: http://127.0.0.1:8545/
    - Due to up-to-date ERC721 contract, solidity should be `^0.8.0`. In addition, user should approve token sale or transfer if it'll be done by other person (comments are added for this situation)
    - Metamask version: 10.14.2
    - Example token at Rinkeby Network: `tokenId: 666, name: Heavy Metal`


### Run the application
1. Clean the frontend 
```bash
cd app
# Remove the node_modules  
# remove packages
rm -rf node_modules
# clean cache
npm cache clean
# install all modules listed as dependencies in package.json
npm install
```


2. Start Truffle by running
```bash
# For starting the development console
npx truffle develop
# truffle console

# For compiling the contract, inside the development console, run:
compile

# For migrating the contract to the locally running Ethereum network, inside the development console
migrate --reset

# For running unit tests the contract, inside the development console, run:
test
```

3. Frontend - Once you are ready to start your frontend, run the following from the app folder:
```bash
cd app
npm run dev
```

---

### Important
When you will add a new Rinkeyby Test Network in your Metamask client, you will have to provide:

| Network Name | New RPC URL | Chain ID |
|---|---|---|
|Localhost 8545|`http://127.0.0.1:8545/`|1337 |

The chain ID above can be fetched by:
```bash
cd app
node index.js
```
