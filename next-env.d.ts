// This is the TypeScript definition file for Next.js
// It helps TypeScript understand the Next.js specific types.

// Import Next.js types
import { NextConfig } from 'next';
declare module 'next' {
  interface NextConfig {
    reactStrictMode?: boolean;
    swcMinify?: boolean;
  }
}