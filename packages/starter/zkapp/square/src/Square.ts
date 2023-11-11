import { Field, SmartContract, state, State, method, Permissions } from 'o1js';

export class Square extends SmartContract {
  @state(Field) num = State<Field>();

  init() {
    super.init();
    this.account.permissions.set({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });

    this.num.set(Field(2));
  }

  @method update(square: Field) {
    const currentState = this.num.getAndAssertEquals();
    square.assertEquals(currentState.mul(currentState));
    this.num.set(square);
  }
}
