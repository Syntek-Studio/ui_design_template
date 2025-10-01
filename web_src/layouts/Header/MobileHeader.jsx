import React, { useState } from 'react';

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="md:hidden flex items-center justify-between w-full bg-[var(--color-text-light)] p-4 shadow-md">
      {/* Logo */}
      <span className="font-heading text-[var(--color-logo)] text-lg">
        MyBrand
      </span>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="focus:outline-none"
      >
        <div className="w-6 h-1 bg-[var(--color-logo)] mb-1"></div>
        <div className="w-6 h-1 bg-[var(--color-logo)] mb-1"></div>
        <div className="w-6 h-1 bg-[var(--color-logo)]"></div>
      </button>

      {/* Menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-[var(--color-text-light)] flex flex-col p-4 space-y-2 shadow-lg z-50">
          <a href="#" className="text-[var(--color-logo)] hover:text-[var(--color-text-muted)]">
            Home
          </a>
          <a href="#" className="text-[var(--color-logo)] hover:text-[var(--color-text-muted)]">
            About
          </a>
          <a href="#" className="text-[var(--color-logo)] hover:text-[var(--color-text-muted)]">
            Services
          </a>
          <a href="#" className="text-[var(--color-logo)] hover:text-[var(--color-text-muted)]">
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
