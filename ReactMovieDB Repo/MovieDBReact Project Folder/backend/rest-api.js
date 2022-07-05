const passwordEncryptor = require('./passwordEncryptor');
const acl = require('./acl');
const specialRestRoutes = require('./special-rest-routes.js');
const { mutateExecOptions } = require('nodemon/lib/config/load');
const res = require('express/lib/response');
const req = require('express/lib/request');
const userTable = 'customers';

let db;

function runMyQuery(
  req,
  res,
  parameters,
  sqlForPreparedStatement,
  onlyOne,
  withResponse = true
) {
  let result;

  try {
    let stmt = db.prepare(sqlForPreparedStatement);
    let method =
      sqlForPreparedStatement.trim().toLowerCase().indexOf('select') === 0
        ? 'all'
        : 'run';
    result = stmt[method](parameters);
  } catch (error) {
    result = { _error: error + '' };
  }
  if (onlyOne) {
    result = result[0];
  }
  result = result || null;

  if (withResponse) {
    res.status(result ? (result._error ? 500 : 200) : 404);
    setTimeout(() => res.json(result), 1);
  } else {
    return result;
  }
}

function runQuery(
  tableName,
  req,
  res,
  parameters,
  sqlForPreparedStatement,
  onlyOne = false
) {
  /*
  if (!acl(tableName, req)) {
    res.status(403);
    res.json({ _error: 'Not allowed!' });
    return;
  } */

  let result;
  try {
    let stmt = db.prepare(sqlForPreparedStatement);
    let method =
      sqlForPreparedStatement.trim().toLowerCase().indexOf('select') === 0
        ? 'all'
        : 'run';
    result = stmt[method](parameters);
  } catch (error) {
    result = { _error: error + '' };
  }
  if (onlyOne) {
    result = result[0];
  }
  result = result || null;
  res.status(result ? (result._error ? 500 : 200) : 404);
  setTimeout(() => res.json(result), 1);
}

