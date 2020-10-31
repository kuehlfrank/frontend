/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const LegalPage = lazyLoad(
  () => import('./index'),
  module => module.LegalPage,
);
