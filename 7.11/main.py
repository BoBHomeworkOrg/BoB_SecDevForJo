v0 = 1000


def add(v1, v2):
    global v0
    print(v0)
    return v1+v2


a = int(input("V1:"))
b = int(input("V2:"))

print(v0)
print("V1 + V2 =" + str(add(a,b)))


