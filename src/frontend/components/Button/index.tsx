import styled from 'styled-components'

interface Props {
  backgroundColor: string;
}

export default styled.button<Props>`
  font-size: 14px;
  border: none;
  outline: none;
  box-shadow: none;
  width: 160px;
  height: 35px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 15px;
  background-color: ${(props) => props.backgroundColor};
  
  &:hover {
    opacity: .5;
  }
`