"use client";

import { MathRenderer } from "@/components/shared/MathRenderer";
import { cn } from "@/lib/utils";

export default function TestPage() {
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900 text-slate-100 flex flex-col font-sans h-screen w-screen overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8 md:p-16 flex flex-col justify-center items-center">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <button className="text-left p-6 md:p-8 rounded-3xl border-2 text-2xl md:text-4xl transition-all duration-300 relative overflow-hidden group bg-slate-800 border-slate-700">
              <div className="flex items-start gap-6 relative z-10">
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full font-bold text-2xl md:text-3xl shrink-0 transition-colors bg-slate-700 text-blue-400">
                  A
                </div>
                <div className="mt-1.5 md:mt-2 overflow-x-auto no-scrollbar border-4 border-red-500">
                  <MathRenderer content="$\frac{4}{3}\pi R^3$" />
                </div>
              </div>
            </button>
            <button className="text-left p-6 md:p-8 rounded-3xl border-2 text-2xl md:text-4xl transition-all duration-300 relative overflow-hidden group bg-slate-800 border-slate-700">
              <div className="flex items-start gap-6 relative z-10">
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full font-bold text-2xl md:text-3xl shrink-0 transition-colors bg-slate-700 text-blue-400">
                  B
                </div>
                <div className="mt-1.5 md:mt-2 overflow-x-auto no-scrollbar border-4 border-red-500">
                  <MathRenderer content="$4\pi R^2$" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
