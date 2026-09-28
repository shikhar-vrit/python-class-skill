name = input("Name: ")
age = input("Age: ")
city = input("City: ")

student = (name, age, city)     # packing
n, a, c = student               # unpacking

print("===== ID CARD =====")
print("Name:", n)
print("Age :", a)
print("City:", c)

marks = (70, 85, 90)

# Print max, min and sum
print("Maximum:", max(marks))
print("Minimum:", min(marks))
print("Total:", sum(marks))

# Change the city
student_list = list(student)    # tuple → list
student_list[2] = input("New city: ")

student = tuple(student_list)   # list → tuple

print("Updated student:", student)