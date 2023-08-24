import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from '../pages/Main';

describe('Main component', () => {
  it('renders main content', () => {
    render(
      <Router>
        <Main />
      </Router>
    );

    const mainContent = screen.getByText('Действующие акции');
    expect(mainContent).toBeInTheDocument();
  });
});
