import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	:root {
  --color-border: #c4c4c4;
}

/* Resets */
body,
h1,
h2,
h3,
p,
button {
  margin: 0;
  padding: 0;
}

ul, li {
  list-style: none;
  padding-left: 0;
}

button {
  background: inherit;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

h2 {
  font-size: 20px;
  font-weight: 700;
}

h3 {
  font-size: 18px;
  font-weight: 500;
}

a {
  text-decoration: none;
  color: black;
}

* {
  box-sizing: border-box;
}

.a11y-hidden {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
}
`;

export default GlobalStyle;
