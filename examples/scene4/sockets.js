"use strict";
let sockets = {};

class Sockets {
    add(key, socket) {
        sockets[key] = socket;
    }
    remove(key) {
        delete sockets[key];
    }
    get(key) {
        return sockets[key];
    }
    clear() {
        console.log("清空 socket 连接");
        sockets = {};
    }
    get length() {
        let len = 0;
        for (const key in sockets) {
            // eslint-disable-next-line no-prototype-builtins
            if (sockets.hasOwnProperty(key)) {
                len++;
            }
        }
        return len;
    }
}

module.exports = new Sockets();