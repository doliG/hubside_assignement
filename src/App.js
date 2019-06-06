import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
import 'react-sortable-tree/style.css';
import './App.css';
import openSocket from 'socket.io-client';

const API_ADDRESS = 'http://localhost:3001';

/**
 * Main code
 */
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newItemTitle: '',
      list: [],
    };
    this.addItem = this.addItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
  }

  componentDidMount() {
    const socket = openSocket(API_ADDRESS);

    this.setState({ ...this.state, socket });

    // We subscribe to each change someone has made on the list
    socket.on('updateList', list => {
      this.setState({ ...this.state, list });
    });
  }

  addItem(evt) {
    evt.preventDefault();
    const title = this.state.newItemTitle;
    const { socket } = this.state;

    if (title) {
      socket.emit('addItem', title);
      this.setState({ ...this.state, newItemTitle: '' });
    }
  }

  handleInputChange(evt) {
    const newItemTitle = evt.target.value;

    this.setState({ newItemTitle });
  }

  handleListChange(list) {
    const { state } = this;
    const { socket } = this.state;

    socket.emit('updateList', list);
    this.setState({ ...state, list });
  }

  render() {
    const { list, newItemTitle } = this.state;
    const { addItem, handleInputChange, handleListChange } = this;

    return (
      <div className="App">
        <header className="App-header">Listy</header>
        <section className="App-list">
          <form onSubmit={addItem} className="App-form">
            <input
              type="text"
              placeholder="Add something"
              value={newItemTitle}
              onChange={handleInputChange}
            />
            <button type="submit">Ajouter</button>
          </form>
          <div style={{ height: 600 }}>
            <SortableTree
              treeData={list}
              onChange={list => handleListChange(list)}
              theme={FileExplorerTheme}
              rowHeight={30}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;