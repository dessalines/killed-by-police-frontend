(function(FuseBox){FuseBox.$fuse$=FuseBox;
var __process_env__ = {"NODE_ENV":"development"};
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("index.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Inferno = require("inferno");
var createTextVNode = Inferno.createTextVNode;
var createComponentVNode = Inferno.createComponentVNode;
var createVNode = Inferno.createVNode;
var inferno_1 = require("inferno");
var Papa = require("papaparse");
require("./Main.css");
var container = document.getElementById('app');
var csvUrl = 'data-dumps/dumps/killed_by_police.csv';
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            results: []
        };
        return _this;
    }
    Index.prototype.componentDidMount = function () {
        var _this = this;
        this.fetchCSVData().then(function (d) { return _this.setState({ results: d }); });
    };
    Index.prototype.render = function () {
        return (createVNode(1, "div", "container-fluid", createVNode(1, "div", "row", createVNode(1, "div", "col-12", [createVNode(1, "h1", null, createVNode(1, "a", "text-body", createTextVNode("Killed By Police"), 2, { "href": "https://github.com/dessalines/killed-by-police-frontend" }), 2), createVNode(1, "div", null, this.table(), 0)], 4), 2), 2));
    };
    Index.prototype.table = function () {
        return (createVNode(1, "div", null, createVNode(1, "div", "table-responsive", createVNode(1, "table", "table table-fixed table-hover table-sm table-striped sortable-theme-bootstrap", [createVNode(1, "thead", null, createVNode(1, "tr", null, [createVNode(1, "th", null, createTextVNode("Date"), 2), createVNode(1, "th", null, createTextVNode("Name"), 2), createVNode(1, "th", null, createTextVNode("Age"), 2), createVNode(1, "th", null, createTextVNode("Sex"), 2), createVNode(1, "th", null, createTextVNode("Race"), 2), createVNode(1, "th", null, createTextVNode("State"), 2), createVNode(1, "th", null, createTextVNode("Cause"), 2), createVNode(1, "th", null, createTextVNode("Links"), 2)], 4), 2), createVNode(1, "tbody", null, this.state.results.map(function (r) { return (createVNode(1, "tr", null, [createVNode(1, "td", null, r.date, 0), createVNode(1, "td", null, r.name, 0), createVNode(1, "td", null, r.age, 0), createVNode(1, "td", null, r.sex, 0), createVNode(1, "td", null, r.race, 0), createVNode(1, "td", null, r.state, 0), createVNode(1, "td", null, r.cause, 0), createVNode(1, "td", null, [createVNode(1, "a", null, createTextVNode("FB "), 2, { "href": r.fb_url }), createVNode(1, "a", null, createTextVNode("News"), 2, { "href": r.news_url })], 4)], 4)); }), 0)], 4, { "data-sortable": true }), 2), 2));
    };
    Index.prototype.fetchCSVData = function () {
        return fetch(csvUrl)
            .then(function (data) { return data.text(); })
            .then(function (data) { return Papa.parse(data); })
            .then(function (data) {
            var out = [];
            var rows = data.data;
            rows.shift();
            for (var _i = 0, _a = rows.reverse(); _i < _a.length; _i++) {
                var row = _a[_i];
                var fbUrl = (row[11]) ? "https://" + row[11].slice(1, -1) : undefined;
                if (row[3]) {
                    out.push({
                        date: row[2],
                        state: row[3],
                        sex: row[4],
                        race: row[5],
                        name: row[7],
                        age: row[8],
                        cause: (row[10]) ? row[10].slice(1, -1) : undefined,
                        fb_url: fbUrl,
                        news_url: (row[12]) ? row[12].slice(1, -1) : undefined
                    });
                }
            }
            return out.sort(function (a, b) { return a.date.localeCompare(b.date); }).reverse();
        });
    };
    return Index;
}(inferno_1.Component));
inferno_1.render(createComponentVNode(2, Index), container);
//# sourceMappingURL=app.js.map
});
___scope___.file("Main.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("Main.css", "")
});
return ___scope___.entry = "index.jsx";
});
FuseBox.pkg("fusebox-hot-reload", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @module listens to `source-changed` socket events and actions hot reload
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require('fusebox-websocket').SocketClient, bundleErrors = {}, outputElement = document.createElement('div'), styleElement = document.createElement('style'), minimizeToggleId = 'fuse-box-toggle-minimized', hideButtonId = 'fuse-box-hide', expandedOutputClass = 'fuse-box-expanded-output', localStoragePrefix = '__fuse-box_';
function storeSetting(key, value) {
    localStorage[localStoragePrefix + key] = value;
}
function getSetting(key) {
    return localStorage[localStoragePrefix + key] === 'true' ? true : false;
}
var outputInBody = false, outputMinimized = getSetting(minimizeToggleId), outputHidden = false;
outputElement.id = 'fuse-box-output';
styleElement.innerHTML = "\n    #" + outputElement.id + ", #" + outputElement.id + " * {\n        box-sizing: border-box;\n    }\n    #" + outputElement.id + " {\n        z-index: 999999999999;\n        position: fixed;\n        top: 10px;\n        right: 10px;\n        width: 400px;\n        overflow: auto;\n        background: #fdf3f1;\n        border: 1px solid #eca494;\n        border-radius: 5px;\n        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        box-shadow: 0px 3px 6px 1px rgba(0,0,0,.15);\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " {\n        height: auto;\n        width: auto;\n        left: 10px;\n        max-height: calc(100vh - 50px);\n    }\n    #" + outputElement.id + " .fuse-box-errors {\n        display: none;\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " .fuse-box-errors {\n        display: block;\n        border-top: 1px solid #eca494;\n        padding: 0 10px;\n    }\n    #" + outputElement.id + " button {\n        border: 1px solid #eca494;\n        padding: 5px 10px;\n        border-radius: 4px;\n        margin-left: 5px;\n        background-color: white;\n        color: black;\n        box-shadow: 0px 2px 2px 0px rgba(0,0,0,.05);\n    }\n    #" + outputElement.id + " .fuse-box-header {\n        padding: 10px;\n    }\n    #" + outputElement.id + " .fuse-box-header h4 {\n        display: inline-block;\n        margin: 4px;\n    }";
styleElement.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(styleElement);
function displayBundleErrors() {
    var errorMessages = Object.keys(bundleErrors).reduce(function (allMessages, bundleName) {
        var bundleMessages = bundleErrors[bundleName];
        return allMessages.concat(bundleMessages.map(function (message) {
            var messageOutput = message
                .replace(/\n/g, '<br>')
                .replace(/\t/g, '&nbsp;&nbps;&npbs;&nbps;')
                .replace(/ /g, '&nbsp;');
            return "<pre>" + messageOutput + "</pre>";
        }));
    }, []), errorOutput = errorMessages.join('');
    if (errorOutput && !outputHidden) {
        outputElement.innerHTML = "\n        <div class=\"fuse-box-header\" style=\"\">\n            <h4 style=\"\">Fuse Box Bundle Errors (" + errorMessages.length + "):</h4>\n            <div style=\"float: right;\">\n                <button id=\"" + minimizeToggleId + "\">" + (outputMinimized ? 'Expand' : 'Minimize') + "</button>\n                <button id=\"" + hideButtonId + "\">Hide</button>\n            </div>\n        </div>\n        <div class=\"fuse-box-errors\">\n            " + errorOutput + "\n        </div>\n        ";
        document.body.appendChild(outputElement);
        outputElement.className = outputMinimized ? '' : expandedOutputClass;
        outputInBody = true;
        document.getElementById(minimizeToggleId).onclick = function () {
            outputMinimized = !outputMinimized;
            storeSetting(minimizeToggleId, outputMinimized);
            displayBundleErrors();
        };
        document.getElementById(hideButtonId).onclick = function () {
            outputHidden = true;
            displayBundleErrors();
        };
    }
    else if (outputInBody) {
        document.body.removeChild(outputElement);
        outputInBody = false;
    }
}
exports.connect = function (port, uri, reloadFullPage) {
    if (FuseBox.isServer) {
        return;
    }
    port = port || window.location.port;
    var client = new Client({
        port: port,
        uri: uri,
    });
    client.connect();
    client.on('page-reload', function (data) {
        return window.location.reload();
    });
    client.on('page-hmr', function (data) {
        FuseBox.flush();
        FuseBox.dynamic(data.path, data.content);
        if (FuseBox.mainFile) {
            try {
                FuseBox.import(FuseBox.mainFile);
            }
            catch (e) {
                if (typeof e === 'string') {
                    if (/not found/.test(e)) {
                        return window.location.reload();
                    }
                }
                console.error(e);
            }
        }
    });
    client.on('source-changed', function (data) {
        console.info("%cupdate \"" + data.path + "\"", 'color: #237abe');
        if (reloadFullPage) {
            return window.location.reload();
        }
        /**
         * If a plugin handles this request then we don't have to do anything
         **/
        for (var index = 0; index < FuseBox.plugins.length; index++) {
            var plugin = FuseBox.plugins[index];
            if (plugin.hmrUpdate && plugin.hmrUpdate(data)) {
                return;
            }
        }
        if (data.type === "hosted-css") {
            var fileId = data.path.replace(/^\//, '').replace(/[\.\/]+/g, '-');
            var existing = document.getElementById(fileId);
            if (existing) {
                existing.setAttribute("href", data.path + "?" + new Date().getTime());
            }
            else {
                var node = document.createElement('link');
                node.id = fileId;
                node.type = 'text/css';
                node.rel = 'stylesheet';
                node.href = data.path;
                document.getElementsByTagName('head')[0].appendChild(node);
            }
        }
        if (data.type === 'js' || data.type === "css") {
            FuseBox.flush();
            FuseBox.dynamic(data.path, data.content);
            if (FuseBox.mainFile) {
                try {
                    FuseBox.import(FuseBox.mainFile);
                }
                catch (e) {
                    if (typeof e === 'string') {
                        if (/not found/.test(e)) {
                            return window.location.reload();
                        }
                    }
                    console.error(e);
                }
            }
        }
    });
    client.on('error', function (error) {
        console.log(error);
    });
    client.on('bundle-error', function (_a) {
        var bundleName = _a.bundleName, message = _a.message;
        console.error("Bundle error in " + bundleName + ": " + message);
        var errorsForBundle = bundleErrors[bundleName] || [];
        errorsForBundle.push(message);
        bundleErrors[bundleName] = errorsForBundle;
        displayBundleErrors();
    });
    client.on('update-bundle-errors', function (_a) {
        var bundleName = _a.bundleName, messages = _a.messages;
        messages.forEach(function (message) { return console.error("Bundle error in " + bundleName + ": " + message); });
        bundleErrors[bundleName] = messages;
        displayBundleErrors();
    });
};

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-websocket", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events = require('events');
var SocketClient = /** @class */ (function () {
    function SocketClient(opts) {
        opts = opts || {};
        var port = opts.port || window.location.port;
        var protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
        var domain = location.hostname || 'localhost';
        this.url = opts.host || "" + protocol + domain + ":" + port;
        if (opts.uri) {
            this.url = opts.uri;
        }
        this.authSent = false;
        this.emitter = new events.EventEmitter();
    }
    SocketClient.prototype.reconnect = function (fn) {
        var _this = this;
        setTimeout(function () {
            _this.emitter.emit('reconnect', { message: 'Trying to reconnect' });
            _this.connect(fn);
        }, 5000);
    };
    SocketClient.prototype.on = function (event, fn) {
        this.emitter.on(event, fn);
    };
    SocketClient.prototype.connect = function (fn) {
        var _this = this;
        console.log('%cConnecting to fusebox HMR at ' + this.url, 'color: #237abe');
        setTimeout(function () {
            _this.client = new WebSocket(_this.url);
            _this.bindEvents(fn);
        }, 0);
    };
    SocketClient.prototype.close = function () {
        this.client.close();
    };
    SocketClient.prototype.send = function (eventName, data) {
        if (this.client.readyState === 1) {
            this.client.send(JSON.stringify({ event: eventName, data: data || {} }));
        }
    };
    SocketClient.prototype.error = function (data) {
        this.emitter.emit('error', data);
    };
    /** Wires up the socket client messages to be emitted on our event emitter */
    SocketClient.prototype.bindEvents = function (fn) {
        var _this = this;
        this.client.onopen = function (event) {
            console.log('%cConnected', 'color: #237abe');
            if (fn) {
                fn(_this);
            }
        };
        this.client.onerror = function (event) {
            _this.error({ reason: event.reason, message: 'Socket error' });
        };
        this.client.onclose = function (event) {
            _this.emitter.emit('close', { message: 'Socket closed' });
            if (event.code !== 1011) {
                _this.reconnect(fn);
            }
        };
        this.client.onmessage = function (event) {
            var data = event.data;
            if (data) {
                var item = JSON.parse(data);
                _this.emitter.emit(item.type, item.data);
                _this.emitter.emit('*', item);
            }
        };
    };
    return SocketClient;
}());
exports.SocketClient = SocketClient;

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("events", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
if (FuseBox.isServer) {
    module.exports = global.require("events");
} else {
    function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined;
    }
    module.exports = EventEmitter;

    // Backwards-compat with node 0.10.x
    EventEmitter.EventEmitter = EventEmitter;

    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;

    // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.
    EventEmitter.defaultMaxListeners = 10;

    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.
    EventEmitter.prototype.setMaxListeners = function(n) {
        if (!isNumber(n) || n < 0 || isNaN(n))
            throw TypeError("n must be a positive number");
        this._maxListeners = n;
        return this;
    };

    EventEmitter.prototype.emit = function(type) {
        var er, handler, len, args, i, listeners;

        if (!this._events)
            this._events = {};

        // If there is no 'error' event listener then throw.
        if (type === "error") {
            if (!this._events.error ||
                (isObject(this._events.error) && !this._events.error.length)) {
                er = arguments[1];
                if (er instanceof Error) {
                    throw er; // Unhandled 'error' event
                }
                throw TypeError("Uncaught, unspecified \"error\" event.");
            }
        }

        handler = this._events[type];

        if (isUndefined(handler))
            return false;

        if (isFunction(handler)) {
            switch (arguments.length) {
                // fast cases
                case 1:
                    handler.call(this);
                    break;
                case 2:
                    handler.call(this, arguments[1]);
                    break;
                case 3:
                    handler.call(this, arguments[1], arguments[2]);
                    break;
                    // slower
                default:
                    args = Array.prototype.slice.call(arguments, 1);
                    handler.apply(this, args);
            }
        } else if (isObject(handler)) {
            args = Array.prototype.slice.call(arguments, 1);
            listeners = handler.slice();
            len = listeners.length;
            for (i = 0; i < len; i++)
                listeners[i].apply(this, args);
        }

        return true;
    };

    EventEmitter.prototype.addListener = function(type, listener) {
        var m;

        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        if (!this._events)
            this._events = {};

        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (this._events.newListener)
            this.emit("newListener", type,
                isFunction(listener.listener) ?
                listener.listener : listener);

        if (!this._events[type])
        // Optimize the case of one listener. Don't need the extra array object.
            this._events[type] = listener;
        else if (isObject(this._events[type]))
        // If we've already got an array, just append.
            this._events[type].push(listener);
        else
        // Adding the second element, need to change to array.
            this._events[type] = [this._events[type], listener];

        // Check for listener leak
        if (isObject(this._events[type]) && !this._events[type].warned) {
            if (!isUndefined(this._maxListeners)) {
                m = this._maxListeners;
            } else {
                m = EventEmitter.defaultMaxListeners;
            }

            if (m && m > 0 && this._events[type].length > m) {
                this._events[type].warned = true;
                console.error("(node) warning: possible EventEmitter memory " +
                    "leak detected. %d listeners added. " +
                    "Use emitter.setMaxListeners() to increase limit.",
                    this._events[type].length);
                if (typeof console.trace === "function") {
                    // not supported in IE 10
                    console.trace();
                }
            }
        }

        return this;
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.once = function(type, listener) {
        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        var fired = false;

        function g() {
            this.removeListener(type, g);

            if (!fired) {
                fired = true;
                listener.apply(this, arguments);
            }
        }

        g.listener = listener;
        this.on(type, g);

        return this;
    };

    // emits a 'removeListener' event iff the listener was removed
    EventEmitter.prototype.removeListener = function(type, listener) {
        var list, position, length, i;

        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        if (!this._events || !this._events[type])
            return this;

        list = this._events[type];
        length = list.length;
        position = -1;

        if (list === listener ||
            (isFunction(list.listener) && list.listener === listener)) {
            delete this._events[type];
            if (this._events.removeListener)
                this.emit("removeListener", type, listener);

        } else if (isObject(list)) {
            for (i = length; i-- > 0;) {
                if (list[i] === listener ||
                    (list[i].listener && list[i].listener === listener)) {
                    position = i;
                    break;
                }
            }

            if (position < 0)
                return this;

            if (list.length === 1) {
                list.length = 0;
                delete this._events[type];
            } else {
                list.splice(position, 1);
            }

            if (this._events.removeListener)
                this.emit("removeListener", type, listener);
        }

        return this;
    };

    EventEmitter.prototype.removeAllListeners = function(type) {
        var key, listeners;

        if (!this._events)
            return this;

        // not listening for removeListener, no need to emit
        if (!this._events.removeListener) {
            if (arguments.length === 0)
                this._events = {};
            else if (this._events[type])
                delete this._events[type];
            return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            for (key in this._events) {
                if (key === "removeListener") continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = {};
            return this;
        }

        listeners = this._events[type];

        if (isFunction(listeners)) {
            this.removeListener(type, listeners);
        } else if (listeners) {
            // LIFO order
            while (listeners.length)
                this.removeListener(type, listeners[listeners.length - 1]);
        }
        delete this._events[type];

        return this;
    };

    EventEmitter.prototype.listeners = function(type) {
        var ret;
        if (!this._events || !this._events[type])
            ret = [];
        else if (isFunction(this._events[type]))
            ret = [this._events[type]];
        else
            ret = this._events[type].slice();
        return ret;
    };

    EventEmitter.prototype.listenerCount = function(type) {
        if (this._events) {
            var evlistener = this._events[type];

            if (isFunction(evlistener))
                return 1;
            else if (evlistener)
                return evlistener.length;
        }
        return 0;
    };

    EventEmitter.listenerCount = function(emitter, type) {
        return emitter.listenerCount(type);
    };

    function isFunction(arg) {
        return typeof arg === "function";
    }

    function isNumber(arg) {
        return typeof arg === "number";
    }

    function isObject(arg) {
        return typeof arg === "object" && arg !== null;
    }

    function isUndefined(arg) {
        return arg === void 0;
    }
}

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("inferno", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){
/* fuse:injection: */ var process = require("process");
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/index.cjs.min.js');
} else {
  module.exports = require('./dist/index.cjs.js');
}

});
___scope___.file("dist/index.cjs.min.js", function(exports, require, module, __filename, __dirname){

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var f=Array.isArray;function d(e){var n=typeof e;return"string"===n||"number"===n}function b(e){return m(e)||g(e)}function p(e){return g(e)||!1===e||n(e)||m(e)}function h(e){return"function"==typeof e}function v(e){return"string"==typeof e}function i(e){return"number"==typeof e}function g(e){return null===e}function n(e){return!0===e}function m(e){return void 0===e}function a(e){return"object"==typeof e}function y(e,n){var t={};if(e)for(var r in e)t[r]=e[r];if(n)for(var o in n)t[o]=n[o];return t}var x={},t="$F";function s(e){return e.substr(2).toLowerCase()}function u(e,n){e.appendChild(n)}function k(e,n,t){g(t)?u(e,n):e.insertBefore(n,t)}function $(e,n){return n?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e)}function c(e,n,t){e.replaceChild(n,t)}function C(e,n){e.removeChild(n)}function w(e){for(var n;void 0!==(n=e.shift());)n()}function U(e,n){for(var t,r;e;){if(2033&(t=e.flags))return e.dom;r=e.children,e=8192&t?2===e.childFlags?r:r[n?0:r.length-1]:4&t?r.$LI:r}return null}function F(e,n){var t=e.flags;if(2033&t)C(n,e.dom);else{var r=e.children;if(4&t)F(r.$LI,n);else if(8&t)F(r,n);else if(8192&t)if(2===e.childFlags)F(r,n);else for(var o=0,l=r.length;o<l;++o)F(r[o],n)}}function V(e,n,t){var r=e.flags;if(2033&r)k(n,e.dom,t);else{var o=e.children;if(4&r)V(o.$LI,n,t);else if(8&r)V(o,n,t);else if(8192&r)if(2===e.childFlags)V(o,n,t);else for(var l=0,a=o.length;l<a;++l)V(o[l],n,t)}}function P(e,n,t){return e.constructor.getDerivedStateFromProps?y(t,e.constructor.getDerivedStateFromProps(n,t)):t}var N={v:!1},S={componentComparator:null,createVNode:null,renderComplete:null};function M(e,n){e.textContent=n}function L(e,n){return e&&n&&a(e)&&a(n)&&e.event===n.event&&e.data===n.data}var I="$";function B(e,n,t,r,o,l,a,i){this.childFlags=e,this.children=n,this.className=t,this.dom=null,this.flags=r,this.key=void 0===o?null:o,this.props=void 0===l?null:l,this.ref=void 0===a?null:a,this.type=i}function o(e,n,t,r,o,l,a,i){var s=void 0===o?1:o,u=new B(s,r,t,e,a,l,i,n),c=S.createVNode;return h(c)&&c(u),0===s&&O(u,u.children),u}function e(e,n,t,r,o){0!=(2&e)&&(n.prototype&&n.prototype.render?e=4:n.render?(e=32776,n=n.render):e=8);var l=n.defaultProps;if(!b(l))for(var a in t||(t={}),l)m(t[a])&&(t[a]=l[a]);if(0<(8&e)&&0==(32768&e)){var i=n.defaultHooks;if(!b(i))if(o)for(var s in i)m(o[s])&&(o[s]=i[s]);else o=i}var u=new B(1,null,null,e,r,t,o,n),c=S.createVNode;return h(c)&&c(u),u}function _(e,n){return new B(1,b(e)?"":e,null,16,n,null,null,null)}function D(e,n,t){var r=o(8192,8192,null,e,n,null,t,null);switch(r.childFlags){case 1:r.children=E(),r.childFlags=2;break;case 16:r.children=[_(e)],r.childFlags=4}return r}function r(e){var n=e.props;if(n){var t=e.flags;481&t&&(void 0!==n.children&&b(e.children)&&O(e,n.children),void 0!==n.className&&(e.className=n.className||null,n.className=void 0)),void 0!==n.key&&(e.key=n.key,n.key=void 0),void 0!==n.ref&&(e.ref=8&t?y(e.ref,n.ref):n.ref,n.ref=void 0)}return e}function l(e){var n,t=e.children,r=e.childFlags;if(2===r)n=A(t);else if(12&r){n=[];for(var o=0,l=t.length;o<l;++o)n.push(A(t[o]))}return D(n,r,e.key)}function A(e){var n=-16385&e.flags,t=e.props;if(14&n&&!g(t)){var r=t;for(var o in t={},r)t[o]=r[o]}return 0==(8192&n)?new B(e.childFlags,e.children,e.className,n,e.key,t,e.ref,e.type):l(e)}function E(){return _("",null)}function T(e,n){return o(1024,1024,null,e,0,null,p(e)?null:e.key,n)}function W(e,n,t,r){for(var o=e.length;t<o;t++){var l=e[t];if(!p(l)){var a=r+I+t;if(f(l))W(l,n,0,a);else{if(d(l))l=_(l,a);else{var i=l.key,s=v(i)&&i[0]===I;(81920&l.flags||s)&&(l=A(l)),l.flags|=65536,g(i)||s?l.key=a:l.key=r+i}n.push(l)}}}}function R(e){switch(e){case"svg":return 32;case"input":return 64;case"select":return 256;case"textarea":return 128;case t:return 8192;default:return 1}}function O(e,n){var t,r=1;if(p(n))t=n;else if(d(n))r=16,t=n;else if(f(n)){for(var o=n.length,l=0;l<o;++l){var a=n[l];if(p(a)||f(a)){W(n,t=t||n.slice(0,l),l,"");break}if(d(a))(t=t||n.slice(0,l)).push(_(a,I+l));else{var i=a.key,s=0<(81920&a.flags),u=g(i),c=!u&&v(i)&&i[0]===I;s||u||c?(t=t||n.slice(0,l),(s||c)&&(a=A(a)),(u||c)&&(a.key=I+l),t.push(a)):t&&t.push(a),a.flags|=65536}}r=0===(t=t||n).length?1:8}else(t=n).flags|=65536,81920&n.flags&&(t=A(n)),r=2;return e.children=t,e.childFlags=r,e}function j(e,n){return h(n)?{data:e,event:n}:null}var H="http://www.w3.org/1999/xlink",Q="http://www.w3.org/XML/1998/namespace",X={"xlink:actuate":H,"xlink:arcrole":H,"xlink:href":H,"xlink:role":H,"xlink:show":H,"xlink:title":H,"xlink:type":H,"xml:base":Q,"xml:lang":Q,"xml:space":Q};function G(e){return{onClick:e,onDblClick:e,onFocusIn:e,onFocusOut:e,onKeyDown:e,onKeyPress:e,onKeyUp:e,onMouseDown:e,onMouseMove:e,onMouseUp:e,onSubmit:e,onTouchEnd:e,onTouchMove:e,onTouchStart:e}}var K=G(0),q=G(null),z=G(!0);function J(e,n,t){var r=t.$EV;n?(0===K[e]&&(q[e]=te(e)),r||(r=t.$EV=G(null)),r[e]||++K[e],r[e]=n):r&&r[e]&&(0==--K[e]&&(document.removeEventListener(s(e),q[e]),q[e]=null),r[e]=null)}function Y(e,n,t,r,o){for(var l=n;!g(l);){if(t&&l.disabled)return;var a=l.$EV;if(a){var i=a[r];if(i&&(o.dom=l,i.event?i.event(i.data,e):i(e),e.cancelBubble))return}l=l.parentNode}}function Z(){this.cancelBubble=!0,this.immediatePropagationStopped||this.stopImmediatePropagation()}function ee(){return this.defaultPrevented}function ne(){return this.cancelBubble}function te(r){var e=function(e){var n="onClick"===r||"onDblClick"===r;if(n&&0!==e.button)e.stopPropagation();else{e.isDefaultPrevented=ee,e.isPropagationStopped=ne,e.stopPropagation=Z;var t={dom:document};Object.defineProperty(e,"currentTarget",{configurable:!0,get:function(){return t.dom}}),Y(e,e.target,n,r,t)}};return document.addEventListener(s(r),e),e}function re(e,n){var t=document.createElement("i");return t.innerHTML=n,t.innerHTML===e.innerHTML}function oe(e,n,t){if(e[n]){var r=e[n];r.event?r.event(r.data,t):r(t)}else{var o=n.toLowerCase();e[o]&&e[o](t)}}function le(i,s){var e=function(e){var n=this.$V;if(n){var t=n.props||x,r=n.dom;if(v(i))oe(t,i,e);else for(var o=0;o<i.length;++o)oe(t,i[o],e);if(h(s)){var l=this.$V,a=l.props||x;s(a,r,!1,l)}}};return Object.defineProperty(e,"wrapped",{configurable:!1,enumerable:!1,value:!0,writable:!1}),e}function ae(e,n,t){var r="$"+n,o=e[r];o&&o[1].wrapped||(o&&(e.removeEventListener.apply(e,o),e[r]=null),h(t)&&(e.addEventListener(n,t),e[r]=[n,t]))}function ie(e){return"checkbox"===e||"radio"===e}var se=le("onInput",de),ue=le(["onClick","onChange"],de);function ce(e){e.stopPropagation()}function fe(e,n){ie(n.type)?(ae(e,"change",ue),ae(e,"click",ce)):ae(e,"input",se)}function de(e,n){var t=e.type,r=e.value,o=e.checked,l=e.multiple,a=e.defaultValue,i=!b(r);t&&t!==n.type&&n.setAttribute("type",t),b(l)||l===n.multiple||(n.multiple=l),b(a)||i||(n.defaultValue=a+""),ie(t)?(i&&(n.value=r),b(o)||(n.checked=o)):i&&n.value!==r?(n.defaultValue=r,n.value=r):b(o)||(n.checked=o)}function pe(e,n){if("option"===e.type)ve(e,n);else{var t=e.children,r=e.flags;if(4&r)pe(t.$LI,n);else if(8&r)pe(t,n);else if(2===e.childFlags)pe(t,n);else if(12&e.childFlags)for(var o=0,l=t.length;o<l;++o)pe(t[o],n)}}function ve(e,n){var t=e.props||x,r=e.dom;r.value=t.value,t.value===n||f(n)&&-1!==n.indexOf(t.value)?r.selected=!0:b(n)&&b(t.selected)||(r.selected=t.selected||!1)}ce.wrapped=!0;var he=le("onChange",me);function ge(e){ae(e,"change",he)}function me(e,n,t,r){var o=Boolean(e.multiple);b(e.multiple)||o===n.multiple||(n.multiple=o);var l=e.selectedIndex;if(-1===l&&(n.selectedIndex=-1),1!==r.childFlags){var a=e.value;i(l)&&-1<l&&n.options[l]&&(a=n.options[l].value),t&&b(a)&&(a=e.defaultValue),pe(r,a)}}var ye=le("onInput",be),ke=le("onChange");function $e(e,n){ae(e,"input",ye),n.onChange&&ae(e,"change",ke)}function be(e,n,t){var r=e.value,o=n.value;if(b(r)){if(t){var l=e.defaultValue;b(l)||l===o||(n.defaultValue=l,n.value=l)}}else o!==r&&(n.defaultValue=r,n.value=r)}function xe(e,n,t,r,o,l){64&e?de(r,t):256&e?me(r,t,o,n):128&e&&be(r,t,o),l&&(t.$V=n)}function Ce(e,n,t){64&e?fe(n,t):256&e?ge(n):128&e&&$e(n,t)}function we(e){return e.type&&ie(e.type)?!b(e.checked):!b(e.value)}function Fe(){return{current:null}}var Pe,Ne,Se=function(e){return{render:e}};function Ue(e,n,t){t.push(function(){n(e)})}function Ve(e){e&&(h(e)?e(null):e.current&&(e.current=null))}function Me(e,n,t){e&&(h(e)?Ue(n,e,t):void 0!==e.current&&(e.current=n))}function Le(e,n){Ie(e),n&&F(e,n)}function Ie(e){var n,t=e.flags,r=e.children;if(481&t){n=e.ref;var o=e.props;Ve(n);var l=e.childFlags;if(!g(o))for(var a=Object.keys(o),i=0,s=a.length;i<s;i++){var u=a[i];z[u]&&J(u,null,e.dom)}12&l?Be(r):2===l&&Ie(r)}else r&&(4&t?(h(r.componentWillUnmount)&&r.componentWillUnmount(),Ve(e.ref),r.$UN=!0,Ie(r.$LI)):8&t?(!b(n=e.ref)&&h(n.onComponentWillUnmount)&&n.onComponentWillUnmount(U(e,!0),e.props||x),Ie(r)):1024&t?Le(r,e.ref):8192&t&&12&e.childFlags&&Be(r))}function Be(e){for(var n=0,t=e.length;n<t;++n)Ie(e[n])}function _e(e){e.textContent=""}function De(e,n,t){Be(t),8192&n.flags?F(n,e):_e(e)}function Ae(n,t){return function(e){n(t.data,e)}}function Ee(e,n,t,r){var o=s(e);if(a(t)&&!g(t)){var l=t.event;L(n,t)||ae(r,o,Ae(l,t))}else ae(r,o,t)}function Te(e,n,t){if(b(n))t.removeAttribute("style");else{var r,o,l=t.style;if(v(n))l.cssText=n;else if(b(e)||v(e))for(r in n)o=n[r],l.setProperty(r,o);else{for(r in n)(o=n[r])!==e[r]&&l.setProperty(r,o);for(r in e)b(n[r])&&l.removeProperty(r)}}}function We(e,n,t,r,o,l,a){switch(e){case"children":case"childrenType":case"className":case"defaultValue":case"key":case"multiple":case"ref":break;case"autoFocus":r.autofocus=!!t;break;case"allowfullscreen":case"autoplay":case"capture":case"checked":case"controls":case"default":case"disabled":case"hidden":case"indeterminate":case"loop":case"muted":case"novalidate":case"open":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"selected":r[e]=!!t;break;case"defaultChecked":case"value":case"volume":if(l&&"value"===e)break;var i=b(t)?"":t;r[e]!==i&&(r[e]=i);break;case"style":Te(n,t,r);break;case"dangerouslySetInnerHTML":var s=n&&n.__html||"",u=t&&t.__html||"";s!==u&&(b(u)||re(r,u)||(g(a)||(12&a.childFlags?Be(a.children):2===a.childFlags&&Ie(a.children),a.children=null,a.childFlags=1),r.innerHTML=u));break;default:z[e]?L(n,t)||J(e,t,r):111===e.charCodeAt(0)&&110===e.charCodeAt(1)?Ee(e,n,t,r):b(t)?r.removeAttribute(e):o&&X[e]?r.setAttributeNS(X[e],e,t):r.setAttribute(e,t)}}function Re(e,n,t,r,o){var l=!1,a=0<(448&n);for(var i in a&&(l=we(t))&&Ce(n,r,t),t)We(i,null,t[i],r,o,l,null);a&&xe(n,e,r,t,!0,l)}function Oe(e,n,t){var r=He(e.render(n,e.state,t)),o=t;return h(e.getChildContext)&&(o=y(t,e.getChildContext())),e.$CX=o,r}function je(e,n,t,r,o,l){var a=new n(t,r),i=a.$N=Boolean(n.getDerivedStateFromProps||a.getSnapshotBeforeUpdate);if(a.$SVG=o,a.$L=l,(e.children=a).$BS=!1,a.context=r,a.props===x&&(a.props=t),i)a.state=P(a,t,a.state);else if(h(a.componentWillMount)){a.$BR=!0,a.componentWillMount();var s=a.$PS;if(!g(s)){var u=a.state;if(g(u))a.state=s;else for(var c in s)u[c]=s[c];a.$PS=null}a.$BR=!1}return a.$LI=Oe(a,t,r),a}function He(e){return p(e)?e=E():d(e)?e=_(e,null):f(e)?e=D(e,0,null):16384&e.flags&&(e=A(e)),e}function Qe(e,n,t,r,o,l){var a=e.flags|=16384;481&a?qe(e,n,t,r,o,l):4&a?Je(e,n,t,r,o,l):8&a?Ye(e,n,t,r,o,l):512&a||16&a?Ke(e,n,o):8192&a?Ge(e,n,t,r,o,l):1024&a&&Xe(e,t,n,o,l)}function Xe(e,n,t,r,o){Qe(e.children,e.ref,n,!1,null,o);var l=E();Ke(l,t,r),e.dom=l.dom}function Ge(e,n,t,r,o,l){var a=e.children,i=e.childFlags;12&i&&0===a.length&&(i=e.childFlags=2,a=e.children=E()),2===i?Qe(a,n,o,r,o,l):ze(a,n,t,r,o,l)}function Ke(e,n,t){var r=e.dom=document.createTextNode(e.children);g(n)||k(n,r,t)}function qe(e,n,t,r,o,l){var a=e.flags,i=e.props,s=e.className,u=e.ref,c=e.children,f=e.childFlags;r=r||0<(32&a);var d=$(e.type,r);if(e.dom=d,b(s)||""===s||(r?d.setAttribute("class",s):d.className=s),16===f)M(d,c);else if(1!==f){var p=r&&"foreignObject"!==e.type;2===f?(16384&c.flags&&(e.children=c=A(c)),Qe(c,d,t,p,null,l)):8!==f&&4!==f||ze(c,d,t,p,null,l)}g(n)||k(n,d,o),g(i)||Re(e,a,i,d,r),Me(u,d,l)}function ze(e,n,t,r,o,l){for(var a=0,i=e.length;a<i;++a){var s=e[a];16384&s.flags&&(e[a]=s=A(s)),Qe(s,n,t,r,o,l)}}function Je(e,n,t,r,o,l){var a=je(e,e.type,e.props||x,t,r,l);Qe(a.$LI,n,a.$CX,r,o,l),en(e.ref,a,l)}function Ye(e,n,t,r,o,l){var a=e.type,i=e.props||x,s=e.ref,u=He(32768&e.flags?a(i,s,t):a(i,t));Qe(e.children=u,n,t,r,o,l),tn(i,s,e,l)}function Ze(e){return function(){e.componentDidMount()}}function en(e,n,t){Me(e,n,t),h(n.componentDidMount)&&t.push(Ze(n))}function nn(e,n,t){return function(){e.onComponentDidMount(U(n,!0),t)}}function tn(e,n,t,r){b(n)||(h(n.onComponentWillMount)&&n.onComponentWillMount(e),h(n.onComponentDidMount)&&r.push(nn(n,t,e)))}function rn(e,n,t,r,o,l){Ie(e),0!=(n.flags&e.flags&2033)?(Qe(n,null,r,o,null,l),c(t,n.dom,e.dom)):(Qe(n,t,r,o,U(e,!0),l),F(e,t))}function on(e,n,t,r,o,l,a){var i=n.flags|=16384;e.flags!==i||e.type!==n.type||e.key!==n.key||0!=(2048&i)?16384&e.flags?rn(e,n,t,r,o,a):Qe(n,t,r,o,l,a):481&i?cn(e,n,r,o,i,a):4&i?hn(e,n,t,r,o,l,a):8&i?gn(e,n,t,r,o,l,a):16&i?mn(e,n):512&i?n.dom=e.dom:8192&i?sn(e,n,t,r,o,a):un(e,n,r,a)}function ln(e,n,t){e!==n&&(""!==e?t.firstChild.nodeValue=n:M(t,n))}function an(e,n){e.textContent!==n&&(e.textContent=n)}function sn(e,n,t,r,o,l){var a=e.children,i=n.children,s=e.childFlags,u=n.childFlags,c=null;12&u&&0===i.length&&(u=n.childFlags=2,i=n.children=E());var f=0!=(2&u);if(12&s){var d=a.length;(8&s&&8&u||f||!f&&i.length>d)&&(c=U(a[d-1],!1).nextSibling)}dn(s,u,a,i,t,r,o,c,e,l)}function un(e,n,t,r){var o=e.ref,l=n.ref,a=n.children;if(dn(e.childFlags,n.childFlags,e.children,a,o,t,!1,null,e,r),n.dom=e.dom,o!==l&&!p(a)){var i=a.dom;C(o,i),u(l,i)}}function cn(e,n,t,r,o,l){var a,i=e.dom,s=e.props,u=n.props,c=!1,f=!1;if(n.dom=i,r=r||0<(32&o),s!==u){var d=s||x;if((a=u||x)!==x)for(var p in(c=0<(448&o))&&(f=we(a)),a){var v=d[p],h=a[p];v!==h&&We(p,v,h,i,r,f,e)}if(d!==x)for(var g in d)b(a[g])&&!b(d[g])&&We(g,d[g],null,i,r,f,e)}var m=n.children,y=n.className;e.className!==y&&(b(y)?i.removeAttribute("class"):r?i.setAttribute("class",y):i.className=y),4096&o?an(i,m):dn(e.childFlags,n.childFlags,e.children,m,i,t,r&&"foreignObject"!==n.type,null,e,l),c&&xe(o,n,i,a,!1,f);var k=n.ref,$=e.ref;$!==k&&(Ve($),Me(k,i,l))}function fn(e,n,t,r,o,l){Ie(e),ze(n,t,r,o,U(e,!0),l),F(e,t)}function dn(e,n,t,r,o,l,a,i,s,u){switch(e){case 2:switch(n){case 2:on(t,r,o,l,a,i,u);break;case 1:Le(t,o);break;case 16:Ie(t),M(o,r);break;default:fn(t,r,o,l,a,u)}break;case 1:switch(n){case 2:Qe(r,o,l,a,i,u);break;case 1:break;case 16:M(o,r);break;default:ze(r,o,l,a,i,u)}break;case 16:switch(n){case 16:ln(t,r,o);break;case 2:_e(o),Qe(r,o,l,a,i,u);break;case 1:_e(o);break;default:_e(o),ze(r,o,l,a,i,u)}break;default:switch(n){case 16:Be(t),M(o,r);break;case 2:De(o,s,t),Qe(r,o,l,a,i,u);break;case 1:De(o,s,t);break;default:var c=0|t.length,f=0|r.length;0===c?0<f&&ze(r,o,l,a,i,u):0===f?De(o,s,t):8===n&&8===e?kn(t,r,o,l,a,c,f,i,s,u):yn(t,r,o,l,a,c,f,i,u)}}}function pn(e,n,t,r,o){o.push(function(){e.componentDidUpdate(n,t,r)})}function vn(e,n,t,r,o,l,a,i,s){var u=e.state,c=e.props,f=Boolean(e.$N),d=h(e.shouldComponentUpdate);if(f&&(n=P(e,t,n!==u?y(u,n):n)),a||!d||d&&e.shouldComponentUpdate(t,n,o)){!f&&h(e.componentWillUpdate)&&e.componentWillUpdate(t,n,o),e.props=t,e.state=n,e.context=o;var p=null,v=Oe(e,t,o);f&&h(e.getSnapshotBeforeUpdate)&&(p=e.getSnapshotBeforeUpdate(c,u)),on(e.$LI,v,r,e.$CX,l,i,s),e.$LI=v,h(e.componentDidUpdate)&&pn(e,c,u,p,s)}else e.props=t,e.state=n,e.context=o}function hn(e,n,t,r,o,l,a){var i=n.children=e.children;if(!g(i)){i.$L=a;var s=n.props||x,u=n.ref,c=e.ref,f=i.state;if(!i.$N){if(h(i.componentWillReceiveProps)){if(i.$BR=!0,i.componentWillReceiveProps(s,r),i.$UN)return;i.$BR=!1}g(i.$PS)||(f=y(f,i.$PS),i.$PS=null)}vn(i,f,s,t,r,o,!1,l,a),c!==u&&(Ve(c),Me(u,i,a))}}function gn(e,n,t,r,o,l,a){var i=!0,s=n.props||x,u=n.ref,c=e.props,f=!b(u),d=e.children;if(f&&h(u.onComponentShouldUpdate)&&(i=u.onComponentShouldUpdate(c,s)),!1!==i){f&&h(u.onComponentWillUpdate)&&u.onComponentWillUpdate(c,s);var p=n.type,v=He(32768&n.flags?p(s,u,r):p(s,r));on(d,v,t,r,o,l,a),n.children=v,f&&h(u.onComponentDidUpdate)&&u.onComponentDidUpdate(c,s)}else n.children=d}function mn(e,n){var t=n.children,r=e.dom;t!==e.children&&(r.nodeValue=t),n.dom=r}function yn(e,n,t,r,o,l,a,i,s){for(var u,c,f=a<l?a:l,d=0;d<f;++d)u=n[d],c=e[d],16384&u.flags&&(u=n[d]=A(u)),on(c,u,t,r,o,i,s),e[d]=u;if(l<a)for(d=f;d<a;++d)16384&(u=n[d]).flags&&(u=n[d]=A(u)),Qe(u,t,r,o,i,s);else if(a<l)for(d=f;d<l;++d)Le(e[d],t)}function kn(e,n,t,r,o,l,a,i,s,u){var c,f,d=l-1,p=a-1,v=0,h=0,g=e[h],m=n[h];e:{for(;g.key===m.key;){if(16384&m.flags&&(n[h]=m=A(m)),on(g,m,t,r,o,i,u),e[h]=m,d<++h||p<h)break e;g=e[h],m=n[h]}for(g=e[d],m=n[p];g.key===m.key;){if(16384&m.flags&&(n[p]=m=A(m)),on(g,m,t,r,o,i,u),e[d]=m,p--,--d<h||p<h)break e;g=e[d],m=n[p]}}if(d<h){if(h<=p)for(f=(c=p+1)<a?U(n[c],!0):i;h<=p;)16384&(m=n[h]).flags&&(n[h]=m=A(m)),++h,Qe(m,t,r,o,f,u)}else if(p<h)for(;h<=d;)Le(e[h++],t);else{var y=h,k=h,$=d-h+1,b=p-h+1,x=new Int32Array(b-v+1);v=b+2;var C=$===l,w=!1,F=0,P=0;if(a<4||($|b)<32)for(v=y;v<=d;++v)if(g=e[v],P<b){for(h=k;h<=p;h++)if(m=n[h],g.key===m.key){if(x[h-k]=v+1,C)for(C=!1;y<v;)Le(e[y++],t);h<F?w=!0:F=h,16384&m.flags&&(n[h]=m=A(m)),on(g,m,t,r,o,i,u),++P;break}!C&&p<h&&Le(g,t)}else C||Le(g,t);else{var N={};for(v=k;v<=p;++v)N[n[v].key]=v;for(v=y;v<=d;++v)if(g=e[v],P<b)if(void 0!==(h=N[g.key])){if(C)for(C=!1;y<v;)Le(e[y++],t);m=n[h],x[h-k]=v+1,h<F?w=!0:F=h,16384&m.flags&&(n[h]=m=A(m)),on(g,m,t,r,o,i,u),++P}else C||Le(g,t);else C||Le(g,t)}if(C)De(t,s,e),ze(n,t,r,o,i,u);else if(w){var S=bn(x);for(h=S.length-1,v=b-1;0<=v;v--)0===x[v]?(16384&(m=n[F=v+k]).flags&&(n[F]=m=A(m)),Qe(m,t,r,o,(c=F+1)<a?U(n[c],!0):i,u)):h<0||v!==S[h]?V(m=n[F=v+k],t,(c=F+1)<a?U(n[c],!0):i):h--}else if(P!==b)for(v=b-1;0<=v;v--)0===x[v]&&(16384&(m=n[F=v+k]).flags&&(n[F]=m=A(m)),Qe(m,t,r,o,(c=F+1)<a?U(n[c],!0):i,u))}}var $n=0;function bn(e){var n=0,t=0,r=0,o=0,l=0,a=0,i=0,s=e.length;for($n<s&&(Pe=new Int32Array($n=s),Ne=new Int32Array(s));t<s;++t)if(0!==(n=e[t])){if(e[r=Pe[o]]<n){Ne[t]=r,Pe[++o]=t;continue}for(l=0,a=o;l<a;)e[Pe[i=l+a>>1]]<n?l=i+1:a=i;n<e[Pe[l]]&&(0<l&&(Ne[t]=Pe[l-1]),Pe[l]=t)}l=t=o+1;var u=new Int32Array(l);for(a=Pe[l-1];0<l--;)u[l]=a,a=Ne[a];for(;0<t--;)Pe[t]=0;return u}var xn="undefined"!=typeof document,Cn=null;function wn(e,n,t,r){var o=[],l=n.$V;N.v=!0,b(l)?b(e)||(16384&e.flags&&(e=A(e)),Qe(e,n,r,!1,null,o),l=n.$V=e):b(e)?(Le(l,n),n.$V=null):(16384&e.flags&&(e=A(e)),on(l,e,n,r,!1,null,o),l=n.$V=e),0<o.length&&w(o),N.v=!1,h(t)&&t(),h(S.renderComplete)&&S.renderComplete(l,n)}function Fn(e,n,t,r){void 0===t&&(t=null),void 0===r&&(r=x),wn(e,n,t,r)}function Pn(o){return function(e,n,t,r){o||(o=e),Fn(n,o,t,r)}}xn&&(Cn=document.body,Node.prototype.$EV=null,Node.prototype.$V=null);var Nn=[],Sn="undefined"!=typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout.bind(window),Un=!1;function Vn(e,n,t,r){var o=e.$PS;if(h(n)&&(n=n(o?y(e.state,o):e.state,e.props,e.context)),b(o))e.$PS=n;else for(var l in n)o[l]=n[l];if(e.$BR)h(t)&&e.$L.push(t.bind(e));else{if(!N.v&&0===Nn.length)return void In(e,r,t);if(-1===Nn.indexOf(e)&&Nn.push(e),Un||(Un=!0,Sn(Ln)),h(t)){var a=e.$QU;a||(a=e.$QU=[]),a.push(t)}}}function Mn(e){for(var n=e.$QU,t=0,r=n.length;t<r;++t)n[t].call(e);e.$QU=null}function Ln(){var e;for(Un=!1;e=Nn.pop();)In(e,!1,e.$QU?Mn.bind(null,e):null)}function In(e,n,t){if(!e.$UN){if(n||!e.$BR){var r=e.$PS;e.$PS=null;var o=[];N.v=!0,vn(e,y(e.state,r),e.props,U(e.$LI,!0).parentNode,e.context,e.$SVG,n,null,o),0<o.length&&w(o),N.v=!1}else e.state=e.$PS,e.$PS=null;h(t)&&t.call(e)}}var Bn=function(e,n){this.state=null,this.$BR=!1,this.$BS=!0,this.$PS=null,this.$LI=null,this.$UN=!1,this.$CX=null,this.$QU=null,this.$N=!1,this.$L=null,this.$SVG=!1,this.props=e||x,this.context=n||x};Bn.prototype.forceUpdate=function(e){this.$UN||Vn(this,{},e,!0)},Bn.prototype.setState=function(e,n){this.$UN||this.$BS||Vn(this,e,n,!1)},Bn.prototype.render=function(e,n,t){return null};var _n="7.1.7";exports.Component=Bn,exports.Fragment=t,exports.EMPTY_OBJ=x,exports.createComponentVNode=e,exports.createFragment=D,exports.createPortal=T,exports.createRef=Fe,exports.createRenderer=Pn,exports.createTextVNode=_,exports.createVNode=o,exports.forwardRef=Se,exports.directClone=A,exports.findDOMfromVNode=U,exports.getFlagsForElementVnode=R,exports.linkEvent=j,exports.normalizeProps=r,exports.options=S,exports.render=Fn,exports.rerender=Ln,exports.version=_n,exports._CI=je,exports._HI=He,exports._M=Qe,exports._MCCC=en,exports._ME=qe,exports._MFCC=tn,exports._MR=Me,exports._MT=Ke,exports._MP=Re,exports.__render=wn;

});
___scope___.file("dist/index.cjs.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
var isArray = Array.isArray;
function isStringOrNumber(o) {
    var type = typeof o;
    return type === 'string' || type === 'number';
}
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
function isFunction(o) {
    return typeof o === 'function';
}
function isString(o) {
    return typeof o === 'string';
}
function isNumber(o) {
    return typeof o === 'number';
}
function isNull(o) {
    return o === null;
}
function isTrue(o) {
    return o === true;
}
function isUndefined(o) {
    return o === void 0;
}
function isObject(o) {
    return typeof o === 'object';
}
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(("Inferno Error: " + message));
}
function warning(message) {
    // tslint:disable-next-line:no-console
    console.error(message);
}
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key$1 in second) {
            out[key$1] = second[key$1];
        }
    }
    return out;
}

// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
var EMPTY_OBJ = {};
var Fragment = '$F';
{
    Object.freeze(EMPTY_OBJ);
}
function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
}
function appendChild(parentDOM, dom) {
    parentDOM.appendChild(dom);
}
function insertOrAppend(parentDOM, newNode, nextNode) {
    if (isNull(nextNode)) {
        appendChild(parentDOM, newNode);
    }
    else {
        parentDOM.insertBefore(newNode, nextNode);
    }
}
function documentCreateElement(tag, isSVG) {
    if (isSVG) {
        return document.createElementNS('http://www.w3.org/2000/svg', tag);
    }
    return document.createElement(tag);
}
function replaceChild(parentDOM, newDom, lastDom) {
    parentDOM.replaceChild(newDom, lastDom);
}
function removeChild(parentDOM, childNode) {
    parentDOM.removeChild(childNode);
}
function callAll(arrayFn) {
    var listener;
    while ((listener = arrayFn.shift()) !== undefined) {
        listener();
    }
}
function findDOMfromVNode(vNode, start) {
    var flags;
    var children;
    while (vNode) {
        flags = vNode.flags;
        if (flags & 2033 /* DOMRef */) {
            return vNode.dom;
        }
        children = vNode.children;
        if (flags & 8192 /* Fragment */) {
            vNode = vNode.childFlags === 2 /* HasVNodeChildren */ ? children : children[start ? 0 : children.length - 1];
        }
        else if (flags & 4 /* ComponentClass */) {
            vNode = children.$LI;
        }
        else {
            vNode = children;
        }
    }
    return null;
}
function removeVNodeDOM(vNode, parentDOM) {
    var flags = vNode.flags;
    if (flags & 2033 /* DOMRef */) {
        removeChild(parentDOM, vNode.dom);
    }
    else {
        var children = vNode.children;
        if (flags & 4 /* ComponentClass */) {
            removeVNodeDOM(children.$LI, parentDOM);
        }
        else if (flags & 8 /* ComponentFunction */) {
            removeVNodeDOM(children, parentDOM);
        }
        else if (flags & 8192 /* Fragment */) {
            if (vNode.childFlags === 2 /* HasVNodeChildren */) {
                removeVNodeDOM(children, parentDOM);
            }
            else {
                for (var i = 0, len = children.length; i < len; ++i) {
                    removeVNodeDOM(children[i], parentDOM);
                }
            }
        }
    }
}
function moveVNodeDOM(vNode, parentDOM, nextNode) {
    var flags = vNode.flags;
    if (flags & 2033 /* DOMRef */) {
        insertOrAppend(parentDOM, vNode.dom, nextNode);
    }
    else {
        var children = vNode.children;
        if (flags & 4 /* ComponentClass */) {
            moveVNodeDOM(children.$LI, parentDOM, nextNode);
        }
        else if (flags & 8 /* ComponentFunction */) {
            moveVNodeDOM(children, parentDOM, nextNode);
        }
        else if (flags & 8192 /* Fragment */) {
            if (vNode.childFlags === 2 /* HasVNodeChildren */) {
                moveVNodeDOM(children, parentDOM, nextNode);
            }
            else {
                for (var i = 0, len = children.length; i < len; ++i) {
                    moveVNodeDOM(children[i], parentDOM, nextNode);
                }
            }
        }
    }
}
function getComponentName(instance) {
    // Fallback for IE
    return instance.name || instance.displayName || instance.constructor.name || (instance.toString().match(/^function\s*([^\s(]+)/) || [])[1];
}
function createDerivedState(instance, nextProps, state) {
    if (instance.constructor.getDerivedStateFromProps) {
        return combineFrom(state, instance.constructor.getDerivedStateFromProps(nextProps, state));
    }
    return state;
}
var renderCheck = {
    v: false
};
var options = {
    componentComparator: null,
    createVNode: null,
    renderComplete: null
};
function setTextContent(dom, children) {
    dom.textContent = children;
}
function isSameLinkEvent(lastValue, nextValue) {
    return (lastValue &&
        nextValue &&
        isObject(lastValue) &&
        isObject(nextValue) &&
        lastValue.event === nextValue.event &&
        lastValue.data === nextValue.data);
}

function getTagName(input) {
    var tagName;
    if (isArray(input)) {
        var arrayText = input.length > 3 ? input.slice(0, 3).toString() + ',...' : input.toString();
        tagName = 'Array(' + arrayText + ')';
    }
    else if (isStringOrNumber(input)) {
        tagName = 'Text(' + input + ')';
    }
    else if (isInvalid(input)) {
        tagName = 'InvalidVNode(' + input + ')';
    }
    else {
        var flags = input.flags;
        if (flags & 481 /* Element */) {
            tagName = "<" + (input.type) + (input.className ? ' class="' + input.className + '"' : '') + ">";
        }
        else if (flags & 16 /* Text */) {
            tagName = "Text(" + (input.children) + ")";
        }
        else if (flags & 1024 /* Portal */) {
            tagName = "Portal*";
        }
        else {
            tagName = "<" + (getComponentName(input.type)) + " />";
        }
    }
    return '>> ' + tagName + '\n';
}
function DEV_ValidateKeys(vNodeTree, forceKeyed) {
    var foundKeys = {};
    for (var i = 0, len = vNodeTree.length; i < len; ++i) {
        var childNode = vNodeTree[i];
        if (isArray(childNode)) {
            return 'Encountered ARRAY in mount, array must be flattened, or normalize used. Location: \n' + getTagName(childNode);
        }
        if (isInvalid(childNode)) {
            if (forceKeyed) {
                return 'Encountered invalid node when preparing to keyed algorithm. Location: \n' + getTagName(childNode);
            }
            else if (Object.keys(foundKeys).length !== 0) {
                return 'Encountered invalid node with mixed keys. Location: \n' + getTagName(childNode);
            }
            continue;
        }
        if (typeof childNode === 'object') {
            if (childNode.isValidated) {
                continue;
            }
            childNode.isValidated = true;
        }
        // Key can be undefined, null too. But typescript complains for no real reason
        var key = childNode.key;
        if (!isNullOrUndef(key) && !isStringOrNumber(key)) {
            return 'Encountered child vNode where key property is not string or number. Location: \n' + getTagName(childNode);
        }
        var children = childNode.children;
        var childFlags = childNode.childFlags;
        if (!isInvalid(children)) {
            var val = (void 0);
            if (childFlags & 12 /* MultipleChildren */) {
                val = DEV_ValidateKeys(children, (childFlags & 8 /* HasKeyedChildren */) !== 0);
            }
            else if (childFlags === 2 /* HasVNodeChildren */) {
                val = DEV_ValidateKeys([children], false);
            }
            if (val) {
                val += getTagName(childNode);
                return val;
            }
        }
        if (forceKeyed && isNullOrUndef(key)) {
            return ('Encountered child without key during keyed algorithm. If this error points to Array make sure children is flat list. Location: \n' +
                getTagName(childNode));
        }
        else if (!forceKeyed && isNullOrUndef(key)) {
            if (Object.keys(foundKeys).length !== 0) {
                return 'Encountered children with key missing. Location: \n' + getTagName(childNode);
            }
            continue;
        }
        if (foundKeys[key]) {
            return 'Encountered two children with same key: {' + key + '}. Location: \n' + getTagName(childNode);
        }
        foundKeys[key] = true;
    }
}
function validateVNodeElementChildren(vNode) {
    {
        if (vNode.childFlags === 1 /* HasInvalidChildren */) {
            return;
        }
        if (vNode.flags & 64 /* InputElement */) {
            throwError("input elements can't have children.");
        }
        if (vNode.flags & 128 /* TextareaElement */) {
            throwError("textarea elements can't have children.");
        }
        if (vNode.flags & 481 /* Element */) {
            var voidTypes = {
                area: true,
                base: true,
                br: true,
                col: true,
                command: true,
                embed: true,
                hr: true,
                img: true,
                input: true,
                keygen: true,
                link: true,
                meta: true,
                param: true,
                source: true,
                track: true,
                wbr: true
            };
            var tag = vNode.type.toLowerCase();
            if (tag === 'media') {
                throwError("media elements can't have children.");
            }
            if (voidTypes[tag]) {
                throwError((tag + " elements can't have children."));
            }
        }
    }
}
function validateKeys(vNode) {
    {
        // Checks if there is any key missing or duplicate keys
        if (vNode.isValidated === false && vNode.children && vNode.flags & 481 /* Element */) {
            var error = DEV_ValidateKeys(Array.isArray(vNode.children) ? vNode.children : [vNode.children], (vNode.childFlags & 8 /* HasKeyedChildren */) > 0);
            if (error) {
                throwError(error + getTagName(vNode));
            }
        }
        vNode.isValidated = true;
    }
}
function throwIfObjectIsNotVNode(input) {
    if (!isNumber(input.flags)) {
        throwError(("normalization received an object that's not a valid VNode, you should stringify it first or fix createVNode flags. Object: \"" + (JSON.stringify(input)) + "\"."));
    }
}

var keyPrefix = '$';
function V(childFlags, children, className, flags, key, props, ref, type) {
    {
        this.isValidated = false;
    }
    this.childFlags = childFlags;
    this.children = children;
    this.className = className;
    this.dom = null;
    this.flags = flags;
    this.key = key === void 0 ? null : key;
    this.props = props === void 0 ? null : props;
    this.ref = ref === void 0 ? null : ref;
    this.type = type;
}
function createVNode(flags, type, className, children, childFlags, props, key, ref) {
    {
        if (flags & 14 /* Component */) {
            throwError('Creating Component vNodes using createVNode is not allowed. Use Inferno.createComponentVNode method.');
        }
    }
    var childFlag = childFlags === void 0 ? 1 /* HasInvalidChildren */ : childFlags;
    var vNode = new V(childFlag, children, className, flags, key, props, ref, type);
    var optsVNode = options.createVNode;
    if (isFunction(optsVNode)) {
        optsVNode(vNode);
    }
    if (childFlag === 0 /* UnknownChildren */) {
        normalizeChildren(vNode, vNode.children);
    }
    {
        validateVNodeElementChildren(vNode);
    }
    return vNode;
}
function createComponentVNode(flags, type, props, key, ref) {
    {
        if (flags & 1 /* HtmlElement */) {
            throwError('Creating element vNodes using createComponentVNode is not allowed. Use Inferno.createVNode method.');
        }
    }
    if ((flags & 2 /* ComponentUnknown */) !== 0) {
        if (type.prototype && type.prototype.render) {
            flags = 4 /* ComponentClass */;
        }
        else if (type.render) {
            flags = 32776 /* ForwardRefComponent */;
            type = type.render;
        }
        else {
            flags = 8 /* ComponentFunction */;
        }
    }
    // set default props
    var defaultProps = type.defaultProps;
    if (!isNullOrUndef(defaultProps)) {
        if (!props) {
            props = {}; // Props can be referenced and modified at application level so always create new object
        }
        for (var prop in defaultProps) {
            if (isUndefined(props[prop])) {
                props[prop] = defaultProps[prop];
            }
        }
    }
    if ((flags & 8 /* ComponentFunction */) > 0 && (flags & 32768 /* ForwardRef */) === 0) {
        var defaultHooks = type.defaultHooks;
        if (!isNullOrUndef(defaultHooks)) {
            if (!ref) {
                // As ref cannot be referenced from application level, we can use the same refs object
                ref = defaultHooks;
            }
            else {
                for (var prop$1 in defaultHooks) {
                    if (isUndefined(ref[prop$1])) {
                        ref[prop$1] = defaultHooks[prop$1];
                    }
                }
            }
        }
    }
    var vNode = new V(1 /* HasInvalidChildren */, null, null, flags, key, props, ref, type);
    var optsVNode = options.createVNode;
    if (isFunction(optsVNode)) {
        optsVNode(vNode);
    }
    return vNode;
}
function createTextVNode(text, key) {
    return new V(1 /* HasInvalidChildren */, isNullOrUndef(text) ? '' : text, null, 16 /* Text */, key, null, null, null);
}
function createFragment(children, childFlags, key) {
    var fragment = createVNode(8192 /* Fragment */, 8192 /* Fragment */, null, children, childFlags, null, key, null);
    switch (fragment.childFlags) {
        case 1 /* HasInvalidChildren */:
            fragment.children = createVoidVNode();
            fragment.childFlags = 2 /* HasVNodeChildren */;
            break;
        case 16 /* HasTextChildren */:
            fragment.children = [createTextVNode(children)];
            fragment.childFlags = 4 /* HasNonKeyedChildren */;
            break;
        default:
            break;
    }
    return fragment;
}
function normalizeProps(vNode) {
    var props = vNode.props;
    if (props) {
        var flags = vNode.flags;
        if (flags & 481 /* Element */) {
            if (props.children !== void 0 && isNullOrUndef(vNode.children)) {
                normalizeChildren(vNode, props.children);
            }
            if (props.className !== void 0) {
                vNode.className = props.className || null;
                props.className = undefined;
            }
        }
        if (props.key !== void 0) {
            vNode.key = props.key;
            props.key = undefined;
        }
        if (props.ref !== void 0) {
            if (flags & 8 /* ComponentFunction */) {
                vNode.ref = combineFrom(vNode.ref, props.ref);
            }
            else {
                vNode.ref = props.ref;
            }
            props.ref = undefined;
        }
    }
    return vNode;
}
/*
 * Fragment is different than normal vNode,
 * because when it needs to be cloned we need to clone its children too
 * But not normalize, because otherwise those possibly get KEY and re-mount
 */
function cloneFragment(vNodeToClone) {
    var clonedChildren;
    var oldChildren = vNodeToClone.children;
    var childFlags = vNodeToClone.childFlags;
    if (childFlags === 2 /* HasVNodeChildren */) {
        clonedChildren = directClone(oldChildren);
    }
    else if (childFlags & 12 /* MultipleChildren */) {
        clonedChildren = [];
        for (var i = 0, len = oldChildren.length; i < len; ++i) {
            clonedChildren.push(directClone(oldChildren[i]));
        }
    }
    return createFragment(clonedChildren, childFlags, vNodeToClone.key);
}
function directClone(vNodeToClone) {
    var flags = vNodeToClone.flags & -16385 /* ClearInUse */;
    var props = vNodeToClone.props;
    if (flags & 14 /* Component */) {
        if (!isNull(props)) {
            var propsToClone = props;
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
    }
    if ((flags & 8192 /* Fragment */) === 0) {
        return new V(vNodeToClone.childFlags, vNodeToClone.children, vNodeToClone.className, flags, vNodeToClone.key, props, vNodeToClone.ref, vNodeToClone.type);
    }
    return cloneFragment(vNodeToClone);
}
function createVoidVNode() {
    return createTextVNode('', null);
}
function createPortal(children, container) {
    return createVNode(1024 /* Portal */, 1024 /* Portal */, null, children, 0 /* UnknownChildren */, null, isInvalid(children) ? null : children.key, container);
}
function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
        var n = nodes[index];
        if (!isInvalid(n)) {
            var newKey = currentKey + keyPrefix + index;
            if (isArray(n)) {
                _normalizeVNodes(n, result, 0, newKey);
            }
            else {
                if (isStringOrNumber(n)) {
                    n = createTextVNode(n, newKey);
                }
                else {
                    {
                        throwIfObjectIsNotVNode(n);
                    }
                    var oldKey = n.key;
                    var isPrefixedKey = isString(oldKey) && oldKey[0] === keyPrefix;
                    if (n.flags & 81920 /* InUseOrNormalized */ || isPrefixedKey) {
                        n = directClone(n);
                    }
                    n.flags |= 65536 /* Normalized */;
                    if (isNull(oldKey) || isPrefixedKey) {
                        n.key = newKey;
                    }
                    else {
                        n.key = currentKey + oldKey;
                    }
                }
                result.push(n);
            }
        }
    }
}
function getFlagsForElementVnode(type) {
    switch (type) {
        case 'svg':
            return 32 /* SvgElement */;
        case 'input':
            return 64 /* InputElement */;
        case 'select':
            return 256 /* SelectElement */;
        case 'textarea':
            return 128 /* TextareaElement */;
        case Fragment:
            return 8192 /* Fragment */;
        default:
            return 1 /* HtmlElement */;
    }
}
function normalizeChildren(vNode, children) {
    var newChildren;
    var newChildFlags = 1 /* HasInvalidChildren */;
    // Don't change children to match strict equal (===) true in patching
    if (isInvalid(children)) {
        newChildren = children;
    }
    else if (isStringOrNumber(children)) {
        newChildFlags = 16 /* HasTextChildren */;
        newChildren = children;
    }
    else if (isArray(children)) {
        var len = children.length;
        for (var i = 0; i < len; ++i) {
            var n = children[i];
            if (isInvalid(n) || isArray(n)) {
                newChildren = newChildren || children.slice(0, i);
                _normalizeVNodes(children, newChildren, i, '');
                break;
            }
            else if (isStringOrNumber(n)) {
                newChildren = newChildren || children.slice(0, i);
                newChildren.push(createTextVNode(n, keyPrefix + i));
            }
            else {
                {
                    throwIfObjectIsNotVNode(n);
                }
                var key = n.key;
                var needsCloning = (n.flags & 81920 /* InUseOrNormalized */) > 0;
                var isNullKey = isNull(key);
                var isPrefixed = !isNullKey && isString(key) && key[0] === keyPrefix;
                if (needsCloning || isNullKey || isPrefixed) {
                    newChildren = newChildren || children.slice(0, i);
                    if (needsCloning || isPrefixed) {
                        n = directClone(n);
                    }
                    if (isNullKey || isPrefixed) {
                        n.key = keyPrefix + i;
                    }
                    newChildren.push(n);
                }
                else if (newChildren) {
                    newChildren.push(n);
                }
                n.flags |= 65536 /* Normalized */;
            }
        }
        newChildren = newChildren || children;
        if (newChildren.length === 0) {
            newChildFlags = 1 /* HasInvalidChildren */;
        }
        else {
            newChildFlags = 8 /* HasKeyedChildren */;
        }
    }
    else {
        newChildren = children;
        newChildren.flags |= 65536 /* Normalized */;
        if (children.flags & 81920 /* InUseOrNormalized */) {
            newChildren = directClone(children);
        }
        newChildFlags = 2 /* HasVNodeChildren */;
    }
    vNode.children = newChildren;
    vNode.childFlags = newChildFlags;
    return vNode;
}

