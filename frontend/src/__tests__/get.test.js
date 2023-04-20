import axios from 'axios';
import App from '../App';

jest.mock("axios");

describe('App', () => {
    describe('getAllClasses', () => {
      it('should return the classes from the API', async () => {
        const classesData = [
          {
            id: 1,
            name: 'Class 1',
            color: { hex_code: '#000000' },
          },
          {
            id: 2,
            name: 'Class 2',
            color: { hex_code: '#ffffff' },
          },
        ];
        axios.get.mockResolvedValue({ data: classesData });
  
        const result = await App.getAllClasses();
  
        expect(result).toEqual(classesData);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/classes');
      });
    });
  });