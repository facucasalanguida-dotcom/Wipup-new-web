"use client";

import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WHOLESALE_FORM_URL } from "@/lib/site-data";

const STORAGE_KEY = "wipup-form-popup-seen";

export function WholesaleDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>¿Sos vendedor? ¡Sumate a WIPuP!</DialogTitle>
        </DialogHeader>
        <iframe
          src={WHOLESALE_FORM_URL}
          title="Formulario para Distribuidores"
          className="h-[600px] w-full border-0"
        />
      </DialogContent>
    </Dialog>
  );
}
