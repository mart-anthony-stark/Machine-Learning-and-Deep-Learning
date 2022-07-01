# ReLU Activation
import numpy as np
import nnfs
# See for code: https://gist.github.com/Sentdex/454cb20ec5acf0e76ee8ab8448e6266c

nnfs.init()

# https://cs231n.github.io/neural-networks-case-study/


def spiral_data(points, classes):
    X = np.zeros((points*classes, 2))
    y = np.zeros(points*classes, dtype='uint8')
    for class_number in range(classes):
        ix = range(points*class_number, points*(class_number+1))
        r = np.linspace(0.0, 1, points)  # radius
        t = np.linspace(class_number*4, (class_number+1)*4,
                        points) + np.random.randn(points)*0.2
        X[ix] = np.c_[r*np.sin(t*2.5), r*np.cos(t*2.5)]
        y[ix] = class_number
    return X, y


X, y = spiral_data(100, 3)


class DenseLayer:
    def __init__(self, inputs_n, neurons_n):
        self.weights = 0.10 * np.random.randn(inputs_n, neurons_n)
        self.biases = np.zeros((1, neurons_n))

    def forward(self, inputs):
        self.output = np.dot(inputs, self.weights) + self.biases


class ActivationReLU:
    def forward(self, inputs):
        self.output = np.maximum(0, inputs)


layer1 = DenseLayer(2, 5)
activation1 = ActivationReLU()

layer1.forward(X)
# print(layer1.output)
activation1.forward(layer1.output)
print(activation1.output)

# Rectrified Linear Unit Activation Function (Vanilla)
# inputs = [0, 2, -2, 3.3, -2.7, 1.1, 2.2, -100]
# output = []
# for i in inputs:
#     if i > 0:
#         output.append(i)
#     elif i <= 0:
#         output.append(0)
# print(output)
# ------------------------------------------
# for i in inputs:
#     output.append(max(0, i))
# print(output)
