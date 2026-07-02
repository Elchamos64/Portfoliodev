'use client';

import { Toaster } from 'sileo';
import 'sileo/styles.css';

/**
 * Sileo toast viewport — fixed to the dark charcoal toast (#1a1a1a) in both
 * light and dark site themes.
 *
 * Heads up: Sileo's fills are inverted from the `theme` prop name
 * (THEME_FILLS = { light: "#1a1a1a", dark: "#f2f2f2" }), so `theme="light"`
 * is what renders the DARK toast with light description text.
 */
export default function SileoToaster() {
  return <Toaster position="bottom-right" theme="light" />;
}
