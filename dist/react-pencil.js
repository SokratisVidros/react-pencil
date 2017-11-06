'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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


var commonPropTypes = {
  finishEdit: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string,
  tabIndex: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  value: _propTypes2.default.string
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

    var _this = _possibleConstructorReturn(this, (Singleline.__proto__ || Object.getPrototypeOf(Singleline)).call(this));

    _this.state = { value: value };
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onKeyUp = _this.onKeyUp.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
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
        window.clearTimeout(this._delayedFocus);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var value = _ref2.value;

      if (this.state.value !== value) {
        this.setState({ value: value });
      }
    }
  }, {
    key: 'autosize',
    value: function autosize() {
      try {
        (0, _autosizeInput2.default)(this.refs.content);
      } catch (ignore) {}
    }
  }, {
    key: 'focus',
    value: function focus() {
      var _this2 = this;

      this._delayedFocus = window.setTimeout(function () {
        moveCursorToEnd(_this2.refs.content);
        _this2.content.focus();
      }, 110);
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.content.blur();
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
      var _this3 = this;

      var _props = this.props,
          name = _props.name,
          value = _props.value,
          style = _props.style,
          finishEdit = _props.finishEdit,
          rest = _objectWithoutProperties(_props, ['name', 'value', 'style', 'finishEdit']);

      return _react2.default.createElement('input', _extends({ type: 'text',
        ref: function ref(el) {
          return _this3.content = el;
        },
        name: name,
        autoComplete: 'off',
        value: this.state.value,
        style: style,
        onBlur: this.onBlur,
        onKeyUp: this.onKeyUp,
        onChange: this.onChange
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

  function Multiline(props) {
    _classCallCheck(this, Multiline);

    var _this4 = _possibleConstructorReturn(this, (Multiline.__proto__ || Object.getPrototypeOf(Multiline)).call(this, props));

    _this4.onFocus = _this4.onFocus.bind(_this4);
    _this4.onBlur = _this4.onBlur.bind(_this4);
    _this4.onClick = _this4.onClick.bind(_this4);
    _this4.onKeyDown = _this4.onKeyDown.bind(_this4);
    return _this4;
  }

  _createClass(Multiline, [{
    key: 'focus',
    value: function focus() {
      this._wasClicked = true;
      this.content.focus();
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.content.blur();
    }
  }, {
    key: 'selectAll',
    value: function selectAll() {
      var _this5 = this;

      if (document && typeof document.execCommand === 'function') {
        // Mimic input behavior when navigating to element with TAB key.
        setTimeout(function () {
          if (!_this5._wasClicked) {
            document.execCommand('selectAll', false, null);
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
        this.content.innerHTML = '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props2 = this.props,
          value = _props2.value,
          style = _props2.style,
          finishEdit = _props2.finishEdit,
          rest = _objectWithoutProperties(_props2, ['value', 'style', 'finishEdit']);

      return _react2.default.createElement('span', _extends({ ref: function ref(el) {
          _this6.content = el;
        },
        contentEditable: 'true',
        style: style,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onClick: this.onClick,
        onKeyDown: this.onKeyDown,
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

  function ReactPencil(props) {
    _classCallCheck(this, ReactPencil);

    var _this7 = _possibleConstructorReturn(this, (ReactPencil.__proto__ || Object.getPrototypeOf(ReactPencil)).call(this, props));

    _this7.finishEdit = _this7.finishEdit.bind(_this7);
    return _this7;
  }

  _createClass(ReactPencil, [{
    key: 'focus',
    value: function focus() {
      this.editable.focus();
    }
  }, {
    key: 'finishEdit',
    value: function finishEdit() {
      var newValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var _props3 = this.props,
          value = _props3.value,
          name = _props3.name,
          multiline = _props3.multiline;

      newValue = newValue.trim();

      if (newValue !== value) {
        this.props.onEditDone(name, newValue);
      }
      if (multiline) {
        this.editable.ensureEmptyContent();
      }
    }
  }, {
    key: 'renderPencilButton',
    value: function renderPencilButton() {
      var _this8 = this;

      return _react2.default.createElement(
        'button',
        { className: 'pencil-button', onClick: function onClick() {
            return _this8.focus();
          } },
        _react2.default.createElement('i', { className: 'pencil-icon' })
      );
    }
  }, {
    key: 'renderError',
    value: function renderError(error) {
      return _react2.default.createElement(
        'div',
        { className: 'error-msg' },
        error
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          multiline = _props4.multiline,
          pencil = _props4.pencil,
          error = _props4.error,
          wrapperClassname = _props4.wrapperClassname,
          onEditDone = _props4.onEditDone,
          rest = _objectWithoutProperties(_props4, ['multiline', 'pencil', 'error', 'wrapperClassname', 'onEditDone']);

      var Component = multiline ? Multiline : Singleline;
      return _react2.default.createElement(
        'div',
        { className: 'react-pencil' + (wrapperClassname ? ' ' + wrapperClassname : '') + (error ? ' error' : '') },
        _react2.default.createElement(
          'div',
          { className: 'input-field' },
          _react2.default.createElement(Component, _extends({ ref: el = this.editable = el }, rest, { finishEdit: this.finishEdit })),
          pencil ? this.renderPencilButton() : null
        ),
        error ? this.renderError(error) : null
      );
    }
  }]);

  return ReactPencil;
}(Component);

Object.assign(ReactPencil, {
  propTypes: {
    error: _propTypes2.default.string,
    multiline: _propTypes2.default.bool,
    name: _propTypes2.default.string,
    onEditDone: _propTypes2.default.func,
    value: _propTypes2.default.string
  },
  defaultProps: {
    value: '',
    pencil: true,
    onEditDone: function onEditDone() {}
  }
});

exports.default = ReactPencil;
