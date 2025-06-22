import "./globals.css";
import SideBar from "./sideBar";
import NavBar from "./navBar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <NavBar />
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
