import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
import 'react-sortable-tree/style.css';
import './App.css';

/**
 * This should be moved somewhere else
 * in a service or a middlware
 */
function* generator(id) {
  while (true) { yield id++; }
}
const idGenerator = generator(0);

const LIST = [
  { id: idGenerator.next().value, title: 'Item1' },
  {
    id: idGenerator.next().value, title: 'Item2', children: [
      { id: idGenerator.next().value, title: 'Children1' },
      {
        id: idGenerator.next().value, title: 'Children2', children: [
          { id: idGenerator.next().value, title: 'SubChildren1' },
          { id: idGenerator.next().value, title: 'SubChildren2' },
          { id: idGenerator.next().value, title: 'SubChildren3' }
        ]
      },
      { id: idGenerator.next().value, title: 'Children3' },
    ]
  },
  { id: idGenerator.next().value, title: 'Item3' },
];

/**
 * Main code
 */
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newItemTitle: '',
      list: LIST,
    };
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.exportAsOpml = this.exportAsOpml.bind(this);
  }

  addItem(evt) {
    evt.preventDefault();
    const title = this.state.newItemTitle;

    if (title) {
      const list = this.state.list;
      const id = idGenerator.next().value;

      this.setState({
        newItemTitle: '',
        list: [...list, { id, title }],
      });
    }
  }

  handleChange(evt) {
    const newItemTitle = evt.target.value;
    console.log(this.state);

    this.setState({ newItemTitle });
  }

  render() {
    const { list, newItemTitle } = this.state;
    const { addItem, handleChange, exportAsOpml } = this;

    return (
      <div className="App">
        <header className="App-header">Listy</header>
        <section className="App-list">
          <button onClick={exportAsOpml}>Export as OPML</button>
          <form onSubmit={addItem} className="App-form">
            <input type="text" placeholder="Add something" value={newItemTitle} onChange={handleChange} />
            <button type="submit">Ajouter</button>
          </form>
          <div style={{ height: 600 }}>
            <SortableTree
              treeData={list}
              onChange={list => this.setState({ list })}
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