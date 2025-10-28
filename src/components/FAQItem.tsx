import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const faqId = `faq-${index}`;
  const contentId = `faq-content-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="py-4"
      style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className="w-full flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors rounded-lg px-4 py-3 text-white cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={contentId}
        role="button"
        id={faqId}
      >
        <h3 className="text-lg font-semibold pr-4 md:pr-8 hover:text-[#86efac] transition-colors">{question}</h3>
        <ChevronDown
          className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ color: '#679f83' }}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden px-4"
        id={contentId}
        role="region"
        aria-labelledby={faqId}
      >
        <p className="pb-4 md:pb-6 pt-2 leading-relaxed text-base text-white/80">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default FAQItem;
