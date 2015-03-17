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
    mixins: [ReactRouter.State, ReactRouter.Navigation],

    render: function () {
        console.log('~~~ current route', this.getPathname());
        var routeLogin = this.transitionTo.bind(this, 'login');
        var routeHome = this.transitionTo.bind(this, '/');
        var routeList = this.transitionTo.bind(this, 'list');
        var mainMenu = '';
        var user = '';

        if (!this.props.loggedIn && !this.isActive('/login')) {
            user = <span className="glyphicon glyphicon-user" aria-hidden="true" onClick={routeLogin)} />;
        }

        if (!this.isActive('/')) {
            mainMenu = <span className="glyphicon glyphicon-list" aria-hidden="true" onClick={routeHome} />;
        }

        return (
            <header>
                <span className="title">éllise</span>
                <div className="glyphs">
                    <span className="glyphicon glyphicon-plus" aria-hidden="true" onClick={routeList} />
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
    mixins: [ReactRouter.Navigation],

    render: function () {
        var routeItems = this.transitionTo.bind(this, 'items', list);
        var routeDelete = this.transitionTo.bind(this, 'delete', list);

        return (
            <div>
                {this.props.session.lists.map(function (list) {
                    return (
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group select-list">
                                <button type="submit" className="btn btn-lg btn-success" onClick={routeItems}>{list.name}</button>
                            </div>
                            <div className="btn-group delete-list">
                                <button type="submit" className="btn btn-lg btn-danger" onClick={routeDelete}>X</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
});

var LoginCard = React.createClass({
    mixins: [ReactRouter.Navigation],

    login: function () {
        // login logic
        this.transitionTo('/');
        return false;
    },

    render: function () {
        var login = this.login.bind(this);

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

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit" onClick={login}>Login</button>
                </form>
            </div>
        );
    }
});

var CreateListCard = React.createClass({
    mixins: [ReactRouter.Navigation],

    createList: function () {
        // create logic
        this.transitionTo('/');
        return false;
    },

    render: function () {
        var createList = this.createList.bind(this);

        return (
            <div>
                <h2>Create a List</h2>
                <form>
                    <div className="form-group">
                        <label for="list-name">List Name</label>
                        <input id="list-name" type="text" className="form-control" name="list-name" placeholder="Enter List Name" />
                    </div>

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit" onClick={createList}>Create</button>
                </form>
            </div>
        );
    }
});

var ItemsCard = React.createClass({
    mixins: [ReactRouter.Navigation],

    deleteItem: function (item) {
        return false;
    },

    render: function () {
        var deleteItem = this.deleteItem.bind(this, item);
        var routeEditItem = this.transitionTo.bind(this, 'edit-item');

        return (
            <div>
                {this.props.list.items.map(function (item) {
                    return (
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group select-list">
                                <button type="submit" className="btn btn-lg btn-success" onClick={routeEditItem}>{item.name}</button>
                            </div>
                            <div className="btn-group delete-list">
                                <button type="submit" className="btn btn-lg btn-danger" onClick={deleteItem}>X</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
});

var DeleteCard = React.createClass({
    mixins: [ReactRouter.Navigation],

    deleteItem: function () {
        // delete logic
        this.transitionTo('items');
        return false;
    },

    render: function () {
        var deleteItem = this.deleteItem.bind(this);
        var routeItems = this.transitionTo.bind(this, 'items');

        return (
            <div>
                <h2>Are You Sure You Want to Delete This List?</h2>
                <button className="btn btn-lg btn-success btn-group-justified" onClick={deleteItem}>Yes</button>
                <button className="btn btn-lg btn-success btn-group-justified" onClick={routeItems}>No</button>
            </div>
        );
    }
});

var EditItemCard = React.createClass({
    mixins: [ReactRouter.Navigation],

    updateItem: function () {
        // update logic
        this.transitionTo('items');
        return false;
    },

    render: function () {
        var updateItem = this.updateItem.bind(this);

        return (
            <div>
                <h2>Edit Item</h2>
                <form>
                    <div className="form-group">
                        <label for="item-name">List Name</label>
                        <input id="item-name" type="text" className="form-control" name="item-name" placeholder="{this.props.item.name}" />
                    </div>

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit" onClick={updateItem}>Update</button>
                </form>
            </div>
        );
    }
});

var NotFound = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Ruh Roh - 404</h2>
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
        <Route name="items" handler={ItemsCard} />
        <Route name="edit-item" handler={EditItemCard} />
        <Route name="delete" handler={DeleteCard} />
        <NotFoundRoute handler={NotFound} />
    </Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
});
