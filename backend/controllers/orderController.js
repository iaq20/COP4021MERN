import Order from "../models/orderModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc create new order
//@route POST/api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0 ){
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order ({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x_id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// @desc get logged in user orders
//@route GET/api/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

// @desc get order by id
//@route GET/api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user','name email');

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(400);
        throw new Error('Order not found'); 
    }
});

// @desc update order to paid
//@route GET/api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send("update order to paid")
});

// @desc create new order
//@route GET/api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send("updateOrderToDelivered")
});

// @desc create new order
//@route GET/api/orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    res.send("get All orders")
});

export {
    addOrderItems,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
};