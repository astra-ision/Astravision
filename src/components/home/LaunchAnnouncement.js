'use client'

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default function LaunchAnnouncement() {
  return (
    <section className="py-12 mt-20 bg-gradient-to-r from-primary to-secondary text-white">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            🚀 Development Started - February 25, 2025
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Building the Future of Technology
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Phase 1 Development in Progress: AI-Powered SaaS & Blockchain Web Platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-white text-primary font-semibold hover:shadow-lg transition-all"
            >
              Join Early Access
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-white/20 backdrop-blur-sm font-semibold hover:bg-white/30 transition-all"
            >
              View Development Timeline
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
} 