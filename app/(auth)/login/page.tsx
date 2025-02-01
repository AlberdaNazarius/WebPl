import React from 'react';
import styles from '@/app/(auth)/auth.module.scss';

const Login: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-[75vh]'>
      <div className="w-full main-style max-w-80 p-4">
        <h2 className="text-center text-white mb-4">Login</h2>
        <div className="flex flex-col gap-y-3">
          <input className="input input-bordered w-full max-h-8" placeholder="Email address" />
          <input className="input input-bordered w-full max-h-8" placeholder="Password" />
        </div>
        <button className={styles.authBtn}>Login</button>
      </div>
    </div>
  )
}

export default Login;