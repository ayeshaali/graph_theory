from Graph import Graph
import matplotlib.pyplot as plt
import sys
dict = eval(open("models/python/graph_data.txt").read())
graph = Graph(dict)

print("Number of Vertices: ")
print(len(graph.vertices()))
print("yeet")

print("Number of Edges (Connections): ")
print(len(graph.edges()))
print("yeet")

print('Minimum Vertex Degree: ')
path = graph.delta()
print(path)
print("yeet")

print('Maximum Vertex Degree: ')
path = graph.Delta()
print(path)
print("yeet")

print('Density of Graph: ')
path = graph.density()
print(path)
print("yeet")

print('Is The Graph Connected?: ')
path = graph.is_connected()
print(path)
print("yeet")

print('Average Vertex Degree: ')
path = graph.degree_sequence()
b = sum(path)
print (b/len(path))
print("yeet")
sys.stdout.flush()
# plt.hist(path, bins=[20,25,30,35,40,45,50,55,60,65,70])
# plt.show()



