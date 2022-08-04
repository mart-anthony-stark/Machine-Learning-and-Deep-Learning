import { uid } from "uid";

/**
 * Neuron - Basic component in neural network where biases and weights are multiplied
 */
export class NeuralPoint {
  readonly id: string = uid();
  readonly bias: number;
  readonly incoming: any;
  readonly error: number; // E'(f(x))

  outgoing: any;
  _output: number; // f'(x)
  output: number; // f(x)
  // connect: (neuron: any, weight: number) => void;
  // activate: (input: any) => number;

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
  }

  connect(neuron: any, weight: number): void {
    this.outgoing.neurons[neuron.id] = neuron;
    neuron.incoming.neurons[this.id] = this;

    // weight ∈ ℝ && -1 < weight < 1
    this.outgoing.weights[neuron.id] = neuron.incoming.weights[this.id] =
      weight == undefined ? Math.random() * 2 - 1 : weight;
  }

  activate(input: number): number {
    const self = this;

    function sigmoid(x: number) {
      return 1 / (1 + Math.exp(-x));
    } // f(x) = 1 / (1 + e^(-x))
    function _sigmoid(x: number) {
      return sigmoid(x) * (1 - sigmoid(x));
    } // f'(x) = f(x) * (1 - f(x))

    // Input Neurons
    if (input) {
      this._output = 1; // f'(x)
      this.output = input; // f(x)
    }
    // Hidden/Output Neurons
    else {
      // Σ (x • w)
      const sum = Object.keys(this.incoming.targets).reduce(function (
        total,
        target,
        index
      ) {
        return (total +=
          self.incoming.targets[target].output * self.incoming.weights[target]);
      },
      this.bias);

      this._output = _sigmoid(sum); // f'(x)
      this.output = sigmoid(sum); // f(x)
    }

    return this.output;
  }
}
