'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _autosizeInput = require('autosize-input');

var _autosizeInput2 = _interopRequireDefault(_autosizeInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;
var PropTypes = _react2.default.PropTypes;


var commonPropTypes = {
  finishEdit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string
};

var commonDefaultProps = {};

function moveCursorToEnd(el) {
  if (el && el.tagName.toLowerCase().match(/input|textarea/)) {
    el.focus();
    if (el.setSelectionRange) {
      var len = el.value.length * 2;
      el.setSelectionRange(len, len);
    } else {
      el.value = el.value;
    }
    el.scrollTop = 999999;
  } else if (document.createRange) {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

var Singleline = function (_Component) {
  _inherits(Singleline, _Component);

  function Singleline(_ref) {
    var value = _ref.value;

    _classCallCheck(this, Singleline);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Singleline).call(this));

    _this.state = { value: value };
    return _this;
  }

  _createClass(Singleline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.autosize();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.autosize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._delayedFocus) {
        global.clearTimeout(this._delayedFocus);
      }
    }
  }, {
    key: 'autosize',
    value: function autosize() {
      (0, _autosizeInput2.default)(this.refs.content);
    }
  }, {
    key: 'focus',
    value: function focus() {
      var _this2 = this;

      this._delayedFocus = global.setTimeout(function () {
        moveCursorToEnd(_this2.refs.content);
        _this2.refs.content.focus();
      }, 110);
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.refs.content.blur();
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      if (e.keyCode === 27 || e.keyCode === 13) {
        this.blur();
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      this.props.finishEdit(this.state.value);
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      this.setState({ value: e.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var name = _props.name;
      var value = _props.value;
      var style = _props.style;

      var rest = _objectWithoutProperties(_props, ['name', 'value', 'style']);

      return _react2.default.createElement('input', _extends({ type: 'text',
        ref: 'content',
        name: name,
        autoComplete: 'off',
        value: this.state.value,
        style: style,
        onBlur: this.onBlur.bind(this),
        onKeyUp: this.onKeyUp.bind(this),
        onChange: this.onChange.bind(this)
      }, rest));
    }
  }]);

  return Singleline;
}(Component);

Object.assign(Singleline, {
  propTypes: commonPropTypes,
  defaultProps: commonDefaultProps
});

var Multiline = function (_Component2) {
  _inherits(Multiline, _Component2);

  function Multiline() {
    _classCallCheck(this, Multiline);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Multiline).apply(this, arguments));
  }

  _createClass(Multiline, [{
    key: 'focus',
    value: function focus() {
      this._wasClicked = true;
      this.refs.content.focus();
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.refs.content.blur();
    }
  }, {
    key: 'selectAll',
    value: function selectAll() {
      var _this4 = this;

      if (typeof global.document.execCommand === 'function') {
        // Mimic input behavior when navigating to element with TAB key.
        setTimeout(function () {
          if (!_this4._wasClicked) {
            global.document.execCommand('selectAll', false, null);
          }
        }, 50);
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.selectAll();
      moveCursorToEnd(this.refs.content);
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      this._wasClicked = true;
      this.focus();
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      if (e.keyCode === 27 || e.keyCode === 13) {
        e.preventDefault();
        this.blur();
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      this._wasClicked = false;
      this.props.finishEdit(e.target.innerText);
    }
  }, {
    key: 'ensureEmptyContent',
    value: function ensureEmptyContent() {
      if (!this.props.value) {
        this.refs.contentinnerHTML = '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var value = _props2.value;
      var style = _props2.style;

      var rest = _objectWithoutProperties(_props2, ['value', 'style']);

      return _react2.default.createElement('span', _extends({ ref: 'content',
        contentEditable: 'true',
        style: style,
        onFocus: this.onFocus.bind(this),
        onBlur: this.onBlur.bind(this),
        onClick: this.onClick.bind(this),
        onKeyDown: this.onKeyDown.bind(this),
        dangerouslySetInnerHTML: { __html: value || null }
      }, rest));
    }
  }]);

  return Multiline;
}(Component);

Object.assign(Multiline, {
  propTypes: commonPropTypes,
  defaultProps: commonDefaultProps
});

var ReactPencil = function (_Component3) {
  _inherits(ReactPencil, _Component3);

  function ReactPencil() {
    _classCallCheck(this, ReactPencil);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactPencil).apply(this, arguments));
  }

  _createClass(ReactPencil, [{
    key: 'focus',
    value: function focus() {
      this.refs.editable.focus();
    }
  }, {
    key: 'finishEdit',
    value: function finishEdit(newValue) {
      var _props3 = this.props;
      var value = _props3.value;
      var name = _props3.name;
      var multiline = _props3.multiline;

      newValue = newValue.trim();

      if (newValue !== value) {
        this.props.onEditDone(name, newValue);
      }
      if (multiline) {
        this.refs.editable.ensureEmptyContent();
      }
    }
  }, {
    key: 'renderPencilButton',
    value: function renderPencilButton() {
      var _this6 = this;

      return _react2.default.createElement(
        'button',
        { className: 'pencil-button', onClick: function onClick() {
            return _this6.focus();
          } },
        _react2.default.createElement('i', { className: 'pencil-icon' })
      );
    }
  }, {
    key: 'renderError',
    value: function renderError(error) {
      return _react2.default.createElement(
        'span',
        { className: 'error-msg' },
        error
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var multiline = _props4.multiline;
      var pencil = _props4.pencil;
      var error = _props4.error;
      var wrapperClassname = _props4.wrapperClassname;

      var rest = _objectWithoutProperties(_props4, ['multiline', 'pencil', 'error', 'wrapperClassname']);

      var Component = multiline ? Multiline : Singleline;
      return _react2.default.createElement(
        'div',
        { className: 'react-pencil ' + wrapperClassname + ' ' + (error ? 'error' : '') },
        _react2.default.createElement(Component, _extends({ ref: 'editable' }, rest, { finishEdit: this.finishEdit.bind(this) })),
        pencil ? this.renderPencilButton() : null,
        error ? this.renderError(error) : null
      );
    }
  }]);

  return ReactPencil;
}(Component);

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
    onEditDone: function onEditDone() {}
  }
});

exports.default = ReactPencil;
