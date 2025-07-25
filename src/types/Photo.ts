export interface Photo {
  id: string;
  url: string;
  photographer: string;
  title: string;
  size: 'extra-short' | 'short' | 'medium' | 'tall' | 'extra-tall';
  location: string;
  category: ('Nature' | 'Travel' | 'Street' | 'Architecture' | 'Cars')[];
}