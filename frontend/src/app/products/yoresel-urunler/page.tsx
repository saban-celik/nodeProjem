//C:\webproje\celikoglu_baklava\frontend\src\app\products\yoresel-urunler\page.tsx
import ProductCard from '@/components/ProductCard';
import { fetchRegionalProducts } from '@/utils/api';

export default async function YoreselPage() {
    const products = await fetchRegionalProducts();

   // baklavalar/page.tsx içinden örnek
// yoresel-urunler/page.tsx içinden örnek
const variants = products.flatMap((product: any) =>
  product.variants && product.variants.length > 0
    ? product.variants.map((variant: any) => ({
        ...variant,
        productName: product.name,
        productImage: product.image
          ? product.image.startsWith('http')
            ? product.image
            : `http://localhost:5000${product.image}`
          : '',
        weight: product.weight || '',  // Virgül burada
      }))
    : [
        {
          productName: product.name,
          productImage: product.image
            ? product.image.startsWith('http')
              ? product.image
              : `http://localhost:5000${product.image}`
            : '',
          weight: product.weight || '',  // Virgül burada da
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
                    src="https://www.celebiogullari.com.tr/Fotograflar/1783-yoresel.png"
                    alt="Yöresel Ürünler"
                    className="hero-image mb-4"
                />
                <h1 className="mb-4">Yöresel Ürünler</h1>
                <div className="row">
                    {variants.map((variant: any, idx: number) => (
                        <div key={`yoresel-${idx}`} className="col-md-3 mb-4 d-flex">
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
