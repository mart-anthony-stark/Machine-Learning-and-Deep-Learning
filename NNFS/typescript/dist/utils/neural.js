"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuralPoint = void 0;
const uid_1 = require("uid");
/**
 * Neuron - Basic component in neural network where biases and weights are multiplied
 */
class NeuralPoint {
    // connect: (neuron: any, weight: number) => void;
    // activate: (input: any) => number;
    constructor() {
        this.id = (0, uid_1.uid)();
        this.id = (0, uid_1.uid)();
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
    connect(neuron, weight) {
        this.outgoing.neurons[neuron.id] = neuron;
        neuron.incoming.neurons[this.id] = this;
        // weight ∈ ℝ && -1 < weight < 1
        this.outgoing.weights[neuron.id] = neuron.incoming.weights[this.id] =
            weight == undefined ? Math.random() * 2 - 1 : weight;
    }
    activate(input) {
        const self = this;
        function sigmoid(x) {
            return 1 / (1 + Math.exp(-x));
        } // f(x) = 1 / (1 + e^(-x))
        function _sigmoid(x) {
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
            const sum = Object.keys(this.incoming.targets).reduce(function (total, target, index) {
                return (total +=
                    self.incoming.targets[target].output * self.incoming.weights[target]);
            }, this.bias);
            this._output = _sigmoid(sum); // f'(x)
            this.output = sigmoid(sum); // f(x)
        }
        return this.output;
    }
    propagate(target, rate = 0.3) {
        const self = this;
        //𝛿E /𝛿squash
        const sum = target == undefined
            ? Object.keys(this.outgoing.targets).reduce(function (total, target, index) {
                // Δweight
                self.outgoing.targets[target].incoming.weights[self.id] =
                    self.outgoing.weights[target] -=
                        rate * self.outgoing.targets[target].error * self.output;
                return (total +=
                    self.outgoing.targets[target].error *
                        self.outgoing.weights[target]);
            }, 0)
            : this.output - target;
        // 𝛿squash/𝛿sum
        this.error = sum * this._output;
        // Δbias
        this.bias -= rate * this.error;
        return this.error;
    }
}
exports.NeuralPoint = NeuralPoint;
