import { AuthorityType, TOKEN_2022_PROGRAM_ID, createMint, setAuthority } from "@solana/spl-token";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { initializeKeypair, makeKeypairs } from "@solana-developers/helpers";
import { createTokenAccountWithImmutableOwner } from "./token-helper";

(async () => {
  const connection = new Connection("http://127.0.0.1:8899", 'confirmed');
  const payer = await initializeKeypair(connection, {
    airdropAmount: 1 * LAMPORTS_PER_SOL
  });

  const [otherOwner, mintKeypair, ourTokenAccountKeypair] = makeKeypairs(3)
  const ourTokenAccount = ourTokenAccountKeypair.publicKey;
  // Remaining code goes below
  throw new Error("Replace this with code")
})()