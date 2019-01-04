import React, {Component} from 'react';
import G6Editor from "@antv/g6-editor"
import {Button} from 'antd';

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.element = React.createRef();
    }

    componentDidMount() {
        const {editor} = this.props;

        const toolbar = new G6Editor.Toolbar({
            container: this.element.current
        });

        editor.add(toolbar);
    }

    // 发布
    clickPublish = () => {
        const {relation, dataMap} = this.props;
        let jsonInfo = {
            rule_id: "xxxx",
            interval: 60,
            input: [],
            transform: [],
            output: []
        };
        let edges = relation.edges || [];
        let nodes = relation.nodes || [];
        nodes.forEach(node => {
            let id = node.id;
            let haveSource = false;
            let haveTarget = false;
            let up_transform = [];
            edges.forEach(ege => {
                if (ege.target === id) {
                    haveTarget = true;
                    up_transform.push(ege.source);
                }
                if (ege.source === id) {
                    haveSource = true;
                   // up_transform.push(ege.source);
                }
            });
            if (haveSource && haveTarget) {
                jsonInfo.transform.push({
                    node_id: id,
                    up_stream_node: up_transform,
                    config: dataMap[node.shape]
                })
            }
            if (!haveTarget && haveSource) {
                jsonInfo.input.push({node_id: id, config: dataMap[node.shape]});
            }
            if (!haveSource && haveTarget) {
                jsonInfo.output.push({
                    node_id: id,
                    up_stream_node: up_transform,
                    config: dataMap[node.shape]
                });
            }
        });
        console.log(JSON.stringify(jsonInfo, null, 3));
    };

    render() {
        return (
            <div className="toolbar" ref={this.element}>
                <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_598462_3xve1872wizzolxr.css"/>
                <i data-command="undo" className="command iconfont icon-undo" title="撤销"></i>
                <i data-command="redo" className="command iconfont icon-redo" title="重做"></i>
                <span className="separator"></span>
                <i data-command="copy" className="command iconfont icon-copy-o" title="复制"></i>
                <i data-command="paste" className="command iconfont icon-paster-o" title="粘贴"></i>
                <i data-command="delete" className="command iconfont icon-delete-o" title="删除"></i>
                <span className="separator"></span>
                <i data-command="zoomIn" className="command iconfont icon-zoom-in-o" title="放大"></i>
                <i data-command="zoomOut" className="command iconfont icon-zoom-out-o" title="缩小"></i>
                <i data-command="autoZoom" className="command iconfont icon-fit" title="适应画布"></i>
                <i data-command="resetZoom" className="command iconfont icon-actual-size-o" title="实际尺寸"></i>
                <span className="separator"></span>
                <i data-command="toBack" className="command iconfont icon-to-back" title="层级后置"></i>
                <i data-command="toFront" className="command iconfont icon-to-front" title="层级前置"></i>
                <span className="separator"></span>
                <i data-command="multiSelect" className="command iconfont icon-select" title="多选"></i>
                <i data-command="addGroup" className="command iconfont icon-group" title="成组"></i>
                <i data-command="unGroup" className="command iconfont icon-ungroup" title="解组"></i>
                <Button type="primary" size="small" onClick={this.clickPublish}>发布</Button>
            </div>
        );
    }
}

export default Toolbar;
