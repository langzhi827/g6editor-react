import React, { Component } from 'react';
import G6Editor from "@antv/g6-editor"
import { Tree } from 'antd';
const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

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
    let treeMap = {};
    data.forEach(dt => {
      treeMap[dt.type] = treeMap[dt.type] || [];
      treeMap[dt.type].push(dt);
    });

    return (
      <div className="itempannel" ref={this.element}>
        <DirectoryTree
          multiple
          defaultExpandAll
        >
          {Object.keys(treeMap).map(key => <TreeNode title={key} key={key}>
            {treeMap[key].map(tree => <TreeNode
            className="getItem"
              title={tree.name}
              key={tree.id}
              data-shape={tree.id}
              data-type="node"
              data-size="170*34"
              isLeaf />)}
          </TreeNode>)}
        </DirectoryTree>
        {/* <ul>
          {data.map(dt => {
            return <li className="getItem" data-shape={dt.id} data-type="node" data-size="170*34" key={dt.id}>
              <span className="pannel-type-icon"></span>{dt.name}
            </li>
          })}
        </ul> */}
      </div>
    );
  }
}

export default ItemPannel;
