import { AuthorityType, TOKEN_2022_PROGRAM_ID, createMint, setAuthority } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { initializeKeypair } from "./keypair-helper";
import { createTokenAccountWithImmutableOwner } from "./token-helper";

(async () => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const payer = await initializeKeypair(connection);

  const otherOwner = Keypair.generate();

  const mintKeypair = Keypair.generate();

  const ourTokenAccountKeypair = Keypair.generate();
  const ourTokenAccount = ourTokenAccountKeypair.publicKey;
  // Remaining code goes below
})()