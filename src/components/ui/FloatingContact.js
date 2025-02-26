'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl w-[280px] sm:w-auto"
          >
            <div className="space-y-3">
              <a href="tel:+918696753044" className="block text-gray-800 dark:text-white hover:text-primary py-2">
                📞 Call Us
              </a>
              <a href="mailto:astravision.global@gmail.com" className="block text-gray-800 dark:text-white hover:text-primary py-2">
                📧 Email
              </a>
              <a href="https://wa.me/8696753044" className="block text-gray-800 dark:text-white hover:text-primary py-2">
                💬 WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-4 rounded-full shadow-lg text-xl sm:text-2xl"
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>
    </div>
  );
} 