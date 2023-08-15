import { RegistrationForm } from '../components/RegistrationForm';

const Registration = () => {
  const initialValues = {
    name: 'Mila',
    surname: 'Mila  ',
    email: 'mi@mi',
    password: 'sssssssss',
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
