// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@flarenetwork/flare-periphery-contracts/flare/util-contracts/userInterfaces/IFlareContractRegistry.sol";
import "@flarenetwork/flare-periphery-contracts/flare/ftso/userInterfaces/IFtsoRegistry.sol";

<<<<<<< HEAD
=======
import {FlareContractsRegistryLibrary} from "lib/flare-foundry-periphery-package/src/coston2/util-contracts/ContractRegistryLibrary.sol";
import {SimplePool} from "./SimplePool.sol";

>>>>>>> executeTransfert
contract WBTCReserve {

    IERC20 wbtc;
    mapping(address => uint256) public balances;
<<<<<<< HEAD
    address private constant FLARE_CONTRACT_REGISTRY =
        0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019;

=======
    IFtsoRegistry ftsoRegistry;
    SimplePool pool;
>>>>>>> executeTransfert
    
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

        IFlareContractRegistry contractRegistry = IFlareContractRegistry(
            FLARE_CONTRACT_REGISTRY);

        // 3. Retrieve the FTSO Registry
        IFtsoRegistry ftsoRegistry = IFtsoRegistry(
            contractRegistry.getContractAddressByName('FtsoRegistry'));

        // 4. Get latest price
        (_price, _timestamp, _decimals) =
            ftsoRegistry.getCurrentPriceWithDecimals("testBTC");

        return _price;
    }

    function executeTransfert(address _user, uint256 _amount) external {
        require(msg.sender == address(pool), "Only pool can execute borrow");
        IERC20(address(wbtc)).transfer(_user, _amount);
    }
}
