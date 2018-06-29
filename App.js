/**
 * Componente básico con un método que consume endpoint de una API RESTful hecha con Flask(Python)
 * Notar que la IP del server, en este caso, es: 192.168.0.16:5000
 * Author: github.com/marioaraya
 */
import React, { Component } from 'react';
import { AppRegistry, Image, View, Button, Text } from 'react-native';

export default class Bananas extends Component {
  constructor() {
    super()
    this.state = { 
      response: ''
    }
  }

  render() {
    let pic = {
      uri: 'http://img2.wikia.nocookie.net/__cb20100619032645/megaman/images/3/3c/X1armor.jpg'
    };
    return (
      <View>
        <View style={{height: 50, backgroundColor: 'skyblue', marginTop: 50}}>
          <Text> { JSON.stringify(this.state.response) } </Text>
        </View>
        <Button onPress={() => this.createItem('chair')} title="POST item 'chair'" />        
        <Text> { "separador" } </Text>
        <Button onPress={() => this.fetchItems()} title="GET item 'chair'" />
        <Image source={pic} style={{height: 420, width: 388, marginTop: 50}} />
      </View>
    );
  }

  fetchItems() {
    url = 'http://192.168.0.16:5000/item/chair' 
    fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }}
      )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          response: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  createItem(name) {
    url = 'http://192.168.0.16:5000/item/' + name 
    fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name':name})
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Item created. ' +responseJson)
        this.setState({
          response: 'Item created. ' +JSON.stringify(responseJson) 
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }
}