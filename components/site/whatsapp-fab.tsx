"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { WHATSAPP_URL } from "@/lib/site-data";

export function WhatsappFab() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated sm:bottom-8 sm:right-8"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" aria-hidden="true" />
      <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
    </motion.a>
  );
}
