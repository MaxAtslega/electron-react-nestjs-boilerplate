import styled from 'styled-components'
import { BiNetworkChart } from 'react-icons/bi'

interface Props {
  color: string,
}

export const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
`
export const Status = styled.div`
  width: 100%;
  font-size: 13px;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #141414;
`


export const Icon = styled(BiNetworkChart)<Props>`
  font-size: 22px;
  display: inline;
  color: ${(props) => props.color || '#eb2f06'};
  margin-right: 5px;
`

export const Text = styled.p`
  display: inline;
`

export const Hint = styled.p`
  font-size: 15px;
  color: #eb2f06;
  padding-bottom: 10px;
  padding-left: 15px;
`