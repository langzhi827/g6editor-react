import React, { Component } from 'react';
import G6Editor from "@antv/g6-editor"
import { Drawer } from 'antd';

class Page extends Component {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  state = { visible: false };

  componentDidMount() {
    const { editor } = this.props;

    const page = new G6Editor.Flow({
      graph: {
        container: this.element.current
      },
    });

    page.on('afteritemselected', ev => {
      console.log(ev.item);
      this.setState({
        visible: true,
      });
    });

    editor.add(page);
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="page" ref={this.element}></div>
        <Drawer
          title="编辑"
          placement="right"
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>Some contents...</p>
        </Drawer>
      </React.Fragment >
    );
  }
}

export default Page;
