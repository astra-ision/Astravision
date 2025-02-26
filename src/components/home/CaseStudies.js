'use client'

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default function CaseStudies() {
  const cases = [
    {
      title: "E-Commerce Platform",
      description: "Built a scalable e-commerce solution with advanced features",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000",
      stats: ["50% faster loading", "2x conversion rate", "1M+ users"]
    },
    {
      title: "FinTech App",
      description: "Developed a secure financial technology application",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000",
      stats: ["99.9% uptime", "5M+ transactions", "Bank-grade security"]
    },
    {
      title: "Healthcare Solution",
      description: "Created an integrated healthcare management system",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000",
      stats: ["HIPAA compliant", "30% cost reduction", "100+ clinics"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="section-title">Case Studies</h2>
          <p className="section-subtitle">
            Success stories that showcase our expertise and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#1a1a1a]">{caseStudy.title}</h3>
                <p className="text-gray-600 mb-4">{caseStudy.description}</p>
                <div className="grid grid-cols-3 gap-2">
                  {caseStudy.stats.map((stat) => (
                    <div key={stat} className="text-sm text-[#5648D1] font-medium">
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            View All Case Studies
          </motion.button>
        </div>
      </Container>
    </section>
  );
} 