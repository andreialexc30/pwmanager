// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/pw.js":[function(require,module,exports) {
// Simple & Complex arrays
var sp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var cx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '_', '@', '^']; // select elements

var btnSp = document.getElementById('simple');
var btnCx = document.getElementById('complex');
var addSp = document.getElementById('add-simple');
var addCx = document.getElementById('add-complex');
var clearBtn = document.getElementById('clearList');
var spInput = document.getElementById('sp_input');
var cxInput = document.getElementById('cx_input');
var passwordList = document.querySelector('.password_list');
var passSp = document.querySelector('.sp_password');
var passCx = document.querySelector('.cx_password');
var pwName = document.querySelector('.pw_name');
var pwPass = document.querySelector('.pw_password');
var display = document.querySelector('.localstorage-display');
var ls = window.localStorage;
window.addEventListener('DOMContentLoaded', contentLoaded); // !!!! button events
// generates simple password

btnSp.addEventListener('click', function () {
  var passContent = '';

  for (var i = 0; i < 18; i++) {
    passContent += sp[randomSp()];
    passSp.textContent = passContent;
  }
}); // generates complex password

btnCx.addEventListener('click', function () {
  var passContent = '';

  for (var i = 0; i < 18; i++) {
    passContent += cx[randomCx()];
    passCx.textContent = passContent;
  }
}); // button states disabled/enabled

clearBtn.disabled = true;
clearBtn.style.backgroundColor = '#464f5d';

if (localStorage.length >= 1) {
  clearBtn.disabled = false;
  clearBtn.style.backgroundColor = '#495bab';
} // clears local storage


clearBtn.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
}); // !!!! functions
// create random generation functions for each array

function randomSp() {
  return Math.floor(Math.random() * sp.length);
}

function randomCx() {
  return Math.floor(Math.random() * cx.length);
}

function contentLoaded() {
  // add name & simple password to list
  addSp.addEventListener('click', addSpPassword); // add name & complex password to list

  addCx.addEventListener('click', addCxPassword); // get localStorage items

  for (var i = 0; i < localStorage.length; i++) {
    var key = ls.key(i);
    var value = ls.getItem(key);
    createAppend(key, value);
  }
} // adds simple password


function addSpPassword() {
  // select input values
  var simpleInput = spInput.value;
  var pwValue = passSp.textContent; // check if name is less than 12 characters

  var warning = document.querySelector('.warning_simple');
  var warning_empty = document.querySelector('.warning_sp_empty');

  if (simpleInput.length > 12) {
    warning.style.display = 'block';
    return;
  } else if (simpleInput.length == 0 || pwValue === 'not generated') {
    warning_empty.style.display = 'block';
    return;
  } else {
    // hide warnings
    warning.style.display = 'none';
    warning_empty.style.display = 'none';
    pushToStorage(simpleInput, pwValue);
    createAppend(simpleInput, pwValue);
    refresh(spInput);
  }
} // adds complex password


function addCxPassword() {
  // select input values
  var complexInput = cxInput.value;
  var pwValue = passCx.textContent; // check if name is less than 12 characters

  var warning = document.querySelector('.warning_complex');
  var warning_empty = document.querySelector('.warning_cx_empty');

  if (complexInput.length > 12) {
    warning.style.display = 'block';
    return;
  } else if (complexInput.length == 0 || pwValue === 'not generated') {
    warning_empty.style.display = 'block';
    return;
  } else {
    // hide warnings and push to storage
    warning.style.display = 'none';
    warning_empty.style.display = 'none';
    localStorage.setItem(complexInput, pwValue);
    createAppend(complexInput, pwValue);
    refresh(cxInput);
  }
}

function checkMax(listItem) {
  // Max number of passwords allowed to be stored
  if (localStorage.length && passwordList.childNodes.length < 6 || localStorage.length && passwordList.childNodes.length == 0) {
    passwordList.appendChild(listItem);
  } else {
    var displayedWarning = document.querySelector('.displayed-warning');
    displayedWarning.style.display = 'block';
    return;
  }
}

function createAppend(status, value) {
  // create child & append
  var wrapper = document.createElement('div');
  var listItem = document.createElement('li');
  var removeBtn = document.createElement('button');
  wrapper.className = 'listedPassword';
  listItem.className = 'password_list-item';
  wrapper.innerHTML = "Name:<span class=\"pw_name\">".concat(status, "</span>Password:<span class=\"pw_password\">").concat(value, "</span>");
  removeBtn.className = 'remove_pw';
  removeBtn.innerHTML = "<i class=\"fas fa-minus-square\"></i>remove";
  listItem.appendChild(wrapper);
  listItem.appendChild(removeBtn); // Max number of passwords allowed to be stored

  checkMax(listItem);
  getButton(removeBtn);
}

function pushToStorage(key, value) {
  if (localStorage.length < 6) {
    localStorage.setItem(key, value);
  } else {
    return;
  }
}

function getButton(btn) {
  btn.addEventListener('click', function () {
    for (var i = 0; i < localStorage.length; i++) {
      var key = ls.key(i);
      localStorage.removeItem(key);
      location.reload();
    }
  });
}

function refresh(input) {
  // clear input 
  input.value = '';
  location.reload();
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56560" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/pw.js"], null)
//# sourceMappingURL=/pw.860339c5.js.map