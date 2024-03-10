// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("TestToken", "TTK") {
        _mint(msg.sender, initialSupply);
    }
}

contract wBTC is ERC20 {
    constructor(uint256 initialSupply) ERC20("wrapped bitcoin", "wBTC"){
        _mint(msg.sender, initialSupply);
    }
}

contract USDC is ERC20 {
    constructor(uint256 initialSupply) ERC20("USDC","USDC"){
        _mint(msg.sender, initialSupply);
    }
}
