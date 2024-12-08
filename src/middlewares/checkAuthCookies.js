import passport from 'passport';

export const checkAuthCookies = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = user;
            next();
        })(req, res, next);
    };
};