/**
 * Links given data to event as first parameter
 * @param {*} data data to be linked, it will be available in function as first parameter
 * @param {Function} event Function to be called when event occurs
 * @returns {{data: *, event: Function}}
 */
function linkEvent(data, event) {
    if (isFunction(event)) {
        return { data: data, event: event };
    }
    return null; // Return null when event is invalid, to avoid creating unnecessary event handlers
}

var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var namespaces = {
    'xlink:actuate': xlinkNS,
    'xlink:arcrole': xlinkNS,
    'xlink:href': xlinkNS,
    'xlink:role': xlinkNS,
    'xlink:show': xlinkNS,
    'xlink:title': xlinkNS,
    'xlink:type': xlinkNS,
    'xml:base': xmlNS,
    'xml:lang': xmlNS,
    'xml:space': xmlNS
};

function getDelegatedEventObject(v) {
    return {
        onClick: v,
        onDblClick: v,
        onFocusIn: v,
        onFocusOut: v,
        onKeyDown: v,
        onKeyPress: v,
        onKeyUp: v,
        onMouseDown: v,
        onMouseMove: v,
        onMouseUp: v,
        onSubmit: v,
        onTouchEnd: v,
        onTouchMove: v,
        onTouchStart: v
    };
}
var attachedEventCounts = getDelegatedEventObject(0);
var attachedEvents = getDelegatedEventObject(null);
var delegatedEvents = getDelegatedEventObject(true);
function handleEvent(name, nextEvent, dom) {
    var eventsObject = dom.$EV;
    if (nextEvent) {
        if (attachedEventCounts[name] === 0) {
            attachedEvents[name] = attachEventToDocument(name);
        }
        if (!eventsObject) {
            eventsObject = dom.$EV = getDelegatedEventObject(null);
        }
        if (!eventsObject[name]) {
            ++attachedEventCounts[name];
        }
        eventsObject[name] = nextEvent;
    }
    else if (eventsObject && eventsObject[name]) {
        if (--attachedEventCounts[name] === 0) {
            document.removeEventListener(normalizeEventName(name), attachedEvents[name]);
            attachedEvents[name] = null;
        }
        eventsObject[name] = null;
    }
}
function dispatchEvents(event, target, isClick, name, eventData) {
    var dom = target;
    while (!isNull(dom)) {
        // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
        // because the event listener is on document.body
        // Don't process clicks on disabled elements
        if (isClick && dom.disabled) {
            return;
        }
        var eventsObject = dom.$EV;
        if (eventsObject) {
            var currentEvent = eventsObject[name];
            if (currentEvent) {
                // linkEvent object
                eventData.dom = dom;
                if (currentEvent.event) {
                    currentEvent.event(currentEvent.data, event);
                }
                else {
                    currentEvent(event);
                }
                if (event.cancelBubble) {
                    return;
                }
            }
        }
        dom = dom.parentNode;
    }
}
function stopPropagation() {
    this.cancelBubble = true;
    if (!this.immediatePropagationStopped) {
        this.stopImmediatePropagation();
    }
}
function isDefaultPrevented() {
    return this.defaultPrevented;
}
function isPropagationStopped() {
    return this.cancelBubble;
}
function attachEventToDocument(name) {
    var docEvent = function (event) {
        var isClick = name === 'onClick' || name === 'onDblClick';
        if (isClick && event.button !== 0) {
            // Firefox incorrectly triggers click event for mid/right mouse buttons.
            // This bug has been active for 12 years.
            // https://bugzilla.mozilla.org/show_bug.cgi?id=184051
            event.stopPropagation();
            return;
        }
        event.isDefaultPrevented = isDefaultPrevented;
        event.isPropagationStopped = isPropagationStopped;
        event.stopPropagation = stopPropagation;
        // Event data needs to be object to save reference to currentTarget getter
        var eventData = {
            dom: document
        };
        Object.defineProperty(event, 'currentTarget', {
            configurable: true,
            get: function get() {
                return eventData.dom;
            }
        });
        dispatchEvents(event, event.target, isClick, name, eventData);
    };
    document.addEventListener(normalizeEventName(name), docEvent);
    return docEvent;
}

