'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000')" }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center px-4 sm:px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
        >
          Amplifying Business Progress Through Smart Solutions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 px-4"
        >
          Transforming businesses with cutting-edge AI, Blockchain, and SaaS solutions. Your partner in digital excellence across Dubai and Bangalore.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 px-4"
        >
          <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
            Get A Free Quote
          </button>
          <button className="w-full sm:w-auto px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-medium">
            Explore Services
          </button>
        </motion.div>
      </div>
    </section>
  );
}
