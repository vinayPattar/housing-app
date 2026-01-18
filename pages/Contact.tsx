import React from 'react';
import { Button, Input } from '../components/UI';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Info */}
          <div className="space-y-12 animate-fade-up">
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none mb-6">
                Get in <br /><span className="text-gray-300">Touch.</span>
              </h1>
              <p className="text-xl text-gray-500 font-medium">
                Ready to elevate your living experience? Our concierge team is standing by.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Email Us</h3>
                  <p className="text-lg font-medium">concierge@homify.com</p>
                  <p className="text-lg font-medium">press@homify.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Call Us</h3>
                  <p className="text-lg font-medium">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Visit HQ</h3>
                  <p className="text-lg font-medium">123 Luxury Lane,<br />Beverly Hills, CA 90210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-10 rounded-[3rem] animate-fade-up delay-100">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input placeholder="First Name" className="bg-white border-transparent" />
                <Input placeholder="Last Name" className="bg-white border-transparent" />
              </div>
              <Input placeholder="Email Address" type="email" className="bg-white border-transparent" />
              <Input placeholder="Subject" className="bg-white border-transparent" />
              <textarea
                className="w-full rounded-2xl border border-transparent bg-white p-4 text-sm font-medium focus:ring-4 focus:ring-black/5 focus:border-black outline-none min-h-[150px] resize-none"
                placeholder="Tell us about your inquiry..."
              />
              <Button fullWidth size="lg">
                Send Message <ArrowRight size={18} className="ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;