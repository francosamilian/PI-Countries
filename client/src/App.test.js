import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import isReact from 'is-react';
import CreateActivity from '../src/components/CreateActivity';
import SearchBar from './components/SearchBar';
import * as data from '../../api/src/db.js';
import * as actions from '../src/actions';

configure({ adapter: new Adapter() })

describe('<SearchBar/>', () => {
  const state = { activities: data.activities };
  const mockStore = configureStore([thunk]);
  // const { CREATE_PRODUCT } = actions;

  beforeAll(() => expect(isReact.classComponent(SearchBar)).toBeFalsy());

  describe('Formulario de creación de actividad', () => {
     let searchBar;
     let store = mockStore(state);
     beforeEach(() => {
      searchBar = mount(
           <Provider store={store}>
              <MemoryRouter initialEntries={['/activities']}>
                 <SearchBar />
              </MemoryRouter>
           </Provider>,
        );
     });
     it('Debe renderizar un formulario', () => {
        expect(searchBar.find('form').length).toBe(1);
     });
     it('Debe renderizar un input para con la propiedad "name" igual a "input', () => {
        expect(searchBar.find('input[name="input"]').length).toBe(1);
     });
     it('Debe renderizar un input de tipo sumbit para con la propiedad "name" igual a "difficulty"', () => {
        expect(searchBar.find('input[name="btn"]').length).toBe(1);
        expect(searchBar.find('input[type="submit"]').length).toBe(1);
     });
  });
});