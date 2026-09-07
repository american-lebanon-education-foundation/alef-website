/**
 * Google Ad Grants Compliance Configuration
 *
 * When AD_GRANTS_REVIEW_MODE is true:
 * - High-risk pages (/congressional-advocacy, /hezbollah-accountability-act, /house-of-cards, /archives)
 *   are hidden from navigation, menus, and sitemaps during the review period.
 * - Hero headers, donation CTAs, and sensitive statements switch to policy-compliant, mission-first text.
 * - Sensational headings, accusatory labels, and political bill tracking are suppressed.
 * - The HAA campaign popup modal is disabled.
 *
 * Set to FALSE to revert the website back to original full campaign mode after grant approval.
 */
export const AD_GRANTS_REVIEW_MODE = true;
