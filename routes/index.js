var express = require('express');
var router = express.Router();
const session = require('express-session');


router.use(session({
  secret: "process.env.ACCESS_TOKEN_SECRET", // Replace with your own secret key
  resave: true,
  saveUninitialized: true,
}));



const logSessionData = (req, res, next) => {
  console.log('Session data:', req.session);
  next();
};
router.use(logSessionData);
router.post('/login', async (req, res, next) => {
  try {
    const { username, password, rememberMe } = req.body;
    console.log('Request Body:', req.body);

    // Your authentication logic here...
    if (username === 'admin' && password === '123') {
      req.session.username = username;
      req.session.rememberMe = rememberMe;
      req.session.successMessage = 'Login successful';
      req.session.textMessage = 'Hello, this is a demo admin';
      req.session.save((err) => {
        if (err) {
          console.error('Error saving session:', err);
          res.status(500).json({ error: 'Server error' });
        } else {
          console.log('Session data after save:', req.session.id);
          res.status(201).json({ message: 'Login successful' });
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



const isAuthenticated = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.redirect('/pages-login');
  }
};



router.get('/check-session', isAuthenticated, (req, res) => {
  if (req.session.username) {
    // Session is set
    res.json({ message: 'Session is set', username: req.session.username });
    console.log({ message: 'Session is set', username: req.session.username })
  } else {
    // Session is not set
    res.json({ message: 'Session is not set' });
    console.log({ message: 'Session is not set' })
  }
});

router.post('/logout', (req, res) => {
  // console.log('Received logout request'); // Add this line for debugging
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Server error' });
    } else {
      // Respond with JSON instead of rendering a view
      res.json({ message: 'Logout successful' });
      console.log({ message: 'Logout successful' })
      console.log({ 'mess': req.session })
    }
  });
});


router.get('/', isAuthenticated, (req, res) => {
  res.render('index', { title: 'Dashboard', currentRoute: req.url });
});

router.get('/admin_role', isAuthenticated, (req, res) => {
  res.render('admin_role', { title: 'Admin Role', currentRoute: req.url });
});

router.get('/player', isAuthenticated, (req, res) => {
  res.render('player', { title: 'Player Master', currentRoute: req.url });
});

router.get('/Lobbies', isAuthenticated, (req, res) => {
  res.render('Lobbies', { title: 'Lobbies', currentRoute: req.url });
});

router.get('/entryfees', isAuthenticated, (req, res) => {
  res.render('entryfees', { title: 'Entryfees', currentRoute: req.url });
});

router.get('/users-profile', isAuthenticated, (req, res) => {
  res.render('users-profile', { title: 'Users Profile', currentRoute: req.url });
});

router.get('/pages-login', (req, res) => {
  res.render('pages-login', { title: 'pages-login', currentRoute: req.url });
});

router.get('/pages-register', (req, res) => {
  res.render('pages-register', { title: 'pages-register', currentRoute: req.url });
});

router.get('/Bonus', isAuthenticated, (req, res) => {
  res.render('Bonus', { title: 'Bonus', currentRoute: req.url });
});

router.get('/Refer', isAuthenticated, (req, res) => {
  res.render('Refer', { title: 'Refer', currentRoute: req.url });
});

router.get('/Win_lose', isAuthenticated, (req, res) => {
  res.render('Win_lose', { title: 'Win', currentRoute: req.url });
});

router.get('/slider', isAuthenticated, (req, res) => {
  res.render('slider', { title: 'Image', currentRoute: req.url });
});

router.get('/tic_re', isAuthenticated, (req, res) => {
  res.render('tic_re', { title: 'Ticket Request', currentRoute: req.url });
});

router.get('/tic_app', isAuthenticated, (req, res) => {
  res.render('tic_app', { title: 'Ticket Approval', currentRoute: req.url });
});

router.get('/rech_rej', isAuthenticated, (req, res) => {
  res.render('rech_rej', { title: 'Recharge Reject', currentRoute: req.url });
});

router.get('/rech_pe', isAuthenticated, (req, res) => {
  res.render('rech_pe', { title: 'Recharge Request', currentRoute: req.url });
});

router.get('/rech_app', isAuthenticated, (req, res) => {
  res.render('rech_app', { title: 'Recharge Approval', currentRoute: req.url });
});

router.get('/with_re', isAuthenticated, (req, res) => {
  res.render('with_re', { title: 'Request', currentRoute: req.url });
});

router.get('/with_app', isAuthenticated, (req, res) => {
  res.render('with_app', { title: 'Approval', currentRoute: req.url });
});

router.get('/with_rej', isAuthenticated, (req, res) => {
  res.render('with_rej', { title: 'Reject', currentRoute: req.url });
});

module.exports = router;
