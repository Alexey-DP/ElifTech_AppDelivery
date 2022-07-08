import OrderService from './order.service.js';

class OrderController {

    async createOrder(req, res) {
        try {
            const order = await OrderService.sendOrder(req.body);
            return res.json(order);
        } catch(err) {
            res.status(500).json(err.message);
        }
    }
}

export default new OrderController();