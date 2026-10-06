def make_bill(*prices, discount=0):
    if not prices:
        print("Cart is empty!")
        return 0

    total = sum(prices)
    saved = total * discount / 100

    print(f"Items:     {len(prices)}")
    print(f"Costliest: Rs. {max(prices)}")
    print(f"Total:     Rs. {total}")
    print(f"Discount:  Rs. {round(saved, 2)}")

    return round(total - saved, 2)


# 1. No prices
make_bill()


# 2. Get prices from user
prices = input("Enter prices separated by spaces: ").split()
prices = [int(price) for price in prices]

pay = make_bill(*prices)

print(f"To pay:    Rs. {pay}")