import Pretender from 'pretender';

export function getServer() {
  const server = new Pretender(function () {
    this.get('/api/users/0', () => [404]);

    this.get('/api/users/1', () => [
      200,
      {},
      {
        id: '1',
        type: 'user',
        attributes: {
          name: 'Albert Einstein',
          image: '/images/Einstein.jpg',
          value: 'false',
        },
      },
    ]);

    this.patch('/api/users/1', () => [204, {}]);
  });

  server.prepareBody = function (body) {
    return body ? JSON.stringify({ data: body }) : undefined;
  };

  server.prepareHeaders = function (headers) {
    headers['Content-Type'] = 'application/*+json';
  };

  return server;
}
