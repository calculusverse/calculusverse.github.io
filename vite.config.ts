import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          toc: path.resolve(__dirname, 'toc.html'),
          precalculus: path.resolve(__dirname, 'precalculus.html'),
          differentiation: path.resolve(__dirname, 'differentiation.html'),
          integration: path.resolve(__dirname, 'integration.html'),
          multivariable_3d: path.resolve(__dirname, 'multivariable_3d.html'),
          example_velocity: path.resolve(__dirname, 'example_velocity.html'),
          example_box_optimization: path.resolve(__dirname, 'example_box_optimization.html'),
          example_distance_speed: path.resolve(__dirname, 'example_distance_speed.html'),
          example_rocket_work: path.resolve(__dirname, 'example_rocket_work.html'),
          example_escape_velocity: path.resolve(__dirname, 'example_escape_velocity.html'),
          example_profit_optimization: path.resolve(__dirname, 'example_profit_optimization.html'),
          example_consumer_surplus: path.resolve(__dirname, 'example_consumer_surplus.html'),
        },
      },
    },
  };
});
