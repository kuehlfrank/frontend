import { Ingredient } from './Ingredient';
import { Unit } from './Unit';

export interface InventoryEntry {
  inventoryEntryId: string;
  inventory: {
    inventoryId: string;
  };
  ingredient: Ingredient;
  amount: number;
  unit: Unit;
}
