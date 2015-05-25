'use strict';

const Link = ReactRouter.Link;

export let Header = React.createClass({
    mixins: [
        ReactRouter.State
    ],

    render () {
        let createList = '';
        let mainMenu = '';
        let user = '';

        if (!this.isActive('list/create')) {
            createList = <Link className="glyphicon glyphicon-plus" aria-hidden="true" to="/list/create" />;
        }

        if (!this.isActive('login')) {
            user = <Link className="glyphicon glyphicon-user" aria-hidden="true" to="login" />;
        }

        if (!this.isActive('/')) {
            mainMenu = <Link className="glyphicon glyphicon-list" aria-hidden="true" to="/" />;
        }

        return (
            <header>
                <Link className="title" to="/">éllise</Link>
                <div className="glyphs">
                    { createList }
                    { mainMenu }
                    { user }
                </div>
            </header>
        );
    }
});
