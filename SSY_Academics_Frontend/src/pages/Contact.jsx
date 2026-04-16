import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. Header Section */}
      <section className="bg-udemyDark py-16 px-6 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Have questions about our courses or placement support? Our team is here to help you build your future.
        </p>
      </section>

      <div className="max-w-[1340px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* 2. Contact Information */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-udemyDark mb-6">Get in Touch</h2>
              <p className="text-udemyGray mb-8 leading-relaxed">
                Whether you're a student looking to start your career or a hiring partner looking for talent, feel free to reach out. We'll get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="bg-udemyBg p-3 border border-udemyBorder group-hover:bg-udemyPurple group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-udemyDark">Email Address</h4>
                  <p className="text-udemyGray">yadavsiddhant10@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-udemyBg p-3 border border-udemyBorder group-hover:bg-udemyPurple group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-udemyDark">Phone Number</h4>
                  <p className="text-udemyGray">+91 9359562815</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-udemyBg p-3 border border-udemyBorder group-hover:bg-udemyPurple group-hover:text-white transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-udemyDark">Office Address</h4>
                  <p className="text-udemyGray">
                    Nandanvan Park, Karve Nagar,<br />
                    Pune, Maharashtra 411052
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-udemyBg p-3 border border-udemyBorder group-hover:bg-udemyPurple group-hover:text-white transition-all">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-udemyDark">Business Hours</h4>
                  <p className="text-udemyGray">Mon - Sat: 10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Modern Contact Form */}
          <div className="bg-white border border-udemyBorder p-8 shadow-udemy">
            <h3 className="text-xl font-bold text-udemyDark mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-udemyPurple" /> Send a Message
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full border border-udemyDark p-3 text-sm focus:outline-none focus:ring-1 focus:ring-udemyPurple" 
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full border border-udemyDark p-3 text-sm focus:outline-none focus:ring-1 focus:ring-udemyPurple" 
                />
              </div>
              <input 
                type="text" 
                placeholder="Subject" 
                className="w-full border border-udemyDark p-3 text-sm focus:outline-none focus:ring-1 focus:ring-udemyPurple" 
              />
              <textarea 
                placeholder="How can we help you?" 
                rows="5" 
                className="w-full border border-udemyDark p-3 text-sm focus:outline-none focus:ring-1 focus:ring-udemyPurple"
              ></textarea>
              <button className="w-full bg-udemyDark text-white font-bold py-3 hover:bg-gray-800 flex items-center justify-center gap-2 transition-all">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>

        {/* 4. Google Maps Integration */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-udemyDark mb-8">Locate Us</h2>
          <div className="w-full h-[450px] border border-udemyBorder grayscale hover:grayscale-0 transition-all duration-500 shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.568461461247!2d73.812629675233!3d18.49122558259463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfdf694582f3%3A0xc3924f7e5272a2e1!2sKarve%20Nagar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1714123456789!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;