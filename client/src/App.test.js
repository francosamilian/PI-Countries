import { render, screen } from '@testing-library/react';
import App from './App';
import CreateActivity from './components/CreateActivity';
import React from 'react';
import configureStore from 'redux-mock-store';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('<CreateActivity/>', () => {
  const state = { activities: activities };
  const mockStore = configureStore([thunk]);
  // const { CREATE_PRODUCT } = actions;

  beforeAll(() => expect(React.classComponent(CreateActivity)).toBeFalsy());

  describe('Formulario de creación de actividad', () => {
     let createActivity;
     let store = mockStore(state);
     beforeEach(() => {
      createActivity = mount(
           <Provider store={store}>
              <MemoryRouter initialEntries={['/activities']}>
                 <CreateActivity />
              </MemoryRouter>
           </Provider>,
        );
     });

     it('Debe renderizar un formulario', () => {
        expect(createActivity.find('form').length).toBe(1);
     });

     it('Debe renderizar un label para el nombre con el texto "Name: "', () => {
        expect(createActivity.find('label').at(0).text()).toEqual('Name: ');
     });

     it('Debe renderizar un input para con la propiedad "name" igual a "name', () => {
        expect(createActivity.find('input[name="name"]').length).toBe(1);
     });

     it('Debe renderizar un label para la dificultad con el texto "Difficulty: "', () => {
        expect(createActivity.find('label').at(1).text()).toBe('Difficulty: ');
     });

     it('Debe renderizar un input de tipo number para con la propiedad "name" igual a "difficulty"', () => {
        expect(createActivity.find('input[name="difficulty"]').length).toBe(1);
        expect(createActivity.find('input[type="number"]').length).toBe(2);
     });
     it('Debe renderizar un label para la descripción con el texto "Description:', () => {
        expect(createProduct.find('label').at(2).text()).toBe('Description: ');
     });
     it('Debe renderizar un textarea con la propiedad name igual a "description"', () => {
        expect(createProduct.find('textarea[name="description"]').length).toBe(
           1,
        );
     });

     it('Debe renderizar in label para el stock con el texto "Stock: "', () => {
        expect(createProduct.find('label').at(3).text()).toEqual('Stock: ');
     });
     it('Debe renderizar un input de tipo number para con la propiedad "name" igual a "stock', () => {
        expect(createProduct.find('input[name="stock"]').length).toBe(1);
        expect(createProduct.find('input[type="number"]').length).toBe(2);
     });

     it('Debería renderizar un input de button submit y con texto "Create Product"', () => {
        expect(createProduct.find('button[type="submit"]').length).toBe(1);
        expect(createProduct.find('button[type="submit"]').text()).toBe(
           'Create Product',
        );
     });
  });
});