module.exports = function setupRESTapi(app, databaseConnection) {
  db = databaseConnection;

  let tablesAndViews = db
    .prepare(
      `
    SELECT name, type 
    FROM sqlite_schema
    WHERE 
      (type = 'table' OR type = 'view') 
      AND name NOT LIKE 'sqlite_%'
  `
    )
    .all();

  app.get('/api/getAllReviewsForMovie/:movieName', (req, res) => {
    try {
      let allReviewsRequest = db.prepare(
        `SELECT * FROM Review WHERE movieName = :movieName`
      );
      let movieReviewsResult = allReviewsRequest.all({
        movieName: req.params['movieName']
      });
      res.status(200);
      res.json(movieReviewsResult);
    } catch (e) {}
  })

  app.post('/api/postNewReview/:movieName', (req, res) => {
    try {
      if (!(req.session.user)) {
        throw 'Have to be logged in for that.';
      }

      let newReview = db.prepare(
        `INSERT INTO Review (id, author, content, rating, movieName) VALUES (NULL, :author, :content, :rating, :movieName)`
      );

      let createNewReviewResult = newReview.run({
        author: req.session.user,
        content: req.body.content,
        rating: req.body.rating,
        movieName: req.params['movieName']
      });
      
    }
    catch (e) {
      console.log(e);
    }
  })

  function seeIfIAmLoggedIn(req) {
    return req.session.user != null;
  }

  app.post('/api/makeNewArticle', (req, res) => {
    try {
      if (!seeIfIAmLoggedIn(req)) {
        throw 'Have to be logged in for that.';
      }
      let newArticle = db.prepare(`
        INSERT INTO Movie (id, title, imageURL, firstTag, secondTag, thirdTag, firstActor, secondActor, thirdActor, fourthActor, fifthActor, firstRole, secondRole, thirdRole, fourthRole, fifthRole, Rating, ageRating, summary, author) VALUES (NULL, :title, :imageURL, :firstTag, :secondTag, :thirdTag, :firstActor, :secondActor, :thirdActor, :fourthActor, :fifthActor, :firstRole, :secondRole, :thirdRole, :fourthRole, :fifthRole, :Rating, :ageRating, :summary, :author)
      `);

      let articleResult = newArticle.run({
        title: req.body.title,
        imageURL: req.body.imageURL,
        firstTag: req.body.firstTag,
        secondTag: req.body.secondTag,
        thirdTag: req.body.thirdTag,
        firstActor: req.body.firstActor,
        secondActor: req.body.secondActor,
        thirdActor: req.body.thirdActor,
        fourthActor: req.body.fourthActor,
        fifthActor: req.body.fifthActor,
        firstRole: req.body.firstRole,
        secondRole: req.body.secondRole,
        thirdRole: req.body.thirdRole,
        fourthRole: req.body.fourthRole,
        fifthRole: req.body.fifthRole,
        Rating: req.body.Rating,
        ageRating: req.body.ageRating,
        summary: req.body.summary,
        author: req.body.author
      });
      res.status(200);
      res.json('Created a new Article')
    }
    catch (e) {
      console.log(e);
      res.status(500);
      res.json('Something went wrong');
    }
  });

  app.get('/api/getInfoForMovie/:title', (req, res) => {
    try {
      let relevantGroup = db.prepare(
        `SELECT * FROM Movie WHERE Movie.title = :title`
      );
      let relevantMovie = relevantGroup.all({
        title: req.params['title'],
      })[0];
      res.status(200);
      res.json(relevantMovie);
    } catch (e) {
      res.status(403);
      console.log(e);
      res.json('Found no movie by that name');
    }
  });

  app.get('/api/getAllArticles', (req, res) => {
    let allArticles = db.prepare(`SELECT * FROM Movie`);
    let result = allArticles.all();
    res.json(result);
  })

  app.get('/api/getSearchedForArticle/:articleName', (req, res) => {
    const param = '%' + req.params['articleName'] + '%';
    let searchResult = db.prepare(`SELECT * FROM Movie WHERE Movie.title LIKE '` + param + `'`);
    let myResult = searchResult.all()
    res.json(myResult);
  })

  app.get('/api/getMyArticles/:author', (req, res) => {
    try {
      if (!seeIfIAmLoggedIn(req)) {
        throw 'Have to be logged in for that.';
      }

      let relevantReviews = db.prepare(
        `SELECT * FROM Movie WHERE Movie.author = :author`
      );
      let myArticles = relevantReviews.all({
        author: req.params['author'],
      });

      res.json(myArticles);
    }
    catch (e) {
      console.log(e);
    }
  })

  app.post('/api/registerNewUser', (req, res) => {
    try {
      let newUser = db.prepare(`
      INSERT INTO users (id, role, blocked, profileimage, username, password, lastChangedPassword) VALUES (NULL, 'user', 0, :profileimage, :username, :password, :lastChangedPassword)
    `);
      newUser.run({
        profileimage: req.body.profileimage,
        username: req.body.username,
        password: passwordEncryptor(req.body.password),
        lastChangedPassword: Date.now(),
      });
      res.status(200);
      res.json('Made a new user.');
    } catch (e) {
      res.status(403);
      res.json('Something went wrong');
    }
  });

  app.get('/api/loggedInUsersUsername', (req, res) => {
    if (req.session.user) {
      res.status(200);
      res.json(req.session.user);
    } else {
      res.status(200);
      res.json(null);
    }
  });

  app.get('/api/getUserInfo/:username', (req, res) => {
    try {
      if (!seeIfIAmLoggedIn(req)) {
        throw 'Have to be logged in for that.';
      }
      res.status(200);
      runMyQuery(
        req,
        res,
        req.params,
        `
        SELECT blocked, profileImage, username
        FROM users
        WHERE username = :username
        `,
        true
      );
    } catch (e) {
      res.status(403);
      if (e == 'Have to be logged in for that.') {
        res.json('Have to be logged in for that action.');
      } else {
        res.json('Something went wrong.');
      }
    }
  });

  app.get('/api/whoAmI', (req, res) => {
    console.log(req.session);
    res.json(req.session.user);
  });

  specialRestRoutes(app, runQuery, db);

  app.all('/api/*', (req, res) => {
    res.status(404);
    res.json({ _error: 'No such route!' });
  });

  app.use((error, req, res, next) => {
    if (error) {
      let result = {
        _error: error + '',
      };
      res.json(result);
    } else {
      next();
    }
  });
};
