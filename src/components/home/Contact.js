'use client'

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Here you would typically send the data to your backend
      console.log('Form data:', data);
      // For now, we'll just simulate a successful submission
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      console.error('Form error:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <p className="flex items-center text-gray-600 text-sm sm:text-base">
                  <span className="text-[#5648D1] mr-3">📧</span>
                  <a href="mailto:astravision.global@gmail.com" className="hover:text-[#5648D1] break-all">
                    astravision.global@gmail.com
                  </a>
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="text-[#5648D1] mr-3">📍</span>
                  Dubai & Bangalore
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="text-[#5648D1] mr-3">👨‍💼</span>
                  Founder: Abhishek Meena
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 order-1 md:order-2">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full p-3 sm:p-4 rounded-lg border text-base sm:text-lg focus:ring-2 focus:ring-[#5648D1]"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name.message}</span>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full p-3 sm:p-4 rounded-lg border text-base sm:text-lg focus:ring-2 focus:ring-[#5648D1]"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  {...register('message', { required: 'Message is required' })}
                  className="w-full p-3 sm:p-4 rounded-lg border text-base sm:text-lg focus:ring-2 focus:ring-[#5648D1]"
                />
                {errors.message && (
                  <span className="text-red-500 text-sm">{errors.message.message}</span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-primary"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
