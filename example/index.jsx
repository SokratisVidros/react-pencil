import React from 'react';
import {render} from 'react-dom';
import ReactPencil from '../dist/react-pencil';

class Showcase extends React.Component {
  render() {
    return (
      <section>
        <header>
          <h1>React pencil showcase</h1>
        </header>
        <div>
          <h2>Oneline editing</h2>
          <ReactPencil/>
        </div>
        <div>
          <h2>Multiline editing</h2>
          <ReactPencil/>
        </div>
        <div>
          <h2>Placeholders</h2>
          <ReactPencil/>
        </div>
      </section>
    );
  }
};

render(<Showcase/>, document.getElementById('showcase'));
