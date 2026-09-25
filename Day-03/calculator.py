num1 = float(input("Enter you first number: "))
num2 = float(input("Enter your second number: "))

operator = input("Choose you operator(+, -, *, /, %): ")

match operator:
    case "+":
        print(num1+num2)
    case "-":
        print(num1-num2)
    case "*":
        print(num1*num2)
    case "/":
        print(num1/num2)
    case "%":
        print(num1%num2)
    case _:
        print("Please enter valid operator.")