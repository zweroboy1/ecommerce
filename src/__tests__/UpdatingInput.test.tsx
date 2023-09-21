import { render, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { UpdatingInput } from '../components/UpdatingInput';

describe('UpdatingInput component', () => {
  it('renders the component correctly', () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ fieldName: '' }} onSubmit={() => {}}>
        <Form>
          <UpdatingInput name="fieldName" label="Label" type={''} />
        </Form>
      </Formik>
    );

    // Проверяем, что ассоциированный label с текстом "Label" присутствует
    const labelElement = getByLabelText('Label');
    expect(labelElement).toBeInTheDocument();

    // Проверяем, что input элемент присутствует и ассоциирован с label
    const inputElement = getByLabelText('Label');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.tagName).toBe('INPUT');
  });

  it('handles input change correctly', () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ fieldName: '' }} onSubmit={() => {}}>
        <Form>
          <UpdatingInput name="fieldName" label="Label" type={''} />
        </Form>
      </Formik>
    );

    // Получаем input элемент
    const inputElement = getByLabelText('Label');

    // Меняем значение input
    fireEvent.change(inputElement, { target: { value: 'New Value' } });

    // Проверяем, что значение изменилось
    expect(inputElement).toHaveValue('New Value');
  });
});
