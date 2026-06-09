export interface ProductListItem {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
}

export interface ProductOption {
  code: number;
  name: string;
}

export interface ProductOptions {
  colors: ProductOption[];
  storages: ProductOption[];
}

export interface ProductDetail extends ProductListItem {
  cpu: string;
  ram: string;
  os: string;
  displaySize: string;
  displayResolution: string;
  battery: string;
  primaryCamera: string[];
  secondaryCmera: string[];
  dimentions: string;
  weight: string;
  colors: string[];
  options: ProductOptions;
}

export interface AddToCartPayload {
  id: string;
  colorCode: number;
  storageCode: number;
}

export interface AddToCartResponse {
  count: number;
}
