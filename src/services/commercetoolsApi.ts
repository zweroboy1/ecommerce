import {
  CT_ERROR,
  CT_NO_USER_ERROR,
  CT_WRONG_PASSWORD_ERROR,
  CT_LOGIN_ERROR,
} from '../constants/apiMessages';

import { Credentials } from '../types/api';

interface User {
  id: number;
  name: string;
  // другие поля пользователя
}

type TokenResponse = {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type UserWithToken = {
  user: User;
  token: TokenResponse;
};

const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const apiRegion = import.meta.env.VITE_CTP_REGION;

async function fetchBearerToken(): Promise<string | null> {
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
    return String(bearerToken);
  } catch (error) {
    return null;
  }
}

async function getUserWithCredentialsToken(
  credentials: Credentials
): Promise<TokenResponse | Error> {
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

async function getUserByEmail(email: string, bearerToken: string): Promise<User | null> {
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

async function getUserData(credentials: Credentials, bearerToken: string): Promise<User | Error> {
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

export async function getUser(credentials: Credentials): Promise<UserWithToken | Error> {
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
