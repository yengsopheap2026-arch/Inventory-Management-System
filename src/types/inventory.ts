export interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  category: string;
  bin: string;
  stock: number;
  reorder: number;
  price: number;
  supplier: string;
}

export type Category = 'Electronics' | 'Machinery Parts' | 'Hydraulics' | 'Fasteners & Hardware' | 'All';
export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'All';
