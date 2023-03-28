import Layout from '@/components/Layout';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { getError } from '@/utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

const RegisterScreen = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [redirect, router, session]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ firstName, lastName, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        firstName,
        lastName,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-3 text-xl">Create Account</h1>
        <div className="mb-4">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            {...register('firstName', {
              required: 'Please enter your first name',
            })}
            id="firstName"
            className="w-full"
            autoFocus
            placeholder="First Name"
          />
          {errors.firstName && (
            <div className="text-red-500">{errors.firstName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            {...register('lastName', {
              required: 'Please enter your last name',
            })}
            id="lastName"
            className="w-full"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <div className="text-red-500">{errors.lastName.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter your email address',
              pattern: {
                value:
                  /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/,
                message: 'Please enter a valid email address',
              },
            })}
            id="email"
            className="w-full"
            placeholder="Email address"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter your password',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            id="password"
            className="w-full"
            placeholder="Email address"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please enter your password again',
              validate: (value) => value === getValues('password'),
            })}
            id="confirmPassword"
            className="w-full"
            placeholder="Email address"
          />
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500">Passwords do not match.</div>
            )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Register</button>
        </div>
        <div className="mb-4">
          Already have an account &nbsp;
          <Link href={`/login?redirect=${redirect || '/'}`}>Login</Link>
        </div>
      </form>
    </Layout>
  );
};

export default RegisterScreen;
