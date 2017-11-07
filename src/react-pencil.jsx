import PropTypes from 'prop-types';
import React from 'react';
import {render} from 'react-dom';
import autosizeInput from 'autosize-input';

const {
  Component
} = React;

const commonPropTypes = {
  finishEdit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string
};

const commonDefaultProps = {};

function moveCursorToEnd(el) {
  if (el && el.tagName.toLowerCase().match(/input|textarea/)) {
    el.focus();
    if (el.setSelectionRange) {
      const len = el.value.length * 2;
      el.setSelectionRange(len, len);
    } else {
      el.value = el.value;
    }
    el.scrollTop = 999999;
  } else if (document.createRange) {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
}


class Singleline extends Component {

  constructor({value}) {
    super();
    this.state = {value};
    this.onBlur = this.onBlur.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.autosize();
  }

  componentDidUpdate() {
    this.autosize();
  }

  componentWillUnmount() {
    if (this._delayedFocus) {
      window.clearTimeout(this._delayedFocus);
    }
  }

  componentWillReceiveProps({value}) {
    if (this.state.value !== value) {
      this.setState({value});
    }
  }

  autosize() {
    try {
      autosizeInput(this.content);
    } catch (ignore) {}
  }

  focus() {
    this._delayedFocus = window.setTimeout(() => {
      moveCursorToEnd(this.content);
      this.content.focus();
    }, 110);
  }

  blur() {
    this.content.blur();
  }

  onKeyUp(e) {
    if (e.keyCode === 27 || e.keyCode === 13) {
      this.blur();
    }
  }

  onBlur(e) {
    this.props.finishEdit(this.state.value);
  }

  onChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    const {name, value, style, finishEdit, ...rest} = this.props;
    return (
      <input type='text'
             ref={el => (this.content = el)}
             name={name}
             autoComplete='off'
             value={this.state.value}
             style={style}
             onBlur={this.onBlur}
             onKeyUp={this.onKeyUp}
             onChange={this.onChange}
             {...rest}
      />
    );
  }
}

Object.assign(Singleline, {
  propTypes: commonPropTypes,
  defaultProps: commonDefaultProps
});


class Multiline extends Component {

  constructor(props) {
    super(props);
    this.onFocus= this.onFocus.bind(this);
    this.onBlur= this.onBlur.bind(this);
    this.onClick= this.onClick.bind(this);
    this.onKeyDown= this.onKeyDown.bind(this);
  }

  focus() {
    this._wasClicked = true;
    this.content.focus();
  }

  blur() {
    this.content.blur();
  }

  selectAll() {
    if (document && typeof document.execCommand === 'function') {
      // Mimic input behavior when navigating to element with TAB key.
      setTimeout(() => {
        if (!this._wasClicked) {
          document.execCommand('selectAll', false, null);
        }
      }, 50);
    }
  }

  onFocus() {
    this.selectAll();
    moveCursorToEnd(this.content);
  }

  onClick() {
    this._wasClicked = true;
    this.focus();
  }

  onKeyDown(e) {
    if (e.keyCode === 27 || e.keyCode === 13) {
      e.preventDefault();
      this.blur();
    }
  }

  onBlur(e) {
    this._wasClicked = false;
    this.props.finishEdit(e.target.innerText);
  }

  ensureEmptyContent() {
    if (!this.props.value) {
      this.content.innerHTML = '';
    }
  }

  render() {
    const {value, style, finishEdit, ...rest} = this.props;
    return (
      <span ref={el => (this.content = el)}
            contentEditable='true'
            style={style}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onClick={this.onClick}
            onKeyDown={this.onKeyDown}
            dangerouslySetInnerHTML={{__html: value || null}}
            {...rest}
      >
      </span>
    );
  }
}

Object.assign(Multiline, {
  propTypes: commonPropTypes,
  defaultProps: commonDefaultProps
});


class ReactPencil extends Component {
  constructor(props) {
    super(props);
    this.finishEdit = this.finishEdit.bind(this)
  }

  focus() {
    this.editable.focus();
  }

  finishEdit(newValue = '') {
    const {value, name, multiline} = this.props;
    newValue = newValue.trim();

    if (newValue !== value) {
      this.props.onEditDone(name, newValue);
    }
    if (multiline) {
      this.editable.ensureEmptyContent();
    }
  }

  renderPencilButton() {
    return (
      <button className='pencil-button' onClick={() => this.focus()}>
        <i className='pencil-icon'></i>
      </button>
    );
  }

  renderError(error) {
    return <div className='error-msg'>{error}</div>
  }

  render() {
    const {multiline, pencil, error, wrapperClassname, onEditDone, ...rest} = this.props;
    const Component = multiline ? Multiline : Singleline;
    return (
      <div className={`react-pencil${wrapperClassname ? ' ' + wrapperClassname : ''}${error ? ' error' : ''}`}>
        <div className='input-field'>
          <Component ref={el => (this.editable = el)} {...rest} finishEdit={this.finishEdit}/>
          {pencil ? this.renderPencilButton() : null}
        </div>
        {error ? this.renderError(error) : null}
      </div>
    );
  }
}

Object.assign(ReactPencil, {
  propTypes: {
    error: PropTypes.string,
    multiline: PropTypes.bool,
    name: PropTypes.string,
    onEditDone: PropTypes.func,
    value: PropTypes.string
  },
  defaultProps: {
    value: '',
    pencil: true,
    onEditDone: () => {}
  }
});

export default ReactPencil;
