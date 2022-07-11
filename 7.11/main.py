class Object:
    def __init__(self):
        self.v = 1

    def add(self):
        self.v +=1


a = Object()
print(a.v)
a.add()
print(a.v)
