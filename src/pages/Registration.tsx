import { RegistrationForm } from '../components/RegistrationForm';
import { DATE_MINUS_13_YEARS } from '../utils/datetime';

const Registration = () => {
  const initialValues = {
    name: 'Mila',
    surname: 'Mila  ',
    email: 'mi@mi',
    password: 'sssssssss',
    dateOfBirth: DATE_MINUS_13_YEARS.toLocaleDateString('en-ca'),
    shippingAddress: {
      street: 'shipping street',
      city: 'shipping city',
      code: 'shipping code',
      country: 'shipping country',
    },
    billingAddress: {
      street: 'billing street',
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
