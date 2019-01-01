import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Menu } from 'antd';

import Editor from './Editor';
import Home from './Home';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 'home'
        }
    };

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    };


    render() {
        return <Router>
            <div className="app">
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="home"><Link to="/">首页</Link></Menu.Item>
                    <Menu.Item key="editor"><Link to="/editor">流程制作</Link></Menu.Item>
                </Menu>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/editor" component={Editor} />
                </Switch>
            </div>
        </Router>;
    }
}

export default App;