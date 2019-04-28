from Graph import Graph
import matplotlib.pyplot as plt
import sys
import csv
dict = eval(open("graph_data.txt").read())

graph = Graph(dict)

students = graph.vertices()
newdict = {}

for student in students:
    path = graph.vertex_degree(student)
    newdict[student] = path
    
print (newdict)

with open('Degrees.csv', mode='w') as file:
    writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    for key in newdict:    
        writer.writerow([key, newdict[key]])

file.close()