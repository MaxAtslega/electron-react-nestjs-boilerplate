import styled from 'styled-components'

const isWindows = window.clientInformation.platform === 'Win32'

export default styled.div`
  background: #292929;
  height: calc(100% - ${isWindows ? '34px' : '22px'});
  overflow-y: auto;
  padding: 12px;
`
