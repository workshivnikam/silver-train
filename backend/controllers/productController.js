import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
// import createError from "http-errors";
// import { successResponse } from "./response.controller.js";
import mongoose from "mongoose";

//add product
const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      stock,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined
    );

    let imagesURL = await Promise.all(
      images.map(async (img) => {
        let result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
        });

        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      stock: Number(stock) || 0,
      image: imagesURL,
      date: Date.now(),
    };
    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//list all product
const listProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//remove product
const removeProduct = async (req, res, next) => {
  try {
    await productModel.findOneAndDelete(req.body.id);
    res.json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//get single product
const singleProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update product stock
const updateStock = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.json({ success: false, message: "Insufficient stock" });
    }

    product.stock -= quantity;
    await product.save();

    res.json({
      success: true,
      message: "Stock updated successfully",
      currentStock: product.stock,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct, updateStock };
