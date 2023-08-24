import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Top } from '../pages/main/Top';

describe('Top component', () => {
  it('renders Top component', () => {
    render(
      <MemoryRouter>
        <Top />
      </MemoryRouter>
    );
  });
});
