'use client'

import { useState } from 'react'

import Image from 'next/image'
import Navbar from '../../components/navbar';

import { Link, Button, NavbarBrand, NavbarContent, NavbarItem, Tabs, Tab, Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Avatar, Popover, PopoverContent, PopoverTrigger, Switch } from "@nextui-org/react";

import flare from "@/public/tokens/flare.png"
import eth from "@/public/tokens/eth.png"
import btc from "@/public/tokens/btc.png"
import usdc from "@/public/tokens/usdc.png"

export default function Dashboard() {
	const [selectedKeys, setSelectedKeys] = useState(new Set());

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
											<Image width={20} src={flare} alt="Flare token icon" />
											<p className="ml-2">FLR</p>
										</TableCell>
										<TableCell>$32,921.11</TableCell>
										<TableCell>12.02%</TableCell>
									</TableRow>
									<TableRow key="2">
										<TableCell className="flex">
											<Image width={20} src={eth} alt="Ether token icon" />
											<p className="ml-2">ETH</p>
										</TableCell>
										<TableCell>$7,828.17</TableCell>
										<TableCell>19,28%</TableCell>
									</TableRow>
									<TableRow key="3">
										<TableCell className="flex">
											<Image width={20} src={btc} alt="Bitcoin token icon" />
											<p className="ml-2">BTC</p>
										</TableCell>
										<TableCell>$428.29</TableCell>
										<TableCell>8.02%</TableCell>
									</TableRow>
									<TableRow key="4">
										<TableCell className="flex">
											<Image width={20} src={usdc} alt="USDC token icon" />
											<p className="ml-2">USDC</p>
										</TableCell>
										<TableCell>$2,828.37</TableCell>
										<TableCell>3,91%</TableCell>
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
										<TableCell>$32,921.11</TableCell>
										<TableCell>12.02%</TableCell>
									</TableRow>
									<TableRow key="2">
										<TableCell className="flex">
											<Image width={20} src={eth} alt="Ether token icon" />
											<p className="ml-2">ETH</p>
										</TableCell>
										<TableCell>$7,828.17</TableCell>
										<TableCell>19,28%</TableCell>
									</TableRow>
									<TableRow key="3">
										<TableCell className="flex">
											<Image width={20} src={btc} alt="Bitcoin token icon" />
											<p className="ml-2">BTC</p>
										</TableCell>
										<TableCell>$428.29</TableCell>
										<TableCell>8.02%</TableCell>
									</TableRow>
									<TableRow key="4">
										<TableCell className="flex">
											<Image width={20} src={usdc} alt="USDC token icon" />
											<p className="ml-2">USDC</p>
										</TableCell>
										<TableCell>$2,828.37</TableCell>
										<TableCell>3,91%</TableCell>
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
										<TableCell>$32,921.11</TableCell>
										<TableCell>12.02%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600">Supply</Button></TableCell>
									</TableRow>
									<TableRow key="2">
										<TableCell className="flex">
											<Image width={20} src={eth} alt="Ether token icon" />
											<p className="ml-2">ETH</p>
										</TableCell>
										<TableCell>$7,828.17</TableCell>
										<TableCell>19,28%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600">Supply</Button></TableCell>
									</TableRow>
									<TableRow key="3">
										<TableCell className="flex">
											<Image width={20} src={btc} alt="Bitcoin token icon" />
											<p className="ml-2">BTC</p>
										</TableCell>
										<TableCell>$428.29</TableCell>
										<TableCell>8.02%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600">Supply</Button></TableCell>
									</TableRow>
									<TableRow key="4">
										<TableCell className="flex">
											<Image width={20} src={usdc} alt="USDC token icon" />
											<p className="ml-2">USDC</p>
										</TableCell>
										<TableCell>$2,828.37</TableCell>
										<TableCell>3,91%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600">Supply</Button></TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Tab>
						<Tab key="borrow" title="Borrow" className="w-1/2">
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
										<TableCell>$32,921.11</TableCell>
										<TableCell>12.02%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600">Borrow</Button></TableCell>
									</TableRow>
									<TableRow key="2">
										<TableCell className="flex">
											<Image width={20} src={eth} alt="Ether token icon" />
											<p className="ml-2">ETH</p>
										</TableCell>
										<TableCell>$7,828.17</TableCell>
										<TableCell>19,28%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600">Borrow</Button></TableCell>
									</TableRow>
									<TableRow key="3">
										<TableCell className="flex">
											<Image width={20} src={btc} alt="Bitcoin token icon" />
											<p className="ml-2">BTC</p>
										</TableCell>
										<TableCell>$428.29</TableCell>
										<TableCell>8.02%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600">Borrow</Button></TableCell>
									</TableRow>
									<TableRow key="4">
										<TableCell className="flex">
											<Image width={20} src={usdc} alt="USDC token icon" />
											<p className="ml-2">USDC</p>
										</TableCell>
										<TableCell>$2,828.37</TableCell>
										<TableCell>3,91%</TableCell>
										<TableCell><Button className="w-full text-white bg-gradient-to-r from-purple-700 to-indigo-600">Borrow</Button></TableCell>
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
