export const metadata = { title: 'C-LINE Müzayede', description: 'Özel Koleksiyon' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="tr"><body>{children}</body></html>)
}
