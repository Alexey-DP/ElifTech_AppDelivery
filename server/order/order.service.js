import Orders from '../models/order.mode.js';

class OrderService {
    async sendOrder(order) {
        const createOrder = await Orders.create(order);
        return createOrder;
    }
}

export default new OrderService();