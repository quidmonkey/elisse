'use strict';

const APP_KEY = 'elisse';
const ref = new Firebase('https://elisse.firebaseio.com');

export const ForceFireLoginMixin = {
    mixins: [
        ReactFireMixin,
        ReactRouter.Navigation,
        ReactRouter.State
    ],

    componentDidMount() {
        const credentials = localStorage.getItem(APP_KEY);

        if (credentials) {
            console.log('~~~ Credentials Found. Login not required.');

            ref.authWithPassword(
                JSON.parse(credentials),
                (err, authData) => {
                    if (err) {
                        console.error('~~~ Login Error', err);
                        this.transitionTo('login', {}, { redirect: this.getPath() });
                    } else {
                        console.log('~~~ Login Successful');
                    }
                }
            );
        } else {
            console.warn('~~~ Unable to Retrieve Credentials, Redirecting to Login');

            if (!this.isActive('login')) {
                this.transitionTo('login', {}, { redirect: this.getPath() });
            }
        }
    }  
};
