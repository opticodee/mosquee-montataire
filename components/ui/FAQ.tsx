"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
  className?: string;
};

export function FAQ({ items, className }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-2xl border border-primary-100 bg-white shadow-soft overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:bg-primary-50/50 focus-visible:outline-none focus-visible:bg-primary-50"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
            >
              <span className="font-semibold text-primary-700 text-base sm:text-lg pr-2">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-primary-500 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-panel-${index}`}
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-ink-muted leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
