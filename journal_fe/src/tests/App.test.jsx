import '@testing-library/jest-dom'

import { fireEvent, render , screen} from "@testing-library/react";
import { describe, expect, it, beforeEach, test } from "vitest";

import React from "react";
import App from "../components/App";
import userEvent from '@testing-library/user-event';
import NavBar from '../components/NavBar';


// define a test suite named 'App Component' using Vite's describe function 
// Using describe you can define a new suite in the current context, as a set of related tests or benchmarks 
// and other nested suites. A suite lets you organize your tests and benchmarks so reports are more clear.
describe('App Component',  () => {
    // declare document variable
    let document

    // before each test render the app component and assign it to document variable
    //  .container obtains the container element that holds the rendered content of the <App /> component.
    beforeEach(() => {
        document = render(<App/>).container
    })

    // test defines a set of related expectations. It receives the test name and a function that holds the expectations to test.
    test('Renders the home component', () => {
        expect(document.querySelector('h3')).toHaveTextContent('Journal Entries')
        
    })

    test('Renders the navbar component', () => {
        expect(document.querySelector('h4')).toHaveTextContent('My Journal')
    })

    test('Renders categorySelection when Create Entry menu item is clicked', async () => {        
        await userEvent.click(screen.getByText('Create new Entry'))

        expect(document.querySelector('h3')).not.toBeNull()
        expect(document.querySelector('h3')).toHaveTextContent('Please Select a Category')

    })
})




