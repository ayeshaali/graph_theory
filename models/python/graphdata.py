from Graph import Graph
import matplotlib.pyplot as plt
import sys
dict = eval(open("models/python/graph_data.txt").read())
dict2 = eval(open("models/python/graphCourses.txt").read())

graph = Graph(dict)
graph2 = Graph(dict2)

print("Number of Vertices")
print("yeet")
print("Number of Edges (Connections)")
print("yeet")
print('Minimum Vertex Degree: ')
print("yeet")
print('Maximum Vertex Degree: ')
print("yeet")
print('Density of Graph: ')
print("yeet")
print('Is The Graph Connected?: ')
print("yeet")
print('Average Vertex Degree: ')

print("Column2")
print(len(graph.vertices()))
print("yeet")
print(len(graph.edges()))
print("yeet")
path = graph.delta()
print(path)
print("yeet")
path = graph.Delta()
print(path)
print("yeet")
path = graph.density()
print(path)
print("yeet")
path = graph.is_connected()
print(path)
print("yeet")
path = graph.degree_sequence()
b = sum(path)
print (b/len(path))

print("Column3")
print(len(graph2.vertices()))
print("yeet")
print(len(graph2.edges()))
print("yeet")
path = graph2.delta()
print(path)
print("yeet")
path = graph2.Delta()
print(path)
print("yeet")
path = graph2.density()
print(path)
print("yeet")
path = graph2.is_connected()
print(path)
print("yeet")
path = graph2.degree_sequence()
b = sum(path)
print (b/len(path))
# 
# if (len(sys.argv)>1): 
#     print("Degree of Vertex ")
#     print(sys.argv[1])
#     print(": ")
#     path = graph.vertex_degree(sys.argv[1])
#     print(path)
# 
# path =graph.vertex_degree("Ayesha Ali")
# print(path)
# print("yeet")

# sys.stdout.flush()


# plt.hist(path, bins=[20,25,30,35,40,45,50,55,60,65,70])
# plt.show()



