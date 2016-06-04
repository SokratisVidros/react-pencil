# React Pencil

A delicate React component that enables single-line and multi-line in-place edits. Single-line edits are performed on HTML input whereas multi-line edits are performed on content editable spans.

![](http://g.recordit.co/vzoEKt6pIc.gif)

React-pencil works on modern browsers such as Chrome, Firefox, Safari and IE 11+.

## Installation

```
$ npm i react-pencil
```

## Features

- Single-line in-place edits
- Multi-line in-place edits
- Autosized fields
- Pencil button suffix
- Placeholders
- Error display
- Fully customizable via pass through props
- OnEditDone callback

## Examples

### Single-line editing

```
<ReactPencil name='name' value='John Doe'/>
```

### Multi-line editing

```
<ReactPencil
  name='bio'
  value='Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
  className='bio'
  multiline={true}
/>
```

### Placeholders

#### Single-line
```
<ReactPencil
  name='firstname'
  placeholder='Type your firstname here...'
/>
```

#### Multi-line

```
<ReactPencil
  name='firstname'
  multiline={true}
  placeholder='Type your bio here...'
/>
```

### Error display

```
<ReactPencil
  name='email'
  value='@example.com'
  error='Invalid email address'
/>
```

### Callbacks

```
<ReactPencil value='John Doe' onEditDone={this.onEditDone}/>
```

## Future expansions

- Client side validation
- Support for legacy browsers

## Licence

MIT
