import React, {Component} from 'react';
import G6Editor, {Flow} from "@antv/g6-editor"
import 'whatwg-fetch';

import './style.css';
import Page from './components/Page';
import ItemPannel from './components/ItemPannel';
import Toolbar from './components/Toolbar';
import Minimap from './components/Minimap';
import Contextmenu from "./components/Contextmenu"
import mark1 from './images/mark.svg';
import mark2 from './images/mark2.svg';

// 注册模型卡片基类
Flow.registerNode('model-card', {
    draw(item) {
        const group = item.getGraphicGroup();
        const model = item.getModel();
        const width = 184;
        const height = 40;
        const x = -width / 2;
        const y = -height / 2;
        const borderRadius = 4;
        const keyShape = group.addShape('rect', {
            attrs: {
                x,
                y,
                width,
                height,
                radius: borderRadius,
                fill: 'white',
                stroke: '#CED4D9'
            }
        });
        // 左侧色条
        group.addShape('path', {
            attrs: {
                path: [
                    ['M', x, y + borderRadius],
                    ['L', x, y + height - borderRadius],
                    ['A', borderRadius, borderRadius, 0, 0, 0, x + borderRadius, y + height],
                    ['L', x + borderRadius, y],
                    ['A', borderRadius, borderRadius, 0, 0, 0, x, y + borderRadius]
                ],
                fill: this.color_type
            }
        });
        // 类型 logo
        group.addShape('image', {
            attrs: {
                img: this.type_icon_url,
                x: x + 16,
                y: y + 12,
                width: 20,
                height: 16
            }
        });
        // 名称文本
        const label = model.label ? model.label : this.label;
        group.addShape('text', {
            attrs: {
                text: label,
                x: x + 52,
                y: y + 13,
                textAlign: 'start',
                textBaseline: 'top',
                fill: 'rgba(0,0,0,0.65)'
            }
        });
        // 状态 logo
        group.addShape('image', {
            attrs: {
                img: this.state_icon_url,
                x: x + 158,
                y: y + 12,
                width: 16,
                height: 16
            }
        });
        return keyShape;
    },
    // 设置锚点
    anchor: [
        [0.5, 0], // 上面边的中点
        [0.5, 1] // 下边边的中点
    ]
});

class Editor extends Component {
    constructor(props) {
        super(props);
        this.editor = new G6Editor();
        this.state = {
            data: [],
            dataMap: {},
            relation: {nodes: []}
        };
    }

    registerNode = (dt) => {
        let obj = {
            label: dt.name,
            color_type: '#1890FF',
            type_icon_url: mark2,
            state_icon_url: mark1,
            // 设置锚点
            anchor: []
        };
        if(dt.type!=="输入源"){
            obj.anchor.push([0.5, 0, {
                type: 'input'
            }]);
        }
        if(dt.type!=="输出源"){
            obj.anchor.push([0.5, 1, {
                type: 'output'
            }]);
        }

        Flow.registerNode(dt.id, obj, 'model-card');
    };
    callBack= (e)=>{
        //console.info(this.state.dataMap[e.id]);
        //console.info(e);
        //重新赋值
        let {dataMap} = this.state;
        dataMap[e.id]=e;
        //console.info(this.state.dataMap[e.id]);
    };
    componentDidMount() {
        fetch('./mock_data/data.json')
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                //初始化
                let dataMap = {};
                data.forEach(dt => {
                    dt.id = Math.random() * 10e16 + '';
                    this.registerNode(dt);

                    dataMap[dt.id] = dt;
                });

                this.setState({
                    data: data,
                    dataMap: dataMap
                });

            });

        const page = this.editor.getCurrentPage();
        page.on('afterchange', ev => {
            const relation = page.save();
            this.setState({
                relation: relation
            })
        });

    }

    render() {
        const {data, relation, dataMap} = this.state;

        return (
            <div className="editor">
                <Toolbar editor={this.editor} relation={relation} dataMap={dataMap}/>
                <Contextmenu editor={this.editor}/>
                <ItemPannel editor={this.editor} data={data}/>
               {/* <Minimap editor={this.editor}/>*/}
                <Page editor={this.editor} dataMap={dataMap} callBack={this.callBack}/>
                <div className="json-box">{JSON.stringify(relation, null, 2)}</div>
            </div>
        );
    }
}

export default Editor;
