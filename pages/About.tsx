import React from 'react';
import { Badge } from '../components/UI';
import { Shield, Users, Globe, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 animate-fade-up">
          <Badge variant="light" className="mb-6">Our Philosophy</Badge>
          <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none mb-8">
            Curating the <br /><span className="text-gray-300">Exceptional.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
            HomiFy isn't just about real estate; it's about the art of living. We connect discerning individuals with architectural masterpieces that define eras.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 mb-32">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold uppercase tracking-tight">The Standard</h3>
            <p className="text-gray-600 leading-relaxed">
              Founded on the belief that a home is a sanctuary of self-expression, we rigorously vet every property. Only the most architecturally significant and structurally sound residences make it to our portfolio.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team of architects, designers, and real estate connoisseurs work in unison to ensure that every listing is not just a transaction, but a transition into a higher quality of life.
            </p>
          </div>
          <div className="h-[400px] bg-gray-100 rounded-[3rem] overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" alt="Office" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>

        {/* Stats/Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Shield, label: "Secure", value: "100%" },
            { icon: Users, label: "Clients", value: "50k+" },
            { icon: Globe, label: "Cities", value: "12" },
            { icon: Award, label: "Awards", value: "25" },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] text-center hover:bg-black hover:text-white transition-colors group cursor-default">
              <item.icon className="mx-auto mb-4 group-hover:text-white text-black transition-colors" size={24} />
              <h4 className="text-3xl font-black mb-1">{item.value}</h4>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;