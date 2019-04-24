from Graph import Graph
import matplotlib.pyplot as plt
import sys
dict = eval(open("models/python/graph_data.txt").read())
dict2 = eval(open("models/python/graphCourses.txt").read())

graph = Graph(dict)

if (len(sys.argv)>1): 
    print("Degree of Vertex ")
    print(sys.argv[1])
    print(": ")
    path = graph.vertex_degree(sys.argv[1])
    print(path)

sys.stdout.flush()



