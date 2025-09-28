// Layout.tsx (Super simple now)
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
