secret = 7
tries = 0

while tries < 3:
    guess = int(input("Guess (1 to 10): "))
    tries += 1

    if guess == secret:
        print(f"Correct! You took {tries} tries")
        break
    elif guess < secret:
        print("Too low")
    else:
        print("Too high")

print(f"Sorry, the num was {secret}")
















# import random

# secret = random.randint(1, 10)
# tries = 0

# while tries < 3:
#     guess = int(input("Guess (1 to 10): "))
#     tries += 1

#     if guess == secret:
#         print(f"Correct! You took {tries} tries")
#         break
#     elif guess < secret:
#         print("Too low")
#     else:
#         print("Too high")
# else:
#     print(f"Sorry, the number was {secret}")
