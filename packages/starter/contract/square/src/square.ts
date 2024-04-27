import { Field, SmartContract, state, State, method } from 'o1js';

export class Square extends SmartContract {
  @state(Field) num = State<Field>();

  init() {
    super.init();
    this.num.set(Field(2));
  }

  @method async update(square: Field) {
    const currentState = this.num.getAndRequireEquals();
    square.assertEquals(currentState.mul(currentState));
    this.num.set(square);
  }
}
