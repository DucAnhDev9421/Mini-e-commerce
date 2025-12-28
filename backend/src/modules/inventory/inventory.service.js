const Inventory = require('./inventory.model');
const Product = require('../products/product.model');
const Variant = require('../products/variant.model');

const addStock = async (productId, variantId, quantity, reason, reference) => {
    const session = await Inventory.startSession();
    session.startTransaction();
    try {
        // Create transaction record
        await Inventory.create([{
            product: productId,
            variant: variantId,
            type: 'IN',
            quantity,
            reason,
            reference
        }], { session });

        // Update product/variant stock
        if (variantId) {
            await Variant.findByIdAndUpdate(variantId, { $inc: { stock: quantity } }, { session });
        } else {
            await Product.findByIdAndUpdate(productId, { $inc: { stock: quantity } }, { session });
        }

        await session.commitTransaction();
        session.endSession();
        return { message: 'Stock added successfully' };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const reduceStock = async (productId, variantId, quantity, reason, reference) => {
    const session = await Inventory.startSession();
    session.startTransaction();
    try {
        // Check availability logic could go here or rely on database constraints

        // Create transaction record
        await Inventory.create([{
            product: productId,
            variant: variantId,
            type: 'OUT',
            quantity,
            reason,
            reference
        }], { session });

        // Update product/variant stock
        if (variantId) {
            const variant = await Variant.findById(variantId).session(session);
            if (variant.stock < quantity) throw new Error('Insufficient stock');
            variant.stock -= quantity;
            await variant.save({ session });
        } else {
            const product = await Product.findById(productId).session(session);
            if (product.stock < quantity) throw new Error('Insufficient stock');
            product.stock -= quantity;
            await product.save({ session });
        }

        await session.commitTransaction();
        session.endSession();
        return { message: 'Stock reduced successfully' };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const getHistory = async (productId) => {
    return await Inventory.find({ product: productId }).sort({ date: -1 }).populate('variant');
};

module.exports = {
    addStock,
    reduceStock,
    getHistory
};
