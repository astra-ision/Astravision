'use client'

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default function Services() {
    const services = [
        {
            title: "AI & ML Solutions",
            description: "AI Chatbots, NLP Solutions, Computer Vision, and AI-Powered Data Analytics for enterprise-grade automation.",
            icon: "🤖"
        },
        {
            title: "Mobile App Development",
            description: "Flutter, React Native & Native Apps with AI & AR/VR integration for next-gen user experiences.",
            icon: "📱"
        },
        {
            title: "Web & SaaS Solutions",
            description: "Custom SaaS platforms, PWAs, and AI-powered websites for digital transformation.",
            icon: "🌐"
        },
        {
            title: "Blockchain & Web3",
            description: "DeFi solutions, NFT marketplaces, smart contracts, and secure blockchain implementations.",
            icon: "🔗"
        },
        {
            title: "Cloud & Security",
            description: "AWS, Google Cloud & Azure solutions with AI-powered security and DevSecOps.",
            icon: "☁️"
        },
        {
            title: "IoT & Smart Devices",
            description: "Industrial IoT, smart home automation, and IoT-enabled healthcare solutions.",
            icon: "🎮"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="section-title">Our Services</h2>
                    <p className="section-subtitle">
                        End-to-end technology services to drive your business transformation
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="text-[#5648D1] text-4xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-bold mb-3 text-[#1a1a1a]">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
