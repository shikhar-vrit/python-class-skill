tasks = []

task = input("Add a task (or 'quit'): ")
while task != "quit":
    tasks.append(task)
    task = input("Add a task (or 'quit'): ")

count = 1
for t in tasks:
    print(f"{count}. {t}")
    count += 1

# Remove a task
number = int(input("Enter the task number to remove: "))

removed_task = tasks.pop(number - 1)

print(f"Removed: {removed_task}")

# Show remaining tasks
count = 1
for t in tasks:
    print(f"{count}. {t}")
    count += 1




cart = [
    ["Bread", 60, 2],
    ["Milk", 120, 1],
    ["Eggs", 15, 12],
]

grand_total = 0
for item in cart:
    name, price, qty = item
    line_total = price * qty
    print(f"{name}: Rs. {line_total}")
    # grand_total += line_total


print(f"Grand total: Rs. {grand_total}")