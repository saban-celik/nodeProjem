// C:\webproje\celikoglu_baklava\frontend\middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const pageUrl = request.nextUrl.pathname;

  // API, statik dosyalar ve favicon hariç tüm istekleri kaydet
  if (!pageUrl.startsWith('/api') && !pageUrl.startsWith('/_next') && pageUrl !== '/favicon.ico') {
    try {
  console.log(`Middleware: Ziyaret kaydediliyor, URL: ${pageUrl}`);
  const response = await fetch('http://localhost:5000/api/visits/increment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page_url: pageUrl }),
  });
  const data = await response.json();
  console.log(`Middleware: Ziyaret kaydı sonucu: ${JSON.stringify(data)}`);
  if (!response.ok) {
    console.error(`Middleware: Ziyaret kaydedilemedi, status: ${response.status}, hata: ${JSON.stringify(data)}`);
  }
} catch (err) {
  console.error(`Middleware: Ziyaret kaydedilemedi, hata: ${err}`);
}
  } else {
    console.log(`Middleware: İstek kaydedilmedi, URL: ${pageUrl}`); // Hariç tutulan URL'leri logla
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};