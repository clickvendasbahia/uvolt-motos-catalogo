import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'UVOLT | Motos e Bicicletas Elétricas em Salvador',
  description:
    'Catálogo digital UVOLT: motos elétricas e bicicletas elétricas em Salvador e Lauro de Freitas. Mobilidade elétrica para a Bahia com tecnologia, design e performance.',
  keywords: [
    'motos elétricas em Salvador',
    'loja de motos elétricas Salvador',
    'bicicletas elétricas Salvador',
    'mobilidade elétrica Bahia',
  ],
  openGraph: {
    title: 'UVOLT | Motos e Bicicletas Elétricas em Salvador',
    description:
      'Catálogo digital premium de motos e bicicletas elétricas da UVOLT, em Salvador e Lauro de Freitas.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
