import { AuthorityType, TOKEN_2022_PROGRAM_ID, createAssociatedTokenAccount, createMint, setAuthority } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { initializeKeypair } from "./keypair-helper";
import { createTokenAccountWithImmutableOwner } from "./token-helper";

interface TransferOwnerInputs {
  connection: Connection;
  tokenAccount: PublicKey;
  payer: Keypair;
  newAuthority: PublicKey;
}
async function testTryingToTransferOwner(inputs: TransferOwnerInputs) {
  const { connection, payer, tokenAccount, newAuthority } = inputs;
  try {
    // Attempt to change owner
    await setAuthority(
      connection,
      payer,
      tokenAccount,
      payer.publicKey,
      AuthorityType.AccountOwner,
      newAuthority,
      undefined,
      undefined,
      TOKEN_2022_PROGRAM_ID
    );

    console.error("You should not be able to change the owner of the account.");

  } catch (error) {
    console.log(
      `✅ - We expected this to fail because the account is immutable, and cannot change owner.`
    );
  }
}

async function testTryingToTransferOwnerWithAssociatedTokenAccount(inputs: TransferOwnerInputs) {
  const { connection, payer, tokenAccount, newAuthority } = inputs;
  try {
    // Attempt to change owner
    await setAuthority(
      connection,
      payer,
      tokenAccount,
      payer.publicKey,
      AuthorityType.AccountOwner,
      newAuthority,
      undefined,
      undefined,
      TOKEN_2022_PROGRAM_ID
    );

    console.error("You should not be able to change the owner of the account.");

  } catch (error) {
    console.log(
      `✅ - We expected this to fail because the associated token account is immutable, and cannot change owner.`
    );
  }
}

(async () => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const payer = await initializeKeypair(connection);

  const otherOwner = Keypair.generate();

  const mintKeypair = Keypair.generate();

  const ourTokenAccountKeypair = Keypair.generate();
  const ourTokenAccount = ourTokenAccountKeypair.publicKey;

  const mint = await createMint(
    connection,
    payer,
    mintKeypair.publicKey,
    null,
    2,
    undefined,
    undefined,
    TOKEN_2022_PROGRAM_ID,
  );


  // Explicitly creating immutable owner token account with instructions
  const createOurTokenAccountSignature = await createTokenAccountWithImmutableOwner(
    connection,
    mint,
    payer,
    payer,
    ourTokenAccountKeypair
  );

  // Creating token account with default immutable owner
  const associatedTokenAccount = await createAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey,
    undefined,
    TOKEN_2022_PROGRAM_ID,
  );

  {
    // Show that you can't change owner
    await testTryingToTransferOwner({
      connection,
      payer,
      tokenAccount: ourTokenAccount,
      newAuthority: otherOwner.publicKey,
    });
  }

  {
    await testTryingToTransferOwnerWithAssociatedTokenAccount({
      connection,
      payer,
      tokenAccount: associatedTokenAccount,
      newAuthority: otherOwner.publicKey
    })
  }
})()