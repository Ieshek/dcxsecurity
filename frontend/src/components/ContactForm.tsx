import { useState, type ChangeEvent, type FormEvent } from "react";

type ContactFormValues = {
  full_name: string;
  phone: string;
  email: string;
  request_type: string;
  message: string;
  honeypot: string;
};

type ToastMessage = {
  type: "success" | "error";
  text: string;
};

const initialValues: ContactFormValues = {
  full_name: "",
  phone: "",
  email: "",
  request_type: "General Inquiry",
  message: "",
  honeypot: "",
};

const requestTypes = [
  "General Inquiry",
  "Installation Request",
  "Service Support",
  "Business Partnership",
  "Other",
];

const isValidIndianPhone = (value: string) => {
  const normalized = value.trim();
  return /^(?:\+91[\-\s]?)?[6-9]\d{9}$/.test(normalized);
};

const ContactForm = () => {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const apiUrl = import.meta.env.VITE_API_BASE_URL || "";

  const showToast = (message: ToastMessage) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (field: keyof ContactFormValues) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const validate = () => {
    if (!values.full_name.trim()) {
      return "Full name is required.";
    }
    if (!values.phone.trim()) {
      return "Phone number is required.";
    }
    if (!isValidIndianPhone(values.phone)) {
      return "Please enter a valid Indian phone number.";
    }
    if (!values.email.trim()) {
      return "Email address is required.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      return "Please enter a valid email address.";
    }
    if (!values.request_type.trim()) {
      return "Please select a request type.";
    }
    if (!values.message.trim()) {
      return "Message is required.";
    }
    if (values.honeypot.trim()) {
      return "Invalid submission.";
    }
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      showToast({ type: "error", text: validationError });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = await response.json();

      if (!response.ok) {
        const message = payload?.detail || payload?.message || "Unable to submit the form.";
        throw new Error(message);
      }

      setSuccess(true);
      setValues(initialValues);
      showToast({ type: "success", text: "Your request was submitted successfully." });
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
      showToast({ type: "error", text: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Contact Sales</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Get expert security support from DCX Security Wizards</h2>
        <p className="mt-4 text-slate-400">Submit your details and our team will contact you within one business day.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-slate-300">Full Name</span>
            <input
              type="text"
              name="full_name"
              value={values.full_name}
              onChange={handleChange("full_name")}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Your name"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Phone Number</span>
            <input
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange("phone")}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="+91 98765 43210"
              required
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm text-slate-300">Email Address</span>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange("email")}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm text-slate-300">Request Type</span>
            <select
              name="request_type"
              value={values.request_type}
              onChange={handleChange("request_type")}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              required
            >
              {requestTypes.map((type) => (
                <option key={type} value={type} className="bg-slate-950 text-white">
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm text-slate-300">Message</span>
            <textarea
              name="message"
              rows={6}
              value={values.message}
              onChange={handleChange("message")}
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 resize-none"
              placeholder="Tell us how we can help with your security needs."
              required
            />
          </label>
          <input
            type="text"
            name="honeypot"
            value={values.honeypot}
            onChange={handleChange("honeypot")}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            {success && <p className="text-sm text-emerald-400">Your form was successfully submitted.</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Send Request"}
          </button>
        </div>
      </form>

      {toast ? (
        <div className={`mt-6 rounded-2xl border ${toast.type === "success" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200" : "border-rose-500/20 bg-rose-500/10 text-rose-200"} px-4 py-3`}>
          {toast.text}
        </div>
      ) : null}
    </div>
  );
};

export default ContactForm;
