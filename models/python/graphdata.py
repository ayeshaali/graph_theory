from Graph import Graph
import matplotlib.pyplot as plt
import sys
dict = eval(open("models/python/graph_data.txt").read())
graph = Graph(dict)

print("Vertices of graph:")
print(len(graph.vertices()))
print("yeet")

print("Edges of graph:")
print(len(graph.edges()))
print("yeet")

print('Min degree')
path = graph.delta()
print(path)
print("yeet")

print('Max degree')
path = graph.Delta()
print(path)
print("yeet")

print('Density')
path = graph.density()
print(path)
print("yeet")

print('Is Connected?')
path = graph.is_connected()
print(path)
print("yeet")

print('Degree Sequence')
path = graph.degree_sequence()
b = sum(path)
print (b/len(path))
print(path)
sys.stdout.flush()
print("yeet")
# plt.hist(path, bins=[20,25,30,35,40,45,50,55,60,65,70])
# plt.show()



