import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { UpdatingSelectInput } from '../components/UpdatingSelectInput';

describe('UpdatingSelectInput component', () => {
  it('renders the component correctly', () => {
    const { getByText, getByRole } = render(
      <Formik initialValues={{ fieldName: '' }} onSubmit={() => {}}>
        <Form>
          <UpdatingSelectInput name="fieldName" label="Label" type={''} />
        </Form>
      </Formik>
    );

    // Проверяем, что метка с текстом "Label" присутствует
    const labelElement = getByText('Label');
    expect(labelElement).toBeInTheDocument();

    // Проверяем, что элемент select присутствует
    const selectElement = getByRole('combobox'); // Используем getByRole для поиска элемента
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.tagName).toBe('SELECT');
  });
});
