'use strict';

import {ForceFireLoginMixin} from '../mixins/forceFireLoginMixin';

export let CreateItem = React.createClass({
    mixins: [
        ForceFireLoginMixin
    ],

    getInitialState () {
        return {
            items: []
        };
    },

    componentWillMount () {
        const ref = new Firebase('https://elisse.firebaseio.com/lists/' + this.getParams().id + '/items/');
        this.bindAsArray(ref, 'items');
    },

    createItem (event) {
        this.firebaseRefs.items.push({
            name: event.target.querySelector('input').value
        });
        
        this.transitionTo('list', {id: this.getParams().id});

        event.preventDefault();
    },

    render () {
        const createItem = this.createItem.bind(this);

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
