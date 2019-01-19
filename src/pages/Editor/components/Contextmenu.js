import React, { Component } from 'react';
import G6Editor from "@antv/g6-editor"


class Contextmenu extends Component{
    createContextmenu(container) {
        return new G6Editor.Contextmenu({
            container
        });
    }
    getCreateContextmenu() {
        const { createContextmenu } = this.props;
        return createContextmenu ? createContextmenu : this.createContextmenu;
    }
    componentDidMount() {
        const { editor } = this.props;
        const createContextmenu = this.getCreateContextmenu();
        const contextmenu = createContextmenu(this.contextmenuContainer);
        editor.add(contextmenu);
    }
    render() {
        return (<div className="contextmenu" ref={el => { this.contextmenuContainer = el; }}>
            <div data-status="node-selected" className="menu">
                <div data-command="copy" className="command">
                    <span>复制</span>
                    <span>copy</span>
                </div>
                <div data-command="delete" className="command">
                    <span>删除</span>
                    <span>delete</span>
                </div>
                <div data-command="pasteHere" className="command">
                    <span>粘贴</span>
                    <span>pasteHere</span>
                </div>
                <div data-command="undo" className="command">
                    <span>撤销</span>
                    <span>undo</span>
                </div>
            </div>
        </div>);
    }
}

export default Contextmenu;