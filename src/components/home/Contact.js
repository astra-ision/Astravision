'use client'

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import toast from 'react-hot-toast';

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', data);
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-gray-50" id="contact">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Transform your business with our cutting-edge solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div className="order-2 md:order-1">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#1a1a1a]">Contact Information</h3>
              <div className="space-y-4">
                <p className="flex items-start text-gray-600 text-sm sm:text-base">
                  <span className="text-[#5648D1] mr-3 mt-0.5">📧</span>
                  <a href="mailto:astravision.global@gmail.com" className="hover:text-[#5648D1] break-all">
                    astravision.global@gmail.com
                  </a>
                </p>
                <p className="flex items-start text-gray-600 text-sm sm:text-base">
                  <span className="text-[#5648D1] mr-3 mt-0.5">📍</span>
                  <span>Dubai & Bangalore</span>
                </p>
                <p className="flex items-start text-gray-600 text-sm sm:text-base">
                  <span className="text-[#5648D1] mr-3 mt-0.5">👨‍💼</span>
                  <span>Founder: Abhishek Meena</span>
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#1a1a1a]">Our Services</h3>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li className="flex items-center">
                    <span className="text-[#5648D1] mr-2">•</span>
                    <span className="text-gray-600">AI & ML Solutions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#5648D1] mr-2">•</span>
                    <span className="text-gray-600">Blockchain & Web3</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#5648D1] mr-2">•</span>
                    <span className="text-gray-600">Mobile App Development</span>
                  </li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 order-1 md:order-2">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full p-3 sm:p-4 rounded-lg border text-base focus:ring-2 focus:ring-[#5648D1]"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full p-3 sm:p-4 rounded-lg border text-base focus:ring-2 focus:ring-[#5648D1]"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  {...register('message', { required: 'Message is required' })}
                  className="w-full p-3 sm:p-4 rounded-lg border text-base focus:ring-2 focus:ring-[#5648D1]"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#5648D1] text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-[#4537c9] transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
