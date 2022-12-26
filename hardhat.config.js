require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "";
const GOERLI_PRIVATE_KEY = "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
