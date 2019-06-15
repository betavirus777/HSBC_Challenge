var passport = require('passport');
const HeaderAPIKeyStrategy = require('passport-headerapikey').HeaderAPIKeyStrategy

passport.use(new HeaderAPIKeyStrategy(
    { header: 'Authorization', prefix: 'Api-Key ' },
    false,
    function(apikey, done) {
        var apiKeys = ['Shivam','123456789'];
        console.log(apikey);
        if(apiKeys.indexOf(apikey)>=0){
           
            return done(null,true);
           
        }else{
          
            return done(true);
        }
    }
  ));