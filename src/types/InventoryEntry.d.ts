import { Ingredient } from './Ingredient';
import { Unit } from './Unit';

export interface InventoryEntry {
  inventoryEntryId: number;
  ingredient: Ingredient;
  amount: number;
  unit: Unit;
}
