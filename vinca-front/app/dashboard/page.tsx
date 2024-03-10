'use client'

import { useState, useEffect } from 'react'

import Web3 from 'web3';

import SimplePool from '@/contracts/SimplePool.json';
import WBTCReserve from '@/contracts/WBTCReserve.json';
import USDCReserve from '@/contracts/USDCReserve.json';

import Image from 'next/image'
import Navbar from '../../components/navbar';

import { Link, Button, NavbarBrand, NavbarContent, NavbarItem, Tabs, Tab, Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Avatar, Popover, PopoverContent, PopoverTrigger, Switch } from "@nextui-org/react";

import flare from "@/public/tokens/flare.png"
import eth from "@/public/tokens/eth.png"
import btc from "@/public/tokens/btc.png"
import usdc from "@/public/tokens/usdc.png"

export default function Dashboard() {
	const [selectedKeys, setSelectedKeys] = useState(new Set());
	const [supplyedBalances, setSupplyedBalances] = useState({ btc: "0", usdc: "0" });
	const [assetsPrice, setAssetsPrice] = useState({ btc: "0", usdc: "0" });

	useEffect(() => {
		const getSupplyedBalances = async () => {
			try {
				// Initialiser une instance de Web3 avec WalletConnect
				const web3 = new Web3(window.ethereum);

				// Charger le contrat intelligent (smart contract)
				const contract = new web3.eth.Contract(SimplePool.abi, "0x8DaF07a851abb276B14282dFd64C00C6dFbDF3a6");

				// Récupérer l'adresse de l'utilisateur connecté avec WalletConnect
				const accounts = await web3.eth.getAccounts();
				const userAddress = accounts[0];

				// Récupérer la balance de l'utilisateur depuis le contrat intelligent
				const userBalances: any[] = await contract.methods.getSupplyedBalances(userAddress).call();
				console.log(userBalances);
				setSupplyedBalances({ btc: userBalances[0], usdc: userBalances[1] });
			} catch (error) {
				console.error('Erreur lors de la récupération de la balance:', error);
			}
		};

		getSupplyedBalances();

		const getAssetsPrice = async () => {
			try {
				// Initialiser une instance de Web3 avec WalletConnect
				const web3 = new Web3(window.ethereum);

				// Charger le contrat intelligent (smart contract)
				const contract = new web3.eth.Contract(SimplePool.abi, "0x8DaF07a851abb276B14282dFd64C00C6dFbDF3a6");

				// Récupérer l'adresse de l'utilisateur connecté avec WalletConnect
				const accounts = await web3.eth.getAccounts();
				const userAddress = accounts[0];

				// Récupérer les prix des actifs depuis le contrat intelligent
				const assetsPrice: any[] = await contract.methods.getAssetsPrice().call({ from: userAddress });
				console.log(assetsPrice);

				// Mettre à jour l'état local avec les prix des actifs
				setAssetsPrice({ btc: assetsPrice[0], usdc: assetsPrice[1] });
				console.log(assetsPrice);
			} catch (error) {
				console.error('Erreur lors de la récupération des prix des actifs:', error);
			}
		};

		getAssetsPrice();
	}, []);

	const handleBorrow = async () => {
		try {
			const web3 = new Web3(window.ethereum);
			const accounts = await web3.eth.getAccounts();
			const userAddress = accounts[0];

			const contract = new web3.eth.Contract(SimplePool.abi, "0x8DaF07a851abb276B14282dFd64C00C6dFbDF3a6");

			// Appeler la fonction borrow du contrat
			await contract.methods.borrow(userAddress, 100).send({ from: userAddress });

			console.log('Transaction borrow effectuée avec succès !');
		} catch (error) {
			console.error('Erreur lors de la transaction borrow :', error);
		}
	};

	const handleSupply = async () => {
		try {
			const web3 = new Web3(window.ethereum);
			const accounts = await web3.eth.getAccounts();
			const userAddress = accounts[0];
			
			const pool = new web3.eth.Contract(SimplePool.abi, "0x8DaF07a851abb276B14282dFd64C00C6dFbDF3a6");

			await pool.methods.getwBTC().send({ from: userAddress });
			const WBTCAddress = await pool.methods.getReserve().send({ from: userAddress });

			const WBTCReserveContract = new web3.eth.Contract(WBTCReserve.abi, WBTCAddress);
			await WBTCReserveContract.methods.getwBTC().send({ from: userAddress });

			console.log('Transaction supply effectuée avec succès !');
		} catch (error) {
			console.error('Erreur lors de la transaction Supply :', error);
		}
	};

	return (
		<main className="flex flex-col min-h-screen">

			<Navbar activePage="dashboard" />

			{/* Page content */}
			<div className="mx-12 my-4">

				{/* Assets & Debts */}
				<div className="flex w-full flex-col items-center">
					<Tabs aria-label="Options">
						<Tab key="mySupplies" title="MySupplies" className="flex flex-col items-center">
							<Table aria-label="Controlled table example with dynamic content"
								color="default"
								selectionMode="multiple"
								selectedKeys={selectedKeys}
								onSelectionChange={setSelectedKeys}>

								<TableHeader>
									<TableColumn>Assets</TableColumn>
									<TableColumn>Balance</TableColumn>
									<TableColumn>APY</TableColumn>
								</TableHeader>
								<TableBody>
									<TableRow key="1">
										<TableCell className="flex">
											<Image width={20} src={btc} alt="Bitcoin token icon" />
											<p className="ml-2">BTC</p>
										</TableCell>
										<TableCell>${Number(supplyedBalances.btc)}</TableCell>
										<TableCell>0.01%</TableCell>
									</TableRow>
									<TableRow key="2">
										<TableCell className="flex">
											<Image width={20} src={usdc} alt="USDC token icon" />
											<p className="ml-2">USDC</p>
										</TableCell>
										<TableCell>${Number(supplyedBalances.usdc)}</TableCell>
										<TableCell>16,59%</TableCell>
									</TableRow>
									<TableRow key="3">
										<TableCell className="flex">
											<Image width={20} src={flare} alt="Flare token icon" />
											<p className="ml-2">FLR</p>
										</TableCell>
										<TableCell>$0.00</TableCell>
										<TableCell>6.02%</TableCell>
									</TableRow>
									<TableRow key="4">
										<TableCell className="flex">
											<Image width={20} src={eth} alt="Ether token icon" />
											<p className="ml-2">ETH</p>
										</TableCell>
										<TableCell>$0.00</TableCell>
										<TableCell>0.38%</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<Button className={`my-4 ${selectedKeys.size === 0 ? "bg-gray-300 text-gray-500" : "bg-vinca text-white"}`} disabled={selectedKeys.size == 0 ? true : false}>Withdraw</Button>
						</Tab>
						<Tab key="myBorrows" title="MyBorrows" className="flex flex-col items-center">
							<Table aria-label="Controlled table example with dynamic content"
								color="default"
								selectionMode="multiple"
								selectedKeys={selectedKeys}
								onSelectionChange={setSelectedKeys}>

								<TableHeader>
									<TableColumn>Assets</TableColumn>
									<TableColumn>Debt</TableColumn>
									<TableColumn>APY</TableColumn>
								</TableHeader>
								<TableBody>
									<TableRow key="1">
										<TableCell className="flex">
											<Image width={20} src={flare} alt="Flare token icon" />
											<p className="ml-2">FLR</p>
										</TableCell>
										<TableCell>$0.00</TableCell>
										<TableCell>8.02%</TableCell>
									</TableRow>
									<TableRow key="2">
										<TableCell className="flex">
											<Image width={20} src={eth} alt="Ether token icon" />
											<p className="ml-2">ETH</p>
										</TableCell>
										<TableCell>$0.00</TableCell>
										<TableCell>1,28%</TableCell>
									</TableRow>
									<TableRow key="3">
										<TableCell className="flex">
											<Image width={20} src={btc} alt="Bitcoin token icon" />
											<p className="ml-2">BTC</p>
										</TableCell>
										<TableCell>$0.00</TableCell>
										<TableCell>0.62%</TableCell>
									</TableRow>
									<TableRow key="4">
										<TableCell className="flex">
											<Image width={20} src={usdc} alt="USDC token icon" />
											<p className="ml-2">USDC</p>
										</TableCell>
										<TableCell>$0.00</TableCell>
										<TableCell>36,93%</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<Button className={`my-4 ${selectedKeys.size === 0 ? "bg-gray-300 text-gray-500" : "bg-vinca text-white"}`} disabled={selectedKeys.size == 0 ? true : false}>Repay</Button>
						</Tab>
					</Tabs>
				</div>

				{/* Actions */}
				<div className="flex w-full flex-col items-center">
					<Tabs aria-label="Options">
						<Tab key="supply" title="Supply" className="w-1/2">
							<Table aria-label="Controlled table example with dynamic content">
								<TableHeader>
									<TableColumn>Assets</TableColumn>
									<TableColumn>Balance</TableColumn>
									<TableColumn>APY</TableColumn>
									<TableColumn> </TableColumn>
								</TableHeader>
								<TableBody>
									<TableRow key="1">
										<TableCell className="flex">
											<Image width={20} src={flare} alt="Flare token icon" />
											<p className="ml-2">FLR</p>
										</TableCell>
										<TableCell>$2,921.11</TableCell>
										<TableCell>6.02%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600" onClick={handleSupply}>Supply</Button></TableCell>
									</TableRow>
									<TableRow key="2">
										<TableCell className="flex">
											<Image width={20} src={eth} alt="Ether token icon" />
											<p className="ml-2">ETH</p>
										</TableCell>
										<TableCell>$7,828.17</TableCell>
										<TableCell>0.38%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600" onClick={handleSupply}>Supply</Button></TableCell>
									</TableRow>
									<TableRow key="3">
										<TableCell className="flex">
											<Image width={20} src={btc} alt="Bitcoin token icon" />
											<p className="ml-2">BTC</p>
										</TableCell>
										<TableCell>$428.29</TableCell>
										<TableCell>0.01%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600" onClick={handleSupply}>Supply</Button></TableCell>
									</TableRow>
									<TableRow key="4">
										<TableCell className="flex">
											<Image width={20} src={usdc} alt="USDC token icon" />
											<p className="ml-2">USDC</p>
										</TableCell>
										<TableCell>$2,828.37</TableCell>
										<TableCell>16.59%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600" onClick={handleSupply}>Supply</Button></TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Tab>
						<Tab key="borrow" title="Borrow" className="w-1/2">
							<Table aria-label="Controlled table example with dynamic content">
								<TableHeader>
									<TableColumn>Assets</TableColumn>
									<TableColumn>Price</TableColumn>
									<TableColumn>Balance</TableColumn>
									<TableColumn>APY</TableColumn>
									<TableColumn> </TableColumn>
								</TableHeader>
								<TableBody>
									<TableRow key="1">
										<TableCell className="flex">
											<Image width={20} src={btc} alt="Bitcoin token icon" />
											<p className="ml-2">BTC</p>
										</TableCell>
										<TableCell>${Number(assetsPrice.btc.toString().slice(0, 5))}</TableCell>
										<TableCell>$428.29</TableCell>
										<TableCell>0.62%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600" onClick={handleBorrow}>Borrow</Button></TableCell>
									</TableRow>
									<TableRow key="2">
										<TableCell className="flex">
											<Image width={20} src={usdc} alt="USDC token icon" />
											<p className="ml-2">USDC</p>
										</TableCell>
										<TableCell>${Number(assetsPrice.usdc)}</TableCell>
										<TableCell>$2,828.37</TableCell>
										<TableCell>36.93%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600" onClick={handleBorrow}>Borrow</Button></TableCell>
									</TableRow>
									<TableRow key="3">
										<TableCell className="flex">
											<Image width={20} src={flare} alt="Flare token icon" />
											<p className="ml-2">FLR</p>
										</TableCell>
										<TableCell> </TableCell>
										<TableCell>$32,921.11</TableCell>
										<TableCell>8.02%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600" onClick={handleBorrow}>Borrow</Button></TableCell>
									</TableRow>
									<TableRow key="4">
										<TableCell className="flex">
											<Image width={20} src={eth} alt="Ether token icon" />
											<p className="ml-2">ETH</p>
										</TableCell>
										<TableCell> </TableCell>
										<TableCell>$7,828.17</TableCell>
										<TableCell>1,28%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600" onClick={handleBorrow}>Borrow</Button></TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Tab>
					</Tabs>
				</div>
			</div>
		</main>
	);
}
