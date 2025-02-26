'use client'

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default function Features() {
  const features = [
    {
      title: "AI & Machine Learning",
      items: [
        "AI-Powered Chatbots & NLP",
        "Computer Vision Solutions",
        "Predictive Analytics"
      ],
      icon: "🤖"
    },
    {
      title: "Blockchain & Web3",
      items: [
        "DeFi & NFT Platforms",
        "Smart Contracts",
        "Crypto Payment Solutions"
      ],
      icon: "🔗"
    },
    {
      title: "SaaS Solutions",
      items: [
        "AI-Powered ERP & CRM",
        "Cloud-Based HRMS",
        "Business Intelligence Tools"
      ],
      icon: "☁️"
    },
    {
      title: "Mobile Development",
      items: [
        "Flutter & React Native",
        "AI-Integrated Apps",
        "AR/VR Solutions"
      ],
      icon: "📱"
    },
    {
      title: "Cloud Computing",
      items: [
        "AWS & Azure Solutions",
        "DevSecOps Services",
        "Cloud Migration"
      ],
      icon: "⚡"
    },
    {
      title: "IoT & Smart Tech",
      items: [
        "Industrial IoT (IIoT)",
        "Smart Home Solutions",
        "IoT Healthcare Tech"
      ],
      icon: "🎮"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="section-title">Our Technology Stack</h2>
          <p className="section-subtitle">
            Cutting-edge technologies powering next-generation digital solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-[#5648D1] text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-[#1a1a1a]">{feature.title}</h3>
              <ul className="space-y-2">
                {feature.items.map((item) => (
                  <li key={item} className="text-gray-600 flex items-center">
                    <span className="text-[#5648D1] mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
