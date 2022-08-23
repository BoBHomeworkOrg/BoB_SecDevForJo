pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AriaToken is ERC20 {
    address public owner;

    event mintedToken(uint256 balance);

    constructor() ERC20("AriaToken", "ARA") {
        owner = msg.sender;
    }

    function mintToken() public returns (bool) {
        _mint(msg.sender, 10**18);

        return true;
    }

    function transferToken(address _to, uint256 _amount) public returns (bool) {
        _transfer(msg.sender, _to, _amount);

        return true;
    }
}