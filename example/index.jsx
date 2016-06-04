import React from 'react';
import {render} from 'react-dom';
import ReactPencil from '../dist/react-pencil';

class Showcase extends React.Component {

  onEditDone() {
    const output = document.querySelector('span.output');
    output.innerHTML = `Edited at ${new Date()}`;
  }

  render() {
    return (
      <section>
        <header>
          <h1>React-pencil examples</h1>
        </header>
        <div className='example'>
          <h3>Single-line editing</h3>
          <ReactPencil name='name' value='John Doe'/>
        </div>
        <div className='example'>
          <h3>Multi-line editing</h3>
          <ReactPencil
            name='bio'
            value='Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
            className='bio'
            multiline={true}
          />
        </div>
        <div className='example'>
          <h3>Placeholders</h3>
          <h4>Single-line</h4>
          <ReactPencil
            name='firstname'
            placeholder='Type your firstname here...'
          />
          <h4>Multi-line</h4>
          <ReactPencil
            name='firstname'
            multiline={true}
            placeholder='Type your bio here...'
          />
        </div>
        <div className='example'>
          <h3>Error display</h3>
          <ReactPencil
            name='email'
            value='@example.com'
            error='Invalid email address'
          />
        </div>
        <div className='example'>
          <h3>Callbacks</h3>
          <ReactPencil value='John Doe' onEditDone={this.onEditDone}/>
          <span className='output'></span>
        </div>
      </section>
    );
  }
};

render(<Showcase/>, document.getElementById('showcase'));
