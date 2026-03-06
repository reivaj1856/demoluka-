import '../styles/globals.css';

export const metadata = {
  title: 'Luka Demo',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-dvh bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}