import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx';
// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      primary: '#415fff',
      success: '#0ac17e',
      danger: '#ff3c31',
      warning: '#fc8519',
      info: '#72caed'
    }
  },
  presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup(), transformerAttributifyJsx()]
});
