"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
exports.__esModule = true;
var axios_1 = require("axios");
function verifyAge(func, age) {
    return func(age);
}
var verifyAgeCb = function (age) {
    return age > 32;
};
var isValid = verifyAge(verifyAgeCb, 23);
console.log("isValid ", isValid);
var clumsysquare = function (num) {
    // SSSS
    var result = 0;
    for (var i = 1; i <= num; i++) {
        for (var j = 1; j <= num; j++) {
            result++;
        }
    }
    return result;
};
var memoize = function (fn) {
    var cache = new Map();
    var cached = function (val) {
        return cache.has(val)
            ? cache.get(val)
            : cache.set(val, fn.call(this, val)) && cache.get(val);
    };
    cached.cache = cache;
    return cached;
};
var memoizeClass = memoize(clumsysquare);
console.time("First call");
console.log(memoizeClass(9467));
console.timeEnd("First call");
console.time("Second call");
console.log(memoizeClass(9467));
console.timeEnd("Second call");
console.time("Third call");
console.log(memoizeClass(9467));
console.timeEnd("Third call");
var memoizeRateLimit = function (func, maxAge) {
    if (maxAge === void 0) { maxAge = 1000; }
    var cache = new Map();
    var startTime = Date.now();
    var cached = function (val) {
        var endTime = Date.now();
        var requestTime = endTime - startTime;
        var delayTime = maxAge - requestTime;
        if (delayTime <= 0) {
            cache = new Map();
            startTime = Date.now();
        }
        ;
        return cache.has(val)
            ? cache.get(val)
            : cache.set(val, func.call(this, val)) && cache.get(val);
    };
    cached.cache = cache;
    return cached;
};
var callApi = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, status;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, axios_1["default"].get('https://jsonplaceholder.typicode.com/posts')];
            case 1:
                _a = _b.sent(), data = _a.data, status = _a.status;
                console.log("**** CALLED API | Status: ".concat(status, " **** "));
                return [2 /*return*/, data.length];
        }
    });
}); };
var memoizeApi = memoizeRateLimit(callApi);
(function run() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f;
        var _this = this;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.time("First call");
                    _b = (_a = console).log;
                    return [4 /*yield*/, memoizeApi('post')];
                case 1:
                    _b.apply(_a, [_g.sent()]);
                    console.timeEnd("First call");
                    console.time("Second call");
                    _d = (_c = console).log;
                    return [4 /*yield*/, memoizeApi('post')];
                case 2:
                    _d.apply(_c, [_g.sent()]);
                    console.timeEnd("Second call");
                    console.time("Third call");
                    _f = (_e = console).log;
                    return [4 /*yield*/, memoizeApi('post')];
                case 3:
                    _f.apply(_e, [_g.sent()]);
                    console.timeEnd("Third call");
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    console.time("Four call");
                                    _b = (_a = console).log;
                                    return [4 /*yield*/, memoizeApi('post')];
                                case 1:
                                    _b.apply(_a, [_c.sent()]);
                                    console.timeEnd("Four call");
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 2000);
                    return [2 /*return*/];
            }
        });
    });
})();
