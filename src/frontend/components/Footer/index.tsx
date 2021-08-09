import React, { Component } from 'react'
import {Container, Icon, Text, Status, Hint} from './Footer.styles'

interface Props {
  address: string;
  port: number;
  active: boolean;
  changed: boolean;
}

export default class Footer extends Component<Props>{
  constructor (props: Props) {
    super(props)
  }



  render () {
    return (
      <Container>
        {this.props.changed ? <Hint>Restart the software for the change to take effect</Hint> : null}
        <Status>
          <Icon color={this.props.active? '#44bd32' : '#eb2f06'}/>
          <Text>{this.props.address}:{this.props.port}</Text>
        </Status>
      </Container>
    )
  }
}
