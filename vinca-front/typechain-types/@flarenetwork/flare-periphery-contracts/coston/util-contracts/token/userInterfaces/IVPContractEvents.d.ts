/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IVPContractEventsContract
  extends Truffle.Contract<IVPContractEventsInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IVPContractEventsInstance>;
}

export interface Delegate {
  name: "Delegate";
  args: {
    from: string;
    to: string;
    priorVotePower: BN;
    newVotePower: BN;
    0: string;
    1: string;
    2: BN;
    3: BN;
  };
}

export interface Revoke {
  name: "Revoke";
  args: {
    delegator: string;
    delegatee: string;
    votePower: BN;
    blockNumber: BN;
    0: string;
    1: string;
    2: BN;
    3: BN;
  };
}

type AllEvents = Delegate | Revoke;

export interface IVPContractEventsInstance extends Truffle.ContractInstance {
  methods: {};

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}