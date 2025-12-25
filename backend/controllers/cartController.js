import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

const addToCart = async (req, res, next) => {
  try {
    const { userId, itemId, size } = req.body;

    // Check product stock
    const product = await productModel.findById(itemId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    if (product.stock <= 0) {
      return res.json({ success: false, message: "Product is out of stock" });
    }

    let userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    // Calculate total quantity in cart for this product
    let totalQuantityInCart = 0;
    if (cartData[itemId]) {
      Object.values(cartData[itemId]).forEach(
        (qty) => (totalQuantityInCart += qty)
      );
    }

    // Check if adding one more would exceed stock
    if (totalQuantityInCart + 1 > product.stock) {
      return res.json({
        success: false,
        message: "Cannot add more items than available in stock",
      });
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res, next) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    // Check product stock
    const product = await productModel.findById(itemId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    if (quantity > product.stock) {
      return res.json({
        success: false,
        message: "Requested quantity exceeds available stock",
      });
    }

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    // Calculate total quantity in cart for this product across all sizes except current size
    let totalQuantityInCart = 0;
    if (cartData[itemId]) {
      Object.entries(cartData[itemId]).forEach(([sz, qty]) => {
        if (sz !== size) totalQuantityInCart += qty;
      });
    }

    // Check if new quantity would exceed stock
    if (totalQuantityInCart + quantity > product.stock) {
      return res.json({
        success: false,
        message: "Total quantity across sizes would exceed available stock",
      });
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);

    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
