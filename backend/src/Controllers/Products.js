const { Router } = require('express');
const { productupload } = require('../../multer');
const Productmodel = require('../Model/Productmodel');
const userModel = require("../Model/userModel");
const auth = require('../Middleware/auth'); // Import auth middleware
const mongoose = require('mongoose'); // Fix missing mongoose import
const productrouter = Router();
const path = require('path');
const { userInfo } = require('os');

productrouter.get("/get-products", async (req, res) => {
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

productrouter.post('/cart',auth, async (req, res) => {
    const {email} = req.user;
    const {productid, productname, quantity } = req.body;

    try {
        if (!email || !productid || !productname || quantity <= 0) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        if (!mongoose.Types.ObjectId.isValid(productid)) { // Fix mongoose reference
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const findemail = await userModel.findOne({ email });
        if (!findemail) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const findproduct = await Productmodel.findById(productid);
        if (!findproduct) {
            return res.status(404).json({ message: 'Product does not exist' });
        }

        const cartproductid = findemail.cart.findIndex((i) => i.productid === productid);

        if (cartproductid > -1) {
            findemail.cart[cartproductid].quantity += quantity;
        } else {
            findemail.cart.push({ productid, productname, quantity });
        }

        await findemail.save();
        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (err) {
        console.error("Error in cart:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

productrouter.get('/getcart', auth, async (req, res) => { // Using auth middleware here rather than params
    try {
        const {email} = req.user;
        const user = await userModel.findOne({ email }).populate({
            path: 'cart.productid',
            model: Productmodel,
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ cart: user.cart });
    } catch (err) {
        console.error('Error in get cart:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

productrouter.put('/edit-cart',auth, async (req, res) => {
    const {email} = req.user;
    const {productid, quantity } = req.body
    try {

        if (!email || !productid || quantity == undefined) {
            return res.status(404).json({ message: "put all details" })
        }
        const finduser = await userModel.findOne({ email: email })
        if (!finduser) {
            return res.status(500).json({ message: "user is not found" })
        }

        const findproduct = await Productmodel.findOne({ _id: productid })
        if (!findproduct || findproduct.stock <= 0) {
            return res.status(404).json({ message: "product not avzailable" })
        }

        const findcartproduct = finduser.cart.find(item => item.productid === productid)

        if (!findcartproduct) {
            return res.status(404).json({ message: "can not find" })
        }
        findcartproduct.quantity = quantity
        await finduser.save()
        return res.status(200).json({ message: "edited successfully" })
    }
    catch (err) {
        console.log(err)
    }
})

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

productrouter.put('/edit-product/:id', productupload.array('files', 10),auth, async (req, res) => {
    try {
        const { id } = req.user;
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

productrouter.delete('/delete-product/:id',auth, async (req, res) => {
    try {
        const { id } = req.user;
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

module.exports = productrouter;