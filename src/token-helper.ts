import { ExtensionType, TOKEN_2022_PROGRAM_ID, createInitializeAccountInstruction, createInitializeImmutableOwnerInstruction, getAccountLen } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

export async function createTokenAccountWithImmutableOwner(
  connection: Connection,
  mint: PublicKey,
  payer: Keypair,
  owner: Keypair,
  tokenAccountKeypair: Keypair
): Promise<string> {
  // code goes here
  throw new Error("Replace this with code")
}