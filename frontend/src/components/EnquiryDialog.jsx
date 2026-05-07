import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { CheckCircle2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const EnquiryDialog = ({ open, onOpenChange, product }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", phone: "", email: "", message: "" });
      }, 300);
    }
  }, [open]);

  useEffect(() => {
    if (product) {
      setForm((f) => ({
        ...f,
        message: `I would like to enquire about: ${product.name} (${product.price}).`,
      }));
    }
  }, [product]);

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md bg-[#0A0D15] border border-white/10 text-white"
        data-testid="enquiry-dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-2xl" style={{ fontFamily: "Outfit, sans-serif" }}>
            {product ? `Enquire: ${product.name}` : "Product Enquiry"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Share your details — our consultant will reach out within working hours.
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={submit}
              className="space-y-4 mt-2"
            >
              <div>
                <Label className="text-slate-300 text-xs uppercase tracking-wider">Name</Label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 bg-[#05070C] border-white/10 text-white"
                  data-testid="enquiry-input-name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-300 text-xs uppercase tracking-wider">Phone</Label>
                  <Input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-1.5 bg-[#05070C] border-white/10 text-white"
                    data-testid="enquiry-input-phone"
                  />
                </div>
                <div>
                  <Label className="text-slate-300 text-xs uppercase tracking-wider">Email</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1.5 bg-[#05070C] border-white/10 text-white"
                    data-testid="enquiry-input-email"
                  />
                </div>
              </div>
              <div>
                <Label className="text-slate-300 text-xs uppercase tracking-wider">Message</Label>
                <Textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 bg-[#05070C] border-white/10 text-white"
                  data-testid="enquiry-input-message"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2"
                data-testid="enquiry-submit-btn"
              >
                <Send size={15} />
                Send Enquiry
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center py-6"
              data-testid="enquiry-success"
            >
              <CheckCircle2 size={56} className="text-cyan-300 mb-4" />
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                Thank you!
              </h3>
              <p className="mt-2 text-slate-400 text-sm">
                Your enquiry has been received. Our team will contact you shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryDialog;
