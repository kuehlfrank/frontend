export interface Item {
  name: string;
  unit?: Unit | undefined;
  quantity: number;
  alternative_names?: string[] | null;
}
