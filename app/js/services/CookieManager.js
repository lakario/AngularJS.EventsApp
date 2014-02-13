'use strict';

eventsApp.factory('cookieManager', function($cookieStore) {
    var userCookieName = 'user';

    return {
        setUserCookie: function(user) {
            $cookieStore.put(userCookieName, (user ? user.userName : ""));
        },
        getUserCookie: function() {
            return $cookieStore.get(userCookieName);
        }
    };
})