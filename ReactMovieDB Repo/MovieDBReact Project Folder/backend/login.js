const session = require('express-session');
const store = require('better-express-store');
const acl = require('./acl');
const passwordEncryptor = require('./passwordEncryptor');

module.exports = function (app, db) {
  app.use(
    session({
      secret: 'someUnusualStringThatIsUniqueForThisProject',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: 'auto',
        maxAge: 2 * 60 * 60 * 1000,
      },
      store: store({ dbPath: './database/musicforum.db' }),
    })
  );

  app.get('/api/login', (req, res) => {
    res.json(req.session.user || null);
  });

  app.delete('/api/logout', (req, res) => {
    delete req.session.user;
    res.json('Logged out');
  });

  app.post('/api/login', (req, res) => {
    try {
      req.body.password = passwordEncryptor(req.body.password);

      let stmt = db.prepare(`
      SELECT * FROM users
      WHERE username = :username AND password = '${req.body.password}'
    `);

      let relevantReviews = db.prepare(
        `SELECT * FROM users WHERE users.username = :username AND users.password = :password`
      );
      let result = relevantReviews.all({
        username: req.body.username,
        password: req.body.password,
      });

      /* Current Date reformatting to count days differential */
      let currentDate = new Date();
      let purged = currentDate.toLocaleDateString().replace('/', '');

      purged = purged.replace('/', '');

      let toBuild =
        purged.substring(purged.length - 4) +
        currentDate.toLocaleDateString().substring(2, 5).replace('/', '');

      let toCheck = purged.substring(0, 2);
      if (toCheck >= 10 && toCheck <= 12) {
        toBuild += purged.substring(0, 2);
      } else {
        toBuild += '0' + purged.substring(0, 1);
      }

      /* Last Changed date reformatting to count days differential */
      let myDate = new Date(result.lastChangedPassword);
      let myDatePurged = myDate.toLocaleDateString().replace('/', '');

      myDatePurged = myDatePurged.replace('/', '');

      let lastChangedToBuild =
        myDatePurged.substring(myDatePurged.length - 4) +
        currentDate.toLocaleDateString().substring(2, 5).replace('/', '');

      let toCheckLastChanged = myDatePurged.substring(0, 2);
      if (toCheckLastChanged >= 10 && toCheckLastChanged <= 12) {
        lastChangedToBuild += myDatePurged.substring(0, 2);
      } else {
        lastChangedToBuild += '0' + myDatePurged.substring(0, 1);
      }

      if (toBuild - lastChangedToBuild >= 22) {
        result.needToUpdate =
          'You last changed your password more than 21 days ago. You must update it.';
      }

      let insertIntoSession = db.prepare(`
      INSERT INTO activeSession (id, userId) VALUES (NULL, :userId)
    `);
      insertIntoSession.run({ userId: result.id });

      //encrypt text in the cookie text
      delete result.password;
      delete result.lastChangedPassword;

      req.session.user = req.body.username;

      res.json(req.session.user);
    } catch (e) {
      console.log(e);
      res.json('Something went wrong');
    }
  });
};
