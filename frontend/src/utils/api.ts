// C:\webproje\celikoglu_baklava\frontend\src\utils\api.ts

export interface VideoItem {
  id?: number;
  url: string;
  created_at: string;
}

export interface NewsItem {
  id?: number;
  title: string;
  content: string;
  media?: string | File;
  image?: string;
}

export interface AnnouncementItem {
  id?: number;
  title: string;
  content: string;
}

export interface VisitStat {
  total_visits: number;
  visit_day: string;
}

let csrfToken: string | null = null;

// ⛳ CSRF token'ı backend'den al
export const fetchCsrfToken = async () => {
  const res = await fetch('http://localhost:5000/api/csrf-token', {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('CSRF token alınamadı');
  const data = await res.json();
  csrfToken = data.csrfToken;
};

const ensureCsrfToken = async () => {
  if (!csrfToken) {
    await fetchCsrfToken();
  }
};

// 🔐 CSRF destekli merkezi fetch
// api.ts
export const fetchWithCsrf = async (input: RequestInfo, init: RequestInit = {}): Promise<Response> => {
  await ensureCsrfToken();
  console.log('📤 Gönderilen CSRF Token:', csrfToken); // Token'ı logla
  const isFormData = init.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string> || {}),
    'XSRF-TOKEN': csrfToken!,
  };
  if (!isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  return fetch(input, {
    ...init,
    headers,
    credentials: 'include',
  });
};

// 📽️ Video işlemleri
type FetchMethod = 'POST' | 'PUT' | 'DELETE';

export const fetchVideos = async (): Promise<VideoItem[]> => {
  const res = await fetchWithCsrf('http://localhost:5000/api/videos');
  if (!res.ok) throw new Error('Videolar alınamadı');
  return res.json();
};


export const createVideo = async (fd: FormData): Promise<VideoItem> => {
  const res = await fetchWithCsrf('http://localhost:5000/api/videos', {
    method: 'POST',
    body: fd,
  });
  if (!res.ok) throw new Error('Video eklenemedi');
  return res.json();
};

export const updateVideo = async (id: number, fd: FormData): Promise<VideoItem> => {
  const res = await fetchWithCsrf(`http://localhost:5000/api/videos/${id}`, {
    method: 'PUT',
    body: fd,
  });
  if (!res.ok) throw new Error('Video güncellenemedi');
  return res.json();
};

export const deleteVideo = async (id: number): Promise<void> => {
  const res = await fetchWithCsrf(`http://localhost:5000/api/videos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Video silinemedi');
};


// Haber işlemleri
export const fetchNews = async () => {
  try {
    const res = await fetchWithCsrf('http://localhost:5000/api/news');
    if (!res.ok) {
      console.warn('📛 fetchNews başarısız:', res.status);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('❌ Haberler çekilirken hata:', err);
    return [];
  }
};

export const createNews = async (formData: FormData) => {
  const res = await fetchWithCsrf('http://localhost:5000/api/news', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Haber eklenemedi: ${errorData.error || res.statusText}`);
  }
  return res.json();
};

export const updateNews = async (id: number, formData: FormData) => {
  const res = await fetchWithCsrf(`http://localhost:5000/api/news/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Haber güncellenemedi: ${errorData.error || res.statusText}`);
  }
  return res.json();
};

export const deleteNews = async (id: number) => {
  const res = await fetchWithCsrf(`http://localhost:5000/api/news/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Haber silinemedi: ${errorData.error || res.statusText}`);
  }
  return res.json();
};

// Duyuru işlemleri
export const fetchAnnouncements = async () => {
  try {
    console.log('fetchAnnouncements çağrıldı');
    const res = await fetchWithCsrf('http://localhost:5000/api/announcements');
    console.log('fetchAnnouncements yanıt durumu:', res.status);
    if (!res.ok) {
      console.warn('📛 fetchAnnouncements başarısız:', res.status);
      return [];
    }
    const data = await res.json();
    console.log('fetchAnnouncements veri:', data);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('❌ Duyurular çekilirken hata:', err);
    return [];
  }
};