function isSameInnerHTML(dom, innerHTML) {
    var tempdom = document.createElement('i');
    tempdom.innerHTML = innerHTML;
    return tempdom.innerHTML === dom.innerHTML;
}

function triggerEventListener(props, methodName, e) {
    if (props[methodName]) {
        var listener = props[methodName];
        if (listener.event) {
            listener.event(listener.data, e);
        }
        else {
            listener(e);
        }
    }
    else {
        var nativeListenerName = methodName.toLowerCase();
        if (props[nativeListenerName]) {
            props[nativeListenerName](e);
        }
    }
}
function createWrappedFunction(methodName, applyValue) {
    var fnMethod = function (e) {
        var vNode = this.$V;
        // If vNode is gone by the time event fires, no-op
        if (!vNode) {
            return;
        }
        var props = vNode.props || EMPTY_OBJ;
        var dom = vNode.dom;
        if (isString(methodName)) {
            triggerEventListener(props, methodName, e);
        }
        else {
            for (var i = 0; i < methodName.length; ++i) {
                triggerEventListener(props, methodName[i], e);
            }
        }
        if (isFunction(applyValue)) {
            var newVNode = this.$V;
            var newProps = newVNode.props || EMPTY_OBJ;
            applyValue(newProps, dom, false, newVNode);
        }
    };
    Object.defineProperty(fnMethod, 'wrapped', {
        configurable: false,
        enumerable: false,
        value: true,
        writable: false
    });
    return fnMethod;
}

