import { InventoryEntry } from './InventoryEntry';

export interface Inventory {
  inventoryid: number;
  inventoryEntries: InventoryEntry[];
}
