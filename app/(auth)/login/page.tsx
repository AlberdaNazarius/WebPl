"use client";

import React from 'react';
import styles from '@/app/(auth)/auth.module.scss';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthService } from '@/app/services/auth.service';

const Login: React.FC = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(2, 'Username must be at least 3 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values: { username: string; password: string }) => {
    await AuthService.login({
      username: values.username,
      password: values.password
    });
  }

  return (
    <div className="flex items-center justify-center h-[75vh]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} className="w-full main-style max-w-80 p-4">
            <h2 className="text-center text-white mb-4">Login</h2>
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
            </div>
            <button type="submit" className={styles.authBtn}>Login</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;