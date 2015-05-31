'use strict';

import {Config} from '../config';

const ref = new Firebase('https://elisse.firebaseio.com');

export let Login = React.createClass({
    mixins: [
        ReactRouter.Navigation,
        ReactRouter.State
    ],

    setInitialState () {
        return {
            email: '',
            password: ''
        };
    },

    componentDidUpdate (prevProps, prevState) {
        let queryParams = this.getQuery();
        let self = this;

        ref.authWithPassword(
            this.state,
            (err, authData) => {
                if (err) {
                    console.warn('~~~ Login Error. Attempting to create user...', err);
                    self.createUser();
                } else {
                    console.log('~~~ Login successful.');
                    localStorage.setItem(Config.appKey, JSON.stringify(self.state));
                    self.transitionTo(queryParams.redirect || '/');
                }
            }
        );
    },

    createUser () {
        let queryParams = this.getQuery();
        let self = this;

        ref.createUser(
            this.state,
            (err, authData) => {
                let msg;
                let el;

                if (err) {
                    if (err.code === 'EMAIL_TAKEN') {
                        console.error('~~~ Unable to create account, email already in use.');
                        msg = 'Unable to create account, email already in use.';
                    } else if (err.code === 'INVALID_EMAIL') {
                        console.error('~~~ Unable to create account, invalid email address.');
                        msg = 'Unable to create account, email already in use.';
                    } else {
                        console.error('~~~ Unable to create account.', err);
                        msg = 'Unable to create account.';
                    }

                    // invalidate form
                    el = document.querySelector('input[name=email]');
                    el.setCustomValidity(msg);

                    // show invalid form message
                    // older browsers require a click event
                    // to force the invalid form message
                    if ('reportValidity' in el) {
                        el.reportValidity();
                    } else {
                        el.click();
                    }
                } else {
                    console.log('~~~ User created successfully.', authData);
                    localStorage.setItem(Config.appKey, JSON.stringify(self.state));
                    self.transitionTo(queryParams.redirect || '/');
                }
            }
        );
    },

    login (event) {
        this.setState({
            email: event.target.querySelector('input[name=email]').value,
            password: event.target.querySelector('input[name=password]').value
        });

        event.preventDefault();
    },

    render () {
        const login = this.login.bind(this);

        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={login}>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input id="email" type="email" className="form-control" name="email" placeholder="Enter Email" required />
                    </div>

                    <div className="form-group">
                        <label for="password">Password</label>
                        <input id="password" type="password" className="form-control" name="password" placeholder="Enter Password" required />
                    </div>

                    <button className="btn btn-lg btn-success btn-group-justified" type="submit">Login</button>
                </form>
            </div>
        );
    }
});
