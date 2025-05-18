//C:\webproje\celikoglu_baklava\backend\models\productModel.js
const db = require('../config/db');

// Baklava ürünleri
exports.getAllBaklavaProducts = (callback) => {
    const query = `
        SELECT 
            p.id AS product_id,
            p.name AS product_name,
            p.image,
            c.name AS category_name,
            c.slug AS category_slug,
            v.id AS variant_id,
            v.variant_name,
            v.material,
            v.price
        FROM baklava_products p
        LEFT JOIN baklava_categories c ON p.category_id = c.id
        LEFT JOIN baklava_product_variants v ON p.id = v.product_id
    `;
    db.query(query, callback);
};

// Yöresel ürünler
exports.getAllRegionalProducts = (callback) => {
    const query = `
        SELECT 
            p.id AS product_id,
            p.name AS product_name,
            p.image,
            c.name AS category_name,
            c.slug AS category_slug,
            v.id AS variant_id,
            v.variant_name,
            v.material,
            v.price
        FROM regional_products p
        LEFT JOIN regional_categories c ON p.category_id = c.id
        LEFT JOIN regional_product_variants v ON p.id = v.product_id
    `;
    db.query(query, callback);
};

// Kategoriler (Baklava ve Yöresel)
exports.getBaklavaCategories = (callback) => {
    const query = `SELECT name, slug FROM baklava_categories`;
    db.query(query, callback);
};

exports.getRegionalCategories = (callback) => {
    const query = `SELECT name, slug FROM regional_categories`;
    db.query(query, callback);
};
