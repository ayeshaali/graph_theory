from Graph import Graph
import matplotlib.pyplot as plt
import sys
dict = eval(open("graph_data.txt").read())
graph = Graph(dict)

print("Degree of Vertex: ")
print(sys.argv[1])
print(graph.vertex_degree(sys.argv[1]))
sys.stdout.flush()


