'use strict';

var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

var App = React.createClass({
    render: function () {
        return (
            <div id="app">
                <Header />
                <Content />
            </div>
        );
    }
});

var Header = React.createClass({
    mixins: [ReactRouter.State],

    render: function () {
        var mainMenu = '';
        var user = '';

        if (!this.props.loggedIn && !this.isActive('/login')) {
            user = <Link className="glyphicon glyphicon-user" aria-hidden="true" to="login" />;
        }

        if (!this.isActive('/')) {
            mainMenu = <Link className="glyphicon glyphicon-list" aria-hidden="true" to="/" />;
        }

        return (
            <header>
                <Link className="title" to="/">éllise</Link>
                <div className="glyphs">
                    <Link className="glyphicon glyphicon-plus" aria-hidden="true" to="/list/create" />
                    { mainMenu }
                    { user }
                </div>
            </header>
        );
    }
});

var Content = React.createClass({
    mixins: [ReactRouter.State],

    render: function () {
        // react css transitions need a key to work
        // tie key to route name
        var name = this.getPathname();

        return (
            <div className="card">
                <div className="container-fluid">
                    <div className="jumbotron">
                        <ReactCSSTransitionGroup component="div" transitionName="fade" transitionLeave={false}>
                            <RouteHandler key={name} />
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        );
    }
});

