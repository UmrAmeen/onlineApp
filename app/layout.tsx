import DashBoard from "./dashBoard";
import "./globals.css";
import SideBar from "./sideBar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <DashBoard />
        </div>
        <div className="bodyDiv">
          <div className="sidebar">
            <SideBar />
          </div>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
