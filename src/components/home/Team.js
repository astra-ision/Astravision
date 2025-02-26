'use client'

import { motion } from 'framer-motion';
import { teamMembers } from '@/constants/team';
import Container from '@/components/ui/Container';

export default function Team() {
  const founder = teamMembers[0];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Meet Our Founder
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Leading technological innovation from Bangalore to the world
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-square relative">
                <img
                  src="/abhishek.jpeg"
                  alt="Abhishek Meena - Founder & CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-2 text-gray-600 dark:text-gray-300">{founder.name}</h3>
                <p className="text-xl text-primary mb-2">{founder.role}</p>
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                  <span className="mr-2">📍</span>
                  {founder.location}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {founder.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Areas of Expertise:</h4>
                  <ul className="space-y-2">
                    {founder.expertise.map((skill, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-primary mr-2">✓</span>
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-4">
                  {Object.entries(founder.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity flex items-center"
                    >
                      {platform === 'linkedin' ? (
                        <>
                          <span className="mr-2">🔗</span>
                          LinkedIn
                        </>
                      ) : (
                        <>
                          <span className="mr-2">🐦</span>
                          Twitter
                        </>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
