
import autoBind from 'react-autobind';
import classNames from 'classnames';
import React from 'react';

export default class DebugPrint extends React.PureComponent {
    
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      show: true,
    };
  }    
  
  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <div className="debug-root">
        <div className="debug-header" onClick={this.toggle}>
        </div>
        {this.state.show 
          ? (
            <pre className="debug-pre">
              {JSON.stringify(this.props.data, null, 2) }
            </pre>
          )
          : null
        }
      </div>
    )
  }
}