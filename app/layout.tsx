import "./globals.css";

export const metadata = {
  title: "Noteflix",
  description: "Notes application with Akatsuki theme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
