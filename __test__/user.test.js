import User from '../src/user.js';

test('User', () => {
  const user = new User();
  expect(user).toBeInstanceOf(Object);
});
