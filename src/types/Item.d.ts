export interface Item {
  name: string;
  unit?: Unit | null;
  quantity: number;
  alternative_names?: string[] | null;
}
