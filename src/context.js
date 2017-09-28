/* global MathJax */
import React from 'react';
import PropTypes from 'prop-types';
import loadScript from 'load-script';

const DEFAULT_SCRIPT =
    'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML';

const DEFAULT_OPTIONS = {
  tex2jax: {
    inlineMath: [],
  },
  showMathMenu: false,
  showMathMenuMSIE: false,
};

/**
 * Context for loading mathjax
 * @type {[type]}
 */
export default class MathJaxContext extends React.Component {
  constructor(props) {
    super(props);

    this.onLoad = this.onLoad.bind(this);

    this.state = {
      loaded: false,
    };
  }

  getChildContext() {
    return {
      MathJax: typeof MathJax === 'undefined' ? undefined : MathJax,
    };
  }

  componentDidMount() {
    const { script } = this.props;

    if (!script) {
      return this.onLoad();
    }

    loadScript(script, this.onLoad);
  }

  onLoad() {
    const { options } = this.props;
    MathJax.Hub.Config(options);

    this.setState({
      loaded: true,
    });
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

MathJaxContext.propTypes = {
  children: PropTypes.node.isRequired,
  script: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([false]),
  ]),
  options: PropTypes.shape(),
};

MathJaxContext.defaultProps = {
  script: DEFAULT_SCRIPT,
  options: DEFAULT_OPTIONS,
};

MathJaxContext.childContextTypes = {
  MathJax: PropTypes.object,
};
