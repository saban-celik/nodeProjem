//C:\webproje\celikoglu_baklava\frontend\src\utils\api.ts
export const fetchBaklavaProducts = async () => {
  const res = await fetch('http://localhost:5000/api/baklava-products');
  return res.json();
};

export const fetchRegionalProducts = async () => {
  const res = await fetch('http://localhost:5000/api/regional-products');
  return res.json();
};

export const fetchBaklavaCategories = async () => {
  const res = await fetch('http://localhost:5000/api/baklava-categories');
  return res.json();
};

export const fetchRegionalCategories = async () => {
  const res = await fetch('http://localhost:5000/api/regional-categories');
  return res.json();
};
