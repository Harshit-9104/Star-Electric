import productModel from "../models/productModel.js";
import fs from "fs";

const addProduct = async (req, res) => {
    const { name, description, price, category } = req.body;
    let image_filename = `${req.file.filename}`;

    const product = new productModel({
        name,
        image: image_filename,
        description,
        price,
        category,
    })
    
    try {
        await product.save();
        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// list all products
// const listProducts = async (req, res) => {
//     try {
//         const products = await productModel.find({});
//         res.status(200).json(products); 
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

const listProducts = async (req, res) => {
  try {
    const category = req.query.category;
    const filter = category ? { category } : {};
    const products = await productModel.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// remove product
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        if (product) {
            // Delete the image file from the server
            fs.unlink(`uploads/${product.image}`, ()=>{});
            await productModel.findByIdAndDelete(req.body.id);
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {addProduct, listProducts, removeProduct}

