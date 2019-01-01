import React, { Component } from 'react';
import G6Editor from "@antv/g6-editor"

class Page extends Component {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  componentDidMount() {
    const { editor } = this.props;

    const page = new G6Editor.Flow({
      graph: {
        container: this.element.current
      },
    });

    editor.add(page);
  }

  render() {
    return (
      <div className="page" ref={this.element}></div>
    );
  }
}

export default Page;
