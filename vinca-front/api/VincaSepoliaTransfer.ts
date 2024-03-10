import flareLib from "@flarenetwork/flare-periphery-contract-artifacts"
import "dotenv/config";

import { ethers } from "ethers";
import { requestVerification, sleep } from "@/lib/utils";
import { MintableERC20Contract } from "@/typechain-types";

const randomEthereumAddress = "0x2a0351ef4c2894f5dE282d80a3aF63bAE3A94427";

const { EVM_VERIFIER_URL, ATTESTATION_URL } = process.env;

const MintableERC20: MintableERC20Contract = artifacts.require("MintableERC20");

function toHex(data: string): string {
    var result = "";
    for (var i = 0; i < data.length; i++) {
        result += data.charCodeAt(i).toString(16);
    }
    return "0x" + result.padEnd(64, "0");
}

interface AttestationResponse {
    abiEncodedRequest: string;
    status: string;
}

interface EVMRequestBody {
    transactionHash: string,
    requiredConfirmations: string,
    provideInput: boolean,
    listEvents: boolean,
    logIndices: number[]

}

async function prepareAttestationRequest(attestationType: string, network: string, sourceId: string, requestBody: EVMRequestBody): Promise<any> {
    const response = await fetch(
        `${EVM_VERIFIER_URL}/verifier/${network}/${attestationType}/prepareRequest`,
        {
            method: "POST",
            headers: { "X-API-KEY": "123456", "Content-Type": "application/json" },
            body: JSON.stringify({
                "attestationType": toHex(attestationType),
                "sourceId": toHex(sourceId),
                "requestBody": requestBody
            })
        }
    );
    const data = await response.json();
    return data;
}

async function prepareAttestationResponse(attestationType: string, network: string, sourceId: string, requestBody: EVMRequestBody): Promise<AttestationResponse> {
    const response = await fetch(
        `${EVM_VERIFIER_URL}/verifier/${network}/${attestationType}/prepareResponse`,
        {
            method: "POST",
            headers: { "X-API-KEY": "123456", "Content-Type": "application/json" },
            body: JSON.stringify({
                "attestationType": toHex(attestationType),
                "sourceId": toHex(sourceId),
                "requestBody": requestBody
            })
        }
    );
    const data = await response.json();
    return data;
}

async function requestMerkleProof(scRound: number, txID: string) {

    const attestationRequest = await prepareAttestationRequest(
        "EVMTransaction",
        "eth",
        "testETH",
        {
            transactionHash: txID,
            requiredConfirmations: "1",
            provideInput: true,
            listEvents: true,
            logIndices: []
        }
    );

    const attestationProof = {
        "roundId": Number(scRound),
        "requestBytes": attestationRequest.abiEncodedRequest
    };
    const response = await fetch(
        `${ATTESTATION_URL}/attestation-client/api/proof/get-specific-proof`,
        {
            method: "POST",
            headers: { "X-API-KEY": "123456", "Content-Type": "application/json" },
            body: JSON.stringify(attestationProof)
        }
    );

    const responseData = await response.json();
    return responseData;
}


async function createSepoliaTransactions() {
    const [deployer] = await ethers.getSigners();
    console.log(deployer.address)
    console.log((await ethers.provider.getBalance(deployer.address)).toString())
    console.log((await ethers.provider.getBlock("latest")))
    const args = ["Sepolia-USDC", "SUSDC"]
    const erc20 = await MintableERC20.new(...args);
    console.log("qsd")
    await requestVerification(erc20.address, args)
    console.log("USDC deployed to:", erc20.address);
    const tx1 = await erc20.mint(deployer.address, 1000000);
    const tx2 = await erc20.transfer(randomEthereumAddress, 40000);
    await sleep(10000);
    console.log(tx1.tx);
    console.log(
        JSON.stringify(await prepareAttestationResponse("EVMTransaction", "eth", "testETH", {
            transactionHash: tx1.tx,
            requiredConfirmations: "1",
            provideInput: true,
            listEvents: true,
            logIndices: []
        }), null, 2)
    )

    console.log(tx2.tx);
    console.log(
        JSON.stringify(await prepareAttestationResponse("EVMTransaction", "eth", "testETH", {
            transactionHash: tx2.tx,
            requiredConfirmations: "1",
            provideInput: true,
            listEvents: true,
            logIndices: []
        }), null, 2)
    )
}