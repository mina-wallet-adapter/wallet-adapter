import { Square } from './square';
import { Field, Mina, PrivateKey, PublicKey, AccountUpdate } from 'o1js';

/*
 * This file specifies how to test the `Square` example smart contract.
 */

let proofsEnabled = false;

describe('Square', () => {
  let deployerAccount: Mina.TestPublicKey,
    deployerKey: PrivateKey,
    senderAccount: Mina.TestPublicKey,
    senderKey: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkApp: Square;

  beforeAll(async () => {
    if (proofsEnabled) await Square.compile();
  });

  beforeEach(async () => {
    const Local = await Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);
    [deployerAccount, senderAccount] = Local.testAccounts;
    deployerKey = deployerAccount.key;
    senderKey = senderAccount.key;

    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkApp = new Square(zkAppAddress);
  });

  async function localDeploy() {
    const txn = await Mina.transaction(deployerAccount, async () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      await zkApp.deploy();
    });
    await txn.prove();
    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
    await txn.sign([deployerKey, zkAppPrivateKey]).send();
  }

  it('generates and deploys the `Square` smart contract', async () => {
    await localDeploy();
    const num = zkApp.num.get();
    expect(num).toEqual(Field(2));
  });

  it('correctly updates the num state on the `Square` smart contract', async () => {
    await localDeploy();

    // update transaction
    const txn = await Mina.transaction(senderAccount, async () => {
      zkApp.update(Field(4));
    });
    await txn.prove();
    await txn.sign([senderKey]).send();

    const squareNum = zkApp.num.get();
    expect(squareNum).toEqual(Field(4));
  });
});
