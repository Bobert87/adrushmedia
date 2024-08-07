import { Inter } from "next/font/google";
import "./globals.css";
import SidebarDesktop from "./SidebarDesktop";

// import Advertisers from "../pages/Advertisers";
// import Campaigns from '../pages/Campaigns';
// import Ads from '../pages/Ads';
// import Publishers from '../pages/Publishers';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarDesktop />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* <Routes>
              <Route path='/advertisers' element={<Advertisers />} />
              <Route path='/campaigns' element={<Campaigns />} />
              <Route path='/ads' element={<Ads />} />
              <Route path='/publishers' element={<Publishers />} />
            </Routes> */}
          </div>
        </main>
        </body>
    </html>
  );
}
