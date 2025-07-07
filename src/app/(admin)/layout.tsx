import "../globals.css";
import Navbar from "../(admin)/components/Navbar";
import Breadcrumb from "../(admin)/components/Breadcrumb";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Navbar หรือ Sidebar */}
      <Navbar />
      
      {/* เนื้อหาหลัก */}
      <main className="flex-1 p-6 overflow-y-auto bg-white">
        <Breadcrumb />
        {children}
      </main>
    </div>
  );
}
