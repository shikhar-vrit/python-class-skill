num = int(input("Which table? "))
up_to = int(input("Up to? "))

total = 0

for i in range(1, up_to + 1):
    answer = num * i
    print(f"{num} x {i} = {answer}")
    total += answer

print("Total:", total)