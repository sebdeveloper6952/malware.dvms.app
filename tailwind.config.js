/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				mojito: {
					500: '#ABFF84'
				},
				background: {
					500: '#0F172A'
				}
			}
		}
	},
	plugins: []
};
