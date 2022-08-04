import { uid } from "uid";

/**
 * Basic neuron component in neural network
 */
export class NeuralPoint {
  readonly id: string = uid();
  readonly bias: number;
  readonly incoming: any;
  readonly outgoing: any;
  readonly _output: number; // f'(x)
  readonly output: number; // f(x)
  readonly error: number; // E'(f(x))
  connect: (neuron: any, weight: number) => void;

  constructor() {
    this.id = uid();

    // bias ∈ ℝ && -1 < bias < 1
    this.bias = this.bias == undefined ? Math.random() * 2 - 1 : this.bias;

    // Incoming Connections
    this.incoming = {
      neurons: {},
      weights: {},
    };

    // Outgoing Connections
    this.outgoing = {
      neurons: {},
      weights: {},
    };

    this.connect = (neuron, weight) => {
      this.outgoing.neurons[neuron.id] = neuron;
      neuron.incoming.neurons[this.id] = this;

      // weight ∈ ℝ && -1 < weight < 1
      this.outgoing.weights[neuron.id] = neuron.incoming.weights[this.id] =
        weight == undefined ? Math.random() * 2 - 1 : weight;
    };
  }
}
