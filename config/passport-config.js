const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById){

    const authenticateUser = async (email,password, done) =>{
        const user = await getUserByEmail(email)
        if(user == null){
            return done(null, false, {message: 'No user with that email'})
        }

        try {
            
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (error) {
            console.log(error.message)
            return done(error)
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },authenticateUser))

    passport.serializeUser((user,done) => {
        return done(null,user._id)
    })
    
    passport.deserializeUser(async (id,done) => {
        return done(null, await getUserById(id))
    })
}

module.exports = initialize