function attachEvent(dom, event, handler) {
    var previousKey = "$" + event;
    var previousArgs = dom[previousKey];
    if (previousArgs && previousArgs[1].wrapped) {
        return;
    }
    if (previousArgs) {
        dom.removeEventListener.apply(dom, previousArgs);
        dom[previousKey] = null;
    }
    if (isFunction(handler)) {
        dom.addEventListener(event, handler);
        dom[previousKey] = [event, handler];
    }
}

function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
}
var onTextInputChange = createWrappedFunction('onInput', applyValueInput);
var wrappedOnChange = createWrappedFunction(['onClick', 'onChange'], applyValueInput);
/* tslint:disable-next-line:no-empty */
function emptywrapper(event) {
    event.stopPropagation();
}
emptywrapper.wrapped = true;
function inputEvents(dom, nextPropsOrEmpty) {
    if (isCheckedType(nextPropsOrEmpty.type)) {
        attachEvent(dom, 'change', wrappedOnChange);
        attachEvent(dom, 'click', emptywrapper);
    }
    else {
        attachEvent(dom, 'input', onTextInputChange);
    }
}
function applyValueInput(nextPropsOrEmpty, dom) {
    var type = nextPropsOrEmpty.type;
    var value = nextPropsOrEmpty.value;
    var checked = nextPropsOrEmpty.checked;
    var multiple = nextPropsOrEmpty.multiple;
    var defaultValue = nextPropsOrEmpty.defaultValue;
    var hasValue = !isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute('type', type);
    }
    if (!isNullOrUndef(multiple) && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + '';
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
    else {
        if (hasValue && dom.value !== value) {
            dom.defaultValue = value;
            dom.value = value;
        }
        else if (!isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}

function updateChildOptions(vNode, value) {
    if (vNode.type === 'option') {
        updateChildOption(vNode, value);
    }
    else {
        var children = vNode.children;
        var flags = vNode.flags;
        if (flags & 4 /* ComponentClass */) {
            updateChildOptions(children.$LI, value);
        }
        else if (flags & 8 /* ComponentFunction */) {
            updateChildOptions(children, value);
        }
        else if (vNode.childFlags === 2 /* HasVNodeChildren */) {
            updateChildOptions(children, value);
        }
        else if (vNode.childFlags & 12 /* MultipleChildren */) {
            for (var i = 0, len = children.length; i < len; ++i) {
                updateChildOptions(children[i], value);
            }
        }
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || EMPTY_OBJ;
    var dom = vNode.dom;
    // we do this as multiple may have changed
    dom.value = props.value;
    if (props.value === value || (isArray(value) && value.indexOf(props.value) !== -1)) {
        dom.selected = true;
    }
    else if (!isNullOrUndef(value) || !isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
var onSelectChange = createWrappedFunction('onChange', applyValueSelect);
function selectEvents(dom) {
    attachEvent(dom, 'change', onSelectChange);
}
function applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode) {
    var multiplePropInBoolean = Boolean(nextPropsOrEmpty.multiple);
    if (!isNullOrUndef(nextPropsOrEmpty.multiple) && multiplePropInBoolean !== dom.multiple) {
        dom.multiple = multiplePropInBoolean;
    }
    var index = nextPropsOrEmpty.selectedIndex;
    if (index === -1) {
        dom.selectedIndex = -1;
    }
    var childFlags = vNode.childFlags;
    if (childFlags !== 1 /* HasInvalidChildren */) {
        var value = nextPropsOrEmpty.value;
        if (isNumber(index) && index > -1 && dom.options[index]) {
            value = dom.options[index].value;
        }
        if (mounting && isNullOrUndef(value)) {
            value = nextPropsOrEmpty.defaultValue;
        }
        updateChildOptions(vNode, value);
    }
}

var onTextareaInputChange = createWrappedFunction('onInput', applyValueTextArea);
var wrappedOnChange$1 = createWrappedFunction('onChange');
function textAreaEvents(dom, nextPropsOrEmpty) {
    attachEvent(dom, 'input', onTextareaInputChange);
    if (nextPropsOrEmpty.onChange) {
        attachEvent(dom, 'change', wrappedOnChange$1);
    }
}
function applyValueTextArea(nextPropsOrEmpty, dom, mounting) {
    var value = nextPropsOrEmpty.value;
    var domValue = dom.value;
    if (isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = nextPropsOrEmpty.defaultValue;
            if (!isNullOrUndef(defaultValue) && defaultValue !== domValue) {
                dom.defaultValue = defaultValue;
                dom.value = defaultValue;
            }
        }
    }
    else if (domValue !== value) {
        /* There is value so keep it controlled */
        dom.defaultValue = value;
        dom.value = value;
    }
}

/**
 * There is currently no support for switching same input between controlled and nonControlled
 * If that ever becomes a real issue, then re design controlled elements
 * Currently user must choose either controlled or non-controlled and stick with that
 */
function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    if (flags & 64 /* InputElement */) {
        applyValueInput(nextPropsOrEmpty, dom);
    }
    else if (flags & 256 /* SelectElement */) {
        applyValueSelect(nextPropsOrEmpty, dom, mounting, vNode);
    }
    else if (flags & 128 /* TextareaElement */) {
        applyValueTextArea(nextPropsOrEmpty, dom, mounting);
    }
    if (isControlled) {
        dom.$V = vNode;
    }
}
function addFormElementEventHandlers(flags, dom, nextPropsOrEmpty) {
    if (flags & 64 /* InputElement */) {
        inputEvents(dom, nextPropsOrEmpty);
    }
    else if (flags & 256 /* SelectElement */) {
        selectEvents(dom);
    }
    else if (flags & 128 /* TextareaElement */) {
        textAreaEvents(dom, nextPropsOrEmpty);
    }
}
function isControlledFormElement(nextPropsOrEmpty) {
    return nextPropsOrEmpty.type && isCheckedType(nextPropsOrEmpty.type) ? !isNullOrUndef(nextPropsOrEmpty.checked) : !isNullOrUndef(nextPropsOrEmpty.value);
}

function createRef() {
    return {
        current: null
    };
}
var forwardRef = function (render) {
        if (!isFunction(render)) {
            warning(("forwardRef requires a render function but was given " + (render === null ? 'null' : typeof render) + "."));
            return;
        }
        var fwRef = {
            render: render
        };
        Object.seal(fwRef);
        return fwRef;
    };
function pushRef(dom, value, lifecycle) {
    lifecycle.push(function () {
        value(dom);
    });
}
function unmountRef(ref) {
    if (ref) {
        if (isFunction(ref)) {
            ref(null);
        }
        else if (ref.current) {
            ref.current = null;
        }
    }
}
function mountRef(ref, value, lifecycle) {
    if (ref) {
        if (isFunction(ref)) {
            pushRef(value, ref, lifecycle);
        }
        else if (ref.current !== void 0) {
            ref.current = value;
        }
    }
}

function remove(vNode, parentDOM) {
    unmount(vNode);
    if (parentDOM) {
        removeVNodeDOM(vNode, parentDOM);
    }
}
function unmount(vNode) {
    var flags = vNode.flags;
    var children = vNode.children;
    var ref;
    if (flags & 481 /* Element */) {
        ref = vNode.ref;
        var props = vNode.props;
        unmountRef(ref);
        var childFlags = vNode.childFlags;
        if (!isNull(props)) {
            var keys = Object.keys(props);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                if (delegatedEvents[key]) {
                    handleEvent(key, null, vNode.dom);
                }
            }
        }
        if (childFlags & 12 /* MultipleChildren */) {
            unmountAllChildren(children);
        }
        else if (childFlags === 2 /* HasVNodeChildren */) {
            unmount(children);
        }
    }
    else if (children) {
        if (flags & 4 /* ComponentClass */) {
            if (isFunction(children.componentWillUnmount)) {
                children.componentWillUnmount();
            }
            unmountRef(vNode.ref);
            children.$UN = true;
            unmount(children.$LI);
        }
        else if (flags & 8 /* ComponentFunction */) {
            ref = vNode.ref;
            if (!isNullOrUndef(ref) && isFunction(ref.onComponentWillUnmount)) {
                ref.onComponentWillUnmount(findDOMfromVNode(vNode, true), vNode.props || EMPTY_OBJ);
            }
            unmount(children);
        }
        else if (flags & 1024 /* Portal */) {
            remove(children, vNode.ref);
        }
        else if (flags & 8192 /* Fragment */) {
            if (vNode.childFlags & 12 /* MultipleChildren */) {
                unmountAllChildren(children);
            }
        }
    }
}
function unmountAllChildren(children) {
    for (var i = 0, len = children.length; i < len; ++i) {
        unmount(children[i]);
    }
}
function clearDOM(dom) {
    // Optimization for clearing dom
    dom.textContent = '';
}
function removeAllChildren(dom, vNode, children) {
    unmountAllChildren(children);
    if (vNode.flags & 8192 /* Fragment */) {
        removeVNodeDOM(vNode, dom);
    }
    else {
        clearDOM(dom);
    }
}

function createLinkEvent(linkEvent, nextValue) {
    return function (e) {
        linkEvent(nextValue.data, e);
    };
}
function patchEvent(name, lastValue, nextValue, dom) {
    var event = normalizeEventName(name);
    if (isObject(nextValue) && !isNull(nextValue)) {
        var linkEvent = nextValue.event;
        // Development warning
        {
            if (!isFunction(linkEvent)) {
                throwError(("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent."));
            }
        }
        if (!isSameLinkEvent(lastValue, nextValue)) {
            attachEvent(dom, event, createLinkEvent(linkEvent, nextValue));
        }
    }
    else {
        attachEvent(dom, event, nextValue);
    }
}
// We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    if (isNullOrUndef(nextAttrValue)) {
        dom.removeAttribute('style');
        return;
    }
    var domStyle = dom.style;
    var style;
    var value;
    if (isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    if (!isNullOrUndef(lastAttrValue) && !isString(lastAttrValue)) {
        for (style in nextAttrValue) {
            // do not add a hasOwnProperty check here, it affects performance
            value = nextAttrValue[style];
            if (value !== lastAttrValue[style]) {
                domStyle.setProperty(style, value);
            }
        }
        for (style in lastAttrValue) {
            if (isNullOrUndef(nextAttrValue[style])) {
                domStyle.removeProperty(style);
            }
        }
    }
    else {
        for (style in nextAttrValue) {
            value = nextAttrValue[style];
            domStyle.setProperty(style, value);
        }
    }
}
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode) {
    switch (prop) {
        case 'children':
        case 'childrenType':
        case 'className':
        case 'defaultValue':
        case 'key':
        case 'multiple':
        case 'ref':
            break;
        case 'autoFocus':
            dom.autofocus = !!nextValue;
            break;
        case 'allowfullscreen':
        case 'autoplay':
        case 'capture':
        case 'checked':
        case 'controls':
        case 'default':
        case 'disabled':
        case 'hidden':
        case 'indeterminate':
        case 'loop':
        case 'muted':
        case 'novalidate':
        case 'open':
        case 'readOnly':
        case 'required':
        case 'reversed':
        case 'scoped':
        case 'seamless':
        case 'selected':
            dom[prop] = !!nextValue;
            break;
        case 'defaultChecked':
        case 'value':
        case 'volume':
            if (hasControlledValue && prop === 'value') {
                break;
            }
            var value = isNullOrUndef(nextValue) ? '' : nextValue;
            if (dom[prop] !== value) {
                dom[prop] = value;
            }
            break;
        case 'style':
            patchStyle(lastValue, nextValue, dom);
            break;
        case 'dangerouslySetInnerHTML':
            var lastHtml = (lastValue && lastValue.__html) || '';
            var nextHtml = (nextValue && nextValue.__html) || '';
            if (lastHtml !== nextHtml) {
                if (!isNullOrUndef(nextHtml) && !isSameInnerHTML(dom, nextHtml)) {
                    if (!isNull(lastVNode)) {
                        if (lastVNode.childFlags & 12 /* MultipleChildren */) {
                            unmountAllChildren(lastVNode.children);
                        }
                        else if (lastVNode.childFlags === 2 /* HasVNodeChildren */) {
                            unmount(lastVNode.children);
                        }
                        lastVNode.children = null;
                        lastVNode.childFlags = 1 /* HasInvalidChildren */;
                    }
                    dom.innerHTML = nextHtml;
                }
            }
            break;
        default:
            if (delegatedEvents[prop]) {
                if (!isSameLinkEvent(lastValue, nextValue)) {
                    handleEvent(prop, nextValue, dom);
                }
            }
            else if (prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110) {
                patchEvent(prop, lastValue, nextValue, dom);
            }
            else if (isNullOrUndef(nextValue)) {
                dom.removeAttribute(prop);
            }
            else if (isSVG && namespaces[prop]) {
                // We optimize for isSVG being false
                // If we end up in this path we can read property again
                dom.setAttributeNS(namespaces[prop], prop, nextValue);
            }
            else {
                dom.setAttribute(prop, nextValue);
            }
            break;
    }
}
function mountProps(vNode, flags, props, dom, isSVG) {
    var hasControlledValue = false;
    var isFormElement = (flags & 448 /* FormElement */) > 0;
    if (isFormElement) {
        hasControlledValue = isControlledFormElement(props);
        if (hasControlledValue) {
            addFormElementEventHandlers(flags, dom, props);
        }
    }
    for (var prop in props) {
        // do not add a hasOwnProperty check here, it affects performance
        patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue, null);
    }
    if (isFormElement) {
        processElement(flags, vNode, dom, props, true, hasControlledValue);
    }
}

function warnAboutOldLifecycles(component) {
    var oldLifecycles = [];
    if (component.componentWillMount) {
        oldLifecycles.push('componentWillMount');
    }
    if (component.componentWillReceiveProps) {
        oldLifecycles.push('componentWillReceiveProps');
    }
    if (component.componentWillUpdate) {
        oldLifecycles.push('componentWillUpdate');
    }
    if (oldLifecycles.length > 0) {
        warning(("\n      Warning: Unsafe legacy lifecycles will not be called for components using new component APIs.\n      " + (getComponentName(component)) + " contains the following legacy lifecycles:\n      " + (oldLifecycles.join('\n')) + "\n      The above lifecycles should be removed.\n    "));
    }
}
function renderNewInput(instance, props, context) {
    var nextInput = handleComponentInput(instance.render(props, instance.state, context));
    var childContext = context;
    if (isFunction(instance.getChildContext)) {
        childContext = combineFrom(context, instance.getChildContext());
    }
    instance.$CX = childContext;
    return nextInput;
}
function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
    var instance = new Component(props, context);
    var usesNewAPI = (instance.$N = Boolean(Component.getDerivedStateFromProps || instance.getSnapshotBeforeUpdate));
    instance.$SVG = isSVG;
    instance.$L = lifecycle;
    {
        if (instance.getDerivedStateFromProps) {
            warning(((getComponentName(instance)) + " getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method."));
        }
        if (usesNewAPI) {
            warnAboutOldLifecycles(instance);
        }
    }
    vNode.children = instance;
    instance.$BS = false;
    instance.context = context;
    if (instance.props === EMPTY_OBJ) {
        instance.props = props;
    }
    if (!usesNewAPI) {
        if (isFunction(instance.componentWillMount)) {
            instance.$BR = true;
            instance.componentWillMount();
            var pending = instance.$PS;
            if (!isNull(pending)) {
                var state = instance.state;
                if (isNull(state)) {
                    instance.state = pending;
                }
                else {
                    for (var key in pending) {
                        state[key] = pending[key];
                    }
                }
                instance.$PS = null;
            }
            instance.$BR = false;
        }
    }
    else {
        instance.state = createDerivedState(instance, props, instance.state);
    }
    instance.$LI = renderNewInput(instance, props, context);
    return instance;
}
function handleComponentInput(input) {
    if (isInvalid(input)) {
        input = createVoidVNode();
    }
    else if (isStringOrNumber(input)) {
        input = createTextVNode(input, null);
    }
    else if (isArray(input)) {
        input = createFragment(input, 0 /* UnknownChildren */, null);
    }
    else if (input.flags & 16384 /* InUse */) {
        input = directClone(input);
    }
    return input;
}

