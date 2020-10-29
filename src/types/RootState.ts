import { ItemsFormState } from 'app/containers/ItemsPage/types';
import { RecipesState } from 'app/containers/Recipes/types';
import { KuehlfrankState } from 'app/containers/KuehlfrankProvider/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  itemForm?: ItemsFormState;
  recipes?: RecipesState;
  kuehlfrankState: KuehlfrankState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
