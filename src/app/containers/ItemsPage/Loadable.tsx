import { lazyLoad } from 'utils/loadable';

export const ItemsPage = lazyLoad(
  () => import('./index'),
  module => module.ItemsPage,
);
