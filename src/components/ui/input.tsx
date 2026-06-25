import { InputHTMLAttributes } from 'react';

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-2xl border border-[#8B5E3C] bg-[#1B1612] px-4 py-3 text-[#F5E9D3] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 ${className}`}
      {...props}
    />
  );
}
