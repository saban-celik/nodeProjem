// C:\webproje\celikoglu_baklava\frontend\src\app\category\[slug]\page.tsx 
"use client";
import CategoryBar from '@/components/CategoryBar';
import ProductCard from '@/components/ProductCard';
import { fetchBaklavaCategories, fetchBaklavaProducts, fetchRegionalCategories, fetchRegionalProducts } from '@/utils/api';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Favorilere ekleme işlevi layout.tsx'den geliyor
  const handleAddToFavorites = () => {
    if (typeof window !== 'undefined' && (window as any).addToFavorites) {
      (window as any).addToFavorites();
    }
  };

  const isBaklava = [
    "baklavalar",
    "kadayiflar",
    "pastalar",
    "sutlu-tatlilar",
    "tepsi-urunler",
    "soguk-baklavalar",
    "midye-baklava",
    "yesil-burma-kadayif",
  ].includes(slug);

  const categories = await (isBaklava ? fetchBaklavaCategories() : fetchRegionalCategories());
  const products = await (isBaklava ? fetchBaklavaProducts() : fetchRegionalProducts());

  const filteredProducts = slug === 'yoresel-urunler'
    ? products
    : products.filter((product: any) => product.slug === slug || product.categorySlug === slug);

  const allVariants = filteredProducts.flatMap((product: any) =>
    product.variants?.length
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
      <h1>{slug.replace("-", " ").toUpperCase()}</h1>
      <CategoryBar categories={categories} />
      <div className="flex flex-wrap flex-center">
        {allVariants.length > 0 ? (
          allVariants.map((variant: any, idx: number) => (
            <ProductCard
              key={idx}
              name={variant.productName}
              price={Number(variant.price)}
              image={variant.productImage}
              onFavorite={handleAddToFavorites}
            />
          ))
        ) : (
          <p>Bu kategoriye ait ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
}