import jwt from 'jsonwebtoken';
import mock from '../utils/mock';
import wait from '../utils/wait';

const JWT_SECRET = 'devias-top-secret-key';
const JWT_EXPIRES_IN = '2 days';

const users = [
  {
    id: '5e86809283e28b96d2d38537',
    avatar:
      'https://scontent.ftun4-1.fna.fbcdn.net/v/t1.6435-9/80248259_748693885616709_3916674247379910656_n.png?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=_mjFGtXaW8AAX8NytvG&tn=eRKxT-ywBNI_jLoX&_nc_ht=scontent.ftun4-1.fna&oh=00_AT91nnWP9WtHvuvdFh8vkwv3xaUh6hQDutiJ0B18VYwLTw&oe=6221735D',
    country: 'TN',
    email: 'demo@takiacademy.io',
    isPublic: true,
    name: 'Super Admin',
    password: 'Password123',
    phone: '+216 22013878',
    role: 'admin',
    state: 'Sousse',
    tier: 'Premium',
    admin_groups: [],
    roles: ["ROLE_ADMIN"],
  },
];

mock.onPost('/api/account/login').reply(async (config) => {
  try {
    await wait(1000);

    const { email, password } = JSON.parse(config.data);
    const user = users.find((_user) => _user.email === email);

    if (!user) {
      return [400, { message: 'Please check your email and password' }];
    }

    if (user.password !== password) {
      return [400, { message: 'Invalid password' }];
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return [
      200,
      {
        token,
        user: {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          admin_groups: user.admin_groups,
          roles: user.roles,
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/api/account/me').reply((config) => {
  try {
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);
    const user = users.find((_user) => _user.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [
      200,
      {
        user: {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          roles: user.roles,
          admin_groups: user.admin_groups,
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});
