"use client";

import Layout from '@/app/(auth)/layout';
import React from 'react';
import * as Yup from 'yup';
import styles from '../Auth.module.scss'
import { Formik } from 'formik';
import { AuthService } from '@/app/services/auth.service';

const SignUP = () => {
  const initialValues = {
    username: '',
    password: '',
    repeatPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(2, 'Username must be at least 3 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Repeat password is required'),
  });

  const handleSubmit = async (values: { username: string; password: string; repeatPassword: string }) => {
    await AuthService.signup({
      username: values.username,
      password: values.password
    });
  };
  return (
    <div className='flex items-center justify-center h-[75vh]'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} className="w-full main-style max-w-80 p-4">
            <h2 className="text-center text-white mb-4">Sign Up</h2>
            <div className="flex flex-col gap-y-3">
              <div>
                <input
                  className="input input-bordered w-full max-h-8"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                />
                {touched.username && errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>
              <div>
                <input
                  className="input input-bordered w-full max-h-8"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div>
                <input
                  className="input input-bordered w-full max-h-8"
                  name="repeatPassword"
                  type="password"
                  placeholder="Repeat password"
                  value={values.repeatPassword}
                  onChange={handleChange}
                />
                {touched.repeatPassword && errors.repeatPassword && (
                  <p className="text-red-500 text-sm">{errors.repeatPassword}</p>
                )}
              </div>
            </div>
            <button type="submit" className={styles.authBtn}>
              Sign Up
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

SignUP.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default SignUP;