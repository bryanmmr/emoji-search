import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Header from "./Header";
import SearchInput from "./SearchInput";
import EmojiResults from "./EmojiResults";
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
test('Imagenes Visibles en Header', () => {
  const ren = render(<Header />)
  const img = ren.getAllByRole('img')
  img.forEach(image => {
    expect(image).toBeVisible()
  })
});
test('SearchInput onChange funciona', () => {
  const input = render(<SearchInput textChange={jest.fn()}/>).getByRole('textbox')
  fireEvent.change(input, {target: {value : 'dog'}})
  expect(input.value).toBe('dog')
});
test('EmojiResults renderiza elementos de EmojiResultsRow',  () => {
  const arrayMock = [{title: 'arrayemoji1', symbol:'1'}, {title: 'arrayemoji2', symbol:'2'}]
  const ren =  render(<EmojiResults emojiData={arrayMock} />)
  const query = ren.getAllByText(/arrayemoji/i)
  query.forEach(element => {
    expect(element).toBeInTheDocument()
  })
  expect(query).toHaveLength(arrayMock.length)
});