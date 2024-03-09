import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Popover, PopoverTrigger, PopoverContent, Switch } from "@nextui-org/react";
import vinca from "@/public/vinca.svg";

import Image from 'next/image';

import { useEffect } from "react";

import { useAccount } from 'wagmi';

interface NavbarProps {
    activePage: string;
}

function isConnected(address: string) {
	localStorage.setItem("userAddress", address);
    console.log(address)
}

export default function MyNavbar({ activePage }: NavbarProps) {
    const { address, isDisconnected } = useAccount();

    useEffect(() => {
		if (!isDisconnected && address) {
			isConnected(address);
		}
	}, [isDisconnected, address]);

    return (
        <Navbar className="py-2">
            <NavbarBrand className="flex items-center">
                <Image width={20} src={vinca} alt="Vinca protocol icon" />
                <p className="mx-2 text-vinca">Vinca Protocol</p>
            </NavbarBrand>
            <NavbarContent className="" justify="center">
                <NavbarItem isActive={activePage === 'dashboard'}>
                    <Link href="#" className="text-vinca">Dashboard</Link>
                </NavbarItem>
                <NavbarItem isActive={activePage === 'settings'}>
                    <Popover placement="bottom" showArrow={true}>
                        <PopoverTrigger>
                            <Link color="foreground">Settings</Link>
                        </PopoverTrigger>
                        <PopoverContent className="p-4 items-start">
                            <Switch className="my-2" color="secondary" defaultSelected>Live price</Switch>
                            <Switch className="my-2" color="secondary">Display variations</Switch>
                            <Switch className="my-2" color="secondary">Hide amounts</Switch>
                        </PopoverContent>
                    </Popover>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <w3m-button size="sm"  />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
