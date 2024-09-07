import {defineConfig} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

export default defineConfig({
    integrations: [tailwind(), icon()],
    site: `https://misc-org.github.io/`,
    base: `/RuleBook-Front`,
    redirects: {
        '/': '/RuleBook-Front/start/start',
    }
});