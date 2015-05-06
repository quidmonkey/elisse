'use strict';

export let CreateList = React.createClass({
    mixins: [
        ReactFireMixin,
        ReactRouter.Navigation
    ],

    getInitialState () {
        return {
            lists: []
        };
    },

    componentWillMount () {
        const ref = new Firebase('https://elisse.firebaseio.com/lists/');
        this.bindAsArray(ref, 'lists');
    },

    createList (event) {
        this.firebaseRefs.lists.push({
            name: event.target.querySelector('input').value,
            items: []
        });
        
        this.transitionTo('/');

        event.preventDefault();
    },

    render () {
        const createList = this.createList.bind(this);

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
