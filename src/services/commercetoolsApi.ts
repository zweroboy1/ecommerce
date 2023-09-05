import {
  CT_ERROR,
  CT_NO_USER_ERROR,
  CT_WRONG_PASSWORD_ERROR,
  CT_LOGIN_ERROR,
  CT_INVALID_JSON_ERROR,
  CT_EXISTING_CUSTOMER_ERROR,
  CT_NETWORK_PROBLEM,
} from '../constants/apiMessages';

import {
  Address,
  CreateUser,
  Credentials,
  Customer,
  CustomerWithToken,
  RegisterUser,
  TokenResponse,
  ProductAllData,
  ProductApiResponse,
} from '../types';

import { PRODUCTS_ON_PAGE, MAX_PRICE_FILTER } from '../constants';
import { getCategoryCtIds } from '../utils/getCategoryCtIds';

const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const apiRegion = import.meta.env.VITE_CTP_REGION;
let BEARER_TOKEN: string | null = null;

function createQueryString(params: Record<string, string | number>): string {
  const queryParams = Object.entries(params)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return queryParams;
}

async function fetchBearerToken(): Promise<string | null> {
  if (BEARER_TOKEN) {
    return BEARER_TOKEN;
  }
  try {
    const response = await fetch(`https://auth.${apiRegion}.commercetools.com/oauth/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&scope=manage_project:${projectKey}`,
    });
    if (!response.ok) {
      return null;
    }
    const responseData = await response.json();
    const bearerToken = responseData.access_token;
    if (!bearerToken) {
      return null;
    }
    BEARER_TOKEN = bearerToken;
    return String(bearerToken);
  } catch (error) {
    return null;
  }
}

async function getUserWithCredentialsToken(credentials: Credentials): Promise<TokenResponse> {
  const scope = `manage_project:${projectKey}`;
  const endpoint = `https://auth.${apiRegion}.commercetools.com/oauth/${projectKey}/customers/token`;
  const requestBody = `grant_type=password&username=${encodeURIComponent(
    credentials.email
  )}&password=${encodeURIComponent(credentials.password)}&scope=${scope}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(CT_ERROR);
  }
}

async function getUserByEmail(email: string, bearerToken: string): Promise<Customer | null> {
  const endpoint = `https://api.${apiRegion}.commercetools.com/${projectKey}/customers`;
  const whereClause = encodeURIComponent(`email="${email}"`);

  try {
    const response = await fetch(`${endpoint}?where=${whereClause}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok || responseData.results[0] === undefined) {
      return null;
    }
    return responseData.results[0];
  } catch (error) {
    return null;
  }
}

async function getUserData(credentials: Credentials, bearerToken: string): Promise<Customer> {
  const endpoint = `https://api.${apiRegion}.commercetools.com/${projectKey}/login`;
  const requestBody = {
    email: credentials.email,
    password: credentials.password,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const responseData = await response.json();

    if (!response.ok || !responseData.customer) {
      throw new Error(responseData.message);
    }
    return responseData.customer;
  } catch (error) {
    throw new Error(CT_LOGIN_ERROR);
  }
}

async function createCustomer(
  userRegisterData: CreateUser,
  bearerToken: string
): Promise<Customer> {
  const endpoint = `https://api.${apiRegion}.commercetools.com/${projectKey}/customers`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userRegisterData),
    });
    const responseData = await response.json();
    if (responseData.message) {
      throw new Error(responseData.message);
    }
    return responseData.customer;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === CT_INVALID_JSON_ERROR) {
        throw new Error(CT_ERROR);
      }
      if (error.message === CT_EXISTING_CUSTOMER_ERROR) {
        throw new Error(CT_EXISTING_CUSTOMER_ERROR);
      }
      // throw error;
    }
    throw new Error(CT_ERROR);
  }
}

export async function changePassword(
  passwords: { password: string; passwordNew: string },
  id: string,
  bearerToken: string,
  version: number
): Promise<Customer> {
  const endpoint = `https://api.${apiRegion}.commercetools.com/${projectKey}/customers/password`;
  const data = {
    id,
    version,
    currentPassword: passwords.password,
    newPassword: passwords.passwordNew,
  };
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (responseData.message) {
      throw new Error(responseData.message);
    }
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === CT_INVALID_JSON_ERROR) {
        throw new Error(CT_ERROR);
      }
      if (error.message === CT_EXISTING_CUSTOMER_ERROR) {
        throw new Error(CT_EXISTING_CUSTOMER_ERROR);
      }
    }
    throw new Error(CT_ERROR);
  }
}

export async function getUser(credentials: Credentials): Promise<CustomerWithToken> {
  const bearerToken = await fetchBearerToken();
  if (bearerToken === null) {
    throw new Error(CT_ERROR);
  }
  try {
    const userToken = await getUserWithCredentialsToken(credentials);
    if (userToken instanceof Error) {
      throw userToken;
    }
    const userData = await getUserData(credentials, bearerToken);
    if (userData instanceof Error) {
      throw userData;
    }
    return {
      user: userData,
      token: userToken,
    };
  } catch (error) {
    const userByEmail = await getUserByEmail(credentials.email, bearerToken);
    if (!userByEmail) {
      throw new Error(CT_NO_USER_ERROR);
    } else {
      throw new Error(CT_WRONG_PASSWORD_ERROR);
    }
  }
}

