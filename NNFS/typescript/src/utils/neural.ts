import { uid } from "uid";

/**
 * Basic neuron component in neural network
 */
export class NeuralPoint {
  readonly id: string = uid();
  readonly bias: number;
  readonly incoming:any;
  readonly outgoing:any;
  readonly _output:number; // f'(x)
  readonly output:number; // f(x)
  readonly error: number; // E'(f(x))

  constructor() {
    this.id = uid();

    // bias ∈ ℝ && -1 < bias < 1
    this.bias = this.bias == undefined ? Math.random() * 2 - 1 : this.bias;
  }
}
