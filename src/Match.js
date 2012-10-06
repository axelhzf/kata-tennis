(function () {

    var ZERO = 'ZERO',
        LOVE = 'LOVE',
        FIFTEEN = 'FIFTEEN',
        THIRTY = 'THIRTY',
        FORTY = 'FORTY',
        DEUCE = 'DEUCE',
        ADVANTAGE = 'ADVANTAGE',
        WINNER = 'WINNER',
        LOSER = 'LOSER';

    var Match = function (player1, player2) {
        this.initialize(player1, player2);
    };

    Match.prototype = {

        initialize : function (player1, player2) {
            this.player1 = player1;
            this.player2 = player2;

            this.score = {};
            this.score[player1] = ZERO;
            this.score[player2] = ZERO;
        },

        getScore : function (player) {
            return this.score[player];
        },

        _getOpponent : function (player) {
            if(player === this.player1) return this.player2;
            if(player === this.player2) return this.player1;
        },

        _setWinner : function (player) {
            this.score[player] = WINNER;
            this.score[this._getOpponent(player)] = LOSER;
        },

        addPoint : function (player) {
            var opponent = this._getOpponent(player);
            var score = this.score[player];
            var opponentScore = this.score[opponent];

            if (score === ZERO) {
                this.score[player] = LOVE;
            } else if (score === LOVE) {
                this.score[player] = THIRTY;
            } else if (score === THIRTY) {
                if(opponentScore === FORTY) {
                    this.score[player] = DEUCE;
                    this.score[opponent] = DEUCE;
                } else {
                    this.score[player] = FORTY;
                }
            } else if(score === FORTY) {
                this._setWinner(player);
            } else if(score === DEUCE && opponentScore === DEUCE) {
                this.score[player] = ADVANTAGE;
            } else if(score === ADVANTAGE) {
                this._setWinner(player);
            } else if(score === DEUCE && opponentScore === ADVANTAGE) {
                this.score[opponent] = DEUCE;
            }
        }
    };

    module.exports = Match;

}());




