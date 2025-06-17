'use client';

import React from 'react';

type SubscribeButtonProps = {
  href: string;
  eventName: string;
  label: string;
  variant?: 'black' | 'gray' | 'light' | 'outline' | 'none';
  className?: string;
};

export default function SubscribeButton({
  href,
  eventName,
  label,
  variant = 'black',
  className = '',
}: SubscribeButtonProps) {
  const baseStyle =
    'inline-block rounded-full px-6 py-3 text-base text-center transition-colors';

  const variants = {
    black: 'bg-black text-white hover:bg-[#383838]',
    gray: 'bg-[#4b4b4b] text-white hover:bg-[#5e5e5e]',
    light: 'bg-[#e5e5e5] text-black hover:bg-[#ccc]',
    outline: 'border border-black text-black hover:bg-black hover:text-white',
    none: '', // für volle Kontrolle via className
  };

  const handleClick = () => {
    if (typeof window !== 'undefined' && typeof window.va === 'function') {
      window.va('event', { name: eventName });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${variant === 'none' ? '' : baseStyle + ' ' + variants[variant]} ${className}`}
    >
      {label}
    </a>
  );
}
