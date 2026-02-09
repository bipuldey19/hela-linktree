import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/ui/Toast";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50">
          <Sidebar />
          <main className="lg:pl-60 pt-14 lg:pt-0">
            <div className="p-4 lg:p-8">{children}</div>
          </main>
        </div>
      </ToastProvider>
    </SessionProvider>
  );
}
