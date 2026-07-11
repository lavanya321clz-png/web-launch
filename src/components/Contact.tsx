import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin, TwitterIcon as Twitter } from './SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const { data, submitContact } = usePortfolio();
  const { personalInfo } = data;
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!form.name.trim()) tempErrors.name = 'Full name is required';
    
    if (!form.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Please provide a valid email format';
    }

    if (!form.subject.trim()) tempErrors.subject = 'Subject line is required';
    if (!form.message.trim()) tempErrors.message = 'Message content cannot be blank';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    
    const success = await submitContact(form);
    
    if (success) {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      
      // Auto reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } else {
      setStatus('idle');
      alert('Failed to send the message. Please check if the server is running and try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-[#05001a]/30">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2"
          >
            Get In Touch
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-purple-500 mx-auto rounded-full"
          />
        </div>

        {/* Contact panel layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Channels & Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Contact Information
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Have a project in mind or want to discuss a software engineering opportunity? Drop me a line, and I will get back to you within 24 hours.
            </p>

            <div className="space-y-4 pt-4">
              {/* Mail channel */}
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-white/5 group hover:border-purple-500/15 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Email Address</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-gray-200 hover:text-purple-400 transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* Phone channel */}
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-white/5 group hover:border-purple-500/15 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Call / Text</div>
                  <a href={`tel:${personalInfo.phone}`} className="text-sm font-semibold text-gray-200 hover:text-purple-400 transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              {/* Location channel */}
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-white/5 group hover:border-purple-500/15 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Location</div>
                  <span className="text-sm font-semibold text-gray-200">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social linkages */}
            <div className="space-y-3 pt-6">
              <h4 className="text-sm font-bold uppercase text-white tracking-wider">Connect Socially</h4>
              <div className="flex gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl glass-card border border-white/5 hover:border-purple-500/30 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all cursor-pointer"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl glass-card border border-white/5 hover:border-purple-500/30 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all cursor-pointer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl glass-card border border-white/5 hover:border-purple-500/30 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all cursor-pointer"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form fields panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 w-full"
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/5 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-2">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Message Transmitted!</h3>
                    <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                      Thank you for contacting me. I have received your message and will review it shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 text-left"
                    noValidate
                  >
                    {/* Name & Email flex rows */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. John Doe"
                            className={`w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-gray-600 ${
                              errors.name ? 'border-red-500/50 focus:border-red-500' : ''
                            }`}
                          />
                          {errors.name && (
                            <div className="flex items-center gap-1 text-[10px] text-red-400 mt-1 pl-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{errors.name}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="e.g. john@email.com"
                            className={`w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-gray-600 ${
                              errors.email ? 'border-red-500/50 focus:border-red-500' : ''
                            }`}
                          />
                          {errors.email && (
                            <div className="flex items-center gap-1 text-[10px] text-red-400 mt-1 pl-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{errors.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        Subject
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="e.g. Partnership Proposal"
                          className={`w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-gray-600 ${
                            errors.subject ? 'border-red-500/50 focus:border-red-500' : ''
                          }`}
                        />
                        {errors.subject && (
                          <div className="flex items-center gap-1 text-[10px] text-red-400 mt-1 pl-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.subject}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message body field */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        Message Content
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Write your details here..."
                          className={`w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-gray-600 resize-none ${
                            errors.message ? 'border-red-500/50 focus:border-red-500' : ''
                          }`}
                        />
                        {errors.message && (
                          <div className="flex items-center gap-1 text-[10px] text-red-400 mt-1 pl-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.message}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Send button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="glow-btn w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold text-sm shadow-[0_0_15px_rgba(139,92,246,0.25)] flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
