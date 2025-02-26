'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function InnovationTimeline() {
  const milestones = [
    {
      phase: 'Phase 1: MVP Development',
      period: 'Feb - Aug 2025 (6 Months)',
      title: 'Web Platform MVP',
      description: 'AI-Powered SaaS + Blockchain Web Platform',
      features: [
        'Frontend: React.js, Next.js Development',
        'Backend: Node.js, FastAPI Integration',
        'AI Integration: OpenAI, TensorFlow',
        'Basic Blockchain Setup: Ethereum'
      ],
      infrastructure: [
        'Cloud Setup: AWS/GCP',
        'DevOps & Security Implementation'
      ],
      icon: '🚀'
    },
    {
      phase: 'Phase 2: Mobile Development',
      period: 'Sep 2025 - Feb 2026 (6 Months)',
      title: 'Mobile Apps & Enhanced Features',
      description: 'iOS & Android Apps with AI & Blockchain Integration',
      features: [
        'Mobile Apps: React Native/Flutter',
        'Enhanced AI Features & Integration',
        'Blockchain Wallet Implementation',
        'Advanced Security Features'
      ],
      infrastructure: [
        'Cloud Infrastructure Scaling',
        'Testing & Quality Assurance'
      ],
      icon: '📱'
    },
    {
      phase: 'Phase 3: Full Integration',
      period: 'Mar 2026 - Feb 2027 (24 Months)',
      title: 'Complete Ecosystem Development',
      description: 'Full AI + Blockchain Integration & Enterprise Features',
      features: [
        'Advanced AI & ML Systems',
        'Enterprise Blockchain Solutions',
        'Full SaaS Platform Integration',
        'Enhanced Security & Compliance'
      ],
      infrastructure: [
        'Global Infrastructure Setup',
        'Enterprise Integration Tools'
      ],
      icon: '🌟'
    },
    {
      phase: 'Ongoing Development',
      period: 'Throughout Development',
      title: 'Infrastructure & Growth',
      description: 'Continuous Development & Market Presence',
      features: [
        'Cloud & DevOps Optimization',
        'Marketing & Business Development',
        'Security Updates & Maintenance',
        'Customer Support & Operations'
      ],
      infrastructure: [
        'Continuous Integration/Deployment',
        '24/7 Monitoring & Support'
      ],
      icon: '⚡'
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Development Roadmap
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            36-Month Journey: From MVP to Enterprise Solution
          </p>
        </div>

        <div ref={ref} className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{milestone.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {milestone.phase}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {milestone.period}
                    </p>
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold mb-2">{milestone.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {milestone.description}
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold mb-3">Development Features:</h5>
                    <ul className="space-y-3">
                      {milestone.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="text-primary">✓</span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-3">Infrastructure:</h5>
                    <ul className="space-y-3">
                      {milestone.infrastructure.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="text-secondary">⚙️</span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Development Started: February 25, 2025
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Estimated Completion: February 2027
          </p>
        </div>
      </div>
    </section>
  );
} 