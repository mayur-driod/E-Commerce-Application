const {Router}= require('express');
const { productupload } = require('../../multer');
const Productmodel = require('../Model/Productmodel');
const productrouter=Router();
const path = require('path');

productrouter.get("/get-product", async (req, res) => {
    try {
        const productfind = await Productmodel.find();
        console.log(productfind);
        if (!productfind) {
            return res.status(400).json({ message: "No products found" });
        }
        const products = productfind.map((product) => {
            return {
                id: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                tags: product.tags,
                price: product.price,
                stock: product.stock,
                email: product.email,
                images: product.images,
                createdAt: product.createdAt,
            };
        });

        return res.status(200).json({ products });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

productrouter.post("/post-product", productupload.array('files'), async (req, res) => {
    const { name, description, category, tags, price, stock, email } = req.body;
    const images = req.files.map((file) => file.path);
    try {
        const seller = await Productmodel.findOne({ email: email });
        if (!seller) {
            return res.status(400).json({ message: "Seller not found" });
        }
        if (images.length === 0) {
            return res.status(400).json({ message: "Please upload at least one image" });
        }
        const newproduct = await Productmodel.create({
            name: name,
            description: description,
            category: category,
            tags: tags,
            price: price,
            stock: stock,
            email: email,
            images: images
        });
        res.status(200).json({ message: "Product added successfully", product: newproduct });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

productrouter.put('/edit-product/:id', productupload.array('files', 10), async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const { name, description, category, tags, price, stock, email } = req.body;
        const existproduct = await Productmodel.findById(id);

        if (!existproduct) {
            return res.status(400).json({ message: "Product does not exist" });
        }
        let updateimages = existproduct.images;
        if (req.files && req.files.length > 0) {
            updateimages = req.files.map((img) => {
                return `/product/${path.basename(img.path)}`;
            });
        }
        existproduct.name = name;
        existproduct.description = description;
        existproduct.category = category;
        existproduct.tags = tags;
        existproduct.price = price;
        existproduct.stock = stock;
        existproduct.email = email;
        existproduct.images = updateimages;

        await existproduct.save();

        res.status(200).json({ product: existproduct });
    } catch (err) {
        console.log('error in updating');
        res.status(500).json({ message: "Server error" });
    }
});

productrouter.delete('/delete-product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const existproduct = await Productmodel.findById(id);

        if (!existproduct) {
            return res.status(400).json({ message: "Product does not exist" });
        }

        await existproduct.deleteOne();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.log('error in delete');
        res.status(500).json({ message: "Server error" });
    }
});

module.exports=productrouter;