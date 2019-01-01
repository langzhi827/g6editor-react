import React, { Component } from 'react';
import G6Editor from "@antv/g6-editor"

class Minimap extends Component {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  componentDidMount() {
    const { editor } = this.props;

    const minimap = new G6Editor.Minimap({
      container: this.element.current
    });

    editor.add(minimap);
  }

  render() {
    return (
      <div className="minimap" ref={this.element}></div>
    );
  }
}

export default Minimap;
