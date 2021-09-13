// import {expect} from './chai-setup';
import {expect} from "chai";
import {deployments, ethers, getNamedAccounts, getUnnamedAccounts,} from 'hardhat';
import {mineBlocks, setupUser, setupUsers} from "./utils";
import {RockPaperScissors} from '../typeChain';

enum Choice {
    None,
    Rock,
    Paper,
    Scissors
}

enum fakeChoice {
    None,
    Rock,
    Paper,
    Scissors,
    error
}

enum Stage {
    FirstCommit,
    SecondCommit,
    FirstReveal,
    SecondReveal,
    Result
}

const ADDRESS_0 ="0x0000000000000000000000000000000000000000"

const setup = deployments.createFixture(async (
    {deployments, getNamedAccounts, ethers},
    options
) => {
    await deployments.fixture("RockPaperScissors"); // ensure you start from a fresh deployments
    const {deployer} = await getNamedAccounts();
    const contracts = {
        RockPaperScissors: <RockPaperScissors>await ethers.getContract('RockPaperScissors'),
    };
    const users = await setupUsers(await getUnnamedAccounts(), contracts);
    return {
        ...contracts,
        users,
        deployer: await setupUser(deployer, contracts),
    };
});


describe("---- RockPaperScissors ----", () => {
    describe("   -- Commit -- ", () => {
        it("should allow player A to commit and set the workflow to secondCommit value ", async () => {
            const {deployer} = await setup()

            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstCommit);

            const playerChoice = Choice.Paper;
            const blindingFactor = "MySecretFactor";
            const playerBlindingFactorBytes32 = ethers.utils.formatBytes32String(blindingFactor);
            const playerCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerChoice, playerBlindingFactorBytes32]);
            await deployer.RockPaperScissors.commit(playerCommitHash);
            const playerA = await deployer.RockPaperScissors.players(0);
            expect(playerA.commitment).to.be.equal(playerCommitHash);
            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.SecondCommit);

        });

        it("should allow player B to commit after player A and set the workflow to FirstReveal value ", async () => {
            const {deployer, users} = await setup()

            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstCommit);

            //Player A
            const playerAChoice = Choice.Paper;
            const playerABlindingFactor = "MySecretFactor"
            const playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
            const playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
            await deployer.RockPaperScissors.commit(playerACommitHash);
            const playerA = await deployer.RockPaperScissors.players(0);
            expect(playerA.commitment).to.be.equal(playerACommitHash);
            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.SecondCommit);

            //Player B
            const playerBChoice = Choice.Paper;
            const playerBBlindingFactor = "MySecretFactor"
            const playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
            const playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
            await users[1].RockPaperScissors.commit(playerBCommitHash);
            const playerB = await deployer.RockPaperScissors.players(1);
            expect(playerB.commitment).to.be.equal(playerBCommitHash);
            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstReveal);
        });

        it("should revert if two player already commit", async () => {
            const {deployer, users} = await setup()
            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstCommit);

            //Player A
            const playerAChoice = Choice.Paper;
            const playerABlindingFactor = "MySecretFactor"
            const playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
            const playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
            await deployer.RockPaperScissors.commit(playerACommitHash);
            const playerA = await deployer.RockPaperScissors.players(0);
            expect(playerA.commitment).to.be.equal(playerACommitHash);
            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.SecondCommit);

            //Player B
            const playerBChoice = Choice.Paper;
            const playerBBlindingFactor = "MySecretFactor"
            const playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
            const playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
            await users[1].RockPaperScissors.commit(playerBCommitHash);
            const playerB = await deployer.RockPaperScissors.players(1);
            expect(playerB.commitment).to.be.equal(playerBCommitHash);
            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstReveal);

            await expect(deployer.RockPaperScissors.commit(playerBCommitHash)).to.be.revertedWith("Err! Wrong stage")
        });
        it("should revert if player B has the same address of player A", async () => {
            const {deployer} = await setup()
            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstCommit);

            //Player A
            const playerAChoice = Choice.Paper;
            const playerABlindingFactor = "MySecretFactor"
            const playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
            const playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
            await deployer.RockPaperScissors.commit(playerACommitHash);
            const playerA = await deployer.RockPaperScissors.players(0);
            expect(playerA.commitment).to.be.equal(playerACommitHash);
            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.SecondCommit);

            //Player B
            const playerBChoice = Choice.Paper;
            const playerBBlindingFactor = "MySecretFactor"
            const playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
            const playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerBChoice, playerBBlindingFactorBytes32]);
            await expect(deployer.RockPaperScissors.commit(playerBCommitHash)).to.be.revertedWith("Err! Already played");

        })
    })
    describe("   -- Reveal -- ", () => {
        let deployer: { address: string } & { RockPaperScissors: RockPaperScissors };
        let users: ({ address: string } & { RockPaperScissors: RockPaperScissors })[];
        let RockPaperScissors: RockPaperScissors;
        let playerAChoice: number, playerBChoice: number;
        let playerABlindingFactor: string, playerBBlindingFactor: string;
        let playerACommitHash, playerBCommitHash
        let playerABlindingFactorBytes32: string, playerBBlindingFactorBytes32: string;
        beforeEach(async () => {
            ({deployer, users, RockPaperScissors} = await setup());
            //Player A
            playerAChoice = Choice.Paper;
            playerABlindingFactor = "MySecretFactorA";
            playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
            playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
            await deployer.RockPaperScissors.commit(playerACommitHash);


            //Player B
            playerBChoice = Choice.Paper;
            playerBBlindingFactor = "MySecretFactorB";
            playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
            playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
            await users[1].RockPaperScissors.commit(playerBCommitHash);

            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstReveal);

        });
        describe("      -- Player A --", () => {
            it("should allow player A to reveal his choice, receiving reveal event and changing stage to SecondReveal", async () => {
                await expect(deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32))
                    .to.emit(RockPaperScissors, "Reveal")
                    .withArgs(deployer.address, playerAChoice);
                expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.SecondReveal);
            });

            it('should revert if player A reveal wrong blindFactor', async () => {
                const wrongBlindFactor = ethers.utils.formatBytes32String("Wrong");
                await expect(deployer.RockPaperScissors.reveal(playerAChoice, wrongBlindFactor)).to.be.revertedWith("Err! Invalid hash")

            });
            it('should revert if player A reveal wrong choice', async () => {
                const wrongChoice = Choice.Scissors;
                await expect(deployer.RockPaperScissors.reveal(wrongChoice, playerABlindingFactorBytes32)).to.be.revertedWith("Err! Invalid hash")
            });
        });
        describe("      -- Player B --", () => {
            beforeEach(async () => {
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
            });

            it("should allow player B to reveal his choice, receiving reveal event and changing stage to Distribute", async () => {
                await expect(users[1].RockPaperScissors.reveal(playerBChoice, playerBBlindingFactorBytes32))
                    .to.emit(RockPaperScissors, "Reveal")
                    .withArgs(users[1].address, playerBChoice);
                expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.Result);
            });
            it('should revert if player B reveal wrong blindFactor', async () => {
                const wrongBlindFactor = ethers.utils.formatBytes32String("Wrong");
                await expect(users[1].RockPaperScissors.reveal(playerBChoice, wrongBlindFactor)).to.be.revertedWith("Err! Invalid hash")

            });
            it('should revert if player B reveal wrong choice', async () => {
                const wrongChoice = Choice.Scissors;
                await expect(users[1].RockPaperScissors.reveal(wrongChoice, playerBBlindingFactorBytes32)).to.be.revertedWith("Err! Invalid hash")
            });
        });
        it("should revert if this is not the right stage", async () => {
            ({deployer, users, RockPaperScissors} = await setup());
            await expect(users[2].RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32)).to.be.revertedWith("Err! Wrong stage")
        });
        it("should revert if player doesn't exist", async () => {
            await expect(users[2].RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32)).to.be.revertedWith("Err! Unknown Player")
        });
    });
    describe("   -- Result -- ", () => {
        describe("    -- Revert -- ", () => {
            it("should revert if not in right stage", async () => {
                const {deployer} = await setup();

                await expect(deployer.RockPaperScissors.result()).to.be.revertedWith("Err! Wrong stage");
            })
            it("should revert if stage at SecondReveal but block.number not passed", async () => {
                const {deployer, users} = await setup();
                //Player A
                const playerAChoice = Choice.Paper;
                const playerABlindingFactor = "MySecretFactorA";
                const playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
                const playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
                await deployer.RockPaperScissors.commit(playerACommitHash);
                //Player B
                const playerBChoice = Choice.Paper;
                const playerBBlindingFactor = "MySecretFactorB";
                const playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
                const playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
                await users[1].RockPaperScissors.commit(playerBCommitHash);

                expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstReveal);
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
                await expect(deployer.RockPaperScissors.result()).to.be.revertedWith("Err! Wrong stage");
            })
        });
        describe("    -- Draw --", () => {
            it("should return Draw if players chose the same thing", async () => {
                const {deployer, users, RockPaperScissors} = await setup();
                //Player A
                const playerAChoice = Choice.Paper;
                const playerABlindingFactor = "MySecretFactorA";
                const playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
                const playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
                await deployer.RockPaperScissors.commit(playerACommitHash);
                //Player B
                const playerBChoice = Choice.Paper;
                const playerBBlindingFactor = "MySecretFactorB";
                const playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
                const playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
                await users[1].RockPaperScissors.commit(playerBCommitHash);

                expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstReveal);
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
                await users[1].RockPaperScissors.reveal(playerBChoice, playerBBlindingFactorBytes32);
                await expect(deployer.RockPaperScissors.result())
                    .to.emit(RockPaperScissors, "Result")
                    .withArgs("Draw");

            });
            it("should return Draw if both players chose None", async () => {
                const {deployer, users, RockPaperScissors} = await setup();
                //Player A
                const playerAChoice = Choice.None;
                const playerABlindingFactor = "MySecretFactorA";
                const playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
                const playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
                await deployer.RockPaperScissors.commit(playerACommitHash);
                //Player B
                const playerBChoice = Choice.None;
                const playerBBlindingFactor = "MySecretFactorB";
                const playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
                const playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
                await users[1].RockPaperScissors.commit(playerBCommitHash);

                expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstReveal);
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
                await users[1].RockPaperScissors.reveal(playerBChoice, playerBBlindingFactorBytes32);
                await expect(deployer.RockPaperScissors.result())
                    .to.emit(RockPaperScissors, "Result")
                    .withArgs("Draw");

            });

        });
        describe("    -- One player chose None --", () => {
            it("should return Player A win if player B chose None", async () => {
                const {deployer, users, RockPaperScissors} = await setup();
                //Player A
                const playerAChoice = Choice.Paper;
                const playerABlindingFactor = "MySecretFactorA";
                const playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
                const playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
                await deployer.RockPaperScissors.commit(playerACommitHash);
                //Player B
                const playerBChoice = Choice.None;
                const playerBBlindingFactor = "MySecretFactorB";
                const playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
                const playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
                await users[1].RockPaperScissors.commit(playerBCommitHash);

                expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstReveal);
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
                await users[1].RockPaperScissors.reveal(playerBChoice, playerBBlindingFactorBytes32);
                await expect(deployer.RockPaperScissors.result())
                    .to.emit(RockPaperScissors, "Result")
                    .withArgs("Player A win");
            });
            it("should return Player A win if player B didn't reveal after 10 blocks", async () => {
                const {deployer, users, RockPaperScissors} = await setup();
                //Player A
                const playerAChoice = Choice.Paper;
                const playerABlindingFactor = "MySecretFactorA";
                const playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
                const playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
                await deployer.RockPaperScissors.commit(playerACommitHash);
                //Player B
                const playerBChoice = Choice.None;
                const playerBBlindingFactor = "MySecretFactorB";
                const playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
                const playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
                await users[1].RockPaperScissors.commit(playerBCommitHash);

                expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstReveal);
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
                await mineBlocks(15);
                await expect(deployer.RockPaperScissors.result())
                    .to.emit(RockPaperScissors, "Result")
                    .withArgs("Player A win");
            });
            it("should return Player B win if player A chose None", async () => {
                const {deployer, users, RockPaperScissors} = await setup();
                //Player A
                const playerAChoice = Choice.None;
                const playerABlindingFactor = "MySecretFactorA";
                const playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
                const playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
                await deployer.RockPaperScissors.commit(playerACommitHash);
                //Player B
                const playerBChoice = Choice.Paper;
                const playerBBlindingFactor = "MySecretFactorB";
                const playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
                const playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
                await users[1].RockPaperScissors.commit(playerBCommitHash);

                expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstReveal);
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
                await users[1].RockPaperScissors.reveal(playerBChoice, playerBBlindingFactorBytes32);
                await expect(deployer.RockPaperScissors.result())
                    .to.emit(RockPaperScissors, "Result")
                    .withArgs("Player B win");
            });
        });
        describe("    -- Player A chose Paper --", () => {
            let deployer: { address: string } & { RockPaperScissors: RockPaperScissors };
            let users: ({ address: string } & { RockPaperScissors: RockPaperScissors })[];
            let RockPaperScissors: RockPaperScissors;
            let playerAChoice: number, playerBChoice: number;
            let playerABlindingFactor: string, playerBBlindingFactor: string;
            let playerACommitHash, playerBCommitHash
            let playerABlindingFactorBytes32: string, playerBBlindingFactorBytes32: string;
            beforeEach(async () => {
                ({deployer, users, RockPaperScissors} = await setup());
                //Player A
                playerAChoice = Choice.Paper;
                playerABlindingFactor = "MySecretFactorA";
                playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
                playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
                await deployer.RockPaperScissors.commit(playerACommitHash);
            });
            it("should emit Player B win if player B chose Scissors", async () => {
                //Player B
                playerBChoice = Choice.Scissors;
                playerBBlindingFactor = "MySecretFactorB";
                playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
                playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
                await users[1].RockPaperScissors.commit(playerBCommitHash);
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
                await users[1].RockPaperScissors.reveal(playerBChoice, playerBBlindingFactorBytes32);
                await expect(deployer.RockPaperScissors.result())
                    .to.emit(RockPaperScissors, "Result")
                    .withArgs("Player B win");
            });
            it("should emit Player A win if player B chose Rock", async () => {
                //Player B
                playerBChoice = Choice.Rock;
                playerBBlindingFactor = "MySecretFactorB";
                playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
                playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
                await users[1].RockPaperScissors.commit(playerBCommitHash);
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
                await users[1].RockPaperScissors.reveal(playerBChoice, playerBBlindingFactorBytes32);
                await expect(deployer.RockPaperScissors.result())
                    .to.emit(RockPaperScissors, "Result")
                    .withArgs("Player A win");
            });
        });
        describe("    -- Player A chose Rock --", () => {
            let deployer: { address: string } & { RockPaperScissors: RockPaperScissors };
            let users: ({ address: string } & { RockPaperScissors: RockPaperScissors })[];
            let RockPaperScissors: RockPaperScissors;
            let playerAChoice: number, playerBChoice: number;
            let playerABlindingFactor: string, playerBBlindingFactor: string;
            let playerACommitHash, playerBCommitHash
            let playerABlindingFactorBytes32: string, playerBBlindingFactorBytes32: string;
            beforeEach(async () => {
                ({deployer, users, RockPaperScissors} = await setup());
                //Player A
                playerAChoice = Choice.Rock;
                playerABlindingFactor = "MySecretFactorA";
                playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
                playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
                await deployer.RockPaperScissors.commit(playerACommitHash);
            });
            it("should emit Player A win if player B chose Scissors", async () => {
                //Player B
                playerBChoice = Choice.Scissors;
                playerBBlindingFactor = "MySecretFactorB";
                playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
                playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
                await users[1].RockPaperScissors.commit(playerBCommitHash);
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
                await users[1].RockPaperScissors.reveal(playerBChoice, playerBBlindingFactorBytes32);
                await expect(deployer.RockPaperScissors.result())
                    .to.emit(RockPaperScissors, "Result")
                    .withArgs("Player A win");
            });
            it("should emit Player B win if player B chose Paper", async () => {
                //Player B
                playerBChoice = Choice.Paper;
                playerBBlindingFactor = "MySecretFactorB";
                playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
                playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
                await users[1].RockPaperScissors.commit(playerBCommitHash);
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
                await users[1].RockPaperScissors.reveal(playerBChoice, playerBBlindingFactorBytes32);
                await expect(deployer.RockPaperScissors.result())
                    .to.emit(RockPaperScissors, "Result")
                    .withArgs("Player B win");
            });
        });
        describe("    -- Player A chose Scissors --", () => {
            let deployer: { address: string } & { RockPaperScissors: RockPaperScissors };
            let users: ({ address: string } & { RockPaperScissors: RockPaperScissors })[];
            let RockPaperScissors: RockPaperScissors;
            let playerAChoice: number, playerBChoice: number;
            let playerABlindingFactor: string, playerBBlindingFactor: string;
            let playerACommitHash, playerBCommitHash
            let playerABlindingFactorBytes32: string, playerBBlindingFactorBytes32: string;
            beforeEach(async () => {
                ({deployer, users, RockPaperScissors} = await setup());
                //Player A
                playerAChoice = Choice.Scissors;
                playerABlindingFactor = "MySecretFactorA";
                playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
                playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
                await deployer.RockPaperScissors.commit(playerACommitHash);
            });
            it("should emit Player B win if player B chose Rock", async () => {
                //Player B
                playerBChoice = Choice.Rock;
                playerBBlindingFactor = "MySecretFactorB";
                playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
                playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
                await users[1].RockPaperScissors.commit(playerBCommitHash);
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
                await users[1].RockPaperScissors.reveal(playerBChoice, playerBBlindingFactorBytes32);
                await expect(deployer.RockPaperScissors.result())
                    .to.emit(RockPaperScissors, "Result")
                    .withArgs("Player B win");
            });
            it("should emit Player A win if player B chose Paper", async () => {
                //Player B
                playerBChoice = Choice.Paper;
                playerBBlindingFactor = "MySecretFactorB";
                playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
                playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
                await users[1].RockPaperScissors.commit(playerBCommitHash);
                await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
                await users[1].RockPaperScissors.reveal(playerBChoice, playerBBlindingFactorBytes32);
                await expect(deployer.RockPaperScissors.result())
                    .to.emit(RockPaperScissors, "Result")
                    .withArgs("Player A win");
            });
        });
        it("should reset players, stage to FirstCommit and revealDeadLine after result emitted", async () => {
            const {deployer, users, RockPaperScissors} = await setup();
            //Player A
            const playerAChoice = Choice.Paper;
            const playerABlindingFactor = "MySecretFactorA";
            const playerABlindingFactorBytes32 = ethers.utils.formatBytes32String(playerABlindingFactor);
            const playerACommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [deployer.address, playerAChoice, playerABlindingFactorBytes32]);
            await deployer.RockPaperScissors.commit(playerACommitHash);
            //Player B
            const playerBChoice = Choice.Scissors;
            const playerBBlindingFactor = "MySecretFactorB";
            const playerBBlindingFactorBytes32 = ethers.utils.formatBytes32String(playerBBlindingFactor);
            const playerBCommitHash = ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]);
            await users[1].RockPaperScissors.commit(playerBCommitHash);

            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstReveal);
            await deployer.RockPaperScissors.reveal(playerAChoice, playerABlindingFactorBytes32);
            await users[1].RockPaperScissors.reveal(playerBChoice, playerBBlindingFactorBytes32);
            await deployer.RockPaperScissors.result();
            expect(await deployer.RockPaperScissors.stage()).to.be.equal(Stage.FirstCommit);
            expect(await deployer.RockPaperScissors.revealDeadLine()).to.be.equal(0);
            const playerA = await deployer.RockPaperScissors.players(0);
            const playerB = await deployer.RockPaperScissors.players(1);

            expect(playerA.playerAddress).to.be.equal(ADDRESS_0);
            expect(playerB.playerAddress).to.be.equal(ADDRESS_0);
        });
    });
});


