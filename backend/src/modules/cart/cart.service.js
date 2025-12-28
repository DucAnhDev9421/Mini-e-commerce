const Cart = require('./cart.model');
const Product = require('../products/product.model');

const getCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate({
        path: 'items.product',
        select: 'name basePrice mainImage'
    }).populate({
        path: 'items.variant',
        select: 'price color size sku'
    });

    if (!cart) {
        return { items: [], totalAmount: 0 };
    }

    // Calculate totals
    let totalAmount = 0;
    const items = cart.items.map(item => {
        // Price precedence: Variant Price > Product Base Price
        const price = item.variant ? item.variant.price : item.product.basePrice;
        const total = price * item.quantity;
        totalAmount += total;

        return {
            product: item.product,
            variant: item.variant,
            quantity: item.quantity,
            price,
            total
        };
    });

    return {
        _id: cart._id,
        items,
        totalAmount
    };
};

const addToCart = async (userId, productId, variantId, quantity) => {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: []
        });
    }

    const itemIndex = cart.items.findIndex(item =>
        item.product.toString() === productId &&
        (variantId ? item.variant?.toString() === variantId : !item.variant)
    );

    if (itemIndex > -1) {
        // Update existing item
        cart.items[itemIndex].quantity += quantity;
    } else {
        // Add new item
        cart.items.push({
            product: productId,
            variant: variantId,
            quantity
        });
    }

    await cart.save();
    return getCart(userId);
};

const updateQuantity = async (userId, productId, variantId, quantity) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) throw new Error('Cart not found');

    const itemIndex = cart.items.findIndex(item =>
        item.product.toString() === productId &&
        (variantId ? item.variant?.toString() === variantId : !item.variant)
    );

    if (itemIndex > -1) {
        if (quantity > 0) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            // Remove if quantity is 0
            cart.items.splice(itemIndex, 1);
        }
        await cart.save();
        return getCart(userId);
    } else {
        throw new Error('Item not found in cart');
    }
};

const removeItem = async (userId, productId, variantId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) throw new Error('Cart not found');

    cart.items = cart.items.filter(item =>
        !(item.product.toString() === productId &&
            (variantId ? item.variant?.toString() === variantId : !item.variant))
    );

    await cart.save();
    return getCart(userId);
};

const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
        cart.items = [];
        await cart.save();
    }
    return { items: [], totalAmount: 0 };
};

module.exports = {
    getCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart
};
