function validateCustomer(order, customers) {
    let customer = customers.find(c => c.id === order.customerId);
    if (!customer) {
        throw new Error('Invalid customer ID!');
    }
    return customer;
}

function validateAndAdjustInventory(order, inventory) {
    for (let item of order.items) {
        let inventoryItem = inventory.find(itm => itm.id === item.id);
        if (!inventoryItem) {
            throw new Error('Invalid item ID!');
        }
        if (inventoryItem.quantity < item.quantity) {
            throw new Error('Insufficient quantity in stock!');
        }
        inventoryItem.quantity -= item.quantity;
    }
}

function calculateTotal(order) {
    return order.items.reduce((total, item) => total + item.price * item.quantity, 0);
}

function applyDiscount(total, discountCode) {
    if (discountCode === '20OFF') {
        return total * 0.8;
    } else if (discountCode === '10OFF') {
        return total * 0.9;
    } else {
        return total;
    }
}

function calculateTax(total) {
    return total * 0.05;
}

function calculateShipping(shippingMethod) {
    if (shippingMethod === 'overnight') {
        return 20;
    } else if (shippingMethod === '2-day') {
        return 10;
    } else {
        return 0;
    }
}

function checkCreditLimit(customer, total) {
    if (customer.creditLimit < total) {
        throw new Error('Order exceeds customer credit limit!');
    }
}

function processOrder(order, customers, inventory) {
    let customer = validateCustomer(order, customers);
    validateAndAdjustInventory(order, inventory);
    let total = calculateTotal(order);
    total = applyDiscount(total, order.discountCode);
    let tax = calculateTax(total);
    let shipping = calculateShipping(order.shippingMethod);
    checkCreditLimit(customer, total + tax + shipping);
    return total + tax + shipping;
}
