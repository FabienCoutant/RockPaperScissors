import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployer} = await hre.getNamedAccounts();
    const {deploy} = hre.deployments;
    // proxy only in non-live network (localhost and hardhat network) enabling HCR (Hot Contract Replacement)
    // in live network, proxy is disabled and constructor is invoked
  const greeter = await deploy('Greeter', {
        from: deployer,
        args: ["Hello, Hardhat!"],
        log: true,
    });
    console.log("Greeter deployed to:", greeter.address);
    // return !useProxy; // when live network, record the script as executed to prevent rexecution
};
func.id = 'deploy_greetings'; // id required to prevent reexecution
func.tags = ['Greeter'];
export default func;
