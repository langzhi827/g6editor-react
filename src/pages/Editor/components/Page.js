import React, {Component} from 'react';
import G6Editor from "@antv/g6-editor"
import {Drawer, Input, Button} from 'antd';

class Page extends Component {
    constructor(props) {
        super(props);
        this.element = React.createRef();
        this.state = {
            data: {}
        }
    }

    state = {visible: false};

    componentDidMount() {
        const {editor} = this.props;

        const page = new G6Editor.Flow({
            graph: {
                container: this.element.current
            },
        });

        page.on('afteritemselected', ev => {
            console.log(ev.item);
            let shape = ev.item.model.shape;
            const {dataMap} = this.props;
            this.setState({
                data: dataMap[shape]
            });
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
        const {data} = this.state;
        return (
            <React.Fragment>
                <div className="page" ref={this.element}></div>
                <Drawer
                    title="详情"
                    placement="right"
                    width="400"
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p>
                        {
                            Object.keys(data).map(dt => {
                                console.info(dt);
                                return (
                                    <Input defaultValue={data[dt]}/>
                                )
                            })
                        }
                    </p>
                </Drawer>
            </React.Fragment>
        );
    }
}

export default Page;
