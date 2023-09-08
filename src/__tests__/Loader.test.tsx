import { render } from '@testing-library/react';
import { Loader } from '../pages/Loader';

describe('Loader component', () => {
  it('renders loader element', () => {
    render(<Loader />);

    // Проверяем наличие элемента с классом "loader-container"
    const loaderContainer = document.querySelector('.loader-container');
    expect(loaderContainer).toBeInTheDocument();

    // Проверяем наличие элемента с классом "loader" внутри "loader-container"
    const loaderElement = loaderContainer?.querySelector('.loader');
    expect(loaderElement).toBeInTheDocument();
  });
});