function mount(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var flags = (vNode.flags |= 16384 /* InUse */);
    if (flags & 481 /* Element */) {
        mountElement(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
    }
    else if (flags & 4 /* ComponentClass */) {
        mountClassComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
    }
    else if (flags & 8 /* ComponentFunction */) {
        mountFunctionalComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
    }
    else if (flags & 512 /* Void */ || flags & 16 /* Text */) {
        mountText(vNode, parentDOM, nextNode);
    }
    else if (flags & 8192 /* Fragment */) {
        mountFragment(vNode, parentDOM, context, isSVG, nextNode, lifecycle);
    }
    else if (flags & 1024 /* Portal */) {
        mountPortal(vNode, context, parentDOM, nextNode, lifecycle);
    }
    else {
        // Development validation, in production we don't need to throw because it crashes anyway
        if (typeof vNode === 'object') {
            throwError(("mount() received an object that's not a valid VNode, you should stringify it first, fix createVNode flags or call normalizeChildren. Object: \"" + (JSON.stringify(vNode)) + "\"."));
        }
        else {
            throwError(("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
        }
    }
}
function mountPortal(vNode, context, parentDOM, nextNode, lifecycle) {
    mount(vNode.children, vNode.ref, context, false, null, lifecycle);
    var placeHolderVNode = createVoidVNode();
    mountText(placeHolderVNode, parentDOM, nextNode);
    vNode.dom = placeHolderVNode.dom;
}
function mountFragment(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var children = vNode.children;
    var childFlags = vNode.childFlags;
    // When fragment is optimized for multiple children, check if there is no children and change flag to invalid
    // This is the only normalization always done, to keep optimization flags API same for fragments and regular elements
    if (childFlags & 12 /* MultipleChildren */ && children.length === 0) {
        childFlags = vNode.childFlags = 2 /* HasVNodeChildren */;
        children = vNode.children = createVoidVNode();
    }
    if (childFlags === 2 /* HasVNodeChildren */) {
        mount(children, parentDOM, nextNode, isSVG, nextNode, lifecycle);
    }
    else {
        mountArrayChildren(children, parentDOM, context, isSVG, nextNode, lifecycle);
    }
}
function mountText(vNode, parentDOM, nextNode) {
    var dom = (vNode.dom = document.createTextNode(vNode.children));
    if (!isNull(parentDOM)) {
        insertOrAppend(parentDOM, dom, nextNode);
    }
}
function mountElement(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var flags = vNode.flags;
    var props = vNode.props;
    var className = vNode.className;
    var ref = vNode.ref;
    var children = vNode.children;
    var childFlags = vNode.childFlags;
    isSVG = isSVG || (flags & 32 /* SvgElement */) > 0;
    var dom = documentCreateElement(vNode.type, isSVG);
    vNode.dom = dom;
    if (!isNullOrUndef(className) && className !== '') {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    {
        validateKeys(vNode);
    }
    if (childFlags === 16 /* HasTextChildren */) {
        setTextContent(dom, children);
    }
    else if (childFlags !== 1 /* HasInvalidChildren */) {
        var childrenIsSVG = isSVG && vNode.type !== 'foreignObject';
        if (childFlags === 2 /* HasVNodeChildren */) {
            if (children.flags & 16384 /* InUse */) {
                vNode.children = children = directClone(children);
            }
            mount(children, dom, context, childrenIsSVG, null, lifecycle);
        }
        else if (childFlags === 8 /* HasKeyedChildren */ || childFlags === 4 /* HasNonKeyedChildren */) {
            mountArrayChildren(children, dom, context, childrenIsSVG, null, lifecycle);
        }
    }
    if (!isNull(parentDOM)) {
        insertOrAppend(parentDOM, dom, nextNode);
    }
    if (!isNull(props)) {
        mountProps(vNode, flags, props, dom, isSVG);
    }
    {
        if (isString(ref)) {
            throwError('string "refs" are not supported in Inferno 1.0. Use callback ref or Inferno.createRef() API instead.');
        }
    }
    mountRef(ref, dom, lifecycle);
}
function mountArrayChildren(children, dom, context, isSVG, nextNode, lifecycle) {
    for (var i = 0, len = children.length; i < len; ++i) {
        var child = children[i];
        if (child.flags & 16384 /* InUse */) {
            children[i] = child = directClone(child);
        }
        mount(child, dom, context, isSVG, nextNode, lifecycle);
    }
}
function mountClassComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var instance = createClassComponentInstance(vNode, vNode.type, vNode.props || EMPTY_OBJ, context, isSVG, lifecycle);
    mount(instance.$LI, parentDOM, instance.$CX, isSVG, nextNode, lifecycle);
    mountClassComponentCallbacks(vNode.ref, instance, lifecycle);
}
function mountFunctionalComponent(vNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var type = vNode.type;
    var props = vNode.props || EMPTY_OBJ;
    var ref = vNode.ref;
    var input = handleComponentInput(vNode.flags & 32768 /* ForwardRef */ ? type(props, ref, context) : type(props, context));
    vNode.children = input;
    mount(input, parentDOM, context, isSVG, nextNode, lifecycle);
    mountFunctionalComponentCallbacks(props, ref, vNode, lifecycle);
}
function createClassMountCallback(instance) {
    return function () {
        instance.componentDidMount();
    };
}
function mountClassComponentCallbacks(ref, instance, lifecycle) {
    mountRef(ref, instance, lifecycle);
    {
        if (isStringOrNumber(ref)) {
            throwError('string "refs" are not supported in Inferno 1.0. Use callback ref or Inferno.createRef() API instead.');
        }
        else if (!isNullOrUndef(ref) && typeof ref === 'object' && ref.current === void 0) {
            throwError('functional component lifecycle events are not supported on ES2015 class components.');
        }
    }
    if (isFunction(instance.componentDidMount)) {
        lifecycle.push(createClassMountCallback(instance));
    }
}
function createOnMountCallback(ref, vNode, props) {
    return function () {
        ref.onComponentDidMount(findDOMfromVNode(vNode, true), props);
    };
}
function mountFunctionalComponentCallbacks(props, ref, vNode, lifecycle) {
    if (!isNullOrUndef(ref)) {
        if (isFunction(ref.onComponentWillMount)) {
            ref.onComponentWillMount(props);
        }
        if (isFunction(ref.onComponentDidMount)) {
            lifecycle.push(createOnMountCallback(ref, vNode, props));
        }
    }
}

function replaceWithNewNode(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle) {
    unmount(lastVNode);
    if ((nextVNode.flags & lastVNode.flags & 2033 /* DOMRef */) !== 0) {
        // Single DOM operation, when we have dom references available
        mount(nextVNode, null, context, isSVG, null, lifecycle);
        // Single DOM operation, when we have dom references available
        replaceChild(parentDOM, nextVNode.dom, lastVNode.dom);
    }
    else {
        mount(nextVNode, parentDOM, context, isSVG, findDOMfromVNode(lastVNode, true), lifecycle);
        removeVNodeDOM(lastVNode, parentDOM);
    }
}
function patch(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var nextFlags = (nextVNode.flags |= 16384 /* InUse */);
    {
        if (isFunction(options.componentComparator) && lastVNode.flags & nextFlags & 4 /* ComponentClass */) {
            if (options.componentComparator(lastVNode, nextVNode) === false) {
                patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
                return;
            }
        }
    }
    if (lastVNode.flags !== nextFlags || lastVNode.type !== nextVNode.type || lastVNode.key !== nextVNode.key || (nextFlags & 2048 /* ReCreate */) !== 0) {
        if (lastVNode.flags & 16384 /* InUse */) {
            replaceWithNewNode(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle);
        }
        else {
            // Last vNode is not in use, it has crashed at application level. Just mount nextVNode and ignore last one
            mount(nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
        }
    }
    else if (nextFlags & 481 /* Element */) {
        patchElement(lastVNode, nextVNode, context, isSVG, nextFlags, lifecycle);
    }
    else if (nextFlags & 4 /* ComponentClass */) {
        patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
    }
    else if (nextFlags & 8 /* ComponentFunction */) {
        patchFunctionalComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle);
    }
    else if (nextFlags & 16 /* Text */) {
        patchText(lastVNode, nextVNode);
    }
    else if (nextFlags & 512 /* Void */) {
        nextVNode.dom = lastVNode.dom;
    }
    else if (nextFlags & 8192 /* Fragment */) {
        patchFragment(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle);
    }
    else {
        patchPortal(lastVNode, nextVNode, context, lifecycle);
    }
}
function patchSingleTextChild(lastChildren, nextChildren, parentDOM) {
    if (lastChildren !== nextChildren) {
        if (lastChildren !== '') {
            parentDOM.firstChild.nodeValue = nextChildren;
        }
        else {
            setTextContent(parentDOM, nextChildren);
        }
    }
}
function patchContentEditableChildren(dom, nextChildren) {
    if (dom.textContent !== nextChildren) {
        dom.textContent = nextChildren;
    }
}
function patchFragment(lastVNode, nextVNode, parentDOM, context, isSVG, lifecycle) {
    var lastChildren = lastVNode.children;
    var nextChildren = nextVNode.children;
    var lastChildFlags = lastVNode.childFlags;
    var nextChildFlags = nextVNode.childFlags;
    var nextNode = null;
    // When fragment is optimized for multiple children, check if there is no children and change flag to invalid
    // This is the only normalization always done, to keep optimization flags API same for fragments and regular elements
    if (nextChildFlags & 12 /* MultipleChildren */ && nextChildren.length === 0) {
        nextChildFlags = nextVNode.childFlags = 2 /* HasVNodeChildren */;
        nextChildren = nextVNode.children = createVoidVNode();
    }
    var nextIsSingle = (nextChildFlags & 2 /* HasVNodeChildren */) !== 0;
    if (lastChildFlags & 12 /* MultipleChildren */) {
        var lastLen = lastChildren.length;
        // We need to know Fragment's edge node when
        if (
        // It uses keyed algorithm
        (lastChildFlags & 8 /* HasKeyedChildren */ && nextChildFlags & 8 /* HasKeyedChildren */) ||
            // It transforms from many to single
            nextIsSingle ||
            // It will append more nodes
            (!nextIsSingle && nextChildren.length > lastLen)) {
            // When fragment has multiple children there is always at least one vNode
            nextNode = findDOMfromVNode(lastChildren[lastLen - 1], false).nextSibling;
        }
    }
    patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, lastVNode, lifecycle);
}
function patchPortal(lastVNode, nextVNode, context, lifecycle) {
    var lastContainer = lastVNode.ref;
    var nextContainer = nextVNode.ref;
    var nextChildren = nextVNode.children;
    patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, lastContainer, context, false, null, lastVNode, lifecycle);
    nextVNode.dom = lastVNode.dom;
    if (lastContainer !== nextContainer && !isInvalid(nextChildren)) {
        var node = nextChildren.dom;
        removeChild(lastContainer, node);
        appendChild(nextContainer, node);
    }
}
function patchElement(lastVNode, nextVNode, context, isSVG, nextFlags, lifecycle) {
    var dom = lastVNode.dom;
    var lastProps = lastVNode.props;
    var nextProps = nextVNode.props;
    var isFormElement = false;
    var hasControlledValue = false;
    var nextPropsOrEmpty;
    nextVNode.dom = dom;
    isSVG = isSVG || (nextFlags & 32 /* SvgElement */) > 0;
    // inlined patchProps  -- starts --
    if (lastProps !== nextProps) {
        var lastPropsOrEmpty = lastProps || EMPTY_OBJ;
        nextPropsOrEmpty = nextProps || EMPTY_OBJ;
        if (nextPropsOrEmpty !== EMPTY_OBJ) {
            isFormElement = (nextFlags & 448 /* FormElement */) > 0;
            if (isFormElement) {
                hasControlledValue = isControlledFormElement(nextPropsOrEmpty);
            }
            for (var prop in nextPropsOrEmpty) {
                var lastValue = lastPropsOrEmpty[prop];
                var nextValue = nextPropsOrEmpty[prop];
                if (lastValue !== nextValue) {
                    patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue, lastVNode);
                }
            }
        }
        if (lastPropsOrEmpty !== EMPTY_OBJ) {
            for (var prop$1 in lastPropsOrEmpty) {
                if (isNullOrUndef(nextPropsOrEmpty[prop$1]) && !isNullOrUndef(lastPropsOrEmpty[prop$1])) {
                    patchProp(prop$1, lastPropsOrEmpty[prop$1], null, dom, isSVG, hasControlledValue, lastVNode);
                }
            }
        }
    }
    var nextChildren = nextVNode.children;
    var nextClassName = nextVNode.className;
    // inlined patchProps  -- ends --
    if (lastVNode.className !== nextClassName) {
        if (isNullOrUndef(nextClassName)) {
            dom.removeAttribute('class');
        }
        else if (isSVG) {
            dom.setAttribute('class', nextClassName);
        }
        else {
            dom.className = nextClassName;
        }
    }
    {
        validateKeys(nextVNode);
    }
    if (nextFlags & 4096 /* ContentEditable */) {
        patchContentEditableChildren(dom, nextChildren);
    }
    else {
        patchChildren(lastVNode.childFlags, nextVNode.childFlags, lastVNode.children, nextChildren, dom, context, isSVG && nextVNode.type !== 'foreignObject', null, lastVNode, lifecycle);
    }
    if (isFormElement) {
        processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, false, hasControlledValue);
    }
    var nextRef = nextVNode.ref;
    var lastRef = lastVNode.ref;
    if (lastRef !== nextRef) {
        unmountRef(lastRef);
        mountRef(nextRef, dom, lifecycle);
    }
}
function replaceOneVNodeWithMultipleVNodes(lastChildren, nextChildren, parentDOM, context, isSVG, lifecycle) {
    unmount(lastChildren);
    mountArrayChildren(nextChildren, parentDOM, context, isSVG, findDOMfromVNode(lastChildren, true), lifecycle);
    removeVNodeDOM(lastChildren, parentDOM);
}
function patchChildren(lastChildFlags, nextChildFlags, lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, parentVNode, lifecycle) {
    switch (lastChildFlags) {
        case 2 /* HasVNodeChildren */:
            switch (nextChildFlags) {
                case 2 /* HasVNodeChildren */:
                    patch(lastChildren, nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                    break;
                case 1 /* HasInvalidChildren */:
                    remove(lastChildren, parentDOM);
                    break;
                case 16 /* HasTextChildren */:
                    unmount(lastChildren);
                    setTextContent(parentDOM, nextChildren);
                    break;
                default:
                    replaceOneVNodeWithMultipleVNodes(lastChildren, nextChildren, parentDOM, context, isSVG, lifecycle);
                    break;
            }
            break;
        case 1 /* HasInvalidChildren */:
            switch (nextChildFlags) {
                case 2 /* HasVNodeChildren */:
                    mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                    break;
                case 1 /* HasInvalidChildren */:
                    break;
                case 16 /* HasTextChildren */:
                    setTextContent(parentDOM, nextChildren);
                    break;
                default:
                    mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                    break;
            }
            break;
        case 16 /* HasTextChildren */:
            switch (nextChildFlags) {
                case 16 /* HasTextChildren */:
                    patchSingleTextChild(lastChildren, nextChildren, parentDOM);
                    break;
                case 2 /* HasVNodeChildren */:
                    clearDOM(parentDOM);
                    mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                    break;
                case 1 /* HasInvalidChildren */:
                    clearDOM(parentDOM);
                    break;
                default:
                    clearDOM(parentDOM);
                    mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                    break;
            }
            break;
        default:
            switch (nextChildFlags) {
                case 16 /* HasTextChildren */:
                    unmountAllChildren(lastChildren);
                    setTextContent(parentDOM, nextChildren);
                    break;
                case 2 /* HasVNodeChildren */:
                    removeAllChildren(parentDOM, parentVNode, lastChildren);
                    mount(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                    break;
                case 1 /* HasInvalidChildren */:
                    removeAllChildren(parentDOM, parentVNode, lastChildren);
                    break;
                default:
                    var lastLength = lastChildren.length | 0;
                    var nextLength = nextChildren.length | 0;
                    // Fast path's for both algorithms
                    if (lastLength === 0) {
                        if (nextLength > 0) {
                            mountArrayChildren(nextChildren, parentDOM, context, isSVG, nextNode, lifecycle);
                        }
                    }
                    else if (nextLength === 0) {
                        removeAllChildren(parentDOM, parentVNode, lastChildren);
                    }
                    else if (nextChildFlags === 8 /* HasKeyedChildren */ && lastChildFlags === 8 /* HasKeyedChildren */) {
                        patchKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength, nextNode, parentVNode, lifecycle);
                    }
                    else {
                        patchNonKeyedChildren(lastChildren, nextChildren, parentDOM, context, isSVG, lastLength, nextLength, nextNode, lifecycle);
                    }
                    break;
            }
            break;
    }
}
function createDidUpdate(instance, lastProps, lastState, snapshot, lifecycle) {
    lifecycle.push(function () {
        instance.componentDidUpdate(lastProps, lastState, snapshot);
    });
}
function updateClassComponent(instance, nextState, nextProps, parentDOM, context, isSVG, force, nextNode, lifecycle) {
    var lastState = instance.state;
    var lastProps = instance.props;
    var usesNewAPI = Boolean(instance.$N);
    var hasSCU = isFunction(instance.shouldComponentUpdate);
    if (usesNewAPI) {
        nextState = createDerivedState(instance, nextProps, nextState !== lastState ? combineFrom(lastState, nextState) : nextState);
    }
    if (force || !hasSCU || (hasSCU && instance.shouldComponentUpdate(nextProps, nextState, context))) {
        if (!usesNewAPI && isFunction(instance.componentWillUpdate)) {
            instance.componentWillUpdate(nextProps, nextState, context);
        }
        instance.props = nextProps;
        instance.state = nextState;
        instance.context = context;
        var snapshot = null;
        var nextInput = renderNewInput(instance, nextProps, context);
        if (usesNewAPI && isFunction(instance.getSnapshotBeforeUpdate)) {
            snapshot = instance.getSnapshotBeforeUpdate(lastProps, lastState);
        }
        patch(instance.$LI, nextInput, parentDOM, instance.$CX, isSVG, nextNode, lifecycle);
        // Dont update Last input, until patch has been succesfully executed
        instance.$LI = nextInput;
        if (isFunction(instance.componentDidUpdate)) {
            createDidUpdate(instance, lastProps, lastState, snapshot, lifecycle);
        }
    }
    else {
        instance.props = nextProps;
        instance.state = nextState;
        instance.context = context;
    }
}
function patchClassComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var instance = (nextVNode.children = lastVNode.children);
    // If Component has crashed, ignore it to stay functional
    if (isNull(instance)) {
        return;
    }
    instance.$L = lifecycle;
    var nextProps = nextVNode.props || EMPTY_OBJ;
    var nextRef = nextVNode.ref;
    var lastRef = lastVNode.ref;
    var nextState = instance.state;
    if (!instance.$N) {
        if (isFunction(instance.componentWillReceiveProps)) {
            instance.$BR = true;
            instance.componentWillReceiveProps(nextProps, context);
            // If instance component was removed during its own update do nothing.
            if (instance.$UN) {
                return;
            }
            instance.$BR = false;
        }
        if (!isNull(instance.$PS)) {
            nextState = combineFrom(nextState, instance.$PS);
            instance.$PS = null;
        }
    }
    updateClassComponent(instance, nextState, nextProps, parentDOM, context, isSVG, false, nextNode, lifecycle);
    if (lastRef !== nextRef) {
        unmountRef(lastRef);
        mountRef(nextRef, instance, lifecycle);
    }
}
function patchFunctionalComponent(lastVNode, nextVNode, parentDOM, context, isSVG, nextNode, lifecycle) {
    var shouldUpdate = true;
    var nextProps = nextVNode.props || EMPTY_OBJ;
    var nextRef = nextVNode.ref;
    var lastProps = lastVNode.props;
    var nextHooksDefined = !isNullOrUndef(nextRef);
    var lastInput = lastVNode.children;
    if (nextHooksDefined && isFunction(nextRef.onComponentShouldUpdate)) {
        shouldUpdate = nextRef.onComponentShouldUpdate(lastProps, nextProps);
    }
    if (shouldUpdate !== false) {
        if (nextHooksDefined && isFunction(nextRef.onComponentWillUpdate)) {
            nextRef.onComponentWillUpdate(lastProps, nextProps);
        }
        var type = nextVNode.type;
        var nextInput = handleComponentInput(nextVNode.flags & 32768 /* ForwardRef */ ? type(nextProps, nextRef, context) : type(nextProps, context));
        patch(lastInput, nextInput, parentDOM, context, isSVG, nextNode, lifecycle);
        nextVNode.children = nextInput;
        if (nextHooksDefined && isFunction(nextRef.onComponentDidUpdate)) {
            nextRef.onComponentDidUpdate(lastProps, nextProps);
        }
    }
    else {
        nextVNode.children = lastInput;
    }
}
function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = lastVNode.dom;
    if (nextText !== lastVNode.children) {
        dom.nodeValue = nextText;
    }
    nextVNode.dom = dom;
}
function patchNonKeyedChildren(lastChildren, nextChildren, dom, context, isSVG, lastChildrenLength, nextChildrenLength, nextNode, lifecycle) {
    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
    var i = 0;
    var nextChild;
    var lastChild;
    for (; i < commonLength; ++i) {
        nextChild = nextChildren[i];
        lastChild = lastChildren[i];
        if (nextChild.flags & 16384 /* InUse */) {
            nextChild = nextChildren[i] = directClone(nextChild);
        }
        patch(lastChild, nextChild, dom, context, isSVG, nextNode, lifecycle);
        lastChildren[i] = nextChild;
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; ++i) {
            nextChild = nextChildren[i];
            if (nextChild.flags & 16384 /* InUse */) {
                nextChild = nextChildren[i] = directClone(nextChild);
            }
            mount(nextChild, dom, context, isSVG, nextNode, lifecycle);
        }
    }
    else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; ++i) {
            remove(lastChildren[i], dom);
        }
    }
}
function patchKeyedChildren(a, b, dom, context, isSVG, aLength, bLength, outerEdge, parentVNode, lifecycle) {
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var i = 0;
    var j = 0;
    var aNode = a[j];
    var bNode = b[j];
    var nextPos;
    var nextNode;
    // Step 1
    // tslint:disable-next-line
    outer: {
        // Sync nodes with the same key at the beginning.
        while (aNode.key === bNode.key) {
            if (bNode.flags & 16384 /* InUse */) {
                b[j] = bNode = directClone(bNode);
            }
            patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
            a[j] = bNode;
            ++j;
            if (j > aEnd || j > bEnd) {
                break outer;
            }
            aNode = a[j];
            bNode = b[j];
        }
        aNode = a[aEnd];
        bNode = b[bEnd];
        // Sync nodes with the same key at the end.
        while (aNode.key === bNode.key) {
            if (bNode.flags & 16384 /* InUse */) {
                b[bEnd] = bNode = directClone(bNode);
            }
            patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
            a[aEnd] = bNode;
            aEnd--;
            bEnd--;
            if (j > aEnd || j > bEnd) {
                break outer;
            }
            aNode = a[aEnd];
            bNode = b[bEnd];
        }
    }
    if (j > aEnd) {
        if (j <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge;
            while (j <= bEnd) {
                bNode = b[j];
                if (bNode.flags & 16384 /* InUse */) {
                    b[j] = bNode = directClone(bNode);
                }
                ++j;
                mount(bNode, dom, context, isSVG, nextNode, lifecycle);
            }
        }
    }
    else if (j > bEnd) {
        while (j <= aEnd) {
            remove(a[j++], dom);
        }
    }
    else {
        var aStart = j;
        var bStart = j;
        var aLeft = aEnd - j + 1;
        var bLeft = bEnd - j + 1;
        var sources = new Int32Array(bLeft - i + 1);
        i = bLeft + 2;
        // Keep track if its possible to remove whole DOM using textContent = '';
        var canRemoveWholeContent = aLeft === aLength;
        var moved = false;
        var pos = 0;
        var patched = 0;
        // When sizes are small, just loop them through
        if (bLength < 4 || (aLeft | bLeft) < 32) {
            for (i = aStart; i <= aEnd; ++i) {
                aNode = a[i];
                if (patched < bLeft) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (aNode.key === bNode.key) {
                            sources[j - bStart] = i + 1;
                            if (canRemoveWholeContent) {
                                canRemoveWholeContent = false;
                                while (aStart < i) {
                                    remove(a[aStart++], dom);
                                }
                            }
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            if (bNode.flags & 16384 /* InUse */) {
                                b[j] = bNode = directClone(bNode);
                            }
                            patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
                            ++patched;
                            break;
                        }
                    }
                    if (!canRemoveWholeContent && j > bEnd) {
                        remove(aNode, dom);
                    }
                }
                else if (!canRemoveWholeContent) {
                    remove(aNode, dom);
                }
            }
        }
        else {
            var keyIndex = {};
            // Map keys by their index
            for (i = bStart; i <= bEnd; ++i) {
                keyIndex[b[i].key] = i;
            }
            // Try to patch same keys
            for (i = aStart; i <= aEnd; ++i) {
                aNode = a[i];
                if (patched < bLeft) {
                    j = keyIndex[aNode.key];
                    if (j !== void 0) {
                        if (canRemoveWholeContent) {
                            canRemoveWholeContent = false;
                            while (i > aStart) {
                                remove(a[aStart++], dom);
                            }
                        }
                        bNode = b[j];
                        sources[j - bStart] = i + 1;
                        if (pos > j) {
                            moved = true;
                        }
                        else {
                            pos = j;
                        }
                        if (bNode.flags & 16384 /* InUse */) {
                            b[j] = bNode = directClone(bNode);
                        }
                        patch(aNode, bNode, dom, context, isSVG, outerEdge, lifecycle);
                        ++patched;
                    }
                    else if (!canRemoveWholeContent) {
                        remove(aNode, dom);
                    }
                }
                else if (!canRemoveWholeContent) {
                    remove(aNode, dom);
                }
            }
        }
        // fast-path: if nothing patched remove all old and add all new
        if (canRemoveWholeContent) {
            removeAllChildren(dom, parentVNode, a);
            mountArrayChildren(b, dom, context, isSVG, outerEdge, lifecycle);
        }
        else if (moved) {
            var seq = lis_algorithm(sources);
            j = seq.length - 1;
            for (i = bLeft - 1; i >= 0; i--) {
                if (sources[i] === 0) {
                    pos = i + bStart;
                    bNode = b[pos];
                    if (bNode.flags & 16384 /* InUse */) {
                        b[pos] = bNode = directClone(bNode);
                    }
                    nextPos = pos + 1;
                    mount(bNode, dom, context, isSVG, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge, lifecycle);
                }
                else if (j < 0 || i !== seq[j]) {
                    pos = i + bStart;
                    bNode = b[pos];
                    nextPos = pos + 1;
                    moveVNodeDOM(bNode, dom, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge);
                }
                else {
                    j--;
                }
            }
        }
        else if (patched !== bLeft) {
            // when patched count doesn't match b length we need to insert those new ones
            // loop backwards so we can use insertBefore
            for (i = bLeft - 1; i >= 0; i--) {
                if (sources[i] === 0) {
                    pos = i + bStart;
                    bNode = b[pos];
                    if (bNode.flags & 16384 /* InUse */) {
                        b[pos] = bNode = directClone(bNode);
                    }
                    nextPos = pos + 1;
                    mount(bNode, dom, context, isSVG, nextPos < bLength ? findDOMfromVNode(b[nextPos], true) : outerEdge, lifecycle);
                }
            }
        }
    }
}
var result;
var p;
var maxLen = 0;
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function lis_algorithm(arr) {
    var arrI = 0;
    var i = 0;
    var j = 0;
    var k = 0;
    var u = 0;
    var v = 0;
    var c = 0;
    var len = arr.length;
    if (len > maxLen) {
        maxLen = len;
        result = new Int32Array(len);
        p = new Int32Array(len);
    }
    for (; i < len; ++i) {
        arrI = arr[i];
        if (arrI !== 0) {
            j = result[k];
            if (arr[j] < arrI) {
                p[i] = j;
                result[++k] = i;
                continue;
            }
            u = 0;
            v = k;
            while (u < v) {
                c = (u + v) >> 1;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                }
                else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1];
                }
                result[u] = i;
            }
        }
    }
    u = i = k + 1;
    var seq = new Int32Array(u);
    v = result[u - 1];
    while (u-- > 0) {
        seq[u] = v;
        v = p[v];
    }
    while (i-- > 0) {
        result[i] = 0;
    }
    return seq;
}

