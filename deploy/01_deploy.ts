import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployer} = await hre.getNamedAccounts();
    const {deploy} = hre.deployments;
    // proxy only in non-live network (localhost and hardhat network) enabling HCR (Hot Contract Replacement)
    // in live network, proxy is disabled and constructor is invoked
    await deploy('RockPaperScissors', {
        from: deployer,
        args: [10],
        log: true,
    });
    // return !useProxy; // when live network, record the script as executed to prevent rexecution
};
func.id = 'deploy_RockPaperScissors'; // id required to prevent reexecution
func.tags = ['RockPaperScissors'];
export default func;
