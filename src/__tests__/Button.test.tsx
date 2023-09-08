import { render, fireEvent } from '@testing-library/react';
import { Button } from '../components/Button';

describe('Button component', () => {
  it('renders button with children', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders button with custom class name', () => {
    const { container } = render(<Button className="custom">Button</Button>);
    const buttonElement = container.querySelector('.button.custom');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders disabled button', () => {
    const { container } = render(<Button disabled>Button</Button>);
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toBeDisabled();
  });

  it('renders button with a specified type', () => {
    const { container } = render(<Button type="submit">Submit</Button>);
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  it('calls onClick callback when button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });
});
