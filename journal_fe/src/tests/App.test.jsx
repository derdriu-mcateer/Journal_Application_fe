import '@testing-library/jest-dom'
import { render , screen} from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import React from "react";
import App from "../components/App";
import userEvent from '@testing-library/user-event';


describe('App Component',  () => {
    let document

    beforeEach(() => {
        document = render(<App/>).container
    })

    it('Renders the home component', () => {
        expect(document.querySelector('h3')).toHaveTextContent('Journal Entries')
        
    })

    it('Renders categorySelection when Create Entry menu item is clicked', async () => {        
        await userEvent.click(screen.getByText('Create new Entry'))

        expect(document.querySelector('h3')).not.toBeNull()
        expect(document.querySelector('h3')).toHaveTextContent('Please Select a Category')

    })
})

