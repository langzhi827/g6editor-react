import React, { Component } from 'react';
import { Drawer, Input, Button, Form, Row, Col, Icon, Select } from 'antd';

const Option = Select.Option;
const { TextArea } = Input;

class ItemEditor extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const { data, getFieldDecorator, type } = this.props;

        const hideFileds = ['id', 'type'];
        const areaFileds = ['fields', 'rule'];

        const getItem = (dt) => {
            if (areaFileds.indexOf(dt.name) > -1) {
                return <TextArea rows={4} />;
            } else if (Array.isArray(dt.value)) {
                return <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                >
                    {dt.value.map(item => <Option key={item}>{item}</Option>)}
                </Select>;
            } else {
                return <Input />;
            }
        };

        const output = //循环展示属性
            data.map((dt, i) => {
                if (areaFileds.indexOf(dt.name) > -1) {
                    return <Row gutter={24} key={i} style={{ display: hideFileds.indexOf(dt.name) > -1 ? 'none' : 'block' }}>
                        <Form.Item>
                            <Col span={20}>
                                {getFieldDecorator(`name-${i}`, {
                                    initialValue: dt.name
                                })(
                                    <Input />
                                )}
                            </Col>
                            <Col span={4} style={{ textAlign: 'center' }}>
                                <Icon type="minus-circle" onClick={() => {
                                    this.delete(i);
                                }} />
                            </Col>
                            <Col span={24} key={i}>
                                {getFieldDecorator(`value-${i}`, {
                                    initialValue: dt.value
                                })(getItem(dt))}
                            </Col>
                        </Form.Item>
                    </Row>;
                } else {
                    return <Row gutter={24} key={i} style={{ display: hideFileds.indexOf(dt.name) > -1 ? 'none' : 'block' }}>
                        <Col span={7}>
                            <Form.Item>
                                {getFieldDecorator(`name-${i}`, {
                                    initialValue: dt.name
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={13} key={i}>
                            <Form.Item>
                                {getFieldDecorator(`value-${i}`, {
                                    initialValue: dt.value
                                })(getItem(dt))}
                            </Form.Item>
                        </Col>
                        <Col span={4} style={{ textAlign: 'center' }}>
                            <Icon type="minus-circle" onClick={() => {
                                this.delete(i);
                            }} />
                        </Col>
                    </Row>
                }
            });

        const input = data.map((dt, i) => {
            if (areaFileds.indexOf(dt.name) > -1) {
                return <Row gutter={24} key={i} style={{ display: hideFileds.indexOf(dt.name) > -1 ? 'none' : 'block' }}>
                    <Form.Item>
                        <Col span={20}>
                            {getFieldDecorator(`name-${i}`, {
                                initialValue: dt.name
                            })(
                                <Input />
                            )}
                        </Col>
                        <Col span={4} style={{ textAlign: 'center' }}>
                            <Icon type="minus-circle" onClick={() => {
                                this.delete(i);
                            }} />
                        </Col>
                        <Col span={24} key={i}>
                            {getFieldDecorator(`value-${i}`, {
                                initialValue: dt.value
                            })(getItem(dt))}
                        </Col>
                    </Form.Item>
                </Row>;
            } else {
                return <Row gutter={24} key={i} style={{ display: hideFileds.indexOf(dt.name) > -1 ? 'none' : 'block' }}>
                    <Col span={7}>
                        <Form.Item>
                            {getFieldDecorator(`name-${i}`, {
                                initialValue: dt.name
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={13} key={i}>
                        <Form.Item>
                            {getFieldDecorator(`value-${i}`, {
                                initialValue: dt.value
                            })(getItem(dt))}
                        </Form.Item>
                    </Col>
                    <Col span={4} style={{ textAlign: 'center' }}>
                        <Icon type="minus-circle" onClick={() => {
                            this.delete(i);
                        }} />
                    </Col>
                </Row>
            }
        });

        let current = '';
        if (type === "输出源") {
            current = output;
        } else {
            current = input;
        }

        return (
            <React.Fragment>
                {current}
            </React.Fragment>
        );
    }
}

export default ItemEditor;
