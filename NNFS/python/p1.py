inputs = [1.2, 5.1, 2.1]
weights = [3.1, 2.1, 8.7]
bias = 3

# o = E(f[i]*w[i]) + b
# output = inputs[0]*weights[0] + inputs[1] * weights[1] + inputs[2]*weights[2] + bias
output = 0
for i in range(len(inputs)):
    output += inputs[i]*weights[i]

output += bias

print(output)
