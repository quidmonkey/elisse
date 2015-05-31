'use strict';

import {ForceFireLoginMixin} from '../mixins/forceFireLoginMixin';

const Link = ReactRouter.Link;

export let DeleteList = React.createClass({
    mixins: [
        ForceFireLoginMixin
    ],

    componentWillMount () {
        const ref = new Firebase('https://elisse.firebaseio.com/lists/' + this.getParams().id);

        this.bindAsObject(ref, 'list');
    },

    deleteList (event) {
        this.firebaseRefs.list.remove();

        this.transitionTo('/');

        event.preventDefault();
    },

    render () {
        const deleteList = this.deleteList.bind(this);

        return (
            <div>
                <h2>{this.state.list.name}</h2>
                <h4>Are You Sure You Want to Delete This List?</h4>
                <button className="btn btn-lg btn-danger btn-group-justified" onClick={deleteList}>Yes</button>
                <Link to="/">
                    <button className="btn btn-lg btn-success btn-group-justified">No</button>
                </Link>
            </div>
        );
    }
});
