
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User as UserIcon, Phone, ArrowRight } from 'lucide-react';
import { Button, Input, Badge } from '../components/UI';
import { User } from '../types';

interface AuthProps {
  mode: 'login' | 'signup';
  onAuthSuccess: (user: User, token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ mode, onAuthSuccess }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // 1. Authenticate (Login or Signup)
      let token = '';

      if (mode === 'login') {
        const response = await fetch('http://localhost:8080/api/auth/public/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: data.username, password: data.password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          // Backend returns a map with "errorMessage: " (note the space/colon)
          throw new Error(errorData['errorMessage: '] || 'Invalid credentials');
        }

        const authData = await response.json();
        token = authData.jwtToken || authData.accessToken || authData.token;
      } else {
        // Signup
        const signupResponse = await fetch('http://localhost:8080/api/auth/public/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: data.name,
            username: data.username,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            role: ["user"]
          }),
        });

        if (!signupResponse.ok) {
          const errorData = await signupResponse.json();
          throw new Error(errorData.message || 'Registration failed');
        }

        // Auto-login after successful signup
        const loginResponse = await fetch('http://localhost:8080/api/auth/public/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: data.username, password: data.password }),
        });

        if (!loginResponse.ok) throw new Error('Auto-login failed');
        const authData = await loginResponse.json();
        token = authData.jwtToken || authData.accessToken || authData.token;
      }

      // 2. Fetch User Details using the provided endpoint
      const userResponse = await fetch('http://localhost:8080/api/auth/private/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!userResponse.ok) throw new Error('Failed to fetch user details');
      const userData = await userResponse.json();

      const user: User = {
        id: userData.id,
        name: userData.fullName,
        email: userData.email,
        role: userData.roles?.includes('ROLE_SELLER') ? 'seller' : 'user',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`
      };

      onAuthSuccess(user, token);
      toast.success(mode === 'login' ? `Welcome back, ${user.name}!` : 'Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error(mode === 'login' ? 'Invalid credentials' : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50/50 py-32">
      <div className="max-w-md w-full animate-fade-up">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-black/5 border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-black uppercase tracking-tighter mb-4">
              {mode === 'login' ? 'Authentication' : 'Get Started'}
            </h1>
            <p className="text-gray-400 font-medium">
              {mode === 'login' ? 'Enter your credentials to manage your estate portfolio.' : 'Join the most exclusive real estate network.'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {mode === 'signup' && (
              <Input
                label="Full Name"
                placeholder="Alexander Wright"
                icon={<UserIcon size={18} />}
                error={errors.name?.message as string}
                {...register('name', { required: 'Name is required' })}
              />
            )}

            <Input
              label="Username"
              placeholder="johndoe"
              icon={<UserIcon size={18} />}
              error={errors.username?.message as string}
              {...register('username', { required: 'Username is required' })}
            />

            {mode === 'signup' && (
              <Input
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                icon={<Phone size={18} />}
                error={errors.phoneNumber?.message as string}
                {...register('phoneNumber', { required: 'Phone number is required' })}
              />
            )}

            {mode === 'signup' && (
              <Input
                label="Email Address"
                type="email"
                placeholder="alex@example.com"
                icon={<Mail size={18} />}
                error={errors.email?.message as string}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                })}
              />
            )}

            <Input
              label="Secure Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              error={errors.password?.message as string}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be 6+ characters' }
              })}
            />

            <Button type="submit" fullWidth size="lg" loading={isLoading}>
              {mode === 'login' ? 'Secure Login' : 'Create Profile'}
            </Button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {mode === 'login' ? "New to HomiFy?" : "Returning member?"}{' '}
              <Link
                to={mode === 'login' ? '/signup' : '/login'}
                className="text-black hover:opacity-50 ml-2"
              >
                {mode === 'login' ? 'Register' : 'Login'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
