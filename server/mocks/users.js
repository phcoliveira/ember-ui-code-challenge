'use strict';

const delay = process.env.NODE_ENV === 'dev' ? 300 : 1;

module.exports = function (app) {
  const express = require('express');
  let usersRouter = express.Router();

  /*
    catches the Update request on a user
    PATCH "localhost:4200/api/users/1"
  */
  usersRouter.patch('/:id', async function (request, res) {
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });

    const user = usersJson.data.find((user) => {
      return user.id === request.params.id;
    });

    if (user) {
      const { attributes } = request.body;
      Object.assign(user, attributes);

      res.status(204);
      res.send();
    }

    res.status(404);
    res.send();
  });

  /*
    catches the GET request on a user
    GET "localhost:4200/api/users/1"
  */
  usersRouter.get('/:id', function (request, res) {
    const user = usersJson.data.find((user) => {
      return user.id === request.params.id;
    });

    if (user) {
      res.send({ data: user });
    }

    res.status(404);
    res.send();
  });

  /*
    catches the index request on users
    GET "localhost:4200/api/users"
  */
  usersRouter.get('/', function (req, res) {
    res.send(usersJson);
  });

  app.use(
    '/api/users',
    require('body-parser').json({ type: 'application/*+json' }),
    usersRouter
  );
};

// USER MOCK DATA
const usersJson = {
  data: [
    {
      id: '1',
      type: 'user',
      attributes: {
        name: 'Albert Einstein',
        image: '/images/Einstein.jpg',
        value: 'false',
      },
    },
    {
      id: '2',
      type: 'user',
      attributes: {
        name: 'Walt Disney',
        image: '/images/Walt.jpg',
        value: 'false',
      },
    },
    {
      id: '3',
      type: 'user',
      attributes: {
        name: 'Bruce Lee',
        image: '/images/Bruce.jpg',
        value: 'false',
      },
    },
    {
      id: '4',
      type: 'user',
      attributes: {
        name: 'Neil Armstrong',
        image: '/images/Neil.jpg',
        value: 'false',
      },
    },
  ],
};
