export type Categories =
  | 'CAFE'
  | 'KOREAN'
  | 'JAPANESE'
  | 'CHINESE'
  | 'WESTERN'
  | 'SCHOOLFOOD'
  | 'ETC'
  | 'BARS';

export interface Tag {
  value: Categories;
  text: string;
  defaultIcon?: string;
  selectedIcon?: string;
}
