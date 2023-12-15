import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';

// Fix for
// Uncaught (in promise) DOMException: Failed to execute 'postMessage' on 'Worker': SharedArrayBuffer transfer requires self.crossOriginIsolated.
// during localhost development
const crossOriginIsolation: Plugin = {
	name: 'cross-origin-isolation',
	configureServer(server) {
		server.middlewares.use((_, res, next) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET');
			res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
			res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
			res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
			next();
		});
	}
};

export default defineConfig({
	plugins: [crossOriginIsolation, sveltekit()],

	// Fix for
	// [ERROR] Top-level await is not available in the configured target environment ("chrome87", "edge88", "es2020", "firefox78", "safari14" + 2 overrides)
	// ...obalThis.__snarky;function Ja(){return globalThis.plonk_wasm}await JB();var zB=[{name:"Snarky",props:[{name:"exists",type:"fun...
	build: {
		target: 'es2022'
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext'
		}
	}
});
