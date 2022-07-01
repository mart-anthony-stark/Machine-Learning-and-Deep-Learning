import numpy as np

np.random.seed(0)

X = [[1, 2, 3, 2.5],
     [2.0, 5.0, -1.0, 2.0],
     [-1.5, 2.7, 3.3, -0.8]]


class DenseLayer:
    def __init__(self, inputs_n, neurons_n):
        self.weights = 0.10 * np.random.randn(inputs_n, neurons_n)
        self.biases = np.zeros((1, neurons_n))

    def forward(self, inputs):
        return np.dot(inputs, self.weights) + self.biases

layer1 = DenseLayer(4, 5)
layer2 = DenseLayer(5, 2)

res1 = layer1.forward(X)
res2 = layer2.forward(res1)
print(res1)
print(res2)