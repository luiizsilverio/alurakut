import styled from 'styled-components'

export const Main = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  
  @media(min-width: 860px) {
    display: grid;
    max-width: 1110px;
    grid-template-areas: "profileArea welcomeArea communityArea";
    grid-template-columns: 160px 1fr 312px;
  }
`
