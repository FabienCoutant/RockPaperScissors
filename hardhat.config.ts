import "dotenv/config";
import {HardhatUserConfig} from "hardhat/types";
import "@nomiclabs/hardhat-etherscan";
import '@typechain/hardhat'
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers'
import "hardhat-gas-reporter";
import "solidity-coverage";
import {node_url, accounts} from './utils/network';


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
      accounts: accounts(),
    },
    localhost: {
      url: node_url('localhost'),
      accounts: accounts(),
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: 'typeChain',
    target: 'ethers-v5',
    alwaysGenerateOverloads: true,
  },
};

export default config;
