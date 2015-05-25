'use strict';

import {ForceFireLoginMixin} from '../mixins/forceFireLoginMixin';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let RouteHandler = ReactRouter.RouteHandler;

export let Content = React.createClass({
    mixins: [
        ForceFireLoginMixin
    ],

    render () {
        // react css transitions need a key to work
        // tie key to route name
        const name = this.getPathname();

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
