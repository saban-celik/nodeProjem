// C:\webproje\celikoglu_baklava\backend\models\productModel.js
const db = require('../config/db');

// ✅ Tüm baklava ürünleri (varyantlarla birlikte)
exports.getAllBaklavaProducts = (callback) => {
  const query = `
    SELECT 
      p.id AS product_id,
      p.name AS product_name,
      p.image,
      p.weight,
      p.price,
      v.id AS variant_id,
      v.variant_name,
      v.material,
      v.price AS variant_price
    FROM baklava_products p
    LEFT JOIN baklava_product_variants v ON p.id = v.product_id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ SQL HATASI (getAllBaklavaProducts):", err);
      return callback(null, []);
    }
    callback(null, results || []);
  });
};

// ✅ Tüm yöresel ürünler (varyantlarla birlikte)
exports.getAllRegionalProducts = (callback) => {
  const query = `
    SELECT 
      p.id AS product_id,
      p.name AS product_name,
      p.image,
      p.weight,
      p.price,
      v.id AS variant_id,
      v.variant_name,
      v.material,
      v.price AS variant_price
    FROM regional_products p
    LEFT JOIN regional_product_variants v ON p.id = v.product_id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ SQL HATASI (getAllRegionalProducts):", err);
      return callback(null, []);
    }
    callback(null, results || []);
  });
};

// ✅ Yeni baklava ürünü ekle
exports.createBaklavaProduct = (product, callback) => {
  const { name, weight, price, image } = product;
  const query = `
    INSERT INTO baklava_products (name, weight, price, image)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [name, weight, parseFloat(price), image], (err, result) => {
    if (err) {
      console.error("SQL Hatası:", err.message);
      return callback(new Error(`Veritabanına eklenemedi: ${err.message}`));
    }
    callback(null, result);
  });
};

// ✅ Baklava ürünü güncelle
exports.updateBaklavaProduct = (id, product, callback) => {
  const { name, weight, price, image } = product;
  const query = `
    UPDATE baklava_products
    SET name = ?, weight = ?, price = ?, image = ?
    WHERE id = ?
  `;
  db.query(query, [name, weight, parseFloat(price), image, id], (err) => {
    if (err) return callback(new Error(`Güncelleme başarısız: ${err.message}`));
    callback(null);
  });
};

// ✅ Baklava ürünü sil
exports.deleteBaklavaProduct = (id, callback) => {
  const query = `DELETE FROM baklava_products WHERE id = ?`;
  db.query(query, [id], (err) => {
    if (err) return callback(new Error(`Silme başarısız: ${err.message}`));
    callback(null);
  });
};

// ✅ Yeni yöresel ürün ekle
exports.createRegionalProduct = (product, callback) => {
  const { name, weight, price, image } = product;
  const query = `
    INSERT INTO regional_products (name, weight, price, image)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [name, weight, parseFloat(price), image], (err, result) => {
    if (err) return callback(new Error(`Veritabanına eklenemedi: ${err.message}`));
    callback(null, result);
  });
};

// ✅ Yöresel ürün güncelle
exports.updateRegionalProduct = (id, product, callback) => {
  const { name, weight, price, image } = product;
  const query = `
    UPDATE regional_products
    SET name = ?, weight = ?, price = ?, image = ?
    WHERE id = ?
  `;
  db.query(query, [name, weight, parseFloat(price), image, id], (err) => {
    if (err) return callback(new Error(`Güncelleme başarısız: ${err.message}`));
    callback(null);
  });
};

// ✅ Yöresel ürün sil
exports.deleteRegionalProduct = (id, callback) => {
  const query = `DELETE FROM regional_products WHERE id = ?`;
  db.query(query, [id], (err) => {
    if (err) return callback(new Error(`Silme başarısız: ${err.message}`));
    callback(null);
  });
};

// ✅ Sadece basit baklava ürünleri (varyantsız)
exports.getSimpleBaklavaProducts = (callback) => {
  const query = `
    SELECT id, name, weight, price, image
    FROM baklava_products
    ORDER BY id DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ SQL HATASI (getSimpleBaklavaProducts):", err);
      return callback(null, []);
    }
    callback(null, results || []);
  });
};
