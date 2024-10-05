import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import liveCode from 'astro-live-code';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: '@postrockreverb/derived',
      social: {
        github: 'https://github.com/postrockreverb/derived',
      },
      sidebar: [],
      pagefind: false,
    }),
    liveCode({
      wrapper: '/src/CodeWrapper.tsx',
      defaultProps: {
        'client:load': true,
      },
    }),
    react(),
  ],
});
