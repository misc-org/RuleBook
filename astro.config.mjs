import {defineConfig} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';

export default defineConfig({
    integrations: [tailwind(), icon(), mdx()],
    site: `https://misc-org.github.io/`,
    base: `/RuleBook`,
    redirects: {
        '/': '/RuleBook/start/start',
    }
});