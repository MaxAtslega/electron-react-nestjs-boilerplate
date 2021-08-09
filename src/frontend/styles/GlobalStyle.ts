import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0; 
  padding: 0; 
  box-sizing: border-box;
}

html, body, #root{
  height: 100%; 
  margin: 0;
}


#root {
  font-family: "Roboto", sans-serif;
  background: #1A2933;
  color: #FFF;
}

#root {
  overflow-y: hidden;
}
`
