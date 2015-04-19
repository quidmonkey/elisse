'use strict';

var session = {
    loggedIn: false,
    lists: [
        {
            id: 1,
            name: 'Target',
            items: TargetItems
        },
        {
            id: 2,
            name: 'Trader Joes',
            items: []
        }
    ]
};

var TargetItems = [
    {
        id: 1,
        name: 'Laundry Detergent'
    },
    {
        id: 2,
        name: 'Bananas'
    },
    {
        id: 3,
        name: 'Trash Bags'
    },
    {
        id: 4,
        name: 'Milk'
    }
];

var App = React.createClass({
    componentDidMount: function () {
        window.App = this;
    },

    render: function () {
        return (
            <div id="app">
                <Header />
                <Card />
            </div>
        );
    }
});

var Header = React.createClass({
    mixins: [ReactRouter.Navigation, ReactRouter.State],

    render: function () {
        console.log('~~~ current route', this.getPathname());
        var routeLogin = this.transitionTo.bind(this, 'login');
        var routeHome = this.transitionTo.bind(this, '/');
        var routeList = this.transitionTo.bind(this, 'list');
        var mainMenu = '';
        var user = '';

        if (!this.props.loggedIn && !this.isActive('/login')) {
            user = <a className="glyphicon glyphicon-user" aria-hidden="true" href="/login" />;
        }

        if (!this.isActive('/')) {
            mainMenu = <a className="glyphicon glyphicon-list" aria-hidden="true" href="/" />;
        }

        return (
            <header>
                <a className="title" href="/">éllise</a>
                <div className="glyphs">
                    <a className="glyphicon glyphicon-plus" aria-hidden="true" href="/list" />
                    { mainMenu }
                    { user }
                </div>
            </header>
        );
    }
});

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Card = React.createClass({
    render: function () {
        return (
            <div className="flip-container">
                <div className="card">
                    <div className="container-fluid">
                        <div className="jumbotron">
                            <ReactCSSTransitionGroup transitionName="flip">
                                <RouteHandler session={this.props.session} />
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var MainMenuCard = React.createClass({
    mixins: [ReactRouter.Navigation],

    getInitialState: function () {
        return {
            lists: []
        };
    },

    componentWillMount: function () {
        this.firebaseRef = new Firebase('https://elisse.firebaseio.com/lists/');
        this.firebaseRef.on('child_added', function (dataSnapshot) {
            this.state.lists.push({
                id: dataSnapshot.key(),
                name: dataSnapshot.val().name
            });
            this.setState(this.state);
        }.bind(this));
    },

    componentWillUnmount: function () {
        this.firebaseRef.off();
    },

    routeDelete: function (list) {
        console.log('~~~ routeDelete');
        this.transitionTo('list/delete', {id: list.id});
    },

    routeList: function (list) {
        console.log('~~~ routeList', list);
        this.transitionTo('list', {id: list.id});
    },

    render: function () {
        var mainMenu = this;
        var routeCreate = this.transitionTo.bind(this, 'list/create');

        return (
            <div>
                <button className="btn btn-lg btn-primary btn-group-justified" onClick={routeCreate}>Create List</button>

                {this.state.lists.map(function (list) {
                    var routeDelete = mainMenu.routeDelete.bind(mainMenu, list);
                    var routeList = mainMenu.routeList.bind(mainMenu, list);

                    return (
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group select-list">
                                <button type="submit" className="btn btn-lg btn-success" onClick={routeList}>{list.name}</button>
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

    getInitialState: function () {
        return {
            name: ''
        };
    },

    componentWillMount: function () {
        this.firebaseRef = new Firebase('https://elisse.firebaseio.com/lists/');
        this.value = '';
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

var ListCard = React.createClass({
    mixins: [ReactRouter.Navigation, ReactRouter.State],

    getInitialState: function () {
        return {
            name: '',
            items: []
        }
    },

    componentWillMount: function () {
        this.firebaseRef = new Firebase('https://elisse.firebaseio.com/lists/' + this.getParams().id);
        this.firebaseRef.on('value', function (res) {
            console.log('~~~ list card res', res);
        }.bind(this));
    },

    componentWillUnmount: function () {
        this.firebaseRef.off();
    },

    deleteItem: function (item) {
        console.log('~~~ deleteItem', item);

        var index = this.state.items.indexOf(item);

        this.state.items.splice(index, 1);

        this.firebaseRef.update(this.state);

        this.setState(this.state);

        return false;
    },

    routeItem: function (item) {
        console.log('~~~ routeItem', item);

        var id = item ? item.id : '';

        this.transitionTo('item', {id: id});

        return false;
    },

    render: function () {
        var list = this;
        var routeItem = this.routeItem.bind(this);

        return (
            <div>
                <button className="btn btn-lg btn-primary btn-group-justified" onClick={routeItem}>Create Item</button>

                {this.state.items.map(function (item) {
                    var deleteItem = list.deleteItem.bind(list, item);
                    var routeItem = list.routeItem.bind(list, item);

                    return (
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group select-list">
                                <button type="submit" className="btn btn-lg btn-success" onClick={routeItem}>{item.name}</button>
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

    componentWillMount: function () {
        this.firebaseRef = new Firebase('https://elisse.firebaseio.com/lists/' + this.getParmas().id);
    },

    componentWillUnmount: function () {
        this.firebaseRef.off();
    },

    deleteList: function () {
        this.firebaseRef.remove();
        this.transitionTo('/');
        return false;
    },

    render: function () {
        var deleteList = this.deleteList.bind(this);
        var routeHome = this.transitionTo.bind(this, '/');

        return (
            <div>
                <h2>Are You Sure You Want to Delete This List?</h2>
                <button className="btn btn-lg btn-success btn-group-justified" onClick={deleteList}>Yes</button>
                <button className="btn btn-lg btn-success btn-group-justified" onClick={routeHome}>No</button>
            </div>
        );
    }
});

var ItemCard = React.createClass({
    mixins: [ReactRouter.Navigation],

    saveItem: function () {
        // update logic
        this.transitionTo('items');
        return false;
    },

    render: function () {
        var saveItem = this.saveItem.bind(this);

        return (
            <div>
                <h2>Edit Item</h2>
                <form>
                    <div className="form-group">
                        <label for="item-name">Item Name</label>
                        <input id="item-name" type="text" className="form-control" name="item-name" placeholder="{this.props.item.name}" />
                    </div>

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit" onClick={saveItem}>Update</button>
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
        <Route name="list/create" handler={CreateListCard} />
        <Route name="list" path=":id" handler={ListCard} />
        <Route name="item" path=":id" handler={ItemCard} />
        <Route name="list/delete" path=":id" handler={DeleteCard} />
        <NotFoundRoute handler={NotFound} />
    </Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
});
