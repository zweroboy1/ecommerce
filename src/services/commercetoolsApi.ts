import {
  CT_ERROR,
  CT_NO_USER_ERROR,
  CT_WRONG_PASSWORD_ERROR,
  CT_LOGIN_ERROR,
  CT_INVALID_JSON_ERROR,
  CT_EXISTING_CUSTOMER_ERROR,
} from '../constants/apiMessages';

import {
  Address,
  CreateUser,
  Credentials,
  Customer,
  CustomerWithToken,
  RegisterUser,
  TokenResponse,
} from '../types';

const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const apiRegion = import.meta.env.VITE_CTP_REGION;
let BEARER_TOKEN: string | null = null;

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
    // console.log(responseData);
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

  if (!isSameAddress) {
    addresses.push({
      streetName: userRegisterData.billingAddressStreet,
      city: userRegisterData.billingAddressCity,
      postalCode: userRegisterData.billingAddressPostCode,
      country: userRegisterData.billingAddressCountry,
    });
  }

  const userForRegistration: CreateUser = {
    firstName: userRegisterData.firstName,
    lastName: userRegisterData.lastName,
    email: userRegisterData.email,
    password: userRegisterData.password,
    dateOfBirth: userRegisterData.dateOfBirth,
    addresses,
    shippingAddresses: [0],
    billingAddresses: [isSameAddress ? 0 : 1],
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

export async function getProducts() {
  const endpoint = `https://api.${apiRegion}.commercetools.com/${projectKey}/products?limit=20&offset=0`;

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

    if (!response.ok || responseData.results[0] === undefined) {
      throw new Error('Oooops!!! We have a problem!!!');
    }
    return responseData.results[0];
  } catch (error) {
    throw new Error('Oooops!!! We have a problem2!!!');
  }
}
