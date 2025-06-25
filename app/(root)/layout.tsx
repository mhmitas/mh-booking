import EnhancedContactButton from "@/components/shared/ai-assistant-widget";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <EnhancedContactButton />
      <Footer />
    </div>
  );
};

export default Layout;
