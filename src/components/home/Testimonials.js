'use client'

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default function Testimonials() {
  const testimonials = [
    {
      name: "John Smith",
      role: "CEO, TechCorp",
      content: "Working with this team has been transformative for our business. Their expertise and dedication are unmatched.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000"
    },
    {
      name: "Sarah Johnson",
      role: "CTO, InnovateCo",
      content: "The quality of work and attention to detail exceeded our expectations. Highly recommended!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000"
    },
    {
      name: "Michael Brown",
      role: "Founder, StartupX",
      content: "Their innovative solutions helped us scale our operations efficiently. Great team to work with!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            What our clients say about working with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold text-[#1a1a1a]">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

