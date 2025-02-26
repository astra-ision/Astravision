'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';
import Container from '@/components/ui/Container';

export default function EnterpriseSolutions() {
  const [activeTab, setActiveTab] = useState('ai');

  const solutions = {
    ai: {
      title: 'AI & ML Solutions',
      description: 'Enterprise-grade artificial intelligence and machine learning solutions',
      features: [
        'Predictive Analytics & Business Intelligence',
        'Natural Language Processing & Chatbots',
        'Computer Vision & Image Recognition',
        'AI-Powered Process Automation'
      ],
      icon: '🤖',
      color: 'from-blue-500 to-purple-600'
    },
    blockchain: {
      title: 'Blockchain & Web3',
      description: 'Secure and scalable blockchain solutions for enterprises',
      features: [
        'Smart Contract Development',
        'DeFi & NFT Platforms',
        'Supply Chain Tracking',
        'Secure Payment Systems'
      ],
      icon: '🔗',
      color: 'from-purple-500 to-pink-600'
    },
    cloud: {
      title: 'Cloud & DevOps',
      description: 'Comprehensive cloud computing and DevOps services',
      features: [
        'Cloud Migration & Setup',
        'Kubernetes Orchestration',
        'CI/CD Implementation',
        'Cloud Security & Monitoring'
      ],
      icon: '☁️',
      color: 'from-cyan-500 to-blue-600'
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Enterprise Solutions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transforming businesses with cutting-edge technology solutions
          </p>
        </div>

        {/* Solution Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(solutions).map((key) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-all
                ${activeTab === key 
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
            >
              {solutions[key].icon} {solutions[key].title}
            </motion.button>
          ))}
        </div>

        {/* Active Solution Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                {solutions[activeTab].title}
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {solutions[activeTab].description}
              </p>
              <ul className="space-y-4">
                {solutions[activeTab].features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-200"
                  >
                    <span className="text-primary">✓</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold shadow-lg"
              >
                Learn More
              </motion.button>
            </div>
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${solutions[activeTab].color} opacity-10 rounded-2xl`} />
              <div className="relative p-8">
                <div className="text-9xl text-center">
                  {solutions[activeTab].icon}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
} 