import { ReactNode } from 'react';

type InputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  className?: string;
  maxLength?: number;
  label: string;
  defaultAddress?: {
    checkDefaultAddress: boolean;
    setCheckDefaultAddress: (value: boolean) => void;
    setFieldTouched?: (field: string, isTouched?: boolean | undefined) => void;
  };
  touch?: {
    setFieldTouched?: (field: string, isTouched?: boolean | undefined) => void;
  };
  valid?: {
    validateField?: (field: string, isValid?: boolean | undefined) => void;
  };
  isUpdateForm?: boolean;
  setIsUpdateFields?: (name: string, value: boolean) => void;
  refFieldName?: string;
  initValue?: string;
  setIsChangeFields?: (name: string, value: boolean) => void;
  setFieldValue?: (field: string, value: string) => void;
  isChangeField?: boolean;
  onSave?: () => void;
  setIsChangeAddressesFields?: (val: boolean) => void;
  setValid?: (val: string) => void;
};

type UpdatingInitialValues = CustomerUpdating & {
  bearerToken: string;
  password: string;
  passwordNew: string;
  passwordConfirm: string;
  newCity: string;
  newCountry: string;
  newPostalCode: string;
  newStreetName: string;
  isShippingAddress: boolean;
  isBillingAddress: boolean;
};

type Address = {
  readonly id?: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
};

type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  shippingAddressStreet: string;
  shippingAddressCity: string;
  shippingAddressPostCode: string;
  shippingAddressCountry: string;
  isShippingAddressDefault: boolean;
  billingAddressStreet: string;
  billingAddressCity: string;
  billingAddressPostCode: string;
  billingAddressCountry: string;
  isBillingAddressDefault: boolean;
};

type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  addresses: Address[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
};

type ButtonProps = {
  children: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  tabIndex?: number;
};

type ButtonIconProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  tabIndex?: number;
  title?: string;
};

type Country = {
  [key: string]: string;
};

type TokenResponse = {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type Customer = {
  id: string;
  version: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
};

type CustomerUpdating = {
  id: string;
  version: number;
  email: string;
  password?: string;
  passwordNew?: string;
  passwordConfirm?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  shippingAddresses: Address[];
  billingAddresses: Address[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  bearerToken: string;
};

type LotInCard = {
  product: Product;
  quantity: number;
};

type CustomerWithToken = {
  user: Customer;
  card: LotInCard[];
  token: TokenResponse;
};

export type Credentials = {
  email: string;
  password: string;
};

type StateFields = {
  customer?: null | CustomerWithToken;
};

type Category = {
  id: number;
  enName: string;
  ruName: string;
  url: string;
  parentId: number | null;
  ctId: string | null;
};

type Breadcrumb = {
  id: number;
  name: string;
  url: string;
};

type ProductAllData = {
  id: string;
  name: {
    ru: string;
  };
  description: {
    ru: string;
  };
  categories: {
    id: string;
  }[];
  slug: {
    ru: string;
  };
  masterVariant: {
    attributes: {
      name: string;
      value: {
        key: string;
      };
    }[];
    sku: string;
    images: {
      url: string;
      dimensions: {
        w: number;
        h: number;
      };
    }[];
    prices: {
      value: {
        centAmount: number;
      };
      discounted: {
        value: {
          type: string;
          currencyCode: string;
          centAmount: number;
        };
      };
    }[];
  };
};

type ProductApiResponse = {
  total: number;
  results: ProductAllData[];
};

type Product = {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  brand: string;
  color: string;
  sku: string;
  categories: string[];
};

type FilterOption = string;

type FilterData = {
  id: number;
  name: string;
  options?: FilterOption[];
  min?: number;
  max?: number;
};

type AllFilters = { brand: string[]; color: string[]; priceMin: number; priceMax: number };

type FiltersProps = {
  onFilterChange: (allFilters: AllFilters) => void;
};

type ExpandedFilters = {
  [key: number]: boolean;
};

type SelectedFilters = {
  [key: number]: string;
};

type FilterProps = {
  title: string;
  options: string[];
  optionsLabel?: string[];
  selectedOptions: string[];
  onOptionsChange: (selectedOptions: string[]) => void;
  onReset?: () => void;
};

interface ProductImagesProps {
  productImages: string[];
}

interface ProductDetailsProps {
  id: string;
  price: number;
  discountedPrice?: number;
  brand: string;
  color: string;
  sku: string;
}

interface LineItem {
  id: string;
  productId: string;
  quantity: number;
}

type Cart = {
  id: string;
  version: number;
  lineItems: LineItem[];
};

export type {
  InputProps,
  ButtonProps,
  ButtonIconProps,
  Address,
  Country,
  TokenResponse,
  Customer,
  CustomerWithToken,
  RegisterUser,
  CreateUser,
  StateFields,
  CustomerUpdating,
  Product,
  Category,
  Breadcrumb,
  ProductAllData,
  ProductApiResponse,
  FilterOption,
  FilterData,
  AllFilters,
  FiltersProps,
  ExpandedFilters,
  SelectedFilters,
  ProductImagesProps,
  ProductDetailsProps,
  UpdatingInitialValues,
  FilterProps,
  Cart,
};
