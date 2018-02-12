var _config = require('../config/config');


var Connector = {
    _redis: null,

    /**
     * @return {null}
     */
    Redis: function () {
        if(Connector._redis == null){
            var redis = require('redis');
            Connector._redis = redis.createClient(_config.redis.port, _config.redis.host);
            Connector._redis.select(_config.redis.db,function(err,resp){
                //console.log(resp);
            });

            if(_config.redis.password != "") {
                Connector._redis.auth(_config.redis.password, function () {
                    console.log('Authenticated...');
                });
            }

            Connector._redis.on('error', function(err) {
                console.log('Error Connecting: '+err);
            });
        }
        return Connector._redis;
    }
};


module.exports = Connector;