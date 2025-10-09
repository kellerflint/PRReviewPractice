function processOrder(order, customers, inventory) {

    let customer = customers.find(c => c.id === order.customerId);
    if (!customer) {
        throw new Error('Invalid customer ID!');
    }
    
    for (let i = 0; i < order.items.length; i++) {
        let item = inventory.find(itm => itm.id === order.items[i].id);
        if (!item) {
            throw new Error('Invalid item ID!');
        }
        if (item.quantity < order.items[i].quantity) {
            throw new Error('Insufficient quantity in stock!');
        }
        item.quantity -= order.items[i].quantity;
    }

    let total = 0;
    for (let i = 0; i < order.items.length; i++) {
        total += order.items[i].price * order.items[i].quantity;
    }

    if (order.discountCode === '20OFF') {
        total *= 0.8;
    } else if (order.discountCode === '10OFF') {
        total *= 0.9;
    }

    let tax = total * 0.05;

    let shipping = 0;
    if (order.shippingMethod === 'overnight') {
        shipping = 20;
    } else if (order.shippingMethod === '2-day') {
        shipping = 10;
    }

    if (customer.creditLimit < total + tax + shipping) {
        throw new Error('Order exceeds customer credit limit!');
    }
    
    return total + tax + shipping;
}
