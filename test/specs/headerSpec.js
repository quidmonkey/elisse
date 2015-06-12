'use strict';

import {Header} from '../../dev/components/header';
import {React} from 'react/react-with-addons';

var TestUtils = React.addons.TestUtils;

describe('Component: Header', () => {
    var component;

    beforeEach(() => {
        console.log('O Hai');
        component = TestUtils.renderIntoComponent(<Header />);
    });

    it('should contain a main menu link', () => {
        var markup = component.getDOMNode().textContent;
        console.log('~~~ markup', markup);
        expect(markup).toContain('<Link className="glyphicon glyphicon-list" aria-hidden="true" to="/" />');
    });
});
