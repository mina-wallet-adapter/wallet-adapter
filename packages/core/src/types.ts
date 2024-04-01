/**
 * Types copied from 'mina-signer/dist/node/mina-signer/src/TSTypes'
 * and redefined here because they were not exported by 'mina-signer' package.
 */

export { SignableData, SignedAny, Signed, Payment, StakeDelegation, ZkappCommand };

type Field = string;
type Bool = boolean;
type UInt64 = string;
type UInt32 = string;
type PublicKey = string;
type TokenId = Field;

type Sign = "Positive" | "Negative";
type AuthRequired = "Signature" | "Proof" | "Either" | "None" | "Impossible";

type SignatureJson = {
  field: string;
  scalar: string;
};

type Common = {
  readonly to: PublicKey;
  readonly from: PublicKey;
  readonly fee: UInt64;
  readonly nonce: UInt32;
  readonly memo?: string;
  readonly validUntil?: UInt32;
};

type StakeDelegation = Common;

type Payment = Common & {
  readonly amount: UInt64;
};

type FeePayer = {
  readonly feePayer: PublicKey;
  readonly fee: UInt64;
  readonly nonce: UInt32;
  readonly memo?: string;
  readonly validUntil?: UInt32 | null;
};

type ZkappCommand = {
  readonly zkappCommand: ZkappCommandJson;
  readonly feePayer: FeePayer;
};

type SignableData = string | StakeDelegation | Payment;

type SignedLegacy<T> = {
  signature: SignatureJson;
  publicKey: PublicKey;
  data: T;
};

type Signed<T> = {
  signature: string;
  publicKey: PublicKey;
  data: T;
};

type SignedAny = SignedLegacy<SignableData> | Signed<ZkappCommand>;

type ZkappCommandJson = {
  feePayer: {
    body: {
      publicKey: PublicKey;
      fee: UInt64;
      validUntil: UInt32 | null;
      nonce: UInt32;
    };
    authorization: string;
  };
  accountUpdates: {
    body: {
      publicKey: PublicKey;
      tokenId: TokenId;
      update: {
        appState: (Field | null)[];
        delegate: PublicKey | null;
        verificationKey: {
          data: string;
          hash: Field;
        } | null;
        permissions: {
          editState: AuthRequired;
          access: AuthRequired;
          send: AuthRequired;
          receive: AuthRequired;
          setDelegate: AuthRequired;
          setPermissions: AuthRequired;
          setVerificationKey: AuthRequired;
          setZkappUri: AuthRequired;
          editActionState: AuthRequired;
          setTokenSymbol: AuthRequired;
          incrementNonce: AuthRequired;
          setVotingFor: AuthRequired;
          setTiming: AuthRequired;
        } | null;
        zkappUri: string | null;
        tokenSymbol: string | null;
        timing: {
          initialMinimumBalance: UInt64;
          cliffTime: UInt32;
          cliffAmount: UInt64;
          vestingPeriod: UInt32;
          vestingIncrement: UInt64;
        } | null;
        votingFor: Field | null;
      };
      balanceChange: {
        magnitude: UInt64;
        sgn: Sign;
      };
      incrementNonce: Bool;
      events: Field[][];
      actions: Field[][];
      callData: Field;
      callDepth: number;
      preconditions: {
        network: {
          snarkedLedgerHash: Field | null;
          blockchainLength: {
            lower: UInt32;
            upper: UInt32;
          } | null;
          minWindowDensity: {
            lower: UInt32;
            upper: UInt32;
          } | null;
          totalCurrency: {
            lower: UInt64;
            upper: UInt64;
          } | null;
          globalSlotSinceGenesis: {
            lower: UInt32;
            upper: UInt32;
          } | null;
          stakingEpochData: {
            ledger: {
              hash: Field | null;
              totalCurrency: {
                lower: UInt64;
                upper: UInt64;
              } | null;
            };
            seed: Field | null;
            startCheckpoint: Field | null;
            lockCheckpoint: Field | null;
            epochLength: {
              lower: UInt32;
              upper: UInt32;
            } | null;
          };
          nextEpochData: {
            ledger: {
              hash: Field | null;
              totalCurrency: {
                lower: UInt64;
                upper: UInt64;
              } | null;
            };
            seed: Field | null;
            startCheckpoint: Field | null;
            lockCheckpoint: Field | null;
            epochLength: {
              lower: UInt32;
              upper: UInt32;
            } | null;
          };
        };
        account: {
          balance: {
            lower: UInt64;
            upper: UInt64;
          } | null;
          nonce: {
            lower: UInt32;
            upper: UInt32;
          } | null;
          receiptChainHash: Field | null;
          delegate: PublicKey | null;
          state: (Field | null)[];
          actionState: Field | null;
          provedState: Bool | null;
          isNew: Bool | null;
        };
        validWhile: {
          lower: UInt32;
          upper: UInt32;
        } | null;
      };
      useFullCommitment: Bool;
      implicitAccountCreationFee: Bool;
      mayUseToken: {
        parentsOwnToken: Bool;
        inheritFromParent: Bool;
      };
      authorizationKind: {
        isSigned: Bool;
        isProved: Bool;
        verificationKeyHash: Field;
      };
    };
    authorization: {
      proof: string | null;
      signature: string | null;
    };
  }[];
  memo: string;
};
