import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import {
  HashRouter
}  from 'react-router-dom'

import store from './store'

import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { dark } from './themes'

export const GlobalStyles = createGlobalStyle`
  body, #root {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    flex-direction: row;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`;


ReactDOM.render(
  <HashRouter>
    <ThemeProvider theme={dark}>
      <GlobalStyles />
        <Provider store={store}>
          <App />
        </Provider>
    </ThemeProvider>
  </HashRouter>, document.getElementById('root')
)
