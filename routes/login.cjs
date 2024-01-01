// const express = require('express');
// const session = require('express-session');
// const router = express.Router();


// // Configure session middleware
// router.use(session({
//     secret: "process.env.ACCESS_TOKEN_SECRET", // Replace with your own secret key
//     resave: true,
//     saveUninitialized: true,
// }));


// // Middleware to log session data
// const logSessionData = (req, res, next) => {
//     console.log('Session data:', req.session);
//     next();
// };
// router.use(logSessionData);
// router.post('/login', async (req, res, next) => {
//     try {
//         const { username, password, rememberMe } = req.body;
//         console.log('Request Body:', req.body);

//         // Your authentication logic here...
//         if (username === 'admin' && password === '123') {
//             req.session.username = username;
//             req.session.rememberMe = rememberMe;
//             req.session.save((err) => {
//                 if (err) {
//                     console.error('Error saving session:', err);
//                     res.status(500).json({ error: 'Server error' });
//                 } else {
//                     console.log('Session data after save:', req.session.id);
//                     res.status(201).json({ message: 'Login successful' });
//                 }
//             });
//         } else {
//             res.status(401).json({ error: 'Invalid username or password' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });



// const isAuthenticated = (req, res, next) => {
//     if (req.session.username) {
//         next();
//         console.log('auth');
//     } else {
//         // console.log('auth nhi');
//         res.status(401).json({ error: 'Unauthorized' });
//     }
// };
// module.exports = isAuthenticated;




// router.get('/check-session', isAuthenticated, (req, res) => {
//     if (req.session.username) {
//         // Session is set
//         res.json({ message: 'Session is set', username: req.session.username });
//         console.log({ message: 'Session is set', username: req.session.username })
//     } else {
//         // Session is not set
//         res.json({ message: 'Session is not set' });
//         console.log({ message: 'Session is not set' })
//     }
// });

// router.post('/logout', (req, res) => {
//     // console.log('Received logout request'); // Add this line for debugging
//     req.session.destroy((err) => {
//         if (err) {
//             console.error('Error destroying session:', err);
//             res.status(500).json({ error: 'Server error' });
//         } else {
//             // Respond with JSON instead of rendering a view
//             res.json({ message: 'Logout successful' });
//             console.log({ message: 'Logout successful' })
//             console.log({ 'mess': req.session })
//         }
//     });
// });

// module.exports = router;

