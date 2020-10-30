/**
 *
 * Asynchronously loads the component for Recipes
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Recipes = lazyLoad(
  () => import('./index'),
  module => module.Recipes,
);