var MainMenu = React.createClass({
    mixins: [ReactFireMixin],

    getInitialState: function () {
        return {
            lists: []
        };
    },

    componentWillMount: function () {
        var ref = new Firebase('https://elisse.firebaseio.com/lists/');
        this.bindAsObject(ref, 'lists');
    },

    convertToArray: function (firebaseObj) {
        var items = [];
        var key;

        for (key in firebaseObj) {
            items.push({
                id: key,
                name: firebaseObj[key].name
            });
        }

        return items;
    },

    render: function () {
        var lists = this.convertToArray(this.state.lists);

        return (
            <div>
                <Link to="list/create">
                    <button className="btn btn-lg btn-primary btn-group-justified">Create List</button>
                </Link>

                {lists.map(function (list) {
                    return (
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group select-list">
                                <Link to="list" params={{id: list.id}}>
                                    <button type="submit" className="btn btn-lg btn-success">{list.name}</button>
                                </Link>
                            </div>
                            <div className="btn-group delete-list">
                                <Link to="list/delete" params={{id: list.id}}>
                                    <button type="submit" className="btn btn-lg btn-danger">X</button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
});

var Login = React.createClass({
    mixins: [ReactRouter.Navigation],

    login: function (event) {
        // TODO login logic
        this.transitionTo('/');
        
        event.preventDefault();
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

var CreateList = React.createClass({
    mixins: [ReactRouter.Navigation],

    getInitialState: function () {
        return {
            name: ''
        };
    },

    componentWillMount: function () {
        this.firebaseRef = new Firebase('https://elisse.firebaseio.com/lists/');
    },

    componentWillUnmount: function () {
        this.firebaseRef.off();
    },

    createList: function (event) {
        this.firebaseRef.push({
            name: event.target.querySelector('input').value,
            items: []
        });
        
        this.transitionTo('/');

        event.preventDefault();
    },

    render: function () {
        var createList = this.createList.bind(this);

        return (
            <div>
                <h2>Create a List</h2>
                <form onSubmit={createList}>
                    <div className="form-group">
                        <label>List Name</label>
                        <input id="list-name" type="text" className="form-control" placeholder="List Name" />
                    </div>

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit">Create</button>
                </form>
            </div>
        );
    }
});

var List = React.createClass({
    mixins: [
        ReactFireMixin,
        ReactRouter.Navigation,
        ReactRouter.State
    ],

    getInitialState: function () {
        return {
            list: {},
        }
    },

    componentWillMount: function () {
        var ref = new Firebase('https://elisse.firebaseio.com/lists/' + this.getParams().id);
        this.bindAsObject(ref, 'list');
    },

    convertToArray: function (firebaseObj) {
        var items = [];
        var key;

        for (key in firebaseObj) {
            items.push({
                id: key,
                name: firebaseObj[key]
            });
        }

        return items;
    },

    deleteItem: function (item, event) {
        delete this.state.list.items[item.id];

        // inform firebase of the state update
        this.firebaseRefs.list.set(this.state.list);

        this.setState(this.state);

        event.preventDefault();
    },

    render: function () {
        var list = this;
        var listid = this.getParams().id;
        var items = this.convertToArray(this.state.list.items);

        return (
            <div>
                <h2>{this.state.list.name}</h2>

                <Link to="item/create" params={{id: listid}}>
                    <button className="btn btn-lg btn-primary btn-group-justified">Create Item</button>
                </Link>

                {items.map(function (item) {
                    var deleteItem = list.deleteItem.bind(list, item);

                    return (
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group select-list">
                                <Link to="item" params={{listid: listid, itemid: item.id}}>
                                    <button type="submit" className="btn btn-lg btn-success">{item.name}</button>
                                </Link>
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

var CreateItem = React.createClass({
    mixins: [
        ReactFireMixin,
        ReactRouter.Navigation,
        ReactRouter.State
    ],

    getInitialState: function () {
        return {
            items: []
        };
    },

    componentWillMount: function () {
        var ref = new Firebase('https://elisse.firebaseio.com/lists/' + this.getParams().id + '/items/');
        this.bindAsArray(ref, 'items');
    },

    createItem: function (event) {
        this.firebaseRefs.items.push({
            name: event.target.querySelector('input').value
        });
        
        this.transitionTo('list', {id: this.getParams().id});

        event.preventDefault();
    },

    render: function () {
        var createItem = this.createItem.bind(this);

        return (
            <div>
                <h2>Create an Item</h2>
                <form onSubmit={createItem}>
                    <div className="form-group">
                        <label>Item Name</label>
                        <input id="item-name" type="text" className="form-control" placeholder="Item Name" />
                    </div>

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit">Create</button>
                </form>
            </div>
        );
    }
});

var Item = React.createClass({
    mixins: [ReactRouter.Navigation, ReactRouter.State],

    getInitialState: function () {
        return {
            name: ''
        }
    },

    componentWillMount: function () {
        var url = 
            'https://elisse.firebaseio.com/lists/' + this.getParams().listid +
            '/items/' + this.getParams().itemid;

        this.firebaseRef = new Firebase(url);

        this.firebaseRef.on('child_added', function (data) {
            this.setState({ name: data.val() });
        }.bind(this));
    },

    componentWillUnmount: function () {
        this.firebaseRef.off();
    },

    saveItem: function (event) {
        this.firebaseRef.set({
            name: event.target.querySelector('input').value
        });

        this.transitionTo('list', { id: this.getParams().listid });
        
        event.preventDefault();
    },

    render: function () {
        var saveItem = this.saveItem.bind(this);

        return (
            <div>
                <h2>Edit Item</h2>
                <form onSubmit={saveItem}>
                    <div className="form-group">
                        <label for="item-name">Item Name</label>
                        <input id="item-name" type="text" className="form-control" name="item-name" placeholder={this.state.name} />
                    </div>

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit">Update</button>
                </form>
            </div>
        );
    }
});

var DeleteList = React.createClass({
    mixins: [ReactRouter.Navigation, ReactRouter.State],

    componentWillMount: function () {
        this.firebaseRef = new Firebase('https://elisse.firebaseio.com/lists/' + this.getParams().id);
    },

    componentWillUnmount: function () {
        this.firebaseRef.off();
    },

    deleteList: function (event) {
        this.firebaseRef.remove();

        this.transitionTo('/');
        
        event.preventDefault();
    },

    render: function () {
        var deleteList = this.deleteList.bind(this);

        return (
            <div>
                <h2>Are You Sure You Want to Delete This List?</h2>
                <button className="btn btn-lg btn-danger btn-group-justified" onClick={deleteList}>Yes</button>
                <Link to="/">
                    <button className="btn btn-lg btn-success btn-group-justified">No</button>
                </Link>
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

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={MainMenu} />
        <Route name="login" handler={Login} />
        <Route name="list/create" handler={CreateList} />
        <Route name="list" path="list/:id" handler={List} />
        <Route name="list/delete" path="list/:id/delete" handler={DeleteList} />
        <Route name="item/create" path="list/:id/item/create" handler={CreateItem} />
        <Route name="item" path="list/:listid/item/:itemid" handler={Item} />
        <NotFoundRoute handler={NotFound} />
    </Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
});
