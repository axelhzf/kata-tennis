var expect = require('chai').expect;
var Match = require('../src/Match.js');

describe("Match", function () {

    var match, player1, player2;

    beforeEach(function () {
        player1 = 'Nadal';
        player2 = 'Federer';

        match = new Match(player1, player2);
    });

    var scoreEquals = function(scorePlayer1, scorePlayer2) {
        expect(match.getScore(player1)).to.equal(scorePlayer1);
        expect(match.getScore(player2)).to.equal(scorePlayer2);
    };

    var addPoints = function(player, n) {
        for (var i = 0; i < n ; i++) {
            match.addPoint(player);
        }
    };

    it("should start with 0 points", function () {
        scoreEquals('ZERO', 'ZERO');
    });

    it("should score a point", function () {
        match.addPoint(player1);
        scoreEquals('LOVE', 'ZERO');

        match.addPoint(player1);
        scoreEquals('THIRTY', 'ZERO');

        match.addPoint(player1);
        scoreEquals('FORTY', 'ZERO');
    });

    it("should end with a winner" , function () {
        addPoints(player1, 4);
        scoreEquals('WINNER', 'LOSER');
    });

    it("should handle deuce logic", function () {
        addPoints(player1, 3);
        addPoints(player2, 3);

        scoreEquals('DEUCE', 'DEUCE');

        match.addPoint(player1);
        scoreEquals('ADVANTAGE', 'DEUCE');

        match.addPoint(player2);
        scoreEquals('DEUCE', 'DEUCE');

        match.addPoint(player2);
        scoreEquals('DEUCE', 'ADVANTAGE');

        match.addPoint(player2);
        scoreEquals('LOSER', 'WINNER');
    });

});