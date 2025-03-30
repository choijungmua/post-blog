"use client";

import { createContext, useContext, useState } from "react";

const ToastContext = createContext({
  toast: () => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, variant = "default" }) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, title, description, variant },
    ]);

    // 3초 후 자동으로 제거
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* 토스트 렌더링 */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-lg p-4 shadow-lg transition-all duration-300 transform translate-x-0 max-w-md ${
              t.variant === "destructive"
                ? "bg-red-500 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                {t.title && <h4 className="font-semibold">{t.title}</h4>}
                {t.description && (
                  <p className="text-sm mt-1">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="ml-4 text-gray-300 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
