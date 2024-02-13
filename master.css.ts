import type { Config } from '@master/css'
import { variables } from '@master/css';

export default {
	styles: {
		body: 'bg:gray-90 fg:gray-20 f:sans f:18'
	},
	rules: {},
	variables: {
		fontFamily: {
			sans: ['akshar', ...variables['font-family'].sans],
		},
		fontWeight: {
			normal: 400,
			bold: 600
		}
	},
	semantics: {},
	mediaQueries: {},
	animations: {},
	selectors: {},
	functions: {}
} satisfies Config as Config;