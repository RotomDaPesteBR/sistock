"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "@next-auth/prisma-adapter":
/*!********************************************!*\
  !*** external "@next-auth/prisma-adapter" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@next-auth/prisma-adapter");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/google":
/*!*********************************************!*\
  !*** external "next-auth/providers/google" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/google");

/***/ }),

/***/ "(api)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) global.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbGliL3ByaXNtYS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUVBLE1BQU1DLE1BQU0sR0FBR0MsTUFBTSxDQUFDRCxNQUFQLElBQWlCLElBQUlELHdEQUFKLEVBQWhDO0FBRUEsSUFBSSxNQUF3Q0UsTUFBTSxDQUFDRCxNQUFQLEdBQWdCQSxNQUFoQjtBQUU1QyxpRUFBZUEsTUFBZiIsInNvdXJjZXMiOlsid2VicGFjazovL3Npc3RvY2svLi9zcmMvbGliL3ByaXNtYS50cz8wMWQ3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcclxuXHJcbmNvbnN0IHByaXNtYSA9IGdsb2JhbC5wcmlzbWEgfHwgbmV3IFByaXNtYUNsaWVudCgpO1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSBnbG9iYWwucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiZ2xvYmFsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/lib/prisma.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/auth/[...nextauth].ts":
/*!*********************************************!*\
  !*** ./src/pages/api/auth/[...nextauth].ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authOptions\": () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"next-auth/providers/google\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"@next-auth/prisma-adapter\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./src/lib/prisma.ts\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nconst authOptions = {\n  providers: [\n  /* CredentialsProvider({\r\n    name: 'Credentials',\r\n    credentials: {\r\n      mail: { label: 'Mail', type: 'mail' },\r\n      password: { label: 'Password', type: 'password' }\r\n    },\r\n    async authorize(credentials, req) {\r\n      // You need to provide your own logic here that takes the credentials\r\n      // submitted and returns either a object representing a user or value\r\n      // that is false/null if the credentials are invalid.\r\n      // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }\r\n      // You can also use the `req` object to obtain additional parameters\r\n      // (i.e., the request IP address)\r\n      const res = await fetch('/your/endpoint', {\r\n        method: 'POST',\r\n        body: JSON.stringify(credentials),\r\n        headers: { 'Content-Type': 'application/json' }\r\n      });\r\n      const user = await res.json();\r\n        // If no error and we have user data, return it\r\n      if (res.ok && user) {\r\n        return user;\r\n      }\r\n      // Return null if user data could not be retrieved\r\n      return null;\r\n    }\r\n  }), */\n  next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({\n    clientId: process.env.GOOGLE_CLIENT_ID,\n    clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n    authorization: {\n      params: {\n        access_type: 'offline',\n        response_type: 'code',\n        scope: 'openid profile email'\n      }\n    }\n  })],\n  secret: process.env.NEXTAUTH_SECRET,\n  adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n  callbacks: {\n    jwt(params) {\n      return params.token;\n    },\n\n    session: ({\n      session,\n      user\n    }) => _objectSpread(_objectSpread({}, session), {}, {\n      user: _objectSpread(_objectSpread({}, session.user), {}, {\n        id: user.id,\n        username: user.username\n      })\n    })\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUVPLE1BQU1JLFdBQVcsR0FBRztFQUN6QkMsU0FBUyxFQUFFO0VBQ1Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBRUlKLGlFQUFjLENBQUM7SUFDYkssUUFBUSxFQUFFQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsZ0JBRFQ7SUFFYkMsWUFBWSxFQUFFSCxPQUFPLENBQUNDLEdBQVIsQ0FBWUcsb0JBRmI7SUFHYkMsYUFBYSxFQUFFO01BQ2JDLE1BQU0sRUFBRTtRQUNOQyxXQUFXLEVBQUUsU0FEUDtRQUVOQyxhQUFhLEVBQUUsTUFGVDtRQUdOQyxLQUFLLEVBQUU7TUFIRDtJQURLO0VBSEYsQ0FBRCxDQTdCTCxDQURjO0VBMEN6QkMsTUFBTSxFQUFFVixPQUFPLENBQUNDLEdBQVIsQ0FBWVUsZUExQ0s7RUEyQ3pCQyxPQUFPLEVBQUVqQix3RUFBYSxDQUFDQyxtREFBRCxDQTNDRztFQTRDekJpQixTQUFTLEVBQUU7SUFDVEMsR0FBRyxDQUFDUixNQUFELEVBQVM7TUFDVixPQUFPQSxNQUFNLENBQUNTLEtBQWQ7SUFDRCxDQUhROztJQUlUQyxPQUFPLEVBQUUsQ0FBQztNQUFFQSxPQUFGO01BQVdDO0lBQVgsQ0FBRCxxQ0FDSkQsT0FESTtNQUVQQyxJQUFJLGtDQUNDRCxPQUFPLENBQUNDLElBRFQ7UUFFRkMsRUFBRSxFQUFFRCxJQUFJLENBQUNDLEVBRlA7UUFHRkMsUUFBUSxFQUFFRixJQUFJLENBQUNFO01BSGI7SUFGRztFQUpBO0FBNUNjLENBQXBCO0FBMkRQLGlFQUFlMUIsZ0RBQVEsQ0FBQ0ksV0FBRCxDQUF2QiIsInNvdXJjZXMiOlsid2VicGFjazovL3Npc3RvY2svLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cz81MGExIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tICduZXh0LWF1dGgnO1xyXG5pbXBvcnQgR29vZ2xlUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGUnO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJztcclxuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gJ0BuZXh0LWF1dGgvcHJpc21hLWFkYXB0ZXInO1xyXG5pbXBvcnQgcHJpc21hIGZyb20gJy4uLy4uLy4uL2xpYi9wcmlzbWEnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zID0ge1xyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgLyogQ3JlZGVudGlhbHNQcm92aWRlcih7XHJcbiAgICAgIG5hbWU6ICdDcmVkZW50aWFscycsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgbWFpbDogeyBsYWJlbDogJ01haWwnLCB0eXBlOiAnbWFpbCcgfSxcclxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogJ1Bhc3N3b3JkJywgdHlwZTogJ3Bhc3N3b3JkJyB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscywgcmVxKSB7XHJcbiAgICAgICAgLy8gWW91IG5lZWQgdG8gcHJvdmlkZSB5b3VyIG93biBsb2dpYyBoZXJlIHRoYXQgdGFrZXMgdGhlIGNyZWRlbnRpYWxzXHJcbiAgICAgICAgLy8gc3VibWl0dGVkIGFuZCByZXR1cm5zIGVpdGhlciBhIG9iamVjdCByZXByZXNlbnRpbmcgYSB1c2VyIG9yIHZhbHVlXHJcbiAgICAgICAgLy8gdGhhdCBpcyBmYWxzZS9udWxsIGlmIHRoZSBjcmVkZW50aWFscyBhcmUgaW52YWxpZC5cclxuICAgICAgICAvLyBlLmcuIHJldHVybiB7IGlkOiAxLCBuYW1lOiAnSiBTbWl0aCcsIGVtYWlsOiAnanNtaXRoQGV4YW1wbGUuY29tJyB9XHJcbiAgICAgICAgLy8gWW91IGNhbiBhbHNvIHVzZSB0aGUgYHJlcWAgb2JqZWN0IHRvIG9idGFpbiBhZGRpdGlvbmFsIHBhcmFtZXRlcnNcclxuICAgICAgICAvLyAoaS5lLiwgdGhlIHJlcXVlc3QgSVAgYWRkcmVzcylcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL3lvdXIvZW5kcG9pbnQnLCB7XHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNyZWRlbnRpYWxzKSxcclxuICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHJlcy5qc29uKCk7XHJcblxyXG4gICAgICAgIC8vIElmIG5vIGVycm9yIGFuZCB3ZSBoYXZlIHVzZXIgZGF0YSwgcmV0dXJuIGl0XHJcbiAgICAgICAgaWYgKHJlcy5vayAmJiB1c2VyKSB7XHJcbiAgICAgICAgICByZXR1cm4gdXNlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmV0dXJuIG51bGwgaWYgdXNlciBkYXRhIGNvdWxkIG5vdCBiZSByZXRyaWV2ZWRcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSksICovXHJcbiAgICBHb29nbGVQcm92aWRlcih7XHJcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lELFxyXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVULFxyXG4gICAgICBhdXRob3JpemF0aW9uOiB7XHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBhY2Nlc3NfdHlwZTogJ29mZmxpbmUnLFxyXG4gICAgICAgICAgcmVzcG9uc2VfdHlwZTogJ2NvZGUnLFxyXG4gICAgICAgICAgc2NvcGU6ICdvcGVuaWQgcHJvZmlsZSBlbWFpbCdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXSxcclxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcclxuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBqd3QocGFyYW1zKSB7XHJcbiAgICAgIHJldHVybiBwYXJhbXMudG9rZW47XHJcbiAgICB9LFxyXG4gICAgc2Vzc2lvbjogKHsgc2Vzc2lvbiwgdXNlciB9KSA9PiAoe1xyXG4gICAgICAuLi5zZXNzaW9uLFxyXG4gICAgICB1c2VyOiB7XHJcbiAgICAgICAgLi4uc2Vzc2lvbi51c2VyLFxyXG4gICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xyXG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsIlByaXNtYUFkYXB0ZXIiLCJwcmlzbWEiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIkdPT0dMRV9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsImF1dGhvcml6YXRpb24iLCJwYXJhbXMiLCJhY2Nlc3NfdHlwZSIsInJlc3BvbnNlX3R5cGUiLCJzY29wZSIsInNlY3JldCIsIk5FWFRBVVRIX1NFQ1JFVCIsImFkYXB0ZXIiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlc3Npb24iLCJ1c2VyIiwiaWQiLCJ1c2VybmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/auth/[...nextauth].ts"));
module.exports = __webpack_exports__;

})();