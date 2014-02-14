'use strict';

eventsApp.factory('eventData', function ($resource, $http, $q, $timeout) {
    var resource = $resource('/data/event/:id', { id: '@id' });

    return {
        getAllEvents: function () {
            return resource.query()
        },
        getAllEventsSlow: function (latency) {
            var deferred = $q.defer();

            $timeout(function() {
                deferred.resolve(resource.query());
            }, latency || 3000);

            return deferred.promise;
        },
        getEvent: function (id) {
            var deferred = $q.defer();

            resource.get({ id: id },
                function (event) {
                    deferred.resolve(event);
                },
                function (response) {
                    deferred.reject(event);
                });

            return deferred.promise;
        },
        saveEvent: function (event) {
            var deferred = $q.defer();

            var fnSave = function () {
                resource.save(event,
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (response) {
                        deferred.reject(response);
                    }
                );
            };

            if (!event.id) {
                this.getAllEvents().then(function (events) {
                    event.id = _.last(events).id + 1;
                    fnSave();
                });
            } else {
                fnSave();
            }

            return deferred.promise;
        },
        recordVote: function (eventId, sessionId, user, voteValue) {
            var self = this;

            return self.getEvent(eventId).then(
                function (event) {
                    var session = _.find(event.sessions, function (session) {
                        return session.id == sessionId
                    });

                    // don't allow multiple votes by the same user
                    if (session) {
                        session.userVotes = session.userVotes || [];

                        var shouldSave = false;
                        var existingVote = _.find(session.userVotes, function (userVote) {
                            return userVote.userName == user.userName
                        });

                        if (existingVote) {
                            if (existingVote.vote != voteValue) {
                                // remove the original vote
                                session.upVoteCount -= existingVote.vote;
                                session.userVotes.splice(session.userVotes.indexOf(existingVote), 1)
                                shouldSave = true;
                            }
                            else {
                                console.log('Error: user attempted to register multiple votes for a single session.');
                            }
                        }
                        else {
                            session.upVoteCount += voteValue;
                            session.userVotes.push({userName: user.userName, vote: voteValue});
                            shouldSave = true;
                        }

                        if (shouldSave) {
                            return self.saveEvent(event).then(
                                function (response) {
                                    console.log("Vote count updated for sessionId: " + sessionId + " (eventId: " + eventId + ")");
                                },
                                function (response) {
                                    console.log("Error updating vote count for sessionId: " + sessionId + " (eventId: " + eventId + ")");
                                }
                            );
                        } else {
                            return $q.defer().reject();
                        }
                    }
                }
            )
        }
    };
});