import { lazyLoad } from 'utils/loadable';

export const NavBar = lazyLoad(
  () => import('./index'),
  module => module.NavBar,
);
