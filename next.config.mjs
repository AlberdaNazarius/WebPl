/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `
        @import 'app/variables';
      `,
  }
};


export default nextConfig;
