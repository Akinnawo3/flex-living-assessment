"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import DashboardNavigation from "./ui/DashboardNavigation";
import WebsiteNavigation from "./ui/WebsiteNavigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPropertyPage = pathname?.startsWith("/properties/");
  const isDashboardPage = pathname?.startsWith("/dashboard") || pathname === "/";

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
        {isDashboardPage && <DashboardNavigation />}
        {isPropertyPage && <WebsiteNavigation />}

        <main className={isPropertyPage ? "" : "min-h-screen"}>{children}</main>
      </motion.div>
    </AnimatePresence>
  );
}
