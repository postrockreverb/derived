import { useSyncExternalStore } from 'react';

function observer() {
    var subscribers = new Set();
    return {
        notify: function (newValue) {
            subscribers.forEach(function (callback) { return callback(newValue); });
        },
        subscribe: function (callback) {
            subscribers.add(callback);
            return function () {
                subscribers.delete(callback);
            };
        },
    };
}

function store(initialValue) {
    var _observer = observer();
    var value = initialValue;
    return {
        get: function () { return value; },
        set: function (newValue) {
            value = newValue;
            _observer.notify(newValue);
        },
        subscribe: _observer.subscribe,
    };
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function derived(valueGetter) {
    var _observer = observer();
    var value = null;
    var subscribed = new Set();
    function get(store) {
        var currentValue = store.get();
        if (!subscribed.has(store)) {
            subscribed.add(store);
            store.subscribe(function (newValue) {
                if (currentValue === newValue) {
                    return;
                }
                currentValue = newValue;
                void computeValue();
            });
        }
        return currentValue;
    }
    function computeValue() {
        return __awaiter(this, void 0, void 0, function () {
            var newValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newValue = valueGetter(get);
                        if (!(newValue instanceof Promise)) return [3 /*break*/, 2];
                        return [4 /*yield*/, newValue];
                    case 1:
                        value = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        value = newValue;
                        _a.label = 3;
                    case 3:
                        _observer.notify(value);
                        return [2 /*return*/];
                }
            });
        });
    }
    void computeValue();
    return {
        get: function () { return value; },
        subscribe: _observer.subscribe,
    };
}

function async(callable) {
    var _this = this;
    var isPending = store(false);
    var callFn = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isPending.get()) {
                            return [2 /*return*/];
                        }
                        isPending.set(true);
                        return [4 /*yield*/, callable.apply(void 0, params)];
                    case 1:
                        result = _a.sent();
                        isPending.set(false);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return Object.assign(callFn, {
        $isPending: isPending,
    });
}

function map(initialValue) {
    var _observer = observer();
    var undefinedStore = store(undefined);
    var map = new Map();
    if (initialValue) {
        for (var key in initialValue) {
            var value = store(initialValue[key]);
            map.set(key, value);
        }
    }
    return {
        get: function () { return map; },
        item: function (key) {
            if (key === null || key === undefined) {
                return undefinedStore;
            }
            var valueStore = map.get(key);
            if (valueStore === undefined) {
                valueStore = store(undefined);
                map.set(key, valueStore);
            }
            return valueStore;
        },
        has: function (key) { return map.has(key); },
        set: function (key, value) {
            var valueStore = map.get(key);
            if (valueStore === undefined) {
                map.set(key, store(value));
                _observer.notify(map);
                return;
            }
            if (valueStore.get() !== value) {
                valueStore.set(value);
                _observer.notify(map);
                return;
            }
        },
        delete: function (key) { return map.delete(key); },
        subscribe: _observer.subscribe,
    };
}

function useObservable(store) {
    return useSyncExternalStore(store.subscribe, store.get);
}

export { async, derived, map, store, useObservable };
//# sourceMappingURL=index.js.map
