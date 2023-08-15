import { RegistrationForm } from '../components/RegistrationForm';

const Registration = () => {
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      code: '',
      country: '',
    },
  };

  return (
    <div className="container">
      <h1>Registration</h1>
      <RegistrationForm {...initialValues} />
    </div>
  );
};

export { Registration };
