'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from '@/components/ui/Container';

export default function Stats() {
  const stats = [
    {
      number: '2',
      label: 'Innovation Hubs',
      subtext: 'Dubai & Bangalore',
      icon: '🌍'
    },
    {
      number: '10+',
      label: 'Technologies',
      subtext: 'Cutting-edge Stack',
      icon: '💻'
    },
    {
      number: '5+',
      label: 'Core Services',
      subtext: 'AI, Blockchain & More',
      icon: '⚡'
    },
    {
      number: '24/7',
      label: 'Expert Support',
      subtext: 'Always Available',
      icon: '🚀'
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Launch Phase Highlights
          </h2>
          <p className="text-lg opacity-90">
            Pioneering the future of technology in Dubai & Bangalore
          </p>
        </div>
        <div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg font-semibold mb-1">{stat.label}</div>
              <div className="text-sm opacity-90">{stat.subtext}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
} 