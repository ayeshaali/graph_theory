from Graph import Graph
import matplotlib.pyplot as plt
dict = eval(open("graph_data.txt").read())
graph = Graph(dict)

print("Vertices of graph:")
print(len(graph.vertices()))

print("Edges of graph:")
print(len(graph.edges()))

# print('All paths from vertex "a" to vertex "b":')
# path = graph.find_all_paths("Ayesha Ali", "Donovan Shin")
# print(path)

print('Min degree')
path = graph.delta()
print(path)

print('Max degree')
path = graph.Delta()
print(path)

print('Density')
path = graph.density()
print(path)

print('Is Connected?')
path = graph.is_connected()
print(path)

print('Degree Sequence')
path = graph.degree_sequence()
b = sum(path)
print (b/len(path))
print(path)

plt.hist(path, bins=[20,25,30,35,40,45,50,55,60,65,70])
plt.show()



