//C:\webproje\celikoglu_baklava\backend\controllers\productController.js
const Product = require('../models/productModel');

// Baklava ürünleri
exports.getBaklavaProducts = (req, res) => {
    Product.getAllBaklavaProducts((err, results) => {
        if (err) return res.status(500).json(err);
        const products = groupProducts(results);
        res.json(products);
    });
};

// Yöresel ürünler
exports.getRegionalProducts = (req, res) => {
    Product.getAllRegionalProducts((err, results) => {
        if (err) return res.status(500).json(err);
        const products = groupProducts(results);
        res.json(products);
    });
};

// Baklava kategorileri
exports.getBaklavaCategories = (req, res) => {
    Product.getBaklavaCategories((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// Yöresel kategoriler
exports.getRegionalCategories = (req, res) => {
    Product.getRegionalCategories((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// Gruplama fonksiyonu
function groupProducts(results) {
    const grouped = results.reduce((acc, row) => {
        const { product_id, product_name, image, category_name, category_slug, variant_id, variant_name, material, price } = row;
        if (!acc[product_id]) {
            acc[product_id] = {
                id: product_id,
                name: product_name,
                image,
                category: category_name,
                slug: category_slug,
                variants: []
            };
        }
        if (variant_id) {
            acc[product_id].variants.push({ id: variant_id, name: variant_name, material, price });
        }
        return acc;
    }, {});
    return Object.values(grouped);
}
