# Basic Neuron Layer
# 4 inputs 3 neurons
inputs = [1, 2, 3, 2.5]

weights = [
    [0.2, 0.8, -0.5, 1.0],
    [0.5, -0.91, 0.26, -0.5],
    [-0.26, -0.27, 0.17, 0.87]
]

bias = [2, 3, 0.5]

output = []
for i in range(len(weights)):
    result = 0
    for j in range(len(weights[i])):
        result += inputs[j] * weights[i][j]

    result += bias[i]
    output.append(result)

print(output)