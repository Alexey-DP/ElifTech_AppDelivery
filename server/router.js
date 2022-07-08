import { Router } from "express";
import OrderController from "./order/order.controller.js";
import CompanyController from "./company/company.controller.js";

const router = new Router();

router.post('/order', OrderController.createOrder);
router.post('/company', CompanyController.createCompany);
router.get('/food', CompanyController.getAll);
router.get('/food/:id', CompanyController.getOne);

export default router;