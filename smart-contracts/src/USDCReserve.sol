// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract USDCReserve {

    IERC20 usdc;
    mapping(address => uint256) public balances;
    address owner;
    address pool;
    
    constructor(address _usdc) {
        usdc = IERC20(_usdc);
        owner = msg.sender;
    }

    function supply(uint256 amount) external {
        IERC20(address(usdc)).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;
    }
    

    function getSupplyedAmount(address user) external view returns (uint256) {
        return balances[user];
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        IERC20(address(usdc)).transfer(msg.sender, amount);
        balances[msg.sender] -= amount;
    }

    function getAssetPrice() external view returns (uint256) {
        return 1;
    }

    function getAssetAddress() external view returns (address) {
        return address(usdc);
    }

    function setPool(address _pool) external{
        require(msg.sender == address(owner));
        pool = _pool;
    }

    function executeTransaction(address user, uint256 amount) external {
        require(msg.sender == pool);
        IERC20(address(usdc)).transfer(user, amount);
    }
}
