// ✅ C:\webproje\celikoglu_baklava\backend\controllers\productController.js
const Product = require('../models/productModel');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

exports.getBaklavaProducts = (req, res) => {
  Product.getAllBaklavaProducts((err, results) => {
    if (err) {;
      return res.status(200).json([]);
    }
    const products = groupProducts(results);
    res.status(200).json(products || []);
  });
};

exports.getBaklavaProductBySlug = (req, res) => {
  const slug = req.params.slug;
  Product.getBaklavaProductBySlug(slug, (err, product) => {
    if (err || !product) {
      return res.status(404).json({ error: 'Ürün bulunamadı' });
    }
    res.status(200).json(product);
  });
};

exports.createBaklavaProduct = (req, res) => {
  const { name, weight, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  console.log(`📥 createBaklavaProduct çağrıldı, veri: ${JSON.stringify({ name, weight, price, image })}`);

  // Input validation
  if (!name) return res.status(400).json({ error: 'Ürün adı zorunlu' });
  if (!weight) return res.status(400).json({ error: 'Ağırlık zorunlu' });
  if (!price || isNaN(parseFloat(price))) return res.status(400).json({ error: 'Geçerli bir fiyat girin' });
  if (!image) return res.status(400).json({ error: 'Ürün resmi zorunlu' });

  // Generate slug
  const slug = slugify(name, { lower: true, locale: 'tr' });
  const product = { name, weight, price: parseFloat(price), image, slug };
  console.log(`✅ Ürün oluşturuluyor, slug: ${slug}`);

  // Check for duplicate slug
  Product.getBaklavaProductBySlug(slug, (err, existingProduct) => {
    if (err) {
      console.log(`❌ Slug kontrol hatası: ${err.message}`);
      return res.status(500).json({ error: 'Slug kontrolü başarısız: ' + err.message });
    }
    if (existingProduct) {
      console.log(`❌ Slug zaten kullanımda: ${slug}`);
      return res.status(400).json({ error: 'Bu ürün adına sahip bir ürün zaten var' });
    }

    // Create product
    Product.createBaklavaProduct(product, (err, result) => {
      if (err) {
        console.log(`❌ createBaklavaProduct hatası: ${err.message}`);
        console.log(`📤 Yanıt: 500, Ürün eklenemedi`);
        return res.status(500).json({ error: 'Ürün eklenemedi: ' + err.message });
      }
      console.log(`✅ createBaklavaProduct başarılı, yeni ürün ID: ${result.insertId}`);
      res.status(201).json({ id: result.insertId, ...product });
    });
  });
};

exports.getRegionalProducts = (req, res) => {
  Product.getAllRegionalProducts((err, results) => {
    if (err) {
      console.error("❌ getRegionalProducts hatası:", err);
      return res.status(200).json([]);
    }
    const products = groupProducts(results);
    res.status(200).json(products || []);
  });
};

exports.updateBaklavaProduct = (req, res) => {
  const id = req.params.id;
  const { name, weight, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  if (!name) return res.status(400).json({ error: 'Ürün adı zorunlu' });
  if (!weight) return res.status(400).json({ error: 'Ağırlık zorunlu' });
  if (!price || isNaN(parseFloat(price))) return res.status(400).json({ error: 'Geçerli bir fiyat girin' });
  if (!image) return res.status(400).json({ error: 'Ürün resmi zorunlu' });

  const slug = slugify(name, { lower: true, locale: 'tr' });
  const product = { name, weight, price: parseFloat(price), image, slug };

  // Check for duplicate slug (excluding current product)
  Product.getBaklavaProductBySlug(slug, (err, existingProduct) => {
    if (err) {
      console.log(`❌ Slug kontrol hatası: ${err.message}`);
      return res.status(500).json({ error: 'Slug kontrolü başarısız: ' + err.message });
    }
    if (existingProduct && existingProduct.id !== parseInt(id)) {
      console.log(`❌ Slug zaten kullanımda: ${slug}`);
      return res.status(400).json({ error: 'Bu ürün adına sahip bir ürün zaten var' });
    }

    Product.updateBaklavaProduct(id, product, (err) => {
      if (err) return res.status(500).json({ error: 'Ürün güncellenemedi: ' + err.message });
      res.json({ id, ...product });
    });
  });
};

exports.deleteBaklavaProduct = (req, res) => {
  const id = req.params.id;
  Product.getAllBaklavaProducts((err, products) => {
    if (err) return res.status(500).json({ error: 'Veritabanı hatası: ' + err.message });
    const product = products.find((p) => p.product_id == id);
    if (!product) return res.status(404).json({ error: 'Ürün bulunamadı' });

    if (product.image) {
      const filePath = path.join(__dirname, '../public', product.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Dosya silme hatası:', err);
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

  if (!name) return res.status(400).json({ error: 'Ürün adı zorunlu' });
  if (!weight) return res.status(400).json({ error: 'Ağırlık zorunlu' });
  if (!price || isNaN(parseFloat(price))) return res.status(400).json({ error: 'Geçerli bir fiyat girin' });
  if (!image) return res.status(400).json({ error: 'Ürün resmi zorunlu' });

  const slug = slugify(name, { lower: true, locale: 'tr' });
  const product = { name, weight, price: parseFloat(price), image, slug };
  Product.createRegionalProduct(product, (err, result) => {
    if (err) return res.status(500).json({ error: 'Ürün eklenemedi: ' + err.message });
    res.status(201).json({ id: result.insertId, ...product });
  });
};

exports.updateRegionalProduct = (req, res) => {
  const id = req.params.id;
  const { name, weight, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  if (!name) return res.status(400).json({ error: 'Ürün adı zorunlu' });
  if (!weight) return res.status(400).json({ error: 'Ağırlık zorunlu' });
  if (!price || isNaN(parseFloat(price))) return res.status(400).json({ error: 'Geçerli bir fiyat girin' });
  if (!image) return res.status(400).json({ error: 'Ürün resmi zorunlu' });

  const slug = slugify(name, { lower: true, locale: 'tr' });
  const product = { name, weight, price: parseFloat(price), image, slug };
  Product.updateRegionalProduct(id, product, (err) => {
    if (err) return res.status(500).json({ error: 'Ürün güncellenemedi: ' + err.message });
    res.json({ id, ...product });
  });
};

exports.deleteRegionalProduct = (req, res) => {
  const id = req.params.id;
  Product.getAllRegionalProducts((err, products) => {
    if (err) return res.status(500).json({ error: 'Veritabanı hatası: ' + err.message });
    const product = products.find((p) => p.product_id == id);
    if (!product) return res.status(404).json({ error: 'Ürün bulunamadı' });

    if (product.image) {
      const filePath = path.join(__dirname, '../public', product.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Dosya silme hatası:', err);
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
    const { product_id, product_name, slug, image, weight, price, variant_id, variant_name, material, variant_price } = row;
    if (!acc[product_id]) {
      acc[product_id] = {
        id: product_id,
        name: product_name,
        slug: slug || slugify(product_name, { lower: true, locale: 'tr' }), // 🔥 slug yoksa oluştur
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
      console.error("❌ getSimpleBaklavaProducts hatası:", err);
      return res.status(200).json([]);
    }
    res.status(200).json(results || []);
  });
};