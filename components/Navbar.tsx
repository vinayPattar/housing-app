
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User as UserIcon, LogOut, LayoutDashboard, Home } from 'lucide-react';
import { User } from '../types';
import { NAV_LINKS } from '../constants';
import { Button } from './UI';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || isOpen ? 'glass py-3 shadow-xl shadow-black/5 border-b border-gray-100' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-white shadow-xl shadow-black/20 group-hover:scale-110 transition-transform duration-300">
              <Home size={22} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-black uppercase">HomiFy</span>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 ${location.pathname === link.path ? 'text-black underline underline-offset-8' : 'text-gray-400 hover:text-black'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-400 hover:text-black transition-colors">
              <Search size={20} strokeWidth={2.5} />
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-black transition-all duration-300">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </Link>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-600 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-black hover:opacity-70 transition-opacity">Login</Link>
                <Link to="/signup">
                  <Button size="sm">Join Now</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white fixed inset-0 top-[72px] z-40 p-6 flex flex-col space-y-8 animate-fade-up">
          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <Link key={link.path} to={link.path} className="text-4xl font-black text-black tracking-tighter hover:opacity-50 uppercase">
                {link.name}
              </Link>
            ))}
            {user && (
              <Link to="/dashboard" className="text-4xl font-black text-black tracking-tighter hover:opacity-50 uppercase">
                Dashboard
              </Link>
            )}
          </div>
          <div className="mt-auto space-y-4">
            {user ? (
              <Button variant="danger" fullWidth onClick={onLogout}>Logout</Button>
            ) : (
              <>
                <Link to="/login"><Button variant="outline" fullWidth className="mb-4">Login</Button></Link>
                <Link to="/signup"><Button fullWidth>Create Account</Button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
