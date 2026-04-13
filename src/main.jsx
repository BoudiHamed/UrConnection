// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import "./index.css";
// 1. إنشاء الكلاينت (المحرك)
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2. تغليف التطبيق بالبروفايدر */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/* اختيارياً: أداة المطورين لرؤية الكاش */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
