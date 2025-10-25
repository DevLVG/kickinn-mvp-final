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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{ borderBottom: '1px solid rgba(25, 74, 97, 0.2)' }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 md:py-6 flex items-center justify-between text-left hover:opacity-80 transition-opacity"
        aria-expanded={isOpen}
        style={{ color: '#194a61' }}
      >
        <h3 className="text-base md:text-lg font-semibold pr-4 md:pr-8">{question}</h3>
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
        className="overflow-hidden"
      >
        <p className="pb-4 md:pb-6 leading-relaxed text-sm md:text-base" style={{ color: '#194a61', opacity: 0.85 }}>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default FAQItem;
