// C:\webproje\celikoglu_baklava\frontend\src\app\page.tsx
"use client";
import CategoryBar from '@/components/CategoryBar';
import ProductCard from '@/components/ProductCard';
import { fetchBaklavaCategories, fetchBaklavaProducts } from '@/utils/api';

export default async function HomePage() {
  // Favorilere ekleme işlevi layout.tsx'den geliyor
  const handleAddToFavorites = () => {
    if (typeof window !== 'undefined' && (window as any).addToFavorites) {
      (window as any).addToFavorites();
    }
  };

  const categories = await fetchBaklavaCategories();
  const products = await fetchBaklavaProducts();

  const allVariants = products.flatMap((product: any) =>
    product.variants.length > 0
      ? product.variants.map((variant: any) => ({
          ...variant,
          productName: product.name,
          productImage: product.image || 'https://via.placeholder.com/300x200?text=No+Image',
        }))
      : [
          {
            productName: product.name,
            productImage: product.image || 'https://via.placeholder.com/300x200?text=No+Image',
            name: 'Standart',
            material: '-',
            price: 0,
          },
        ]
  );

  return (
    <div className="container">
      <h1 className="mb-4">Baklava Ürünleri</h1>
      <CategoryBar categories={categories} />
      <div className="row">
        {allVariants.map((variant: any, idx: number) => (
          <div key={idx} className="col-md-3 mb-4">
            <ProductCard
              name={variant.productName}
              price={Number(variant.price)}
              image={variant.productImage}
              onFavorite={handleAddToFavorites}
            />
          </div>
        ))}
      </div>
    </div>
  );
}