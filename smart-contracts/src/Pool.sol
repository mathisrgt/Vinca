// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract Pool {

    mapping(address => mapping(address => uint256)) public suppliedAmounts;

    
    // Function to get the Total Value Locked (TVL) of an asset in the pool.
    function getAssetTVL(address asset) external view returns (uint256) {}

    // Function to get the current price of an asset.
    function getAssetPrice(address asset) external view returns (uint256) {}

    // Function to get the total amount borrowed by a user for a specific asset.
    function getBorrowedAmount(address user, address asset) external view returns (uint256) {}

    // Function to get the total amount supplied by a user for a specific asset.
    function getSupplyedAmount(address user, address asset) external view returns (uint256) {
        return suppliedAmounts[user][asset];
    }

    // Function for a user to supply an asset to the pool.
    function supply(address asset, uint256 amount) external {
        IERC20(asset).transferFrom(msg.sender, address(this), amount);
        suppliedAmounts[msg.sender][asset] += amount;
    }

    // Function for a user to withdraw an asset from the pool.
    function withdraw(address asset, uint256 amount) external {
        require(suppliedAmounts[msg.sender][asset] >= amount, "Insufficient balance");
        IERC20(asset).transfer(msg.sender, amount);
        suppliedAmounts[msg.sender][asset] -= amount;
    }

    // Function for a user to borrow an asset from the pool.
    function borrow(address asset, uint256 amount) external {}
}
