import Layout from '@/app/(auth)/layout';
import React from 'react';
import styles from './Signup.module.scss'

const SignUP = () => {
  return (
    <div className='flex items-center justify-center h-[75vh]'>
      <div className="w-full main-style max-w-80 p-4">
        <h2 className="text-center text-white mb-4">Sign Up</h2>
        <div className="flex flex-col gap-y-3">
          <input className="input input-bordered w-full max-h-8" placeholder="Username" />
          <input className="input input-bordered w-full max-h-8" placeholder="Email address" />
          <input className="input input-bordered w-full max-h-8" placeholder="Password" />
          <input className="input input-bordered w-full max-h-8" placeholder="Repeat password" />
        </div>
        <button className={styles.signUpBtn}>
          Sign Up
        </button>
      </div>
    </div>
  )
}

SignUP.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default SignUP;