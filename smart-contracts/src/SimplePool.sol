// SPDX-License-Identifier: MIT
import "./wBTCReserve.sol";
import "./USDCReserve.sol";


contract SimplePool {
    WBTCReserve wBTCReserve;
    USDCReserve usdcReserve;
    address public wBTC;
    address public usdc;

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

    function getAssetsPrice() external view returns (uint256[] memory) {
        uint256 wBTCPrice = wBTCReserve.getAssetPrice();
        uint256 usdcPrice = usdcReserve.getAssetPrice();
        uint256[] memory prices = new uint256[](2);
        prices[0] = wBTCPrice;
        prices[1] = usdcPrice;
        return prices;
    }


    

}
