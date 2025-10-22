import{
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  X,
  CheckCircle,
  Info,
  AlertTriangle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const defaults = {
    title: "",
    description: "",
    variant: "default",
    duration: 3000,
    dismissible: true,
    position: "top-right",
  };

  const show = useCallback((opts) => {
    const base = typeof opts === "string" ? { description: opts } : opts;
    const id = base.id || Math.random().toString(36).slice(2);
    const rec = {
      id,
      title: base.title ?? defaults.title,
      description: base.description ?? defaults.description,
      variant: base.variant ?? defaults.variant,
      duration: base.duration ?? defaults.duration,
      dismissible: base.dismissible ?? defaults.dismissible,
      position: base.position ?? defaults.position,
    };
    setToasts((prev) => [...prev, rec]);
    return id;
  }, []);

  const dismiss = useCallback((id) => {
    if (!id) return setToasts([]);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // auto dismiss
  useEffect(() => {
    const timers = toasts.map((t) => {
      if (t.duration <= 0) return null;
      return setTimeout(() => dismiss(t.id), t.duration);
    });
    return () => timers.forEach((id) => id && clearTimeout(id));
  }, [toasts, dismiss]);

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <ToastViewport toasts={toasts} onDismiss={dismiss} />,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

// --- UI Components ---

function ToastViewport({ toasts, onDismiss }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => onDismiss(t.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function iconFor(variant) {
  switch (variant) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "error":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case "loading":
      return <Loader2 className="h-5 w-5 animate-spin" />;
    default:
      return null;
  }
}

function ToastItem({ toast, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="bg-white dark:bg-neutral-900 shadow-lg rounded-xl border p-4 flex items-start gap-3 w-72"
    >
      {iconFor(toast.variant)}
      <div className="flex-1">
        {toast.title && (
          <h4 className="text-sm font-semibold">{toast.title}</h4>
        )}
        {toast.description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {toast.description}
          </p>
        )}
      </div>
      {toast.dismissible && (
        <button
          onClick={onDismiss}
          className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}
