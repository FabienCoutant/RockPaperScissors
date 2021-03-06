/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface RockPaperScissorsInterface extends ethers.utils.Interface {
  functions: {
    "c_0x010e7c50(bytes32)": FunctionFragment;
    "commit(bytes32)": FunctionFragment;
    "players(uint256)": FunctionFragment;
    "result()": FunctionFragment;
    "reveal(uint8,bytes32)": FunctionFragment;
    "revealDeadLine()": FunctionFragment;
    "revealSpan()": FunctionFragment;
    "stage()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "c_0x010e7c50",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "commit", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "players",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "result", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "reveal",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "revealDeadLine",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revealSpan",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "stage", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "c_0x010e7c50",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "commit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "players", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "result", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "reveal", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "revealDeadLine",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revealSpan", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stage", data: BytesLike): Result;

  events: {
    "Commit(address)": EventFragment;
    "Result(string)": EventFragment;
    "Reveal(address,uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Commit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Result"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Reveal"): EventFragment;
}

export class RockPaperScissors extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: RockPaperScissorsInterface;

  functions: {
    c_0x010e7c50(
      c__0x010e7c50: BytesLike,
      overrides?: CallOverrides
    ): Promise<[void]>;

    "c_0x010e7c50(bytes32)"(
      c__0x010e7c50: BytesLike,
      overrides?: CallOverrides
    ): Promise<[void]>;

    commit(
      _commitment: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "commit(bytes32)"(
      _commitment: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    players(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, number] & {
        playerAddress: string;
        commitment: string;
        choice: number;
      }
    >;

    "players(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, number] & {
        playerAddress: string;
        commitment: string;
        choice: number;
      }
    >;

    result(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "result()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    reveal(
      _choice: BigNumberish,
      _blindingFactor: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "reveal(uint8,bytes32)"(
      _choice: BigNumberish,
      _blindingFactor: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revealDeadLine(overrides?: CallOverrides): Promise<[BigNumber]>;

    "revealDeadLine()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    revealSpan(overrides?: CallOverrides): Promise<[BigNumber]>;

    "revealSpan()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    stage(overrides?: CallOverrides): Promise<[number]>;

    "stage()"(overrides?: CallOverrides): Promise<[number]>;
  };

  c_0x010e7c50(
    c__0x010e7c50: BytesLike,
    overrides?: CallOverrides
  ): Promise<void>;

  "c_0x010e7c50(bytes32)"(
    c__0x010e7c50: BytesLike,
    overrides?: CallOverrides
  ): Promise<void>;

  commit(
    _commitment: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "commit(bytes32)"(
    _commitment: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  players(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, number] & {
      playerAddress: string;
      commitment: string;
      choice: number;
    }
  >;

  "players(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, number] & {
      playerAddress: string;
      commitment: string;
      choice: number;
    }
  >;

  result(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "result()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  reveal(
    _choice: BigNumberish,
    _blindingFactor: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "reveal(uint8,bytes32)"(
    _choice: BigNumberish,
    _blindingFactor: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revealDeadLine(overrides?: CallOverrides): Promise<BigNumber>;

  "revealDeadLine()"(overrides?: CallOverrides): Promise<BigNumber>;

  revealSpan(overrides?: CallOverrides): Promise<BigNumber>;

  "revealSpan()"(overrides?: CallOverrides): Promise<BigNumber>;

  stage(overrides?: CallOverrides): Promise<number>;

  "stage()"(overrides?: CallOverrides): Promise<number>;

  callStatic: {
    c_0x010e7c50(
      c__0x010e7c50: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "c_0x010e7c50(bytes32)"(
      c__0x010e7c50: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    commit(_commitment: BytesLike, overrides?: CallOverrides): Promise<void>;

    "commit(bytes32)"(
      _commitment: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    players(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, number] & {
        playerAddress: string;
        commitment: string;
        choice: number;
      }
    >;

    "players(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, number] & {
        playerAddress: string;
        commitment: string;
        choice: number;
      }
    >;

    result(overrides?: CallOverrides): Promise<void>;

    "result()"(overrides?: CallOverrides): Promise<void>;

    reveal(
      _choice: BigNumberish,
      _blindingFactor: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "reveal(uint8,bytes32)"(
      _choice: BigNumberish,
      _blindingFactor: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    revealDeadLine(overrides?: CallOverrides): Promise<BigNumber>;

    "revealDeadLine()"(overrides?: CallOverrides): Promise<BigNumber>;

    revealSpan(overrides?: CallOverrides): Promise<BigNumber>;

    "revealSpan()"(overrides?: CallOverrides): Promise<BigNumber>;

    stage(overrides?: CallOverrides): Promise<number>;

    "stage()"(overrides?: CallOverrides): Promise<number>;
  };

  filters: {
    Commit(player?: null): TypedEventFilter<[string], { player: string }>;

    Result(result?: null): TypedEventFilter<[string], { result: string }>;

    Reveal(
      player?: null,
      choice?: null
    ): TypedEventFilter<[string, number], { player: string; choice: number }>;
  };

  estimateGas: {
    c_0x010e7c50(
      c__0x010e7c50: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "c_0x010e7c50(bytes32)"(
      c__0x010e7c50: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    commit(
      _commitment: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "commit(bytes32)"(
      _commitment: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    players(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    "players(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    result(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "result()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    reveal(
      _choice: BigNumberish,
      _blindingFactor: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "reveal(uint8,bytes32)"(
      _choice: BigNumberish,
      _blindingFactor: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revealDeadLine(overrides?: CallOverrides): Promise<BigNumber>;

    "revealDeadLine()"(overrides?: CallOverrides): Promise<BigNumber>;

    revealSpan(overrides?: CallOverrides): Promise<BigNumber>;

    "revealSpan()"(overrides?: CallOverrides): Promise<BigNumber>;

    stage(overrides?: CallOverrides): Promise<BigNumber>;

    "stage()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    c_0x010e7c50(
      c__0x010e7c50: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "c_0x010e7c50(bytes32)"(
      c__0x010e7c50: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    commit(
      _commitment: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "commit(bytes32)"(
      _commitment: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    players(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "players(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    result(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "result()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    reveal(
      _choice: BigNumberish,
      _blindingFactor: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "reveal(uint8,bytes32)"(
      _choice: BigNumberish,
      _blindingFactor: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revealDeadLine(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "revealDeadLine()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    revealSpan(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "revealSpan()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stage(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "stage()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
