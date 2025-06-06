// // C:\webproje\celikoglu_baklava\frontend\src\app\category\[slug]\page.tsx
// // import CategoryBar from '@/components/CategoryBar';
// import ProductCard from '@/components/ProductCard';
// import {
//   fetchBaklavaCategories,
//   fetchBaklavaProducts,
//   fetchRegionalCategories,
//   fetchRegionalProducts,
// } from '@/utils/api';

// export default async function CategoryPage(props: { params: { slug: string } }) {
//   const { slug } = props.params;

//   const isBaklava = [
//     'baklavalar',
//     'kadayiflar',
//     'pastalar',
//     'sutlu-tatlilar',
//     'tepsi-urunler',
//     'soguk-baklavalar',
//     'midye-baklava',
//     'yesil-burma-kadayif',
//   ].includes(slug);

//   const categories = await (isBaklava ? fetchBaklavaCategories() : fetchRegionalCategories());
//   const products = await (isBaklava ? fetchBaklavaProducts() : fetchRegionalProducts());

//   const filteredProducts =
//     slug === 'yoresel-urunler'
//       ? products
//       : products.filter(
//           (product: any) => product.slug === slug || product.categorySlug === slug
//         );

//   const allVariants = filteredProducts.flatMap((product: any) =>
//     product.variants?.length
//       ? product.variants.map((variant: any) => ({
//           ...variant,
//           productName: product.name,
//           productImage: product.image || 'https://via.placeholder.com/300x200?text=No+Image',
//         }))
//       : [
//           {
//             productName: product.name,
//             productImage: product.image || 'https://via.placeholder.com/300x200?text=No+Image',
//             name: 'Standart',
//             material: '-',
//             price: 0,
//           },
//         ]
//   );

//   const heroImage =
//     slug === 'yoresel-urunler'
//       ? 'https://www.celebiogullari.com.tr/Fotograflar/1783-yoresel.png'
//       : 'https://www.celebiogullari.com.tr/Fotograflar/1782-baklava.png';

//   return (
//     <div>
//       <div className="responsive-wrapper">
//         <img src={heroImage} alt={`${slug} banner`} className="hero-image" />
//       </div>

//       <div className="responsive-wrapper">
//         <h1 className="mb-4">{slug.replace(/-/g, ' ').toUpperCase()}</h1>

//         {/* Kategori butonları: düzenli ve alt çizgisiz */}
//         <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
//           {/* <CategoryBar categories={categories} /> */}
//         </div>

//         <div className="row">
//           {allVariants.length > 0 ? (
//             allVariants.map((variant: any, idx: number) => (
//               <div key={idx} className="col-md-3 mb-4 d-flex">
//                 <ProductCard
//                   name={variant.productName}
//                   price={Number(variant.price)}
//                   image={variant.productImage}
//                 />
//               </div>
//             ))
//           ) : (
//             <p>Bu kategoriye ait ürün bulunamadı.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
