import React, { Component } from 'react'
import { render } from 'react-dom'
import Store from 'electron-store'
import { GlobalStyle } from './styles/GlobalStyle'
import randomString from '../utils/randomString'

// Components
import TitleBar from './components/Titlebar'
import Main from './components/Main'
import Title from './components/Title'
import LabeledInput from './components/LabeledInput'
import { Container } from './components/Grid'
import Button from './components/Button'
import Footer from './components/Footer'

const store = new Store()

export default class App extends Component {
  state: {address: string, port: number, key: string, online: boolean} = {
    address: String(store.get('address')),
    port: Number(store.get('port')),
    key: String(store.get('key')),
    online: false
  };
  
  handleAddressInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    store.set('address', event.target.value)
    this.setState({ address: event.target.value })
  };

  handlePortInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    store.set('port', Number(event.target.value))
    this.setState({ port: Number(event.target.value) })
  };

  setKey = (key: string) => {
    store.set('key', key)
    this.setState({ key: key })
  };

  private interval: NodeJS.Timer;

  async checkOnline(){
    await fetch('http://'+this.state.address+':'+this.state.port+'/health').then(() => {
      this.setState({
        online: true
      })
    }).catch(() => {
      this.setState({
        online: false
      })
    })
  }

  async componentDidMount() {
    await this.checkOnline()
    this.interval = await setInterval(async () => await this.checkOnline(), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render () {
    return (
      <React.Fragment>
        <GlobalStyle />
        <TitleBar backgroundColor={'#2C3E50'} title={'Electron-React-NestJS Boilerplate'}/>
        <Main>
          <Title>Settings</Title>
           <Container>
             <LabeledInput label={'API-Server Url'} value={this.state.address} onChange={this.handleAddressInput}/>
             <LabeledInput maxLength={5} minLength={3} type={'text'} label={'Port'} value={this.state.port} onChange={this.handlePortInput}/>
           </Container>
          <LabeledInput readonly={true} label={'API Key'} value={this.state.key}/>
          <Button backgroundColor={'#2980B9'} onClick={() => {
            navigator.clipboard.writeText(this.state.key)
          }}>Copy</Button>
          <Button backgroundColor={'#2ECC71'} onClick={() => this.setKey(randomString(88))}>New API-Key</Button>
        </Main>
        <Footer changed={true} address={this.state.address} port={this.state.port} active={this.state.online}/>
      </React.Fragment>
    )
  }
}

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

render(<App />, mainElement)