export async function registerUser(userRegisterData: RegisterUser): Promise<Customer> {
  const isSameAddress =
    userRegisterData.shippingAddressStreet === userRegisterData.billingAddressStreet &&
    userRegisterData.shippingAddressCity === userRegisterData.billingAddressCity &&
    userRegisterData.shippingAddressPostCode === userRegisterData.billingAddressPostCode &&
    userRegisterData.shippingAddressCountry === userRegisterData.billingAddressCountry;

  const addresses: Address[] = [
    {
      streetName: userRegisterData.shippingAddressStreet,
      city: userRegisterData.shippingAddressCity,
      postalCode: userRegisterData.shippingAddressPostCode,
      country: userRegisterData.shippingAddressCountry,
    },
  ];

  // if (!isSameAddress) {
  //   addresses.push({
  //     streetName: userRegisterData.billingAddressStreet,
  //     city: userRegisterData.billingAddressCity,
  //     postalCode: userRegisterData.billingAddressPostCode,
  //     country: userRegisterData.billingAddressCountry,
  //   });
  // }

  addresses.push({
    streetName: userRegisterData.billingAddressStreet,
    city: userRegisterData.billingAddressCity,
    postalCode: userRegisterData.billingAddressPostCode,
    country: userRegisterData.billingAddressCountry,
  });

  const userForRegistration: CreateUser = {
    firstName: userRegisterData.firstName,
    lastName: userRegisterData.lastName,
    email: userRegisterData.email,
    password: userRegisterData.password,
    dateOfBirth: userRegisterData.dateOfBirth,
    addresses,
    shippingAddresses: [0],
    billingAddresses: [1],
    // billingAddresses: [isSameAddress ? 0 : 1],
  };

  if (userRegisterData.isShippingAddressDefault) {
    userForRegistration.defaultShippingAddress = 0;
  }

  if (userRegisterData.isBillingAddressDefault) {
    userForRegistration.defaultBillingAddress = isSameAddress ? 0 : 1;
  }

  const bearerToken = await fetchBearerToken();
  if (bearerToken === null) {
    throw new Error(CT_ERROR);
  }

  const customer = await createCustomer(userForRegistration, bearerToken);
  return customer;
}

export async function getProducts(
  category: string = '',
  page: number = 0,
  sort: string = 'price asc',
  brands: string[] = [],
  colors: string[] = [],
  minPrice: number = 0,
  maxPrice: number = MAX_PRICE_FILTER,
  text: string = ''
): Promise<ProductApiResponse> {
  const ctIds = getCategoryCtIds(category);
  const categoriesFilter = ctIds.map((cat) => `"${cat}"`).join(',');
  let queryString = createQueryString({
    filter: categoriesFilter ? `categories.id:${categoriesFilter}` : '',
    limit: PRODUCTS_ON_PAGE,
    offset: page * PRODUCTS_ON_PAGE,
    sort,
  });

  if (brands.length) {
    queryString += `&filter=variants.attributes.brand.key%3A${brands
      .map((brand) => `%22${brand}%22`)
      .join('%2C')}`;
  }

  if (colors.length) {
    queryString += `&filter=variants.attributes.color.key%3A${colors
      .map((color) => `%22${color}%22`)
      .join('%2C')}`;
  }

  if (minPrice !== 0 || maxPrice !== MAX_PRICE_FILTER) {
    queryString += `&filter=variants.price.centAmount%3Arange%20(${minPrice * 100}%20to%20${
      maxPrice * 100
    })`;
  }

  if (text) {
    queryString += `&text.ru=${encodeURIComponent(text)}`;
  }

  const endpoint = `https://api.${apiRegion}.commercetools.com/${projectKey}/product-projections/search?${queryString}`;

  const bearerToken = await fetchBearerToken();
  if (bearerToken === null) {
    throw new Error(CT_ERROR);
  }

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Oooops!!! We have a problem!!!');
    }

    const responseData = await response.json();
    // console.log(responseData.total);
    // console.log(responseData.results);
    return responseData.results[0] === undefined
      ? { total: 0, results: [] }
      : { total: responseData.total, results: responseData.results };
  } catch (error) {
    throw new Error(CT_NETWORK_PROBLEM);
  }
}

export async function getProduct(productId: string): Promise<ProductAllData | null> {
  const queryString = createQueryString({
    filter: `slug.ru:"${productId}"`,
  });
  const endpoint = `https://api.${apiRegion}.commercetools.com/${projectKey}/product-projections/search?${queryString}`;

  const bearerToken = await fetchBearerToken();
  if (bearerToken === null) {
    throw new Error(CT_ERROR);
  }

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error('Oooops!!! We have a problem!!!');
    }
    return responseData.results[0] === undefined ? null : responseData.results[0];
  } catch (error) {
    throw new Error(CT_NETWORK_PROBLEM);
  }
}

export async function updateUser(
  data: {
    [key: string]:
      | string
      | number
      | boolean
      | Address
      | Address[]
      | number[]
      | boolean[]
      | undefined;
    action: string;
  }[],
  id: string,
  bearerToken: string,
  version: number
): Promise<Customer> {
  const endpoint = `https://api.${apiRegion}.commercetools.com/${projectKey}/customers/${id}`;
  const requestBody = {
    version,
    actions: data,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const responseData = await response.json();

    if (!response.ok || !responseData) {
      throw new Error(responseData.message);
    }
    return responseData;
  } catch (error) {
    throw new Error(CT_LOGIN_ERROR);
  }
}
