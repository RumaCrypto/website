import { ReactNode } from "react";

/** A phone holding a real Ruma screen. Decorative: the page says the same in words. */
export default function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className={`phone ${className}`}>
      <div data-ui className="phone__screen">
        {children}
      </div>
    </div>
  );
}
