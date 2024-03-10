// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./WBTCReserve.sol";
import "./USDCReserve.sol";


contract SimplePool {
    WBTCReserve wBTCReserve;
    USDCReserve usdcReserve;
    address public wBTC;
    address public usdc;
    mapping(address => uint256) borrowedUSDC;
    uint8 wBTCLTV = uint8(80);

    constructor(WBTCReserve _wBTCReserve, USDCReserve _usdcReserve, address _wBTC, address _usdc) {
        wBTC = _wBTC;
        usdc = _usdc;
        wBTCReserve = _wBTCReserve;
        usdcReserve = _usdcReserve;
    }

    function getReserve(address token) public view returns (address reserveAddress) {
        if (token == wBTC) {
            return address(wBTCReserve);
        } else if (token == usdc) {
            return address(usdcReserve);
        }
    }

    function getwBTC() public view returns (address){
        return address(wBTC);
    }

    function getUSDC() public view returns (address){
        return address(usdc);
    }

    function getAssetsPrice() external view returns (uint256[] memory) {
        (uint256 wBTCPrice, uint256 _timestamp, uint256 _decimals) = wBTCReserve.getAssetPrice();
        uint256 usdcPrice = usdcReserve.getAssetPrice();
        uint256[] memory prices = new uint256[](2);
        prices[0] = wBTCPrice;
        prices[1] = usdcPrice;
        return prices;
    }

    function getSupplyedBalances(address user)  external view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](2);
        balances[0] = wBTCReserve.getSupplyedAmount(user);
        balances[1] = usdcReserve.getSupplyedAmount(user);
        return balances;
    }

    function borrow(address asset, uint256 amount) external {
        require(asset == usdc);
        uint256 collateralValue = this.getDepositValue(msg.sender);
        uint256 maxValueBorred = collateralValue * wBTCLTV / 100;
        uint256 currentBorrowed = this.getDebt(msg.sender);
        require((currentBorrowed + amount) < maxValueBorred, "You want to more more value than allowed");
        borrowedUSDC[msg.sender] += amount;
        usdcReserve.executeTransaction(msg.sender, amount);
    }

    function getDebt(address user) external view returns (uint256){
        uint256 debt = borrowedUSDC[user] * usdcReserve.getAssetPrice();
        return debt;
    }

    function getDepositValue(address user) external view returns (uint256){
        (uint256 wBTCPrice, uint256 _timestamp, uint256 _decimals) = wBTCReserve.getAssetPrice();
        uint256 collatValue = wBTCReserve.getSupplyedAmount(user) * wBTCPrice / (10 ** _decimals);
        return collatValue;
    }





    

}
