'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl"
          >
            <div className="space-y-2">
              <a href="tel:+918696753044" className="block text-gray-800 dark:text-white hover:text-primary">📞 Call Us</a>
              <a href="mailto:astravision.global@gmail.com" className="block text-gray-800 dark:text-white hover:text-primary">📧 Email</a>
              <a href="https://wa.me/8696753044" className="block text-gray-800 dark:text-white hover:text-primary">💬 WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-4 rounded-full shadow-lg"
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>
    </div>
  );
} 