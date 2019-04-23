from Graph import Graph
import matplotlib.pyplot as plt
import sys
dict = eval(open("graph_data.txt").read())
dict2 = eval(open("graphCourses.txt").read())

graph = Graph(dict)
graph2 = Graph(dict2)

path = graph.degree_sequence()
path2 = graph2.degree_sequence()
plt.hist(path, bins=[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70])
plt.title('How Connected Is the Senior Class?')
plt.xlabel('Number of Connections to Other Seniors')
plt.ylabel('Number of Seniors')

plt.show()

plt.hist(path2, bins=[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70])
plt.title('How Connected Are Senior Classes?')
plt.xlabel('Number of Connections to Other Courses')
plt.ylabel('Number of Courses')
plt.show()

