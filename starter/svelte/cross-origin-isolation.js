/**
 * This file creates a service worker that cross-origin-isolates the page which allows us to use wasm threads.
 * Normally you would set the COOP and COEP headers on the server to do this, but Github Pages doesn't allow this, so this is a hack to do that.
 *
 * Edited version of: https://github.com/josephrocca/clip-image-sorter/blob/a52a4fcd85d5b2618e0f26eacd98ccd21f8a0a06/enable-threads.js
 * which is an edited version of: coi-serviceworker v0.1.6 - Guido Zuidhof, licensed under MIT (https://github.com/gzuidhof/coi-serviceworker)
 */

/* eslint-disable no-inner-declarations */
/* eslint-disable svelte/no-inner-declarations */

if (typeof window === 'undefined') {
	self.addEventListener('install', () => self.skipWaiting());
	self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
	self.addEventListener('fetch', (e) => e.respondWith(handleFetch(e.request)));

	async function handleFetch(request) {
		if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') return;

		// We need to set `credentials` to "omit" for no-cors requests, per this comment: https://bugs.chromium.org/p/chromium/issues/detail?id=1309901#c7
		if (request.mode === 'no-cors')
			request = new Request(request, { credentials: 'omit', referrer: request.referrer });

		const r = await fetch(request).catch((e) => console.error(e));
		const { status, body, headers, statusText } = r;

		if (status === 0) return r;

		const newHeaders = new Headers(headers);
		newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');
		newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');

		return new Response(body, { status, statusText, headers: newHeaders });
	}
} else {
	(async function () {
		if (window.crossOriginIsolated !== false) return;

		let registration = await navigator.serviceWorker
			.register(window.document.currentScript.src)
			.catch((e) => console.error('COOP/COEP Service Worker failed to register:', e));

		if (registration) {
			console.log('COOP/COEP Service Worker registered', registration.scope);

			registration.addEventListener('updatefound', () => {
				console.log('Reloading page to make use of updated COOP/COEP Service Worker.');
				window.location.reload();
			});

			// If the registration is active, but it's not controlling the page
			if (registration.active && !navigator.serviceWorker.controller) {
				console.log('Reloading page to make use of COOP/COEP Service Worker.');
				window.location.reload();
			}
		}
	})();
}
