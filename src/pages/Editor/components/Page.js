import React, { Component } from 'react';
import G6Editor from "@antv/g6-editor"
import { Drawer, Input, Button, Form, Row, Col, Icon } from 'antd';

class Page extends Component {
  constructor(props) {
    super(props);
    this.element = React.createRef();
    this.state = {
      data: []
    }
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
      let shape = ev.item.model.shape;
      const { dataMap } = this.props;
      const data = dataMap[shape] || {};

      this.setState({
        visible: true,
        data: Object.keys(data).map(key => {
          return {
            name: key,
            value: data[key]
          }
        })
      });
    });
    editor.add(page);
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      let data = {};

      let i = 0;
      while (values['name-' + i] !== undefined) {
        if (values['name-' + i] !== '') {
          data[values['name-' + i]] = values['value-' + i];
        }
        i++;
      }

      console.log(data);

    });
  }

  add = () => {
    this.setState(preState => {
      preState.data.push({
        name: '',
        value: ''
      });
      return preState
    })
  }

  delete = (i) => {
    this.setState(preState => {
      preState.data.splice(i, 1);
      return preState;
    })
  }

  render() {
    let { data } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <div className="page" ref={this.element}></div>
        <Drawer
          title="详情"
          closable={false}
          placement="right"
          width="400"
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSubmit}
          >
            {
              data.map((dt, i) => {
                return <Row gutter={24} key={i} style={{ display: dt.name === 'id' ? 'none' : 'block' }}>
                  <Col span={10}>
                    <Form.Item>
                      {getFieldDecorator(`name-${i}`, {
                        initialValue: dt.name
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={10} key={i}>
                    <Form.Item>
                      {getFieldDecorator(`value-${i}`, {
                        initialValue: dt.value
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Icon type="minus-circle" onClick={() => {
                      this.delete(i);
                    }} />
                  </Col>
                </Row>
              })
            }
            <Button onClick={this.add} block>添加</Button>
            <br /><br />
            <Button type="primary" htmlType="submit" block>提交</Button>
          </Form>
        </Drawer>
      </React.Fragment >
    );
  }
}

export default Form.create()(Page);
