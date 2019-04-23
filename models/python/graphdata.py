from Graph import Graph
import matplotlib.pyplot as plt
import sys
dict = eval(open("graph_data.txt").read())
dict2 = eval(open("graphCourses.txt").read())

graph = Graph(dict)
graph2 = Graph(dict2)

categories = []
categories.append(len(graph.vertices()))
categories.append(len(graph.edges()))
categories.append(graph.delta())
categories.append(graph.Delta())
categories.append(graph.density())
categories.append(graph.is_connected())
path = graph.degree_sequence()
b = sum(path)
categories.append(b/len(path))

categories2 = []
categories2.append(len(graph2.vertices()))
categories2.append(len(graph2.edges()))
categories2.append(graph2.delta())
categories2.append(graph2.Delta())
categories2.append(graph2.density())
categories2.append(graph2.is_connected())
path = graph2.degree_sequence()
b = sum(path)
categories2.append(b/len(path))
print(categories2)
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



