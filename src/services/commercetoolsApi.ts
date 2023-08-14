type Credentials = {
  email: string;
  password: string;
};

export function getUser(credentials: Credentials) {
  // alert(`${credentials.email} ${credentials.password}`);
  return credentials;
}
