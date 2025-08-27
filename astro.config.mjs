// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    base: '/bait-beater-site/',
    redirects: {
        '/' : '/bait-beater-site/en/',
    },
    vite: {
        plugins: [tailwindcss()]
    }
});
