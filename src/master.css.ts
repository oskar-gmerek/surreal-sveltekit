import type { Config } from '@master/css';
import { variables } from '@master/css';

export default {
	styles: {
		body: 'bg:gray-10 fg:gray-80 f:sans f:18'
	},
	colors: {},
	rules: {},
	variables: {
		fontFamily: {
			sans: ['akshar', ...variables.fontFamily.sans],
		},
		fontWeight: {
			normal: 300,
			bold: 600
		}
	},
	semantics: {},
	mediaQueries: {},
	animations: {},
	selectors: {},
	functions: {}
} satisfies Config as Config;



