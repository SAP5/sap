const LocalStrategy = require('passport-local').Strategy;
const usuarioBanco = require("../repositories/sql_objects/usuarioDB");


module.exports = function(passport){
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) =>{
        try {
            const usuario = await usuarioBanco.getUsuarioId(id);
            done(null, usuario);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'senha'
            },

        async (email, senha, done) => {
            try {
                const usuario = await usuarioBanco.login(email, senha);
                if(usuario != null && usuario[0]){
                    return done(null, usuario[0]);
                } else {
                    return done (null, false);
                }
            } catch (err) {
                done(err, false)
            }
        }
    ));
};