var hasDocumentAvailable = typeof document !== 'undefined';
{
    if (hasDocumentAvailable && !document.body) {
        warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
    }
}
var documentBody = null;
if (hasDocumentAvailable) {
    documentBody = document.body;
    /*
     * Defining $EV and $V properties on Node.prototype
     * fixes v8 "wrong map" de-optimization
     */
    Node.prototype.$EV = null;
    Node.prototype.$V = null;
}
function __render(input, parentDOM, callback, context) {
    // Development warning
    {
        if (documentBody === parentDOM) {
            throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
        }
        if (isInvalid(parentDOM)) {
            throwError(("render target ( DOM ) is mandatory, received " + (parentDOM === null ? 'null' : typeof parentDOM)));
        }
    }
    var lifecycle = [];
    var rootInput = parentDOM.$V;
    renderCheck.v = true;
    if (isNullOrUndef(rootInput)) {
        if (!isNullOrUndef(input)) {
            if (input.flags & 16384 /* InUse */) {
                input = directClone(input);
            }
            mount(input, parentDOM, context, false, null, lifecycle);
            parentDOM.$V = input;
            rootInput = input;
        }
    }
    else {
        if (isNullOrUndef(input)) {
            remove(rootInput, parentDOM);
            parentDOM.$V = null;
        }
        else {
            if (input.flags & 16384 /* InUse */) {
                input = directClone(input);
            }
            patch(rootInput, input, parentDOM, context, false, null, lifecycle);
            rootInput = parentDOM.$V = input;
        }
    }
    if (lifecycle.length > 0) {
        callAll(lifecycle);
    }
    renderCheck.v = false;
    if (isFunction(callback)) {
        callback();
    }
    if (isFunction(options.renderComplete)) {
        options.renderComplete(rootInput, parentDOM);
    }
}
function render(input, parentDOM, callback, context) {
    if ( callback === void 0 ) callback = null;
    if ( context === void 0 ) context = EMPTY_OBJ;

    __render(input, parentDOM, callback, context);
}
function createRenderer(parentDOM) {
    return function renderer(lastInput, nextInput, callback, context) {
        if (!parentDOM) {
            parentDOM = lastInput;
        }
        render(nextInput, parentDOM, callback, context);
    };
}

var QUEUE = [];
var nextTick = typeof Promise !== 'undefined' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout.bind(window);
var microTaskPending = false;
function queueStateChanges(component, newState, callback, force) {
    var pending = component.$PS;
    if (isFunction(newState)) {
        newState = newState(pending ? combineFrom(component.state, pending) : component.state, component.props, component.context);
    }
    if (isNullOrUndef(pending)) {
        component.$PS = newState;
    }
    else {
        for (var stateKey in newState) {
            pending[stateKey] = newState[stateKey];
        }
    }
    if (!component.$BR) {
        if (!renderCheck.v) {
            if (QUEUE.length === 0) {
                applyState(component, force, callback);
                return;
            }
        }
        if (QUEUE.indexOf(component) === -1) {
            QUEUE.push(component);
        }
        if (!microTaskPending) {
            microTaskPending = true;
            nextTick(rerender);
        }
        if (isFunction(callback)) {
            var QU = component.$QU;
            if (!QU) {
                QU = component.$QU = [];
            }
            QU.push(callback);
        }
    }
    else if (isFunction(callback)) {
        component.$L.push(callback.bind(component));
    }
}
function callSetStateCallbacks(component) {
    var queue = component.$QU;
    for (var i = 0, len = queue.length; i < len; ++i) {
        queue[i].call(component);
    }
    component.$QU = null;
}
function rerender() {
    var component;
    microTaskPending = false;
    while ((component = QUEUE.pop())) {
        var queue = component.$QU;
        applyState(component, false, queue ? callSetStateCallbacks.bind(null, component) : null);
    }
}
function applyState(component, force, callback) {
    if (component.$UN) {
        return;
    }
    if (force || !component.$BR) {
        var pendingState = component.$PS;
        component.$PS = null;
        var lifecycle = [];
        renderCheck.v = true;
        updateClassComponent(component, combineFrom(component.state, pendingState), component.props, findDOMfromVNode(component.$LI, true).parentNode, component.context, component.$SVG, force, null, lifecycle);
        if (lifecycle.length > 0) {
            callAll(lifecycle);
        }
        renderCheck.v = false;
    }
    else {
        component.state = component.$PS;
        component.$PS = null;
    }
    if (isFunction(callback)) {
        callback.call(component);
    }
}
var Component = function Component(props, context) {
    // Public
    this.state = null;
    // Internal properties
    this.$BR = false; // BLOCK RENDER
    this.$BS = true; // BLOCK STATE
    this.$PS = null; // PENDING STATE (PARTIAL or FULL)
    this.$LI = null; // LAST INPUT
    this.$UN = false; // UNMOUNTED
    this.$CX = null; // CHILDCONTEXT
    this.$QU = null; // QUEUE
    this.$N = false; // Uses new lifecycle API Flag
    this.$L = null; // Current lifecycle of this component
    this.$SVG = false; // Flag to keep track if component is inside SVG tree
    this.props = props || EMPTY_OBJ;
    this.context = context || EMPTY_OBJ; // context should not be mutable
};
Component.prototype.forceUpdate = function forceUpdate (callback) {
    if (this.$UN) {
        return;
    }
    // Do not allow double render during force update
    queueStateChanges(this, {}, callback, true);
};
Component.prototype.setState = function setState (newState, callback) {
    if (this.$UN) {
        return;
    }
    if (!this.$BS) {
        queueStateChanges(this, newState, callback, false);
    }
    else {
        // Development warning
        {
            throwError('cannot update state via setState() in constructor. Instead, assign to `this.state` directly or define a `state = {};`');
        }
        return;
    }
};
Component.prototype.render = function render (_nextProps, _nextState, _nextContext) {
    return null;
};

{
    /* tslint:disable-next-line:no-empty */
    var testFunc = function testFn() { };
    /* tslint:disable-next-line*/
    console.log('Inferno is in development mode.');
    if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
        warning("It looks like you're using a minified copy of the development build " +
            'of Inferno. When deploying Inferno apps to production, make sure to use ' +
            'the production build which skips development warnings and is faster. ' +
            'See http://infernojs.org for more details.');
    }
}
var version = "7.1.7";

