import styled from 'styled-components'

const isWindows = window.clientInformation.platform === 'Win32'

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`

export const item = styled.div`
  background: #292929;
  height: calc(100% - ${isWindows ? '34px' : '22px'});
  overflow-y: auto;
  padding: 12px;
`