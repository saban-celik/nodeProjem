//C:\webproje\celikoglu_baklava\frontend\src\app\products\baklavalar\page.tsx
import ProductCard from '@/components/ProductCard';
import { fetchBaklavaProducts } from '@/utils/api';

export default async function BaklavaPage() {
  const products = await fetchBaklavaProducts();

  const variants = products.flatMap((product: any) =>
    product.variants && product.variants.length > 0
      ? product.variants.map((variant: any) => ({
          ...variant,
          productName: product.name,
          productImage: product.image || '',
          weight: product.weight || '',  // Virgül eklendi
        }))
      : [
          {
            productName: product.name,
            productImage: product.image || '',
            weight: product.weight || '',  // Virgül eklendi
            name: 'Standart',
            material: '-',
            price: product.price || 0,
          },
        ]
  );

  return (
    <>
      <div className="responsive-wrapper">
        <img
          src="https://www.celebiogullari.com.tr/Fotograflar/1782-baklava.png"
          alt="Baklavalar"
          className="hero-image mb-4"
        />
        <h1 className="mb-4">Baklavalar</h1>
        <div className="row">
          {variants.map((variant: any, idx: number) => (
            <div key={`baklava-${idx}`} className="col-md-3 mb-4 d-flex">
              <ProductCard
              id={variant.id ?? idx}  
                name={variant.productName}
                weight={variant.weight}    
                price={Number(variant.price)}
                image={variant.productImage}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
