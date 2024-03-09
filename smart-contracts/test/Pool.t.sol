// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Pool.sol";
import "./TestToken.sol";

contract SimplePoolTest is Test {
    Pool pool;
    TestToken token;
    address user = address(1);

    function setUp() public {
        pool = new Pool();
        token = new TestToken(1e18); // Supply 1 token to the deployer for testing

        // Transfer some tokens to the user
        token.transfer(user, 1e18);

        vm.startPrank(user);
        token.approve(address(pool), 1e18);
        vm.stopPrank();
    }

    function testSupply() public {
        vm.startPrank(user);
        uint256 supplyAmount = 1e18; // 1 token
        pool.supply(address(token), supplyAmount);

        assertEq(pool.getSupplyedAmount(user, address(token)), supplyAmount);


        vm.stopPrank();
    }

    function testSupply2differentTokens() public {
        uint256 amount2 = 3e18;
        TestToken token2 = new TestToken(amount2); // Supply 3 token to the deployer for testing
        
        token2.transfer(user, amount2); // Transfer some tokens to the user

        vm.startPrank(user);
        token2.approve(address(pool), amount2);
        pool.supply(address(token), 1e18);
        pool.supply(address(token2), amount2);
        vm.stopPrank();

        assertEq(pool.getSupplyedAmount(user, address(token)), 1e18);
        assertEq(pool.getSupplyedAmount(user, address(token2)), amount2);
    }

    function testWithdraw() public {
        vm.startPrank(user);
        uint256 withdrawAmount = 1e18; // 1 token
        uint256 supplyAmount = 1e18; // 1 token
        pool.supply(address(token), supplyAmount);
        pool.withdraw(address(token), withdrawAmount);
        vm.stopPrank();

        assertEq(pool.getSupplyedAmount(user, address(token)), 0);
        assertEq(token.balanceOf(address(pool)), 0);
        assertEq(token.balanceOf(user), 1e18);
    }

}
