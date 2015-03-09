'use strict';

var React = require('react');

var localStorage = {
    status: {
        loggedIn: false,
        inMainMenu: false,
    },
    lists: [
        {
            name: 'Target',
            items: []
        },
        {
            name: 'Trader Joes',
            items: []
        }
    ]
};

var App = React.createClass({
    getInitialState: function () {
        return localStorage;
    },

    componentDidMount: function () {
        window.App = this;
    },

    render: function () {
        return (
            <div id="app">
                <Header status={this.state.status}></Header>
                <div class="flip-container">
                    <FrontCard lists={this.state.lists}></FrontCard>
                    <BackCard lists={this.state.lists}></BackCard>
                </div>
            </div>
        );
    }
});

var Header = React.createClass({
    render: function () {
        var markup;

        if (this.props.status.inMainMenu) {
            if (this.props.status.loggedIn) {
                markup =
                    <div class="glyphs">
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>;
                    </div>;
            } else {
                markup = 
                    <div class="glyphs">
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </div>;
            }
        } else {
            markup = 
                <div class="glyphs">
                    <span class="glyphicon glyphicon-list" aria-hidden="true"></span>
                </div>;
        }

        return (
            <header>
                <span class="title">éllise</span>
                {markup}
            </header>
        );
    }
});

var FrontCard = React.createClass({
    render: function () {
        return (
            <div class="front">
                <div class="container-fluid">
                    <div class="jumbotron">
                        {this.props.lists.map(function (list) {
                            return (
                                <div class="btn-group btn-group-justified">
                                    <div class="btn-group select-list">
                                        <button type="submit" class="btn btn-lg btn-success">{list.name}</button>
                                    </div>
                                    <div class="btn-group delete-list">
                                        <button type="submit" class="btn btn-lg btn-danger">X</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
});

var BackCard = React.createClass({
    render: function () {
        return (
            <div class="back">
                <div class="container-fluid">
                    <div class="jumbotron">
                        <form>
                            <div class="form-group">
                                <label for="username">Email</label>
                                <input id="email" type="email" class="form-control" placeholder="Enter Email" />
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <input id="password" type="password" class="form-control" placeholder="Enter Password" />
                            </div>

                            <button class="btn btn-lg btn-success btn-group-justified" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(<App></App>, document.body);
