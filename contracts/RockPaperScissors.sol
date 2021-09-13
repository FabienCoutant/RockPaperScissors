// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;


/**
* @title RockPaperScissors
* @notice The RockPaperScissors contract allow to play the rock paper scissors game
* @dev The contract using commit & reveal pattern to avoid front-run
*/
contract RockPaperScissors {

    enum Choice {
        None,
        Rock,
        Paper,
        Scissors
    }

    enum Stage {
        FirstCommit,
        SecondCommit,
        FirstReveal,
        SecondReveal,
        Result
    }

    struct CommitChoice {
        address playerAddress;
        bytes32 commitment;
        Choice choice;
    }

    event Commit(address player);
    event Reveal(address player, Choice choice);
    event Result(string result);

    // State vars
    uint public revealSpan;
    uint public revealDeadLine;
    CommitChoice[2] public players;
    Stage public stage = Stage.FirstCommit;

    constructor(uint _revealSpan){
        revealSpan = _revealSpan;
    }

    /**
     * @notice Allow a player to commit his choice hashed with a secret sentence
     * @param _commitment The hashed input of player
     * @dev The _commitment input must be created from player address, Choice choice and bytes32 variable
     * on solidity side (cf. reveal function : keccak256(abi.encodePacked(msg.sender, _choice, _blindingFactor)))
     * on front side (cf. test: ethers.utils.solidityKeccak256(['bytes', 'uint8', 'bytes'], [users[1].address, playerBChoice, playerBBlindingFactorBytes32]))
     * the function emit and event with the player address
     */
    function commit(bytes32 _commitment) public {
        // Only run during commit stages
        require(stage < Stage.FirstReveal, "Err! Wrong stage");

        uint8 _playerIndex = stage == Stage.FirstCommit ? 0 : 1;

        require(_playerIndex == 0 || (_playerIndex == 1 && msg.sender != players[0].playerAddress), "Err! Already played");
        // Store the commitment
        players[_playerIndex] = CommitChoice(msg.sender, _commitment, Choice.None);
        // Move to next stage
        stage = stage == Stage.FirstCommit ? Stage.SecondCommit : Stage.FirstReveal;
        // Emit the commit event
        emit Commit(msg.sender);

    }

    /**
     * @notice Allow players to reveal his choice by providing the choice and the bytes sentence used
     * @param _choice The player choice following the enum
     * @param _blindingFactor The player sentence used for the hashing
     * @dev The choice is validated if keccak256(abi.encodePacked(msg.sender, _choice, _blindingFactor))) equal the sentence committed by the player
     * the function emit and event with the player address and his choice
     */
    function reveal(Choice _choice, bytes32 _blindingFactor) public {
        require(stage == Stage.FirstReveal || stage == Stage.SecondReveal, "Err! Wrong stage");

        // Find the player index
        uint _playerIndex;
        if (players[0].playerAddress == msg.sender) _playerIndex = 0;
        else if (players[1].playerAddress == msg.sender) _playerIndex = 1;
        else revert("Err! Unknown Player");

        // Check the hash to ensure the commitment is correct
        require(keccak256(abi.encodePacked(msg.sender, _choice, _blindingFactor)) == players[_playerIndex].commitment, "Err! Invalid hash");

        // Update choice if correct
        players[_playerIndex].choice = _choice;

        // Emit reveal event
        emit Reveal(msg.sender, players[_playerIndex].choice);

        if (stage == Stage.FirstReveal) {
            // If this is the first reveal, set the deadline for the second one
            revealDeadLine = block.number + revealSpan;
            // Move to second reveal
            stage = Stage.SecondReveal;
        }
        // If we're on second reveal, move to distribute stage
        else stage = Stage.Result;
    }

    /**
     * @notice Allow anybody to call the result
     * @dev only callable if both player reveal their choice of if one player reveal it and current block number passed revealDeadLine
     * the function emit and event with the result of the game, then reset all states for new game
     */
    function result() public{
        require(stage == Stage.Result || (stage == Stage.SecondReveal && revealDeadLine <= block.number), "Err! Wrong stage");

        string memory _result;
        // If both players picked the same choice or None => return "draw"
        if (players[0].choice == players[1].choice || (players[0].choice == Choice.None && players[1].choice == Choice.None)) {
            _result = "Draw";
        }
        // If only one player made a choice, they win
        else if (players[0].choice == Choice.None) {
            _result = "Player B win";
        }
        else if (players[1].choice == Choice.None) {
            _result = "Player A win";
        }
        else if (players[0].choice == Choice.Rock) {
            assert(players[1].choice == Choice.Paper || players[1].choice == Choice.Scissors);
            _result = players[1].choice == Choice.Paper? "Player B win" :"Player A win";
        }
        else if (players[0].choice == Choice.Paper) {
            assert(players[1].choice == Choice.Rock || players[1].choice == Choice.Scissors);
            _result = players[1].choice == Choice.Rock? "Player A win" :"Player B win";
        }
        else {
            assert(players[1].choice == Choice.Paper || players[1].choice == Choice.Rock);
            _result = players[1].choice == Choice.Rock? "Player B win" :"Player A win";
        }


        // Reset the state to play again
        delete players;
        revealDeadLine = 0;
        stage = Stage.FirstCommit;
        emit Result(_result);
    }
}