export const createAnnouncement = async (announcement: AnnouncementItem) => {
  console.log('createAnnouncement çağrıldı, gönderilen veri:', announcement);
  const res = await fetchWithCsrf('http://localhost:5000/api/announcements', {
    method: 'POST',
    body: JSON.stringify(announcement),
  });
  console.log('createAnnouncement yanıt durumu:', res.status);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Duyuru eklenemedi: ${errorData.error || res.statusText}`);
  }
  const data = await res.json();
  console.log('createAnnouncement veri:', data);
  return data;
};

export const updateAnnouncement = async (id: number, announcement: AnnouncementItem) => {
  console.log('updateAnnouncement çağrıldı, gönderilen veri:', announcement);
  const res = await fetchWithCsrf(`http://localhost:5000/api/announcements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(announcement),
  });
  console.log('updateAnnouncement yanıt durumu:', res.status);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Duyuru güncellenemedi: ${errorData.error || res.statusText}`);
  }
  const data = await res.json();
  console.log('updateAnnouncement veri:', data);
  return data;
};

export const deleteAnnouncement = async (id: number) => {
  console.log('deleteAnnouncement çağrıldı, id:', id);
  const res = await fetchWithCsrf(`http://localhost:5000/api/announcements/${id}`, {
    method: 'DELETE',
  });
  console.log('deleteAnnouncement yanıt durumu:', res.status);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Duyuru silinemedi: ${errorData.error || res.statusText}`);
  }
  const data = await res.json();
  console.log('deleteAnnouncement veri:', data);
  return data;
};

// Baklava ürünleri işlemleri
export const fetchBaklavaProducts = async () => {
  try {
    const res = await fetchWithCsrf('http://localhost:5000/api/products/baklava-products'); // Sonundaki "/" kaldırıldı
    if (!res.ok) {
      console.warn('📛 fetchBaklavaProducts başarısız:', res.status);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('❌ Baklava ürünleri çekilirken hata:', err);
    return [];
  }
};
export const createBaklavaProduct = async (formData: FormData) => {
  const res = await fetchWithCsrf('http://localhost:5000/api/products/baklava-products', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Baklava ürünü eklenemedi: ${errorData.error || res.statusText}`);
  }
  return res.json();
};

export const updateBaklavaProduct = async (id: number, formData: FormData) => {
  const res = await fetchWithCsrf(`http://localhost:5000/api/products/baklava-products/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Baklava ürünü güncellenemedi: ${errorData.error || res.statusText}`);
  }
  return res.json();
};

export const deleteBaklavaProduct = async (id: number) => {
  const res = await fetchWithCsrf(`http://localhost:5000/api/products/baklava-products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Baklava ürünü silinemedi: ${errorData.error || res.statusText}`);
  }
  return res.json();
};

// Yöresel ürünler işlemleri
export const fetchRegionalProducts = async () => {
  try {
    const res = await fetchWithCsrf('http://localhost:5000/api/products/regional-products');
    if (!res.ok) {
      console.warn('📛 fetchRegionalProducts başarısız:', res.status);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('❌ Yöresel ürünler çekilirken hata:', err);
    return [];
  }
};

export const createRegionalProduct = async (formData: FormData) => {
  const res = await fetchWithCsrf('http://localhost:5000/api/products/regional-products', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Yöresel ürün eklenemedi: ${errorData.error || res.statusText}`);
  }
  return res.json();
};

export const updateRegionalProduct = async (id: number, formData: FormData) => {
  const res = await fetchWithCsrf(`http://localhost:5000/api/products/regional-products/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Yöresel ürün güncellenemedi: ${errorData.error || res.statusText}`);
  }
  return res.json();
};

export const deleteRegionalProduct = async (id: number) => {
  const res = await fetchWithCsrf(`http://localhost:5000/api/products/regional-products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Yöresel ürün silinemedi: ${errorData.error || res.statusText}`);
  }
  return res.json();
};

// Kullanıcı işlemleri
export const fetchUserById = async (id: number) => {
  try {
    const res = await fetchWithCsrf(`http://localhost:5000/api/auth/user/${id}`);
    if (!res.ok) {
      console.warn('📛 fetchUserById başarısız:', res.status);
      return null;
    }
    return res.json();
  } catch (err) {
    console.error('❌ Kullanıcı çekilirken hata:', err);
    return null;
  }
};

// Basit baklava ürünleri
export const fetchSimpleBaklavaProducts = async () => {
  try {
    const res = await fetchWithCsrf('http://localhost:5000/api/products/simple-baklava-products');
    if (!res.ok) {
      console.warn('📛 fetchSimpleBaklavaProducts başarısız:', res.status);
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('❌ Basit baklava ürünleri çekilirken hata:', err);
    return [];
  }
};

// Ziyaret istatistikleri
export const fetchVisitStats = async (): Promise<VisitStat[]> => {
  try {
    console.log('fetchVisitStats çağrıldı, URL: http://localhost:5000/api/visits/stats');
    const res = await fetchWithCsrf('http://localhost:5000/api/visits/stats', {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    console.log('Response status:', res.status);
    console.log('Response headers:', Object.fromEntries(res.headers.entries()));
    if (!res.ok) {
      const errorData = await res.json();
      console.log('Hata detayları:', errorData);
      throw new Error(`Ziyaret istatistikleri alınamadı. Status: ${res.status}`);
    }
    const data = await res.json();
    console.log('Alınan veri:', data);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Ziyaret istatistikleri alınırken hata:', err);
    return [];
  }
};