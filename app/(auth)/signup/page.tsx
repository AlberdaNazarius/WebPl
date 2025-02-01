import Layout from '@/app/(auth)/layout';
import React from 'react';

const SignUP = () => {
  return (
    <div>
      <h1>Sign Up</h1>
    </div>
  )
}

SignUP.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default SignUP;