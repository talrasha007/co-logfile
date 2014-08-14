var _ = require('lodash'),
    moment = require('moment'),

    fs = require('fs');

var Logger = module.exports = function (path, opt) {
    this._opt = _.defaults(opt || {}, { path: path, splitBy: { hour: false, size: 0 } });
    this._cnt = 0;
    this._written = 0;
};

Logger.prototype = {
    write: function (msg, cb) {
        var now = moment();

        if (!this._stream) {
            this._cnt = 0;
            this._rotate();
        } else if (this._hour != now.hours() && (this._opt.splitBy.hour || now.hours() == 0)) {
            this._cnt = 0;
            this._rotate();
        } else if (this._opt.splitBy.size > 0 && this._written > this._opt.splitBy.size) {
            this._rotate();
        }

        if (_.isObject(msg)) msg = JSON.stringify(msg) + '\n';
        this._written += msg.length;

        this._stream.write(msg, cb);
    },

    coWrite: function (msg) {
        var me = this;
        return function (cb) {
            me.write(msg, cb);
        };
    },

    _rotate: function () {
        var me = this;
        var now = moment();

        var fp = [
            this._opt.path,
            process.pid,
            now.format(this._opt.splitBy.hour ? 'YYYYMMDDHH' : 'YYYYMMDD')
        ];
        if (this._opt.splitBy.size > 0) fp.push(++this._cnt);
        fp.push('log');

        if (this._stream) this._stream.end();
        this._stream = fs.createWriteStream(fp.join('.'));
        this._hour = now.hours();
        this._written = 0;

        var et = this._opt.splitBy.hour ? moment().endOf('hour') : moment().endOf('day');

        if (this._tid) clearTimeout(this._tid);
        this._tid = setTimeout(function () {
            me._stream.end();
            delete me._stream;
        }, et - now + 10000);
    }
};