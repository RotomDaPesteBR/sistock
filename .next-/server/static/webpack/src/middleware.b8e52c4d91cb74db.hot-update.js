"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("src/middleware",{

/***/ "(middleware)/./src/middleware.ts":
/*!***************************!*\
  !*** ./src/middleware.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"config\": () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/middleware */ \"(middleware)/./node_modules/next-auth/middleware.js\");\n/* harmony import */ var next_auth_middleware__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_middleware__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"(middleware)/./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction authorize() {\n  const session = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.getSession)();\n  let authenticated = false;\n\n  if (session.status === 'authenticated') {\n    authenticated = true;\n  }\n\n  return authenticated;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_auth_middleware__WEBPACK_IMPORTED_MODULE_0__.withAuth)({\n  callbacks: {\n    authorized: authorize\n  },\n  pages: {\n    signIn: '/login',\n    error: '/login'\n  }\n}));\nconst config = {\n  matcher: ['/']\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFFQTs7QUFFQSxTQUFTRSxTQUFULEdBQXFCO0VBQ25CLE1BQU1DLE9BQU8sR0FBR0YsMkRBQVUsRUFBMUI7RUFDQSxJQUFJRyxhQUFhLEdBQUcsS0FBcEI7O0VBQ0EsSUFBSUQsT0FBTyxDQUFDRSxNQUFSLEtBQW1CLGVBQXZCLEVBQXdDO0lBQ3RDRCxhQUFhLEdBQUcsSUFBaEI7RUFDRDs7RUFDRCxPQUFPQSxhQUFQO0FBQ0Q7O0FBRUQsaUVBQWVKLDhEQUFRLENBQUM7RUFDdEJNLFNBQVMsRUFBRTtJQUNUQyxVQUFVLEVBQUVMO0VBREgsQ0FEVztFQUl0Qk0sS0FBSyxFQUFFO0lBQ0xDLE1BQU0sRUFBRSxRQURIO0lBRUxDLEtBQUssRUFBRTtFQUZGO0FBSmUsQ0FBRCxDQUF2QjtBQVVPLE1BQU1DLE1BQU0sR0FBRztFQUFFQyxPQUFPLEVBQUUsQ0FBQyxHQUFEO0FBQVgsQ0FBZiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvbWlkZGxld2FyZS50cz9kMTk5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdpdGhBdXRoIH0gZnJvbSAnbmV4dC1hdXRoL21pZGRsZXdhcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2V0U2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aC9yZWFjdCc7XHJcblxyXG5mdW5jdGlvbiBhdXRob3JpemUoKSB7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGdldFNlc3Npb24oKTtcclxuICBsZXQgYXV0aGVudGljYXRlZCA9IGZhbHNlO1xyXG4gIGlmIChzZXNzaW9uLnN0YXR1cyA9PT0gJ2F1dGhlbnRpY2F0ZWQnKSB7XHJcbiAgICBhdXRoZW50aWNhdGVkID0gdHJ1ZTtcclxuICB9XHJcbiAgcmV0dXJuIGF1dGhlbnRpY2F0ZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhBdXRoKHtcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGF1dGhvcml6ZWQ6IGF1dGhvcml6ZVxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogJy9sb2dpbicsXHJcbiAgICBlcnJvcjogJy9sb2dpbidcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHsgbWF0Y2hlcjogWycvJ10gfTtcclxuIl0sIm5hbWVzIjpbIndpdGhBdXRoIiwiZ2V0U2Vzc2lvbiIsImF1dGhvcml6ZSIsInNlc3Npb24iLCJhdXRoZW50aWNhdGVkIiwic3RhdHVzIiwiY2FsbGJhY2tzIiwiYXV0aG9yaXplZCIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJjb25maWciLCJtYXRjaGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.ts\n");

/***/ })

});