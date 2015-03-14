'use strict';

var session = {
    loggedIn: false,
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
                <Header />
                <Card session={this.state} />
            </div>
        );
    }
});

var Header = React.createClass({
    mixins: [ReactRouter.State],
    render: function () {
        console.log('~~~ current route', this.getPathname());
        var mainMenu = '';
        var user = '';

        if (!this.props.loggedIn && !this.isActive('/login')) {
            user = <span className="glyphicon glyphicon-user" aria-hidden="true"></span>;
        }

        if (!this.isActive('/')) {
            mainMenu = <span className="glyphicon glyphicon-list" aria-hidden="true"></span>;
        }

        return (
            <header>
                <span className="title">éllise</span>
                <div className="glyphs">
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    { mainMenu }
                    { user }
                </div>
            </header>
        );
    }
});

var Card = React.createClass({
    render: function () {
        return (
            <div className="flip-container">
                <div className="card">
                    <div className="container-fluid">
                        <div className="jumbotron">
                            <RouteHandler session={this.props.session} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var MainMenuCard = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.session.lists.map(function (list) {
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
        );
    }
});

var LoginCard = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label for="username">Email</label>
                        <input id="email" type="email" className="form-control" name="username" placeholder="Enter Email" />
                    </div>

                    <div className="form-group">
                        <label for="password">Password</label>
                        <input id="password" type="password" className="form-control" name="password" placeholder="Enter Password" />
                    </div>

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit">Login</button>
                </form>
            </div>
        );
    }
});

var CreateListCard = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Create a List</h2>
                <form>
                    <div className="form-group">
                        <label for="list-name">List Name</label>
                        <input id="list-name" type="text" className="form-control" name="list-name"placeholder="Enter List Name" />
                    </div>

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit">Create</button>
                </form>
            </div>
        );
    }
});

var NotFound = React.createClass({
    render: function () {
        return (
            <div>
                Ruh Roh - 404
            </div>
        );
    }
});

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var RouteHandler = ReactRouter.RouteHandler;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var routes = (
    <Route handler={App}>
        <DefaultRoute handler={MainMenuCard} />
        <Route name="login" handler={LoginCard} />
        <Route name="list" handler={CreateListCard} />
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
});
