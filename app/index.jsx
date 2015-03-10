'use strict';

var session = {
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
        return session;
    },

    componentDidMount: function () {
        window.App = this;
    },

    render: function () {
        return (
            <div id="app">
                <Header status={this.state.status}></Header>
                <div className="flip-container">
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
                    <div className="glyphs">
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>;
                    </div>;
            } else {
                markup = 
                    <div className="glyphs">
                        <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </div>;
            }
        } else {
            markup = 
                <div className="glyphs">
                    <span className="glyphicon glyphicon-list" aria-hidden="true"></span>
                </div>;
        }

        return (
            <header>
                <span className="title">éllise</span>
                {markup}
            </header>
        );
    }
});

var FrontCard = React.createClass({
    render: function () {
        return (
            <div className="front">
                <div className="container-fluid">
                    <div className="jumbotron">
                        {this.props.lists.map(function (list) {
                            return (
                                <div className="btn-group btn-group-justified">
                                    <div className="btn-group select-list">
                                        <button type="submit" className="btn btn-lg btn-success">{list.name}</button>
                                    </div>
                                    <div className="btn-group delete-list">
                                        <button type="submit" className="btn btn-lg btn-danger">X</button>
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
            <div className="back">
                <div className="container-fluid">
                    <div className="jumbotron">
                        <form>
                            <div className="form-group">
                                <label for="username">Email</label>
                                <input id="email" type="email" className="form-control" placeholder="Enter Email" />
                            </div>

                            <div className="form-group">
                                <label for="password">Password</label>
                                <input id="password" type="password" className="form-control" placeholder="Enter Password" />
                            </div>

                            <button className="btn btn-lg btn-success btn-group-justified" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(<App></App>, document.body);