exports.Component = Component;
exports.Fragment = Fragment;
exports.EMPTY_OBJ = EMPTY_OBJ;
exports.createComponentVNode = createComponentVNode;
exports.createFragment = createFragment;
exports.createPortal = createPortal;
exports.createRef = createRef;
exports.createRenderer = createRenderer;
exports.createTextVNode = createTextVNode;
exports.createVNode = createVNode;
exports.forwardRef = forwardRef;
exports.directClone = directClone;
exports.findDOMfromVNode = findDOMfromVNode;
exports.getFlagsForElementVnode = getFlagsForElementVnode;
exports.linkEvent = linkEvent;
exports.normalizeProps = normalizeProps;
exports.options = options;
exports.render = render;
exports.rerender = rerender;
exports.version = version;
exports._CI = createClassComponentInstance;
exports._HI = handleComponentInput;
exports._M = mount;
exports._MCCC = mountClassComponentCallbacks;
exports._ME = mountElement;
exports._MFCC = mountFunctionalComponentCallbacks;
exports._MR = mountRef;
exports._MT = mountText;
exports._MP = mountProps;
exports.__render = __render;

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("process", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

// From https://github.com/defunctzombie/node-process/blob/master/browser.js
// shim for using process in browser
if (FuseBox.isServer) {
    if (typeof __process_env__ !== "undefined") {
        Object.assign(global.process.env, __process_env__);
    }
    module.exports = global.process;
} else {
    // Object assign polyfill
    if (typeof Object.assign != "function") {
        Object.assign = function(target, varArgs) { // .length of function is 2
            "use strict";
            if (target == null) { // TypeError if undefined or null
                throw new TypeError("Cannot convert undefined or null to object");
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }



    var productionEnv = false; //require('@system-env').production;

    var process = module.exports = {};
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }

    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = setTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        clearTimeout(timeout);
    }

    process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            setTimeout(drainQueue, 0);
        }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function() {
        this.fun.apply(null, this.array);
    };
    process.title = "browser";
    process.browser = true;
    process.env = {
        NODE_ENV: productionEnv ? "production" : "development",
    };
    if (typeof __process_env__ !== "undefined") {
        Object.assign(process.env, __process_env__);
    }
    process.argv = [];
    process.version = ""; // empty string to avoid regexp issues
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;

    process.binding = function(name) {
        throw new Error("process.binding is not supported");
    };

    process.cwd = function() { return "/"; };
    process.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
    };
    process.umask = function() { return 0; };

}
});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("papaparse", {}, function(___scope___){
___scope___.file("papaparse.min.js", function(exports, require, module, __filename, __dirname){
/* fuse:injection: */ var stream = require("stream").Stream;
/* @license
Papa Parse
v4.6.3
https://github.com/mholt/PapaParse
License: MIT
*/
Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&"undefined"!=typeof exports?module.exports=t():e.Papa=t()}(this,function(){"use strict";var s,e,f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{},n=!f.document&&!!f.postMessage,o=n&&/(\?|&)papaworker(=|&|$)/.test(f.location.search),a=!1,h={},u=0,k={parse:function(e,t){var r=(t=t||{}).dynamicTyping||!1;z(r)&&(t.dynamicTypingFunction=r,r={});if(t.dynamicTyping=r,t.transform=!!z(t.transform)&&t.transform,t.worker&&k.WORKERS_SUPPORTED){var i=function(){if(!k.WORKERS_SUPPORTED)return!1;if(!a&&null===k.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var e=k.SCRIPT_PATH||s;e+=(-1!==e.indexOf("?")?"&":"?")+"papaworker";var t=new f.Worker(e);return t.onmessage=m,t.id=u++,h[t.id]=t}();return i.userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=z(t.step),t.chunk=z(t.chunk),t.complete=z(t.complete),t.error=z(t.error),delete t.worker,void i.postMessage({input:e,config:t,workerId:i.id})}var n=null;k.NODE_STREAM_INPUT,"string"==typeof e?n=t.download?new c(t):new _(t):!0===e.readable&&z(e.read)&&z(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new p(t));return n.stream(e)},unparse:function(e,t){var i=!1,g=!0,m=",",y="\r\n",n='"',r=!1;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||k.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(m=t.delimiter);("boolean"==typeof t.quotes||Array.isArray(t.quotes))&&(i=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(r=t.skipEmptyLines);"string"==typeof t.newline&&(y=t.newline);"string"==typeof t.quoteChar&&(n=t.quoteChar);"boolean"==typeof t.header&&(g=t.header)}();var s=new RegExp(M(n),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return o(null,e,r);if("object"==typeof e[0])return o(a(e[0]),e,r)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:a(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),o(e.fields||[],e.data||[],r);throw"exception: Unable to serialize unrecognized input";function a(e){if("object"!=typeof e)return[];var t=[];for(var r in e)t.push(r);return t}function o(e,t,r){var i="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&g){for(var a=0;a<e.length;a++)0<a&&(i+=m),i+=v(e[a],a);0<t.length&&(i+=y)}for(var o=0;o<t.length;o++){var h=n?e.length:t[o].length,u=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(r&&!n&&(u="greedy"===r?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===r&&n){for(var d=[],l=0;l<h;l++){var c=s?e[l]:l;d.push(t[o][c])}u=""===d.join("").trim()}if(!u){for(var p=0;p<h;p++){0<p&&!f&&(i+=m);var _=n&&s?e[p]:p;i+=v(t[o][_],p)}o<t.length-1&&(!r||0<h&&!f)&&(i+=y)}}return i}function v(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);e=e.toString().replace(s,n+n);var r="boolean"==typeof i&&i||Array.isArray(i)&&i[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return!0;return!1}(e,k.BAD_DELIMITERS)||-1<e.indexOf(m)||" "===e.charAt(0)||" "===e.charAt(e.length-1);return r?n+e+n:e}}};if(k.RECORD_SEP=String.fromCharCode(30),k.UNIT_SEP=String.fromCharCode(31),k.BYTE_ORDER_MARK="\ufeff",k.BAD_DELIMITERS=["\r","\n",'"',k.BYTE_ORDER_MARK],k.WORKERS_SUPPORTED=!n&&!!f.Worker,k.SCRIPT_PATH=null,k.NODE_STREAM_INPUT=1,k.LocalChunkSize=10485760,k.RemoteChunkSize=5242880,k.DefaultDelimiter=",",k.Parser=v,k.ParserHandle=r,k.NetworkStreamer=c,k.FileStreamer=p,k.StringStreamer=_,k.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var r=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},r)})}),e(),this;function e(){if(0!==h.length){var e,t,r,i,n=h[0];if(z(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,r=n.inputElem,i=s.reason,void(z(o.error)&&o.error({name:e},t,r,i));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config))}else if("skip"===s)return void u()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){z(a)&&a(e,n.file,n.inputElem),u()},k.parse(n.file,n.instanceConfig)}else z(o.complete)&&o.complete()}function u(){h.splice(0,1),e()}}}function l(e){this._handle=null,this._finished=!1,this._completed=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=E(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new r(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&z(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e);void 0!==r&&(e=r)}this.isFirstChunk=!1;var i=this._partialLine+e;this._partialLine="";var n=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=i.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:k.WORKER_ID,finished:a});else if(z(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return;n=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!z(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}},this._sendError=function(e){z(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:k.WORKER_ID,error:e,finished:!1})}}function c(e){var i;(e=e||{}).chunkSize||(e.chunkSize=k.RemoteChunkSize),l.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),n||(i.onload=w(this._chunkLoaded,this),i.onerror=w(this._chunkError,this)),i.open("GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)i.setRequestHeader(t,e[t])}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1;i.setRequestHeader("Range","bytes="+this._start+"-"+r),i.setRequestHeader("If-None-Match","webkit-no-cache")}try{i.send()}catch(e){this._chunkError(e.message)}n&&0===i.status?this._chunkError():this._start+=this._config.chunkSize}},this._chunkLoaded=function(){4===i.readyState&&(i.status<200||400<=i.status?this._chunkError():(this._finished=!this._config.chunkSize||this._start>function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return-1;return parseInt(t.substr(t.lastIndexOf("/")+1))}(i),this.parseChunk(i.responseText)))},this._chunkError=function(e){var t=i.statusText||e;this._sendError(new Error(t))}}function p(e){var i,n;(e=e||{}).chunkSize||(e.chunkSize=k.LocalChunkSize),l.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((i=new FileReader).onload=w(this._chunkLoaded,this),i.onerror=w(this._chunkError,this)):i=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t)}var r=i.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:r}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(i.error)}}function _(e){var r;l.call(this,e=e||{}),this.stream=function(e){return r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,t=e?r.substr(0,e):r;return r=e?r.substr(e):"",this._finished=!r,this.parseChunk(t)}}}function g(e){l.call(this,e=e||{});var t=[],r=!0,i=!1;this.pause=function(){l.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){l.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0},this._streamData=w(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=w(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=w(function(){this._streamCleanUp(),i=!0,this._streamData("")},this),this._streamCleanUp=w(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function r(g){var a,o,h,i=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,n=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,t=this,r=0,s=0,u=!1,e=!1,f=[],d={data:[],errors:[],meta:{}};if(z(g.step)){var l=g.step;g.step=function(e){if(d=e,p())c();else{if(c(),0===d.data.length)return;r+=e.data.length,g.preview&&r>g.preview?o.abort():l(d,t)}}}function m(e){return"greedy"===g.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function c(){if(d&&h&&(y("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+k.DefaultDelimiter+"'"),h=!1),g.skipEmptyLines)for(var e=0;e<d.data.length;e++)m(d.data[e])&&d.data.splice(e--,1);return p()&&function(){if(!d)return;for(var e=0;p()&&e<d.data.length;e++)for(var t=0;t<d.data[e].length;t++){var r=d.data[e][t];g.trimHeaders&&(r=r.trim()),f.push(r)}d.data.splice(0,1)}(),function(){if(!d||!g.header&&!g.dynamicTyping&&!g.transform)return d;for(var e=0;e<d.data.length;e++){var t,r=g.header?{}:[];for(t=0;t<d.data[e].length;t++){var i=t,n=d.data[e][t];g.header&&(i=t>=f.length?"__parsed_extra":f[t]),g.transform&&(n=g.transform(n,i)),n=_(i,n),"__parsed_extra"===i?(r[i]=r[i]||[],r[i].push(n)):r[i]=n}d.data[e]=r,g.header&&(t>f.length?y("FieldMismatch","TooManyFields","Too many fields: expected "+f.length+" fields but parsed "+t,s+e):t<f.length&&y("FieldMismatch","TooFewFields","Too few fields: expected "+f.length+" fields but parsed "+t,s+e))}g.header&&d.meta&&(d.meta.fields=f);return s+=d.data.length,d}()}function p(){return g.header&&0===f.length}function _(e,t){return r=e,g.dynamicTypingFunction&&void 0===g.dynamicTyping[r]&&(g.dynamicTyping[r]=g.dynamicTypingFunction(r)),!0===(g.dynamicTyping[r]||g.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(i.test(t)?parseFloat(t):n.test(t)?new Date(t):""===t?null:t):t;var r}function y(e,t,r,i){d.errors.push({type:e,code:t,message:r,row:i})}this.parse=function(e,t,r){var i=g.quoteChar||'"';if(g.newline||(g.newline=function(e,t){e=e.substr(0,1048576);var r=new RegExp(M(t)+"([^]*?)"+M(t),"gm"),i=(e=e.replace(r,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<i[0].length;if(1===i.length||s)return"\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(e,i)),h=!1,g.delimiter)z(g.delimiter)&&(g.delimiter=g.delimiter(e),d.meta.delimiter=g.delimiter);else{var n=function(e,t,r,i){for(var n,s,a,o=[",","\t","|",";",k.RECORD_SEP,k.UNIT_SEP],h=0;h<o.length;h++){var u=o[h],f=0,d=0,l=0;a=void 0;for(var c=new v({comments:i,delimiter:u,newline:t,preview:10}).parse(e),p=0;p<c.data.length;p++)if(r&&m(c.data[p]))l++;else{var _=c.data[p].length;d+=_,void 0!==a?1<_&&(f+=Math.abs(_-a),a=_):a=0}0<c.data.length&&(d/=c.data.length-l),(void 0===s||s<f)&&1.99<d&&(s=f,n=u)}return{successful:!!(g.delimiter=n),bestDelimiter:n}}(e,g.newline,g.skipEmptyLines,g.comments);n.successful?g.delimiter=n.bestDelimiter:(h=!0,g.delimiter=k.DefaultDelimiter),d.meta.delimiter=g.delimiter}var s=E(g);return g.preview&&g.header&&s.preview++,a=e,o=new v(s),d=o.parse(a,t,r),c(),u?{meta:{paused:!0}}:d||{meta:{paused:!1}}},this.paused=function(){return u},this.pause=function(){u=!0,o.abort(),a=a.substr(o.getCharIndex())},this.resume=function(){u=!1,t.streamer.parseChunk(a,!0)},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),d.meta.aborted=!0,z(g.complete)&&g.complete(d),a=""}}function M(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function v(e){var S,O=(e=e||{}).delimiter,x=e.newline,T=e.comments,I=e.step,A=e.preview,D=e.fastMode,L=S=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(L=e.escapeChar),("string"!=typeof O||-1<k.BAD_DELIMITERS.indexOf(O))&&(O=","),T===O)throw"Comment character same as delimiter";!0===T?T="#":("string"!=typeof T||-1<k.BAD_DELIMITERS.indexOf(T))&&(T=!1),"\n"!==x&&"\r"!==x&&"\r\n"!==x&&(x="\n");var P=0,F=!1;this.parse=function(i,t,r){if("string"!=typeof i)throw"Input must be a string";var n=i.length,e=O.length,s=x.length,a=T.length,o=z(I),h=[],u=[],f=[],d=P=0;if(!i)return C();if(D||!1!==D&&-1===i.indexOf(S)){for(var l=i.split(x),c=0;c<l.length;c++){if(f=l[c],P+=f.length,c!==l.length-1)P+=x.length;else if(r)return C();if(!T||f.substr(0,a)!==T){if(o){if(h=[],k(f.split(O)),R(),F)return C()}else k(f.split(O));if(A&&A<=c)return h=h.slice(0,A),C(!0)}}return C()}for(var p,_=i.indexOf(O,P),g=i.indexOf(x,P),m=new RegExp(M(L)+M(S),"g");;)if(i[P]!==S)if(T&&0===f.length&&i.substr(P,a)===T){if(-1===g)return C();P=g+s,g=i.indexOf(x,P),_=i.indexOf(O,P)}else if(-1!==_&&(_<g||-1===g))f.push(i.substring(P,_)),P=_+e,_=i.indexOf(O,P);else{if(-1===g)break;if(f.push(i.substring(P,g)),w(g+s),o&&(R(),F))return C();if(A&&h.length>=A)return C(!0)}else for(p=P,P++;;){if(-1===(p=i.indexOf(S,p+1)))return r||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:P}),E();if(p===n-1)return E(i.substring(P,p).replace(m,S));if(S!==L||i[p+1]!==L){if(S===L||0===p||i[p-1]!==L){var y=b(-1===g?_:Math.min(_,g));if(i[p+1+y]===O){f.push(i.substring(P,p).replace(m,S)),P=p+1+y+e,_=i.indexOf(O,P),g=i.indexOf(x,P);break}var v=b(g);if(i.substr(p+1+v,s)===x){if(f.push(i.substring(P,p).replace(m,S)),w(p+1+v+s),_=i.indexOf(O,P),o&&(R(),F))return C();if(A&&h.length>=A)return C(!0);break}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:P}),p++}}else p++}return E();function k(e){h.push(e),d=P}function b(e){var t=0;if(-1!==e){var r=i.substring(p+1,e);r&&""===r.trim()&&(t=r.length)}return t}function E(e){return r||(void 0===e&&(e=i.substr(P)),f.push(e),P=n,k(f),o&&R()),C()}function w(e){P=e,k(f),f=[],g=i.indexOf(x,P)}function C(e){return{data:h,errors:u,meta:{delimiter:O,linebreak:x,aborted:F,truncated:!!e,cursor:d+(t||0)}}}function R(){I(C()),h=[],u=[]}},this.abort=function(){F=!0},this.getCharIndex=function(){return P}}function m(e){var t=e.data,r=h[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){i=!0,y(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:b,resume:b};if(z(r.userStep)){for(var s=0;s<t.results.data.length&&(r.userStep({data:[t.results.data[s]],errors:t.results.errors,meta:t.results.meta},n),!i);s++);delete t.results}else z(r.userChunk)&&(r.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!i&&y(t.workerId,t.results)}function y(e,t){var r=h[e];z(r.userComplete)&&r.userComplete(t),r.terminate(),delete h[e]}function b(){throw"Not implemented."}function E(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=E(e[r]);return t}function w(e,t){return function(){e.apply(t,arguments)}}function z(e){return"function"==typeof e}return o?f.onmessage=function(e){var t=e.data;void 0===k.WORKER_ID&&t&&(k.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:k.WORKER_ID,results:k.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var r=k.parse(t.input,t.config);r&&f.postMessage({workerId:k.WORKER_ID,results:r,finished:!0})}}:k.WORKERS_SUPPORTED&&(e=document.getElementsByTagName("script"),s=e.length?e[e.length-1].src:"",document.body?document.addEventListener("DOMContentLoaded",function(){a=!0},!0):a=!0),(c.prototype=Object.create(l.prototype)).constructor=c,(p.prototype=Object.create(l.prototype)).constructor=p,(_.prototype=Object.create(_.prototype)).constructor=_,(g.prototype=Object.create(l.prototype)).constructor=g,k});
});
return ___scope___.entry = "papaparse.min.js";
});
FuseBox.pkg("stream", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

if (FuseBox.isServer) {
    module.exports = global.require("stream");
} else {
    module.exports = {};
}

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fuse-box-css", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

/**
 * Listens to 'async' requets and if the name is a css file
 * wires it to `__fsbx_css`
 */

var runningInBrowser = FuseBox.isBrowser || FuseBox.target === "electron";

var cssHandler = function(__filename, contents) {
    if (runningInBrowser) {
        var styleId = __filename.replace(/[\.\/]+/g, '-');
        if (styleId.charAt(0) === '-') styleId = styleId.substring(1);
        var exists = document.getElementById(styleId);
        if (!exists) {
            //<link href="//fonts.googleapis.com/css?family=Covered+By+Your+Grace" rel="stylesheet" type="text/css">
            var s = document.createElement(contents ? 'style' : 'link');
            s.id = styleId;
            s.type = 'text/css';
            if (contents) {
                s.innerHTML = contents;
            } else {
                s.rel = 'stylesheet';
                s.href = __filename;
            }
            document.getElementsByTagName('head')[0].appendChild(s);
        } else {
            if (contents) {
                exists.innerHTML = contents;
            }
        }
    }
}
if (typeof FuseBox !== "undefined" && runningInBrowser) {
    FuseBox.on('async', function(name) {
        if (/\.css$/.test(name)) {
            cssHandler(name);
            return false;
        }
    });
}

module.exports = cssHandler;
});
return ___scope___.entry = "index.js";
});
FuseBox.import("fusebox-hot-reload").connect(4444, "", false)
FuseBox.target = "browser"
// allowSyntheticDefaultImports
FuseBox.sdep = true

FuseBox.import("default/index.jsx");
FuseBox.main("default/index.jsx");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((p||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),u=e.substring(o+1);return[a,u]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(p){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function u(e){return{server:require(e)}}function f(e,n){var o=n.path||"./",a=n.pkg||"default",f=r(e);if(f&&(o="./",a=f[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=f[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!p&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return u(e);var s=h[a];if(!s){if(p&&"electron"!==_.target)throw"Package not found "+a;return u(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,c=t(o,e),d=i(c),v=s.f[d];return!v&&d.indexOf("*")>-1&&(l=d),v||l||(d=t(c,"/","index.js"),v=s.f[d],v||"."!==c||(d=s.s&&s.s.entry||"index.js",v=s.f[d]),v||(d=c+".js",v=s.f[d]),v||(v=s.f[c+".jsx"]),v||(d=c+"/index.jsx",v=s.f[d])),{file:v,wildcard:l,pkgName:a,versions:s.v,filePath:c,validPath:d}}function s(e,r,n){if(void 0===n&&(n={}),!p)return r(/\.(js|json)$/.test(e)?m.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);_.dynamic(a,o),r(_.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=x[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function c(e){return null!==e&&["function","object","array"].indexOf(typeof e)>-1&&void 0===e.default?Object.isFrozen(e)?e.default=e:Object.defineProperty(e,"default",{value:e,writable:!0,enumerable:!1}):void 0}function d(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=f(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),u=h[t.pkgName];if(u){var v={};for(var g in u.f)a.test(g)&&(v[g]=d(t.pkgName+"/"+g));return v}}if(!i){var x="function"==typeof r,y=l("async",[e,r]);if(y===!1)return;return s(e,function(e){return x?r(e):null},r)}var w=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var b=i.locals={},j=n(t.validPath);b.exports={},b.module={exports:b.exports},b.require=function(e,r){var n=d(e,{pkg:w,path:j,v:t.versions});return _.sdep&&c(n),n},p||!m.require.main?b.require.main={filename:"./",paths:[]}:b.require.main=m.require.main;var k=[b.module.exports,b.require,b.module,t.validPath,j,w];return l("before-import",k),i.fn.apply(k[0],k),l("after-import",k),b.module.exports}if(e.FuseBox)return e.FuseBox;var v="undefined"!=typeof WorkerGlobalScope,p="undefined"!=typeof window&&window.navigator||v,m=p?v?{}:window:global;p&&(m.global=v?{}:window),e=p&&"undefined"==typeof __fbx__dnm__?e:module.exports;var g=p?v?{}:window.__fsbx__=window.__fsbx__||{}:m.$fsbx=m.$fsbx||{};p||(m.require=require);var h=g.p=g.p||{},x=g.e=g.e||{},_=function(){function r(){}return r.global=function(e,r){return void 0===r?m[e]:void(m[e]=r)},r.import=function(e,r){return d(e,r)},r.on=function(e,r){x[e]=x[e]||[],x[e].push(r)},r.exists=function(e){try{var r=f(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=f(e,{}),n=h[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=d(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var u=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);u(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=h.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(h[e])return n(h[e].s);var t=h[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=h,r.isBrowser=p,r.isServer=!p,r.plugins=[],r}();return p||(m.FuseBox=_),e.FuseBox=_}(this))
//# sourceMappingURL=app.js.map