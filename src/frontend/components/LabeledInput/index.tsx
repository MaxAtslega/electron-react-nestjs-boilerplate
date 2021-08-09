import React, { Component } from 'react'
import {Container, Input, Label} from './LabeledInput.styles'

interface Props {
  label: string | number;
  value: string | number;
  onChange?: React.ChangeEventHandler<Element>;
  readonly?: boolean;
  type?: string;
  maxLength?: number;
  minLength?: number;
}
// pattern={this.props.type == "number" ? "[0-9]" : "[A-Za-z0-9]"}

export default class LabeledInput extends Component<Props> {
  constructor (props: Props) {
    super(props)
  }
  
  render () {
    return (
      <Container>
        <Label>{this.props.label}</Label>
        {this.props.readonly ?
          <Input type={this.props.type? this.props.type : 'text'} minLength={this.props.minLength} maxLength={this.props.maxLength} readOnly={true} value={this.props.value} onChange={this.props.onChange}/> :
          <Input type={this.props.type? this.props.type : 'text'} minLength={this.props.minLength} maxLength={this.props.maxLength} value={this.props.value} onChange={this.props.onChange}/>}
      </Container>
    )
  }
}
