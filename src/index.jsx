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
        var header = this;
        var mainMenu = '';
        var user = '';

        if (!this.props.loggedIn && !this.isActive('/login')) {
            user = <span className="glyphicon glyphicon-user" aria-hidden="true" onClick={header.transitionTo.call('login')} />;
        }

        if (!this.isActive('/')) {
            mainMenu = <span className="glyphicon glyphicon-list" aria-hidden="true" onClick={header.transitionTo.call('/')} />;
        }

        return (
            <header>
                <span className="title">éllise</span>
                <div className="glyphs">
                    <span className="glyphicon glyphicon-plus" aria-hidden="true" onClick={header.transitionTo.call('list')} />
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
        var mainMenu = this;

        return (
            <div>
                {this.props.session.lists.map(function (list) {
                    return (
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group select-list">
                                <button type="submit" className="btn btn-lg btn-success" onClick={mainMenu.transitionTo.call('items', list)}>{list.name}</button>
                            </div>
                            <div className="btn-group delete-list">
                                <button type="submit" className="btn btn-lg btn-danger" onClick={mainMenu.transitionTo.call('delete', list)}>X</button>
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
        var login = this;

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

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit" onClick={login.login.bind(login)}>Login</button>
                </form>
            </div>
        );
    }
});

var CreateListCard = React.createClass({
    mixins: [ReactRouter.Navigation],

    saveList: function () {
        // create logic
        this.transitionTo('/');
        return false;
    },

    render: function () {
        var createList = this;

        return (
            <div>
                <h2>Create a List</h2>
                <form>
                    <div className="form-group">
                        <label for="list-name">List Name</label>
                        <input id="list-name" type="text" className="form-control" name="list-name" placeholder="Enter List Name" />
                    </div>

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit" onClick={createList.saveList.bind(createList)}>Create</button>
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
        var list = this;

        return (
            <div>
                {this.props.list.items.map(function (item) {
                    return (
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group select-list">
                                <button type="submit" className="btn btn-lg btn-success" onClick={list.transitionTo.call('edit-item')}>{item.name}</button>
                            </div>
                            <div className="btn-group delete-list">
                                <button type="submit" className="btn btn-lg btn-danger" onClick={list.deleteItem.bind(list, item)}>X</button>
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
        var del = this;

        return (
            <div>
                <h2>Are You Sure You Want to Delete This List?</h2>
                <button className="btn btn-lg btn-success btn-group-justified" onClick={del.deleteItem.bind(del)}>Yes</button>
                <button className="btn btn-lg btn-success btn-group-justified" onClick={del.transitionTo.call('items')}>No</button>
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
        var editItem = this;

        return (
            <div>
                <h2>Edit Item</h2>
                <form>
                    <div className="form-group">
                        <label for="item-name">List Name</label>
                        <input id="item-name" type="text" className="form-control" name="item-name" placeholder="{this.props.item.name}" />
                    </div>

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit" onClick={editItem.updateItem.bind(editItem)}>Update</button>
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
