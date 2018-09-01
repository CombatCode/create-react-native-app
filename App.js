import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput, Button, AsyncStorage } from 'react-native';
import { Constants } from 'expo';

const itemsKey = 'devmeeting:items';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: [],
    };
  }

  componentWillMount() {
    AsyncStorage.getItem(itemsKey).then(itemsX => {
      let items = JSON.parse(itemsX) || [];
      this.setState({ items })
    });
  }

  saveNote = () => {
    let items = this.state.items.concat([{title: (new Date()).toString(), key: (new Date()).toString(), content: this.state.value}]);
    this.setState({
      items: items,
      value: '',
    })
    AsyncStorage.setItem(itemsKey, JSON.stringify(items));
  }

  clearNotes = () => {
    this.setState({
      items: []
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add new note</Text>

        <TextInput
          style={styles.input}
          onChangeText={(value) => this.setState({value})}
          value={this.state.value}
        />

        <Button
          onPress={this.saveNote}
          title="Save note"
          color="#841584"
        />

        <FlatList data={this.state.items} renderItem={this.renderItem} />

        <Button
          onPress={this.clearNotes}
          title="Clear list"
          color="red"
        />
      </View>
    );
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  item: {
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  content: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 140,
    borderColor: 'gray',
    borderWidth: 1
  }
});
