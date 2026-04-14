export interface LaundryItem {
  id: string;
  name: string;
  count: number;
}

export interface LaundryRecord {
  date: string;
  shirts: number;
  pants: number;
  tshirts: number;
  towels: number;
  bedSheets: number;
  otherItems: LaundryItem[];
}
