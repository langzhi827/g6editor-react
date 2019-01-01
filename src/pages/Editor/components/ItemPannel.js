import React, { Component } from 'react';
import G6Editor from "@antv/g6-editor"

class ItemPannel extends Component {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }


  componentDidMount() {
    const { editor } = this.props;

    const itempannel = new G6Editor.Itempannel({
      container: this.element.current
    });

    editor.add(itempannel);

  }

  render() {
    const { data } = this.props;

    return (
      <div className="itempannel" ref={this.element}>
        <ul>
          {data.map(dt => {
            return <li className="getItem" data-shape={dt.id} data-type="node" data-size="170*34" key={dt.id}>
              <span className="pannel-type-icon"></span>{dt.name}
            </li>
          })}
        </ul>
      </div>
    );
  }
}

export default ItemPannel;
