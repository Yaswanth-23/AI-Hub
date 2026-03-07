import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/Header";

export default function AppLayout() {
  return (
    <div className="relative min-h-screen flex text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1 min-w-0 relative z-10">
        <Header />

        {/* IMPORTANT: No padding here */}
        <main className="flex-1 relative overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}