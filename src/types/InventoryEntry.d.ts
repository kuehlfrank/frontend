import { Ingredient } from './Ingredient';
import { Unit } from './Unit';

export interface InventoryEntry {
  inventoryEntryId: number;
  inventory: {
    inventoryId: number;
  };
  ingredient: Ingredient;
  amount: number;
  unit: Unit;
}
