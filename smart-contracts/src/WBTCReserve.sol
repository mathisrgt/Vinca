// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IFtsoRegistry} from "lib/flare-foundry-periphery-package/src/coston2/ftso/userInterfaces/IFtsoRegistry.sol";

import {FlareContractsRegistryLibrary} from "lib/flare-foundry-periphery-package/src/coston2/util-contracts/ContractRegistryLibrary.sol";
contract WBTCReserve {

    IERC20 wbtc;
    mapping(address => uint256) public balances;
    IFtsoRegistry ftsoRegistry;
    
    constructor(address _wBTC) {
        wbtc = IERC20(_wBTC);
    }

    function supply(uint256 amount) external {
        IERC20(address(wbtc)).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;
    }
    

    function getSupplyedAmount(address user) external view returns (uint256) {
        return balances[user];
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        IERC20(address(wbtc)).transfer(msg.sender, amount);
        balances[msg.sender] -= amount;
    }

    function getAssetPrice() external view returns (uint256) {
        uint256 _price;
        uint256 _timestamp;
        uint256 _decimals;

        (_price, _timestamp, _decimals) = ftsoRegistry
            .getCurrentPriceWithDecimals("BTC");

        return _price;
    }

    function registerOracle(address _ftsoRegistry) external {
        ftsoRegistry = IFtsoRegistry(_ftsoRegistry);
    }
}
