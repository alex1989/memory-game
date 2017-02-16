import React from 'react';
import { shallow } from 'enzyme';
import ScoreTable from './score-table';

jest.useFakeTimers();

describe('ScoreTable.jsx', () => {
    it('should contain results', () => {
        const results = [{username: 'Joe', turns: 10}];
        const app = shallow(<ScoreTable results={results}/>);

        expect(app.contains(<td>Joe</td>)).toEqual(true);
    });
});