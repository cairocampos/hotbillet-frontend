export interface IHeader {
  text: string;
  align?: 'left' | 'right' | 'center',
  sortable?: boolean;
  value: string;
  filterable?: boolean;
  format?: (value: any) => void;
  colspan?: number;
  rowspan?: number;
  show?: boolean;
}