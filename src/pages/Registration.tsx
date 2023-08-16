import { RegistrationForm } from '../components/RegistrationForm';
import { DATE_MINUS_13_YEARS } from '../utils/datetime';

const Registration = () => {
  const initialValues = {
    name: '',
    surname: '  ',
    email: '',
    password: '',
    dateOfBirth: DATE_MINUS_13_YEARS.toLocaleDateString('en-ca'),
    shippingAddressStreet: '',
    shippingAddressCity: '',
    shippingAddressPostCode: '',
    shippingAddressCountry: '',
    billingAddressStreet: '',
    billingAddressCity: '',
    billingAddressPostCode: '',
    billingAddressCountry: '',
  };

  return (
    <div className="container">
      <h1>Registration</h1>
      <RegistrationForm {...initialValues} />
    </div>
  );
};

export { Registration };
