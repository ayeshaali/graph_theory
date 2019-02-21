
def hasNumbers(inputString):
    return any(char.isdigit() for char in inputString)
    
def hasCommas(inputString):
    return any(char== "," for char in inputString)
    
def hasPeriod(inputString):
    return any(char== "." for char in inputString)

file = open('Grade 12_2nd Semester.txt','r')
lines = file.readlines()
array = []
file1 = open('output.txt','w')

for word in lines: 
    if word.isupper():
        array.append(word)
    if "Sp" in word: 
        array.append(word)
    if hasCommas(word): 
        array.append(word)
    if hasNumbers(word):
        if "English" in word: 
            array.append(word)
        
array = [word for word in array if not hasCommas(word) & hasPeriod(word)]
array = [word for word in array if "R:" not in word]
file1.write(" ".join(str(x) for x in array))
file.close()
