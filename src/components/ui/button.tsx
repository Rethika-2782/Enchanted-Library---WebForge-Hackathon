import { ButtonHTMLAttributes } from 'react';

export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-2xl border border-transparent bg-[#2a2018] px-5 py-3 text-[#F5E9D3] transition hover:border-[#8B5E3C] ${className}`}
      {...props}
    />
  );
}
