import SignUp from '../signup';
import axios from 'axios';

beforeEach(() => {
    jest.mock('axios');
    axios.get = jest.fn().mockResolvedValue({ data: '' });
    axios.post = jest.fn().mockResolvedValue('');
  });

it('should post users', () => {
    const user = {
        'username': 'testUserName',
        'type': 'testType',
        'is_active': true,
        'is_superuser': false,
        'password': 'testPassword',
        'password_hash': 'testPassword_Hash',


    };
})