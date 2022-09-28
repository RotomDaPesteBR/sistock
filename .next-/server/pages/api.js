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
exports.id = "pages/api";
exports.ids = ["pages/api"];
exports.modules = {

/***/ "./src/pages/api/index.ts":
/*!********************************!*\
  !*** ./src/pages/api/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler),\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps)\n/* harmony export */ });\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function getServerSideProps(context) {\n  console.log(await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)(context));\n  return {\n    props: {\n      session: await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)(context)\n    }\n  };\n}\nasync function handler(req, res) {\n  try {\n    const result = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)();\n    res.status(200).json({\n      result\n    });\n  } catch (err) {\n    res.status(500).json({\n      error: 'failed to load data'\n    });\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvYXBpL2luZGV4LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTtBQUVPLGVBQWVDLGtCQUFmLENBQWtDQyxPQUFsQyxFQUEyQztFQUNoREMsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBTUosMkRBQVUsQ0FBQ0UsT0FBRCxDQUE1QjtFQUNBLE9BQU87SUFDTEcsS0FBSyxFQUFFO01BQ0xDLE9BQU8sRUFBRSxNQUFNTiwyREFBVSxDQUFDRSxPQUFEO0lBRHBCO0VBREYsQ0FBUDtBQUtEO0FBRWMsZUFBZUssT0FBZixDQUNiQyxHQURhLEVBRWJDLEdBRmEsRUFHYjtFQUNBLElBQUk7SUFDRixNQUFNQyxNQUFNLEdBQUcsTUFBTVYsMkRBQVUsRUFBL0I7SUFDQVMsR0FBRyxDQUFDRSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7TUFBRUY7SUFBRixDQUFyQjtFQUNELENBSEQsQ0FHRSxPQUFPRyxHQUFQLEVBQVk7SUFDWkosR0FBRyxDQUFDRSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7TUFBRUUsS0FBSyxFQUFFO0lBQVQsQ0FBckI7RUFDRDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2lzdG9jay8uL3NyYy9wYWdlcy9hcGkvaW5kZXgudHM/OGU2OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0JztcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aC9yZWFjdCc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VydmVyU2lkZVByb3BzKGNvbnRleHQpIHtcclxuICBjb25zb2xlLmxvZyhhd2FpdCBnZXRTZXNzaW9uKGNvbnRleHQpKTtcclxuICByZXR1cm4ge1xyXG4gICAgcHJvcHM6IHtcclxuICAgICAgc2Vzc2lvbjogYXdhaXQgZ2V0U2Vzc2lvbihjb250ZXh0KVxyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXHJcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcclxuICByZXM6IE5leHRBcGlSZXNwb25zZVxyXG4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZ2V0U2Vzc2lvbigpO1xyXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyByZXN1bHQgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnZmFpbGVkIHRvIGxvYWQgZGF0YScgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJnZXRTZXNzaW9uIiwiZ2V0U2VydmVyU2lkZVByb3BzIiwiY29udGV4dCIsImNvbnNvbGUiLCJsb2ciLCJwcm9wcyIsInNlc3Npb24iLCJoYW5kbGVyIiwicmVxIiwicmVzIiwicmVzdWx0Iiwic3RhdHVzIiwianNvbiIsImVyciIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/api/index.ts\n");

/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/api/index.ts"));
module.exports = __webpack_exports__;

})();