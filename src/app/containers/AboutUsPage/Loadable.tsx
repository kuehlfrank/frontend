/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const AboutUsPage = lazyLoad(
  () => import('./index'),
  module => module.AboutUsPage,
);
