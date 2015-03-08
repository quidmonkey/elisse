'use strict';

var React = require('react');

var App = React.createClass({
    render: function () {
        return (
            <Header></Header>
            <Card></Card>
        );
    }
});

var Header = React.createClass({
    render: function () {
        var markup;

        if (this.state.mainMenu) {
            if (this.state.loggedIn) {
                markup = <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>;
            } else {
                markup = <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                         <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>;
            }
        } else {
            markup = <span class="glyphicon glyphicon-list" aria-hidden="true"></span>;
        }

        return (
            <header>
                <span class="title">éllise</span>
                {markup}
            </header>
        );
    }
});

var Card = React.createClass({
    render: function () {
        return (
            <div class="flip-container">
                <div class="front">
                    <div class="container-fluid">
                        <div class="jumbotron">
                            <FrontFace></FrontFace>
                        </div>
                    </div>
                </div>

                <div class="back">
                    <div class="container-fluid">
                        <div class="jumbotron">
                            <BackFace></BackFace>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var FrontFace = React.createClass({
    render: function () {
        return (
            
        );
    }
});

var BackFace = React.createClass({
    render: function () {
        return (
            
        );
    }
});

React.render(<App></App>, document.body);
