require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "KZUaQ0B9KCzGCeKzOeqHtSemk1LNzJioM";
const GOERLI_PRIVATE_KEY = "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/ZUaQ0B9KCzGCeKzOeqHtSemk1LNzJioM`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
