import "./globals.css";
import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Landing from "@/components/Landing";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata = {
  title: "Noteflix",
  description: "Notes application with Akatsuki theme",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log("Session from layout: ", session);

  return (
    <html className="overflow-hidden" lang="en">
      <body className={`${poppins.className} bg-[#202124]`}>
        {session?.user ? (
          <>
            {/* @ts-ignore */}
            <Navbar />
            <div className="flex">
              <div>
                <Sidebar />
              </div>
              <div className="flex-1">{children}</div>
            </div>
          </>
        ) : (
          <div>
            <Landing />
          </div>
        )}
      </body>
    </html>
  );
}
