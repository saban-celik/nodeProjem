// ✅ C:\webproje\celikoglu_baklava\backend\controllers\productController.js
const Product = require('../models/productModel');
const fs = require('fs');
const path = require('path');

exports.getBaklavaProducts = (req, res) => {
  Product.getAllBaklavaProducts((err, results) => {
    if (err) {
      console.error("\u274c getBaklavaProducts hatas\u0131:", err);
      return res.status(200).json([]);
    }
    const products = groupProducts(results);
    res.status(200).json(products || []);
  });
};

exports.getRegionalProducts = (req, res) => {
  Product.getAllRegionalProducts((err, results) => {
    if (err) {
      console.error("\u274c getRegionalProducts hatas\u0131:", err);
      return res.status(200).json([]);
    }
    const products = groupProducts(results);
    res.status(200).json(products || []);
  });
};

exports.createBaklavaProduct = (req, res) => {
  const { name, weight, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  if (!name) return res.status(400).json({ error: 'Ürün ad\u0131 zorunlu' });
  if (!weight) return res.status(400).json({ error: 'A\u011f\u0131rl\u0131k zorunlu' });
  if (!price || isNaN(parseFloat(price))) return res.status(400).json({ error: 'Ge\u00e7erli bir fiyat girin' });
  if (!image) return res.status(400).json({ error: 'Ürün resmi zorunlu' });

  const product = { name, weight, price: parseFloat(price), image };

  Product.createBaklavaProduct(product, (err, result) => {
    if (err) {
      console.error("Hata detaylar\u0131:", err.message);
      return res.status(500).json({ error: 'Ürün eklenemedi: ' + err.message });
    }
    res.status(201).json({ id: result.insertId, ...product });
  });
};

exports.updateBaklavaProduct = (req, res) => {
  const id = req.params.id;
  const { name, weight, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  if (!name) return res.status(400).json({ error: 'Ürün ad\u0131 zorunlu' });
  if (!weight) return res.status(400).json({ error: 'A\u011f\u0131rl\u0131k zorunlu' });
  if (!price || isNaN(parseFloat(price))) return res.status(400).json({ error: 'Ge\u00e7erli bir fiyat girin' });
  if (!image) return res.status(400).json({ error: 'Ürün resmi zorunlu' });

  const product = { name, weight, price: parseFloat(price), image };
  Product.updateBaklavaProduct(id, product, (err) => {
    if (err) return res.status(500).json({ error: 'Ürün g\u00fcncellenemedi: ' + err.message });
    res.json({ id, ...product });
  });
};

exports.deleteBaklavaProduct = (req, res) => {
  const id = req.params.id;
  Product.getAllBaklavaProducts((err, products) => {
    if (err) return res.status(500).json({ error: 'Veritaban\u0131 hatas\u0131: ' + err.message });
    const product = products.find((p) => p.product_id == id);
    if (!product) return res.status(404).json({ error: 'Ürün bulunamad\u0131' });

    if (product.image) {
      const filePath = path.join(__dirname, '../public', product.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Dosya silme hatas\u0131:', err);
      });
    }

    Product.deleteBaklavaProduct(id, (err) => {
      if (err) return res.status(500).json({ error: 'Ürün silinemedi: ' + err.message });
      res.json({ message: 'Ürün silindi' });
    });
  });
};

exports.createRegionalProduct = (req, res) => {
  const { name, weight, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  if (!name) return res.status(400).json({ error: 'Ürün ad\u0131 zorunlu' });
  if (!weight) return res.status(400).json({ error: 'A\u011f\u0131rl\u0131k zorunlu' });
  if (!price || isNaN(parseFloat(price))) return res.status(400).json({ error: 'Ge\u00e7erli bir fiyat girin' });
  if (!image) return res.status(400).json({ error: 'Ürün resmi zorunlu' });

  const product = { name, weight, price: parseFloat(price), image };
  Product.createRegionalProduct(product, (err, result) => {
    if (err) return res.status(500).json({ error: 'Ürün eklenemedi: ' + err.message });
    res.status(201).json({ id: result.insertId, ...product });
  });
};

exports.updateRegionalProduct = (req, res) => {
  const id = req.params.id;
  const { name, weight, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  if (!name) return res.status(400).json({ error: 'Ürün ad\u0131 zorunlu' });
  if (!weight) return res.status(400).json({ error: 'A\u011f\u0131rl\u0131k zorunlu' });
  if (!price || isNaN(parseFloat(price))) return res.status(400).json({ error: 'Ge\u00e7erli bir fiyat girin' });
  if (!image) return res.status(400).json({ error: 'Ürün resmi zorunlu' });

  const product = { name, weight, price: parseFloat(price), image };
  Product.updateRegionalProduct(id, product, (err) => {
    if (err) return res.status(500).json({ error: 'Ürün g\u00fcncellenemedi: ' + err.message });
    res.json({ id, ...product });
  });
};

exports.deleteRegionalProduct = (req, res) => {
  const id = req.params.id;
  Product.getAllRegionalProducts((err, products) => {
    if (err) return res.status(500).json({ error: 'Veritaban\u0131 hatas\u0131: ' + err.message });
    const product = products.find((p) => p.product_id == id);
    if (!product) return res.status(404).json({ error: 'Ürün bulunamad\u0131' });

    if (product.image) {
      const filePath = path.join(__dirname, '../public', product.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Dosya silme hatas\u0131:', err);
      });
    }

    Product.deleteRegionalProduct(id, (err) => {
      if (err) return res.status(500).json({ error: 'Ürün silinemedi: ' + err.message });
      res.json({ message: 'Ürün silindi' });
    });
  });
};

function groupProducts(results) {
  if (!results || results.length === 0) return [];
  const grouped = results.reduce((acc, row) => {
    const { product_id, product_name, image, weight, price, variant_id, variant_name, material, variant_price } = row;
    if (!acc[product_id]) {
      acc[product_id] = {
        id: product_id,
        name: product_name,
        image,
        weight,
        price,
        variants: [],
      };
    }
    if (variant_id) {
      acc[product_id].variants.push({ id: variant_id, name: variant_name, material, price: variant_price });
    }
    return acc;
  }, {});
  return Object.values(grouped);
}

exports.getSimpleBaklavaProducts = (req, res) => {
  Product.getSimpleBaklavaProducts((err, results) => {
    if (err) {
      console.error("\u274c getSimpleBaklavaProducts hatas\u0131:", err);
      return res.status(200).json([]);
    }
    res.status(200).json(results || []);
  });
};