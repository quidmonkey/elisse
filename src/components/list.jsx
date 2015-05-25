'use strict';

import {ForceFireLoginMixin} from '../mixins/forceFireLoginMixin';

const Link = ReactRouter.Link;

export let List = React.createClass({
    mixins: [
        ForceFireLoginMixin
    ],

    getInitialState () {
        return {
            list: {},
        };
    },

    componentWillMount () {
        const ref = new Firebase('https://elisse.firebaseio.com/lists/' + this.getParams().id);
        console.log('~~~ user', ref.getAuth());
        this.bindAsObject(ref, 'list');
    },

    convertToArray (firebaseObj) {
        let items = [];
        let key;

        for (key in firebaseObj) {
            items.push({
                id: key,
                name: firebaseObj[key]
            });
        }

        return items;
    },

    deleteItem (item, event) {
        delete this.state.list.items[item.id];

        // inform firebase of the state update
        this.firebaseRefs.list.set(this.state.list);

        this.setState(this.state);

        event.preventDefault();
    },

    render () {
        const list = this;
        const listid = this.getParams().id;
        const items = this.convertToArray(this.state.list.items);

        return (
            <div>
                <h2>{this.state.list.name}</h2>

                <Link to="item/create" params={{id: listid}}>
                    <button className="btn btn-lg btn-primary btn-group-justified">Create Item</button>
                </Link>

                {items.map(item => {
                    let deleteItem = list.deleteItem.bind(list, item);

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
