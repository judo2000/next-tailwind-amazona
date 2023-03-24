import Layout from '@/components/Layout';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import React from 'react';

const LoginScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-3 text-xl">Login</h1>
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
            autoFocus
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
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have and account &nbsp;
          <Link href="/register">Register</Link>
        </div>
      </form>
    </Layout>
  );
};

export default LoginScreen;
