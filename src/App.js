import React from 'react';
import { Component } from 'react';
import NestedList from './NestedList/NestedList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        { title: 'Item1' },
        {
          title: 'Item2', children: [
            { title: 'Children1' },
            {
              title: 'Children2', children: [
                { title: 'SubChildren1' },
                { title: 'SubChildren2' },
                { title: 'SubChildren3' }
              ]
            },
            { title: 'Children3' },
          ]
        },
        { title: 'Item3' },
      ]
    };
  }
  render() {
    const { list } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          Listy
        </header>
        <section className="App-list">
          <NestedList list={list} />
        </section>
      </div>
    );
  }
}

export default App;