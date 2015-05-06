'use strict';

import {Header} from '../components/header';
import {Content} from '../components/content';
import {MainMenu} from '../components/mainMenu';
import {Login} from '../components/login';
import {CreateList} from '../components/createList';
import {List} from '../components/list';
import {DeleteList} from '../components/deleteList';
import {CreateItem} from '../components/createItem';
import {Item} from '../components/item';
import {NotFound} from '../components/notFound';


const DefaultRoute = ReactRouter.DefaultRoute;
const NotFoundRoute = ReactRouter.NotFoundRoute;
const Route = ReactRouter.Route;

const App = React.createClass({
    render () {
        return (
            <div id="app">
                <Header />
                <Content />
            </div>
        );
    }
});

const routes = (
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
