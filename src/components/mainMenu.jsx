'use strict';

import {ForceFireLoginMixin} from '../mixins/forceFireLoginMixin';

const Link = ReactRouter.Link;

export let MainMenu = React.createClass({
    mixins: [
        ForceFireLoginMixin
    ],

    getInitialState () {
        return {
            lists: []
        };
    },

    componentWillMount () {
        const ref = new Firebase('https://elisse.firebaseio.com/lists/');
        this.bindAsObject(ref, 'lists');
    },

    convertToArray (firebaseObj) {
        let items = [];
        let key;

        for (key in firebaseObj) {
            items.push({
                id: key,
                name: firebaseObj[key].name
            });
        }

        return items;
    },

    render () {
        const lists = this.convertToArray(this.state.lists);

        return (
            <div>
                <Link to="list/create">
                    <button className="btn btn-lg btn-primary btn-group-justified">Create List</button>
                </Link>

                {lists.map(list => {
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
