"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import DashboardNavigation from "./ui/DashboardNavigation";
import WebsiteNavigation from "./ui/WebsiteNavigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if we're on a property page
  const isPropertyPage = pathname?.startsWith("/properties/");
  const isDashboardPage = pathname?.startsWith("/dashboard") || pathname === "/";

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
        {/* Show Dashboard Navigation only on dashboard and home pages */}
        {isDashboardPage && <DashboardNavigation />}

        {/* Show Website Navigation only on property pages */}
        {isPropertyPage && <WebsiteNavigation />}

        <main className={`${isPropertyPage ? "" : "min-h-screen"}`}>{children}</main>
      </motion.div>
    </AnimatePresence>
  );
}
