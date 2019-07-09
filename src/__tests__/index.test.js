import React from 'react';
import { render, cleanup } from 'react-testing-library';

import 'jest-dom/extend-expect'

// Ensure console error fails tests by replacing with a function that throws
const { error: originalError } = console;
const throwConsoleErrors = (...rest) => {
	originalError(...rest);
	const error = util.format.apply(this, rest);
	throw new Error(error);
};
console.error = throwConsoleErrors;

const ComponentWillThrow = ({ shouldThrow }) => {
	if (shouldThrow) {
		throw new Error('Component did throw after all');
	}

	return <p>I guess no throw this time</p>;
};

afterEach(cleanup);

test('renders without erroring', () => {
	const { getByText } = render(<ComponentWillThrow />);

	expect(getByText('I guess no throw this time')).toBeInTheDocument();
});

test('expect this to throw', () => {
	expect(() => render(<ComponentWillThrow shouldThrow />)).toThrow();
});

test('still render without erroring', () => {
	const { getByText } = render(<ComponentWillThrow />);

	expect(getByText('I guess no throw this time')).toBeInTheDocument();
});
