'use strict';

export let Item = React.createClass({
    mixins: [
        ReactFireMixin,
        ReactRouter.Navigation,
        ReactRouter.State
    ],

    getInitialState () {
        return {
            item: {}
        }
    },

    componentWillMount () {
        const url = 
            'https://elisse.firebaseio.com/lists/' + this.getParams().listid +
            '/items/' + this.getParams().itemid;
        const ref = new Firebase(url);
        
        this.bindAsObject(ref, 'item');
    },

    saveItem (event) {
        this.firebaseRefs.item.set({
            name: event.target.querySelector('input').value
        });

        this.transitionTo('list', { id: this.getParams().listid });
        
        event.preventDefault();
    },

    render () {
        const saveItem = this.saveItem.bind(this);

        return (
            <div>
                <h2>Edit Item</h2>
                <form onSubmit={saveItem}>
                    <div className="form-group">
                        <label for="item-name">Item Name</label>
                        <input id="item-name" type="text" className="form-control" name="item-name" placeholder={this.state.item.name} />
                    </div>

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit">Update</button>
                </form>
            </div>
        );
    }
});
