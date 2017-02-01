/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Backbone.js 1.3.3

//     (c) 2010-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(factory) {

  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  var root = (typeof self == 'object' && self.self === self && self) ||
            (typeof global == 'object' && global.global === global && global);

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), exports], __WEBPACK_AMD_DEFINE_RESULT__ = function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore'), $;
    try { $ = require('jquery'); } catch (e) {}
    factory(root, exports, _, $);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

})(function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to a common array method we'll want to use later.
  var slice = Array.prototype.slice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.3.3';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... this will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Proxy Backbone class methods to Underscore functions, wrapping the model's
  // `attributes` object or collection's `models` array behind the scenes.
  //
  // collection.filter(function(model) { return model.get('age') > 10 });
  // collection.each(this.addView);
  //
  // `Function#apply` can be slow so we use the method's arg count, if we know it.
  var addMethod = function(length, method, attribute) {
    switch (length) {
      case 1: return function() {
        return _[method](this[attribute]);
      };
      case 2: return function(value) {
        return _[method](this[attribute], value);
      };
      case 3: return function(iteratee, context) {
        return _[method](this[attribute], cb(iteratee, this), context);
      };
      case 4: return function(iteratee, defaultVal, context) {
        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
      };
      default: return function() {
        var args = slice.call(arguments);
        args.unshift(this[attribute]);
        return _[method].apply(_, args);
      };
    }
  };
  var addUnderscoreMethods = function(Class, methods, attribute) {
    _.each(methods, function(length, method) {
      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
    });
  };

  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
  var cb = function(iteratee, instance) {
    if (_.isFunction(iteratee)) return iteratee;
    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
    return iteratee;
  };
  var modelMatcher = function(attrs) {
    var matcher = _.matches(attrs);
    return function(model) {
      return matcher(model.attributes);
    };
  };

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // a custom event channel. You may bind a callback to an event with `on` or
  // remove with `off`; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {};

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Iterates over the standard `event, callback` (as well as the fancy multiple
  // space-separated events `"change blur", callback` and jQuery-style event
  // maps `{event: callback}`).
  var eventsApi = function(iteratee, events, name, callback, opts) {
    var i = 0, names;
    if (name && typeof name === 'object') {
      // Handle event maps.
      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
      for (names = _.keys(name); i < names.length ; i++) {
        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
      }
    } else if (name && eventSplitter.test(name)) {
      // Handle space-separated event names by delegating them individually.
      for (names = name.split(eventSplitter); i < names.length; i++) {
        events = iteratee(events, names[i], callback, opts);
      }
    } else {
      // Finally, standard events.
      events = iteratee(events, name, callback, opts);
    }
    return events;
  };

  // Bind an event to a `callback` function. Passing `"all"` will bind
  // the callback to all events fired.
  Events.on = function(name, callback, context) {
    return internalOn(this, name, callback, context);
  };

  // Guard the `listening` argument from the public API.
  var internalOn = function(obj, name, callback, context, listening) {
    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
      context: context,
      ctx: obj,
      listening: listening
    });

    if (listening) {
      var listeners = obj._listeners || (obj._listeners = {});
      listeners[listening.id] = listening;
    }

    return obj;
  };

  // Inversion-of-control versions of `on`. Tell *this* object to listen to
  // an event in another object... keeping track of what it's listening to
  // for easier unbinding later.
  Events.listenTo = function(obj, name, callback) {
    if (!obj) return this;
    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var listening = listeningTo[id];

    // This object is not listening to any other events on `obj` yet.
    // Setup the necessary references to track the listening callbacks.
    if (!listening) {
      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
    }

    // Bind callbacks on obj, and keep track of them on listening.
    internalOn(obj, name, callback, this, listening);
    return this;
  };

  // The reducing API that adds a callback to the `events` object.
  var onApi = function(events, name, callback, options) {
    if (callback) {
      var handlers = events[name] || (events[name] = []);
      var context = options.context, ctx = options.ctx, listening = options.listening;
      if (listening) listening.count++;

      handlers.push({callback: callback, context: context, ctx: context || ctx, listening: listening});
    }
    return events;
  };

  // Remove one or many callbacks. If `context` is null, removes all
  // callbacks with that function. If `callback` is null, removes all
  // callbacks for the event. If `name` is null, removes all bound
  // callbacks for all events.
  Events.off = function(name, callback, context) {
    if (!this._events) return this;
    this._events = eventsApi(offApi, this._events, name, callback, {
      context: context,
      listeners: this._listeners
    });
    return this;
  };

  // Tell this object to stop listening to either specific events ... or
  // to every object it's currently listening to.
  Events.stopListening = function(obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) return this;

    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

    for (var i = 0; i < ids.length; i++) {
      var listening = listeningTo[ids[i]];

      // If listening doesn't exist, this object is not currently
      // listening to obj. Break out early.
      if (!listening) break;

      listening.obj.off(name, callback, this);
    }

    return this;
  };

  // The reducing API that removes a callback from the `events` object.
  var offApi = function(events, name, callback, options) {
    if (!events) return;

    var i = 0, listening;
    var context = options.context, listeners = options.listeners;

    // Delete all events listeners and "drop" events.
    if (!name && !callback && !context) {
      var ids = _.keys(listeners);
      for (; i < ids.length; i++) {
        listening = listeners[ids[i]];
        delete listeners[listening.id];
        delete listening.listeningTo[listening.objId];
      }
      return;
    }

    var names = name ? [name] : _.keys(events);
    for (; i < names.length; i++) {
      name = names[i];
      var handlers = events[name];

      // Bail out if there are no events stored.
      if (!handlers) break;

      // Replace events if there are any remaining.  Otherwise, clean up.
      var remaining = [];
      for (var j = 0; j < handlers.length; j++) {
        var handler = handlers[j];
        if (
          callback && callback !== handler.callback &&
            callback !== handler.callback._callback ||
              context && context !== handler.context
        ) {
          remaining.push(handler);
        } else {
          listening = handler.listening;
          if (listening && --listening.count === 0) {
            delete listeners[listening.id];
            delete listening.listeningTo[listening.objId];
          }
        }
      }

      // Update tail event if the list has any events.  Otherwise, clean up.
      if (remaining.length) {
        events[name] = remaining;
      } else {
        delete events[name];
      }
    }
    return events;
  };

  // Bind an event to only be triggered a single time. After the first time
  // the callback is invoked, its listener will be removed. If multiple events
  // are passed in using the space-separated syntax, the handler will fire
  // once for each event, not once for a combination of all events.
  Events.once = function(name, callback, context) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
    if (typeof name === 'string' && context == null) callback = void 0;
    return this.on(events, callback, context);
  };

  // Inversion-of-control versions of `once`.
  Events.listenToOnce = function(obj, name, callback) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
    return this.listenTo(obj, events);
  };

  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
  // `offer` unbinds the `onceWrapper` after it has been called.
  var onceMap = function(map, name, callback, offer) {
    if (callback) {
      var once = map[name] = _.once(function() {
        offer(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
    }
    return map;
  };

  // Trigger one or many events, firing all bound callbacks. Callbacks are
  // passed the same arguments as `trigger` is, apart from the event name
  // (unless you're listening on `"all"`, which will cause your callback to
  // receive the true name of the event as the first argument).
  Events.trigger = function(name) {
    if (!this._events) return this;

    var length = Math.max(0, arguments.length - 1);
    var args = Array(length);
    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

    eventsApi(triggerApi, this._events, name, void 0, args);
    return this;
  };

  // Handles triggering the appropriate event callbacks.
  var triggerApi = function(objEvents, name, callback, args) {
    if (objEvents) {
      var events = objEvents[name];
      var allEvents = objEvents.all;
      if (events && allEvents) allEvents = allEvents.slice();
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, [name].concat(args));
    }
    return objEvents;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    var defaults = _.result(this, 'defaults');
    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // The prefix is used to create the client id which is used to identify models locally.
    // You may want to override this if you're experiencing name clashes with model ids.
    cidPrefix: 'c',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Special-cased proxy to underscore's `_.matches` method.
    matches: function(attrs) {
      return !!_.iteratee(attrs, this)(this.attributes);
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      var unset      = options.unset;
      var silent     = options.silent;
      var changes    = [];
      var changing   = this._changing;
      this._changing = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }

      var current = this.attributes;
      var changed = this.changed;
      var prev    = this._previousAttributes;

      // For each `set` attribute, update or delete the current value.
      for (var attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          changed[attr] = val;
        } else {
          delete changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Update the `id`.
      if (this.idAttribute in attrs) this.id = this.get(this.idAttribute);

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0; i < changes.length; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      var changed = {};
      for (var attr in diff) {
        var val = diff[attr];
        if (_.isEqual(old[attr], val)) continue;
        changed[attr] = val;
      }
      return _.size(changed) ? changed : false;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server, merging the response with the model's
    // local attributes. Any changed attributes will trigger a "change" event.
    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (!model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true, parse: true}, options);
      var wait = options.wait;

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !wait) {
        if (!this.set(attrs, options)) return false;
      } else if (!this._validate(attrs, options)) {
        return false;
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      var model = this;
      var success = options.success;
      var attributes = this.attributes;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
        if (serverAttrs && !model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      // Set temporary attributes if `{wait: true}` to properly find new ids.
      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch' && !options.attrs) options.attrs = attrs;
      var xhr = this.sync(method, this, options);

      // Restore attributes.
      this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      var wait = options.wait;

      var destroy = function() {
        model.stopListening();
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (wait) destroy();
        if (success) success.call(options.context, model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      var xhr = false;
      if (this.isNew()) {
        _.defer(options.success);
      } else {
        wrapError(this, options);
        xhr = this.sync('delete', this, options);
      }
      if (!wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      var id = this.get(this.idAttribute);
      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend({}, options, {validate: true}));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model, mapped to the
  // number of arguments they take.
  var modelMethods = {keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
      omit: 0, chain: 1, isEmpty: 1};

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  addUnderscoreMethods(Model, modelMethods, 'attributes');

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analogous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Splices `insert` into `array` at index `at`.
  var splice = function(array, insert, at) {
    at = Math.min(Math.max(at, 0), array.length);
    var tail = Array(array.length - at);
    var length = insert.length;
    var i;
    for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
    for (i = 0; i < length; i++) array[i + at] = insert[i];
    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model) { return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set. `models` may be Backbone
    // Models or raw JavaScript objects to be converted to Models, or any
    // combination of the two.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      options = _.extend({}, options);
      var singular = !_.isArray(models);
      models = singular ? [models] : models.slice();
      var removed = this._removeModels(models, options);
      if (!options.silent && removed.length) {
        options.changes = {added: [], merged: [], removed: removed};
        this.trigger('update', this, options);
      }
      return singular ? removed[0] : removed;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      if (models == null) return;

      options = _.extend({}, setOptions, options);
      if (options.parse && !this._isModel(models)) {
        models = this.parse(models, options) || [];
      }

      var singular = !_.isArray(models);
      models = singular ? [models] : models.slice();

      var at = options.at;
      if (at != null) at = +at;
      if (at > this.length) at = this.length;
      if (at < 0) at += this.length + 1;

      var set = [];
      var toAdd = [];
      var toMerge = [];
      var toRemove = [];
      var modelMap = {};

      var add = options.add;
      var merge = options.merge;
      var remove = options.remove;

      var sort = false;
      var sortable = this.comparator && at == null && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      var model, i;
      for (i = 0; i < models.length; i++) {
        model = models[i];

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        var existing = this.get(model);
        if (existing) {
          if (merge && model !== existing) {
            var attrs = this._isModel(model) ? model.attributes : model;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            toMerge.push(existing);
            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
          }
          if (!modelMap[existing.cid]) {
            modelMap[existing.cid] = true;
            set.push(existing);
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(model, options);
          if (model) {
            toAdd.push(model);
            this._addReference(model, options);
            modelMap[model.cid] = true;
            set.push(model);
          }
        }
      }

      // Remove stale models.
      if (remove) {
        for (i = 0; i < this.length; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) toRemove.push(model);
        }
        if (toRemove.length) this._removeModels(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      var orderChanged = false;
      var replace = !sortable && add && remove;
      if (set.length && replace) {
        orderChanged = this.length !== set.length || _.some(this.models, function(m, index) {
          return m !== set[index];
        });
        this.models.length = 0;
        splice(this.models, set, 0);
        this.length = this.models.length;
      } else if (toAdd.length) {
        if (sortable) sort = true;
        splice(this.models, toAdd, at == null ? this.length : at);
        this.length = this.models.length;
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort/update events.
      if (!options.silent) {
        for (i = 0; i < toAdd.length; i++) {
          if (at != null) options.index = at + i;
          model = toAdd[i];
          model.trigger('add', model, this, options);
        }
        if (sort || orderChanged) this.trigger('sort', this, options);
        if (toAdd.length || toRemove.length || toMerge.length) {
          options.changes = {
            added: toAdd,
            removed: toRemove,
            merged: toMerge
          };
          this.trigger('update', this, options);
        }
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options = options ? _.clone(options) : {};
      for (var i = 0; i < this.models.length; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      return this.remove(model, options);
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      return this.remove(model, options);
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id, cid, model object with id or cid
    // properties, or an attributes object that is transformed through modelId.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] ||
        this._byId[this.modelId(obj.attributes || obj)] ||
        obj.cid && this._byId[obj.cid];
    },

    // Returns `true` if the model is in the collection.
    has: function(obj) {
      return this.get(obj) != null;
    },

    // Get the model at the given index.
    at: function(index) {
      if (index < 0) index += this.length;
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      return this[first ? 'find' : 'filter'](attrs);
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      var comparator = this.comparator;
      if (!comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      var length = comparator.length;
      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);

      // Run sort based on type of `comparator`.
      if (length === 1 || _.isString(comparator)) {
        this.models = this.sortBy(comparator);
      } else {
        this.models.sort(comparator);
      }
      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return this.map(attr + '');
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success.call(options.context, collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      var wait = options.wait;
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(m, resp, callbackOpts) {
        if (wait) collection.add(m, callbackOpts);
        if (success) success.call(callbackOpts.context, m, resp, callbackOpts);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models, {
        model: this.model,
        comparator: this.comparator
      });
    },

    // Define how to uniquely identify models in the collection.
    modelId: function(attrs) {
      return attrs[this.model.prototype.idAttribute || 'id'];
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (this._isModel(attrs)) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method called by both remove and set.
    _removeModels: function(models, options) {
      var removed = [];
      for (var i = 0; i < models.length; i++) {
        var model = this.get(models[i]);
        if (!model) continue;

        var index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;

        // Remove references before triggering 'remove' event to prevent an
        // infinite loop. #3693
        delete this._byId[model.cid];
        var id = this.modelId(model.attributes);
        if (id != null) delete this._byId[id];

        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }

        removed.push(model);
        this._removeReference(model, options);
      }
      return removed;
    },

    // Method for checking whether an object should be considered a model for
    // the purposes of adding to the collection.
    _isModel: function(model) {
      return model instanceof Model;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      var id = this.modelId(model.attributes);
      if (id != null) this._byId[id] = model;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      delete this._byId[model.cid];
      var id = this.modelId(model.attributes);
      if (id != null) delete this._byId[id];
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if (model) {
        if ((event === 'add' || event === 'remove') && collection !== this) return;
        if (event === 'destroy') this.remove(model, options);
        if (event === 'change') {
          var prevId = this.modelId(model.previousAttributes());
          var id = this.modelId(model.attributes);
          if (prevId !== id) {
            if (prevId != null) delete this._byId[prevId];
            if (id != null) this._byId[id] = model;
          }
        }
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var collectionMethods = {forEach: 3, each: 3, map: 3, collect: 3, reduce: 0,
      foldl: 0, inject: 0, reduceRight: 0, foldr: 0, find: 3, detect: 3, filter: 3,
      select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
      contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
      head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
      without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
      isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
      sortBy: 3, indexBy: 3, findIndex: 3, findLastIndex: 3};

  // Mix in each Underscore method as a proxy to `Collection#models`.
  addUnderscoreMethods(Collection, collectionMethods, 'models');

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be set as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this._removeElement();
      this.stopListening();
      return this;
    },

    // Remove this view's element from the document and all event listeners
    // attached to it. Exposed for subclasses using an alternative DOM
    // manipulation API.
    _removeElement: function() {
      this.$el.remove();
    },

    // Change the view's element (`this.el` property) and re-delegate the
    // view's events on the new element.
    setElement: function(element) {
      this.undelegateEvents();
      this._setElement(element);
      this.delegateEvents();
      return this;
    },

    // Creates the `this.el` and `this.$el` references for this view using the
    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
    // context or an element. Subclasses can override this to utilize an
    // alternative DOM manipulation API and are only required to set the
    // `this.el` property.
    _setElement: function(el) {
      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
      this.el = this.$el[0];
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    delegateEvents: function(events) {
      events || (events = _.result(this, 'events'));
      if (!events) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[method];
        if (!method) continue;
        var match = key.match(delegateEventSplitter);
        this.delegate(match[1], match[2], _.bind(method, this));
      }
      return this;
    },

    // Add a single event listener to the view's element (or a child element
    // using `selector`). This only works for delegate-able events: not `focus`,
    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
    delegate: function(eventName, selector, listener) {
      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
      return this;
    },

    // Clears all callbacks previously bound to the view by `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // A finer-grained `undelegateEvents` for removing a single delegated event.
    // `selector` and `listener` are both optional.
    undelegate: function(eventName, selector, listener) {
      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
      return this;
    },

    // Produces a DOM element to be assigned to your view. Exposed for
    // subclasses using an alternative DOM manipulation API.
    _createElement: function(tagName) {
      return document.createElement(tagName);
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        this.setElement(this._createElement(_.result(this, 'tagName')));
        this._setAttributes(attrs);
      } else {
        this.setElement(_.result(this, 'el'));
      }
    },

    // Set attributes from a hash on this view's element.  Exposed for
    // subclasses using an alternative DOM manipulation API.
    _setAttributes: function(attributes) {
      this.$el.attr(attributes);
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // Pass along `textStatus` and `errorThrown` from jQuery.
    var error = options.error;
    options.error = function(xhr, textStatus, errorThrown) {
      options.textStatus = textStatus;
      options.errorThrown = errorThrown;
      if (error) error.call(options.context, xhr, textStatus, errorThrown);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch': 'PATCH',
    'delete': 'DELETE',
    'read': 'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        if (router.execute(callback, args, name) !== false) {
          router.trigger.apply(router, ['route:' + name].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
        }
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args, name) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    this.checkUrl = _.bind(this.checkUrl, this);

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
      return path === this.root && !this.getSearch();
    },

    // Does the pathname match the root?
    matchRoot: function() {
      var path = this.decodeFragment(this.location.pathname);
      var rootPath = path.slice(0, this.root.length - 1) + '/';
      return rootPath === this.root;
    },

    // Unicode characters in `location.pathname` are percent encoded so they're
    // decoded for comparison. `%25` should not be decoded since it may be part
    // of an encoded parameter.
    decodeFragment: function(fragment) {
      return decodeURI(fragment.replace(/%25/g, '%2525'));
    },

    // In IE6, the hash fragment and search params are incorrect if the
    // fragment contains `?`.
    getSearch: function() {
      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
      return match ? match[0] : '';
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the pathname and search params, without the root.
    getPath: function() {
      var path = this.decodeFragment(
        this.location.pathname + this.getSearch()
      ).slice(this.root.length - 1);
      return path.charAt(0) === '/' ? path.slice(1) : path;
    },

    // Get the cross-browser normalized URL fragment from the path or hash.
    getFragment: function(fragment) {
      if (fragment == null) {
        if (this._usePushState || !this._wantsHashChange) {
          fragment = this.getPath();
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error('Backbone.history has already been started');
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
      this._useHashChange   = this._wantsHashChange && this._hasHashChange;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.history && this.history.pushState);
      this._usePushState    = this._wantsPushState && this._hasPushState;
      this.fragment         = this.getFragment();

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          var rootPath = this.root.slice(0, -1) || '/';
          this.location.replace(rootPath + '#' + this.getPath());
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot()) {
          this.navigate(this.getHash(), {replace: true});
        }

      }

      // Proxy an iframe to handle location events if the browser doesn't
      // support the `hashchange` event, HTML5 history, or the user wants
      // `hashChange` but not `pushState`.
      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
        this.iframe = document.createElement('iframe');
        this.iframe.src = 'javascript:0';
        this.iframe.style.display = 'none';
        this.iframe.tabIndex = -1;
        var body = document.body;
        // Using `appendChild` will throw on IE < 9 if the document is not ready.
        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
        iWindow.document.open();
        iWindow.document.close();
        iWindow.location.hash = '#' + this.fragment;
      }

      // Add a cross-platform `addEventListener` shim for older browsers.
      var addEventListener = window.addEventListener || function(eventName, listener) {
        return attachEvent('on' + eventName, listener);
      };

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._usePushState) {
        addEventListener('popstate', this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        addEventListener('hashchange', this.checkUrl, false);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      // Add a cross-platform `removeEventListener` shim for older browsers.
      var removeEventListener = window.removeEventListener || function(eventName, listener) {
        return detachEvent('on' + eventName, listener);
      };

      // Remove window listeners.
      if (this._usePushState) {
        removeEventListener('popstate', this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        removeEventListener('hashchange', this.checkUrl, false);
      }

      // Clean up the iframe if necessary.
      if (this.iframe) {
        document.body.removeChild(this.iframe);
        this.iframe = null;
      }

      // Some environments will throw when clearing an undefined interval.
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();

      // If the user pressed the back button, the iframe's hash will have
      // changed and we should use that for comparison.
      if (current === this.fragment && this.iframe) {
        current = this.getHash(this.iframe.contentWindow);
      }

      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      // If the root doesn't match, no routes can match either.
      if (!this.matchRoot()) return false;
      fragment = this.fragment = this.getFragment(fragment);
      return _.some(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      // Normalize the fragment.
      fragment = this.getFragment(fragment || '');

      // Don't include a trailing slash on the root.
      var rootPath = this.root;
      if (fragment === '' || fragment.charAt(0) === '?') {
        rootPath = rootPath.slice(0, -1) || '/';
      }
      var url = rootPath + fragment;

      // Strip the hash and decode for matching.
      fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._usePushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
          var iWindow = this.iframe.contentWindow;

          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if (!options.replace) {
            iWindow.document.open();
            iWindow.document.close();
          }

          this._updateHash(iWindow.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function and add the prototype properties.
    child.prototype = _.create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error.call(options.context, model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports['default'] = /*istanbul ignore end*/Diff;
function Diff() {}

Diff.prototype = { /*istanbul ignore start*/
  /*istanbul ignore end*/diff: function diff(oldString, newString) {
    /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var callback = options.callback;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    this.options = options;

    var self = this;

    function done(value) {
      if (callback) {
        setTimeout(function () {
          callback(undefined, value);
        }, 0);
        return true;
      } else {
        return value;
      }
    }

    // Allow subclasses to massage the input prior to running
    oldString = this.castInput(oldString);
    newString = this.castInput(newString);

    oldString = this.removeEmpty(this.tokenize(oldString));
    newString = this.removeEmpty(this.tokenize(newString));

    var newLen = newString.length,
        oldLen = oldString.length;
    var editLength = 1;
    var maxEditLength = newLen + oldLen;
    var bestPath = [{ newPos: -1, components: [] }];

    // Seed editLength = 0, i.e. the content starts with the same values
    var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
    if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
      // Identity per the equality and tokenizer
      return done([{ value: this.join(newString), count: newString.length }]);
    }

    // Main worker method. checks all permutations of a given edit length for acceptance.
    function execEditLength() {
      for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
        var basePath = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
        var addPath = bestPath[diagonalPath - 1],
            removePath = bestPath[diagonalPath + 1],
            _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
        if (addPath) {
          // No one else is going to attempt to use this value, clear it
          bestPath[diagonalPath - 1] = undefined;
        }

        var canAdd = addPath && addPath.newPos + 1 < newLen,
            canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
        if (!canAdd && !canRemove) {
          // If this path is a terminal then prune
          bestPath[diagonalPath] = undefined;
          continue;
        }

        // Select the diagonal that we want to branch from. We select the prior
        // path whose position in the new string is the farthest from the origin
        // and does not pass the bounds of the diff graph
        if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
          basePath = clonePath(removePath);
          self.pushComponent(basePath.components, undefined, true);
        } else {
          basePath = addPath; // No need to clone, we've pulled it from the list
          basePath.newPos++;
          self.pushComponent(basePath.components, true, undefined);
        }

        _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);

        // If we have hit the end of both strings, then we are done
        if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
          return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
        } else {
          // Otherwise track this path as a potential candidate and continue.
          bestPath[diagonalPath] = basePath;
        }
      }

      editLength++;
    }

    // Performs the length of edit iteration. Is a bit fugly as this has to support the
    // sync and async mode which is never fun. Loops over execEditLength until a value
    // is produced.
    if (callback) {
      (function exec() {
        setTimeout(function () {
          // This should not happen, but we want to be safe.
          /* istanbul ignore next */
          if (editLength > maxEditLength) {
            return callback();
          }

          if (!execEditLength()) {
            exec();
          }
        }, 0);
      })();
    } else {
      while (editLength <= maxEditLength) {
        var ret = execEditLength();
        if (ret) {
          return ret;
        }
      }
    }
  },
  /*istanbul ignore start*/ /*istanbul ignore end*/pushComponent: function pushComponent(components, added, removed) {
    var last = components[components.length - 1];
    if (last && last.added === added && last.removed === removed) {
      // We need to clone here as the component clone operation is just
      // as shallow array clone
      components[components.length - 1] = { count: last.count + 1, added: added, removed: removed };
    } else {
      components.push({ count: 1, added: added, removed: removed });
    }
  },
  /*istanbul ignore start*/ /*istanbul ignore end*/extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
    var newLen = newString.length,
        oldLen = oldString.length,
        newPos = basePath.newPos,
        oldPos = newPos - diagonalPath,
        commonCount = 0;
    while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
      newPos++;
      oldPos++;
      commonCount++;
    }

    if (commonCount) {
      basePath.components.push({ count: commonCount });
    }

    basePath.newPos = newPos;
    return oldPos;
  },
  /*istanbul ignore start*/ /*istanbul ignore end*/equals: function equals(left, right) {
    return left === right;
  },
  /*istanbul ignore start*/ /*istanbul ignore end*/removeEmpty: function removeEmpty(array) {
    var ret = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        ret.push(array[i]);
      }
    }
    return ret;
  },
  /*istanbul ignore start*/ /*istanbul ignore end*/castInput: function castInput(value) {
    return value;
  },
  /*istanbul ignore start*/ /*istanbul ignore end*/tokenize: function tokenize(value) {
    return value.split('');
  },
  /*istanbul ignore start*/ /*istanbul ignore end*/join: function join(chars) {
    return chars.join('');
  }
};

function buildValues(diff, components, newString, oldString, useLongestToken) {
  var componentPos = 0,
      componentLen = components.length,
      newPos = 0,
      oldPos = 0;

  for (; componentPos < componentLen; componentPos++) {
    var component = components[componentPos];
    if (!component.removed) {
      if (!component.added && useLongestToken) {
        var value = newString.slice(newPos, newPos + component.count);
        value = value.map(function (value, i) {
          var oldValue = oldString[oldPos + i];
          return oldValue.length > value.length ? oldValue : value;
        });

        component.value = diff.join(value);
      } else {
        component.value = diff.join(newString.slice(newPos, newPos + component.count));
      }
      newPos += component.count;

      // Common case
      if (!component.added) {
        oldPos += component.count;
      }
    } else {
      component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
      oldPos += component.count;

      // Reverse add and remove so removes are output first to match common convention
      // The diffing algorithm is tied to add then remove output and this is the simplest
      // route to get the desired output with minimal overhead.
      if (componentPos && components[componentPos - 1].added) {
        var tmp = components[componentPos - 1];
        components[componentPos - 1] = components[componentPos];
        components[componentPos] = tmp;
      }
    }
  }

  // Special case handle for when one terminal is ignored. For this case we merge the
  // terminal into the prior string and drop the change.
  var lastComponent = components[componentLen - 1];
  if (componentLen > 1 && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
    components[componentLen - 2].value += lastComponent.value;
    components.pop();
  }

  return components;
}

function clonePath(path) {
  return { newPos: path.newPos, components: path.components.slice(0) };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL2Jhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzRDQUF3QixJO0FBQVQsU0FBUyxJQUFULEdBQWdCLENBQUU7O0FBRWpDLEtBQUssU0FBTCxHQUFpQixFO3lCQUNmLElBRGUsZ0JBQ1YsU0FEVSxFQUNDLFNBREQsRUFDMEI7NkJBQUEsSSx1QkFBZCxPQUFjLHlEQUFKLEVBQUk7O0FBQ3ZDLFFBQUksV0FBVyxRQUFRLFFBQXZCO0FBQ0EsUUFBSSxPQUFPLE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDakMsaUJBQVcsT0FBWDtBQUNBLGdCQUFVLEVBQVY7QUFDRDtBQUNELFNBQUssT0FBTCxHQUFlLE9BQWY7O0FBRUEsUUFBSSxPQUFPLElBQVg7O0FBRUEsYUFBUyxJQUFULENBQWMsS0FBZCxFQUFxQjtBQUNuQixVQUFJLFFBQUosRUFBYztBQUNaLG1CQUFXLFlBQVc7QUFBRSxtQkFBUyxTQUFULEVBQW9CLEtBQXBCO0FBQTZCLFNBQXJELEVBQXVELENBQXZEO0FBQ0EsZUFBTyxJQUFQO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsZUFBTyxLQUFQO0FBQ0Q7QUFDRjs7O0FBR0QsZ0JBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFaO0FBQ0EsZ0JBQVksS0FBSyxTQUFMLENBQWUsU0FBZixDQUFaOztBQUVBLGdCQUFZLEtBQUssV0FBTCxDQUFpQixLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQWpCLENBQVo7QUFDQSxnQkFBWSxLQUFLLFdBQUwsQ0FBaUIsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUFqQixDQUFaOztBQUVBLFFBQUksU0FBUyxVQUFVLE1BQXZCO0FBQUEsUUFBK0IsU0FBUyxVQUFVLE1BQWxEO0FBQ0EsUUFBSSxhQUFhLENBQWpCO0FBQ0EsUUFBSSxnQkFBZ0IsU0FBUyxNQUE3QjtBQUNBLFFBQUksV0FBVyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQVgsRUFBYyxZQUFZLEVBQTFCLEVBQUQsQ0FBZjs7O0FBR0EsUUFB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LFVBQUwsQ0FBZ0IsS0FBaEIsQ0FBc0IsQ0FBdEIsQ0FBbkMsRUFBUDtBQUNEIiwiZmlsZSI6ImJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEaWZmKCkge31cblxuRGlmZi5wcm90b3R5cGUgPSB7XG4gIGRpZmYob2xkU3RyaW5nLCBuZXdTdHJpbmcsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBjYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2s7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBkb25lKHZhbHVlKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2sodW5kZWZpbmVkLCB2YWx1ZSk7IH0sIDApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBbGxvdyBzdWJjbGFzc2VzIHRvIG1hc3NhZ2UgdGhlIGlucHV0IHByaW9yIHRvIHJ1bm5pbmdcbiAgICBvbGRTdHJpbmcgPSB0aGlzLmNhc3RJbnB1dChvbGRTdHJpbmcpO1xuICAgIG5ld1N0cmluZyA9IHRoaXMuY2FzdElucHV0KG5ld1N0cmluZyk7XG5cbiAgICBvbGRTdHJpbmcgPSB0aGlzLnJlbW92ZUVtcHR5KHRoaXMudG9rZW5pemUob2xkU3RyaW5nKSk7XG4gICAgbmV3U3RyaW5nID0gdGhpcy5yZW1vdmVFbXB0eSh0aGlzLnRva2VuaXplKG5ld1N0cmluZykpO1xuXG4gICAgbGV0IG5ld0xlbiA9IG5ld1N0cmluZy5sZW5ndGgsIG9sZExlbiA9IG9sZFN0cmluZy5sZW5ndGg7XG4gICAgbGV0IGVkaXRMZW5ndGggPSAxO1xuICAgIGxldCBtYXhFZGl0TGVuZ3RoID0gbmV3TGVuICsgb2xkTGVuO1xuICAgIGxldCBiZXN0UGF0aCA9IFt7IG5ld1BvczogLTEsIGNvbXBvbmVudHM6IFtdIH1dO1xuXG4gICAgLy8gU2VlZCBlZGl0TGVuZ3RoID0gMCwgaS5lLiB0aGUgY29udGVudCBzdGFydHMgd2l0aCB0aGUgc2FtZSB2YWx1ZXNcbiAgICBsZXQgb2xkUG9zID0gdGhpcy5leHRyYWN0Q29tbW9uKGJlc3RQYXRoWzBdLCBuZXdTdHJpbmcsIG9sZFN0cmluZywgMCk7XG4gICAgaWYgKGJlc3RQYXRoWzBdLm5ld1BvcyArIDEgPj0gbmV3TGVuICYmIG9sZFBvcyArIDEgPj0gb2xkTGVuKSB7XG4gICAgICAvLyBJZGVudGl0eSBwZXIgdGhlIGVxdWFsaXR5IGFuZCB0b2tlbml6ZXJcbiAgICAgIHJldHVybiBkb25lKFt7dmFsdWU6IHRoaXMuam9pbihuZXdTdHJpbmcpLCBjb3VudDogbmV3U3RyaW5nLmxlbmd0aH1dKTtcbiAgICB9XG5cbiAgICAvLyBNYWluIHdvcmtlciBtZXRob2QuIGNoZWNrcyBhbGwgcGVybXV0YXRpb25zIG9mIGEgZ2l2ZW4gZWRpdCBsZW5ndGggZm9yIGFjY2VwdGFuY2UuXG4gICAgZnVuY3Rpb24gZXhlY0VkaXRMZW5ndGgoKSB7XG4gICAgICBmb3IgKGxldCBkaWFnb25hbFBhdGggPSAtMSAqIGVkaXRMZW5ndGg7IGRpYWdvbmFsUGF0aCA8PSBlZGl0TGVuZ3RoOyBkaWFnb25hbFBhdGggKz0gMikge1xuICAgICAgICBsZXQgYmFzZVBhdGg7XG4gICAgICAgIGxldCBhZGRQYXRoID0gYmVzdFBhdGhbZGlhZ29uYWxQYXRoIC0gMV0sXG4gICAgICAgICAgICByZW1vdmVQYXRoID0gYmVzdFBhdGhbZGlhZ29uYWxQYXRoICsgMV0sXG4gICAgICAgICAgICBvbGRQb3MgPSAocmVtb3ZlUGF0aCA/IHJlbW92ZVBhdGgubmV3UG9zIDogMCkgLSBkaWFnb25hbFBhdGg7XG4gICAgICAgIGlmIChhZGRQYXRoKSB7XG4gICAgICAgICAgLy8gTm8gb25lIGVsc2UgaXMgZ29pbmcgdG8gYXR0ZW1wdCB0byB1c2UgdGhpcyB2YWx1ZSwgY2xlYXIgaXRcbiAgICAgICAgICBiZXN0UGF0aFtkaWFnb25hbFBhdGggLSAxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjYW5BZGQgPSBhZGRQYXRoICYmIGFkZFBhdGgubmV3UG9zICsgMSA8IG5ld0xlbixcbiAgICAgICAgICAgIGNhblJlbW92ZSA9IHJlbW92ZVBhdGggJiYgMCA8PSBvbGRQb3MgJiYgb2xkUG9zIDwgb2xkTGVuO1xuICAgICAgICBpZiAoIWNhbkFkZCAmJiAhY2FuUmVtb3ZlKSB7XG4gICAgICAgICAgLy8gSWYgdGhpcyBwYXRoIGlzIGEgdGVybWluYWwgdGhlbiBwcnVuZVxuICAgICAgICAgIGJlc3RQYXRoW2RpYWdvbmFsUGF0aF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZWxlY3QgdGhlIGRpYWdvbmFsIHRoYXQgd2Ugd2FudCB0byBicmFuY2ggZnJvbS4gV2Ugc2VsZWN0IHRoZSBwcmlvclxuICAgICAgICAvLyBwYXRoIHdob3NlIHBvc2l0aW9uIGluIHRoZSBuZXcgc3RyaW5nIGlzIHRoZSBmYXJ0aGVzdCBmcm9tIHRoZSBvcmlnaW5cbiAgICAgICAgLy8gYW5kIGRvZXMgbm90IHBhc3MgdGhlIGJvdW5kcyBvZiB0aGUgZGlmZiBncmFwaFxuICAgICAgICBpZiAoIWNhbkFkZCB8fCAoY2FuUmVtb3ZlICYmIGFkZFBhdGgubmV3UG9zIDwgcmVtb3ZlUGF0aC5uZXdQb3MpKSB7XG4gICAgICAgICAgYmFzZVBhdGggPSBjbG9uZVBhdGgocmVtb3ZlUGF0aCk7XG4gICAgICAgICAgc2VsZi5wdXNoQ29tcG9uZW50KGJhc2VQYXRoLmNvbXBvbmVudHMsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmFzZVBhdGggPSBhZGRQYXRoOyAgIC8vIE5vIG5lZWQgdG8gY2xvbmUsIHdlJ3ZlIHB1bGxlZCBpdCBmcm9tIHRoZSBsaXN0XG4gICAgICAgICAgYmFzZVBhdGgubmV3UG9zKys7XG4gICAgICAgICAgc2VsZi5wdXNoQ29tcG9uZW50KGJhc2VQYXRoLmNvbXBvbmVudHMsIHRydWUsIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cblxuICAgICAgICBvbGRQb3MgPSBzZWxmLmV4dHJhY3RDb21tb24oYmFzZVBhdGgsIG5ld1N0cmluZywgb2xkU3RyaW5nLCBkaWFnb25hbFBhdGgpO1xuXG4gICAgICAgIC8vIElmIHdlIGhhdmUgaGl0IHRoZSBlbmQgb2YgYm90aCBzdHJpbmdzLCB0aGVuIHdlIGFyZSBkb25lXG4gICAgICAgIGlmIChiYXNlUGF0aC5uZXdQb3MgKyAxID49IG5ld0xlbiAmJiBvbGRQb3MgKyAxID49IG9sZExlbikge1xuICAgICAgICAgIHJldHVybiBkb25lKGJ1aWxkVmFsdWVzKHNlbGYsIGJhc2VQYXRoLmNvbXBvbmVudHMsIG5ld1N0cmluZywgb2xkU3RyaW5nLCBzZWxmLnVzZUxvbmdlc3RUb2tlbikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSB0cmFjayB0aGlzIHBhdGggYXMgYSBwb3RlbnRpYWwgY2FuZGlkYXRlIGFuZCBjb250aW51ZS5cbiAgICAgICAgICBiZXN0UGF0aFtkaWFnb25hbFBhdGhdID0gYmFzZVBhdGg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZWRpdExlbmd0aCsrO1xuICAgIH1cblxuICAgIC8vIFBlcmZvcm1zIHRoZSBsZW5ndGggb2YgZWRpdCBpdGVyYXRpb24uIElzIGEgYml0IGZ1Z2x5IGFzIHRoaXMgaGFzIHRvIHN1cHBvcnQgdGhlXG4gICAgLy8gc3luYyBhbmQgYXN5bmMgbW9kZSB3aGljaCBpcyBuZXZlciBmdW4uIExvb3BzIG92ZXIgZXhlY0VkaXRMZW5ndGggdW50aWwgYSB2YWx1ZVxuICAgIC8vIGlzIHByb2R1Y2VkLlxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgKGZ1bmN0aW9uIGV4ZWMoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gVGhpcyBzaG91bGQgbm90IGhhcHBlbiwgYnV0IHdlIHdhbnQgdG8gYmUgc2FmZS5cbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgIGlmIChlZGl0TGVuZ3RoID4gbWF4RWRpdExlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFleGVjRWRpdExlbmd0aCgpKSB7XG4gICAgICAgICAgICBleGVjKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICAgIH0oKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlIChlZGl0TGVuZ3RoIDw9IG1heEVkaXRMZW5ndGgpIHtcbiAgICAgICAgbGV0IHJldCA9IGV4ZWNFZGl0TGVuZ3RoKCk7XG4gICAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHB1c2hDb21wb25lbnQoY29tcG9uZW50cywgYWRkZWQsIHJlbW92ZWQpIHtcbiAgICBsZXQgbGFzdCA9IGNvbXBvbmVudHNbY29tcG9uZW50cy5sZW5ndGggLSAxXTtcbiAgICBpZiAobGFzdCAmJiBsYXN0LmFkZGVkID09PSBhZGRlZCAmJiBsYXN0LnJlbW92ZWQgPT09IHJlbW92ZWQpIHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gY2xvbmUgaGVyZSBhcyB0aGUgY29tcG9uZW50IGNsb25lIG9wZXJhdGlvbiBpcyBqdXN0XG4gICAgICAvLyBhcyBzaGFsbG93IGFycmF5IGNsb25lXG4gICAgICBjb21wb25lbnRzW2NvbXBvbmVudHMubGVuZ3RoIC0gMV0gPSB7Y291bnQ6IGxhc3QuY291bnQgKyAxLCBhZGRlZDogYWRkZWQsIHJlbW92ZWQ6IHJlbW92ZWQgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcG9uZW50cy5wdXNoKHtjb3VudDogMSwgYWRkZWQ6IGFkZGVkLCByZW1vdmVkOiByZW1vdmVkIH0pO1xuICAgIH1cbiAgfSxcbiAgZXh0cmFjdENvbW1vbihiYXNlUGF0aCwgbmV3U3RyaW5nLCBvbGRTdHJpbmcsIGRpYWdvbmFsUGF0aCkge1xuICAgIGxldCBuZXdMZW4gPSBuZXdTdHJpbmcubGVuZ3RoLFxuICAgICAgICBvbGRMZW4gPSBvbGRTdHJpbmcubGVuZ3RoLFxuICAgICAgICBuZXdQb3MgPSBiYXNlUGF0aC5uZXdQb3MsXG4gICAgICAgIG9sZFBvcyA9IG5ld1BvcyAtIGRpYWdvbmFsUGF0aCxcblxuICAgICAgICBjb21tb25Db3VudCA9IDA7XG4gICAgd2hpbGUgKG5ld1BvcyArIDEgPCBuZXdMZW4gJiYgb2xkUG9zICsgMSA8IG9sZExlbiAmJiB0aGlzLmVxdWFscyhuZXdTdHJpbmdbbmV3UG9zICsgMV0sIG9sZFN0cmluZ1tvbGRQb3MgKyAxXSkpIHtcbiAgICAgIG5ld1BvcysrO1xuICAgICAgb2xkUG9zKys7XG4gICAgICBjb21tb25Db3VudCsrO1xuICAgIH1cblxuICAgIGlmIChjb21tb25Db3VudCkge1xuICAgICAgYmFzZVBhdGguY29tcG9uZW50cy5wdXNoKHtjb3VudDogY29tbW9uQ291bnR9KTtcbiAgICB9XG5cbiAgICBiYXNlUGF0aC5uZXdQb3MgPSBuZXdQb3M7XG4gICAgcmV0dXJuIG9sZFBvcztcbiAgfSxcblxuICBlcXVhbHMobGVmdCwgcmlnaHQpIHtcbiAgICByZXR1cm4gbGVmdCA9PT0gcmlnaHQ7XG4gIH0sXG4gIHJlbW92ZUVtcHR5KGFycmF5KSB7XG4gICAgbGV0IHJldCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJheVtpXSkge1xuICAgICAgICByZXQucHVzaChhcnJheVtpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH0sXG4gIGNhc3RJbnB1dCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgdG9rZW5pemUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJycpO1xuICB9LFxuICBqb2luKGNoYXJzKSB7XG4gICAgcmV0dXJuIGNoYXJzLmpvaW4oJycpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBidWlsZFZhbHVlcyhkaWZmLCBjb21wb25lbnRzLCBuZXdTdHJpbmcsIG9sZFN0cmluZywgdXNlTG9uZ2VzdFRva2VuKSB7XG4gIGxldCBjb21wb25lbnRQb3MgPSAwLFxuICAgICAgY29tcG9uZW50TGVuID0gY29tcG9uZW50cy5sZW5ndGgsXG4gICAgICBuZXdQb3MgPSAwLFxuICAgICAgb2xkUG9zID0gMDtcblxuICBmb3IgKDsgY29tcG9uZW50UG9zIDwgY29tcG9uZW50TGVuOyBjb21wb25lbnRQb3MrKykge1xuICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2NvbXBvbmVudFBvc107XG4gICAgaWYgKCFjb21wb25lbnQucmVtb3ZlZCkge1xuICAgICAgaWYgKCFjb21wb25lbnQuYWRkZWQgJiYgdXNlTG9uZ2VzdFRva2VuKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG5ld1N0cmluZy5zbGljZShuZXdQb3MsIG5ld1BvcyArIGNvbXBvbmVudC5jb3VudCk7XG4gICAgICAgIHZhbHVlID0gdmFsdWUubWFwKGZ1bmN0aW9uKHZhbHVlLCBpKSB7XG4gICAgICAgICAgbGV0IG9sZFZhbHVlID0gb2xkU3RyaW5nW29sZFBvcyArIGldO1xuICAgICAgICAgIHJldHVybiBvbGRWYWx1ZS5sZW5ndGggPiB2YWx1ZS5sZW5ndGggPyBvbGRWYWx1ZSA6IHZhbHVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb21wb25lbnQudmFsdWUgPSBkaWZmLmpvaW4odmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50LnZhbHVlID0gZGlmZi5qb2luKG5ld1N0cmluZy5zbGljZShuZXdQb3MsIG5ld1BvcyArIGNvbXBvbmVudC5jb3VudCkpO1xuICAgICAgfVxuICAgICAgbmV3UG9zICs9IGNvbXBvbmVudC5jb3VudDtcblxuICAgICAgLy8gQ29tbW9uIGNhc2VcbiAgICAgIGlmICghY29tcG9uZW50LmFkZGVkKSB7XG4gICAgICAgIG9sZFBvcyArPSBjb21wb25lbnQuY291bnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBvbmVudC52YWx1ZSA9IGRpZmYuam9pbihvbGRTdHJpbmcuc2xpY2Uob2xkUG9zLCBvbGRQb3MgKyBjb21wb25lbnQuY291bnQpKTtcbiAgICAgIG9sZFBvcyArPSBjb21wb25lbnQuY291bnQ7XG5cbiAgICAgIC8vIFJldmVyc2UgYWRkIGFuZCByZW1vdmUgc28gcmVtb3ZlcyBhcmUgb3V0cHV0IGZpcnN0IHRvIG1hdGNoIGNvbW1vbiBjb252ZW50aW9uXG4gICAgICAvLyBUaGUgZGlmZmluZyBhbGdvcml0aG0gaXMgdGllZCB0byBhZGQgdGhlbiByZW1vdmUgb3V0cHV0IGFuZCB0aGlzIGlzIHRoZSBzaW1wbGVzdFxuICAgICAgLy8gcm91dGUgdG8gZ2V0IHRoZSBkZXNpcmVkIG91dHB1dCB3aXRoIG1pbmltYWwgb3ZlcmhlYWQuXG4gICAgICBpZiAoY29tcG9uZW50UG9zICYmIGNvbXBvbmVudHNbY29tcG9uZW50UG9zIC0gMV0uYWRkZWQpIHtcbiAgICAgICAgbGV0IHRtcCA9IGNvbXBvbmVudHNbY29tcG9uZW50UG9zIC0gMV07XG4gICAgICAgIGNvbXBvbmVudHNbY29tcG9uZW50UG9zIC0gMV0gPSBjb21wb25lbnRzW2NvbXBvbmVudFBvc107XG4gICAgICAgIGNvbXBvbmVudHNbY29tcG9uZW50UG9zXSA9IHRtcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTcGVjaWFsIGNhc2UgaGFuZGxlIGZvciB3aGVuIG9uZSB0ZXJtaW5hbCBpcyBpZ25vcmVkLiBGb3IgdGhpcyBjYXNlIHdlIG1lcmdlIHRoZVxuICAvLyB0ZXJtaW5hbCBpbnRvIHRoZSBwcmlvciBzdHJpbmcgYW5kIGRyb3AgdGhlIGNoYW5nZS5cbiAgbGV0IGxhc3RDb21wb25lbnQgPSBjb21wb25lbnRzW2NvbXBvbmVudExlbiAtIDFdO1xuICBpZiAoY29tcG9uZW50TGVuID4gMVxuICAgICAgJiYgKGxhc3RDb21wb25lbnQuYWRkZWQgfHwgbGFzdENvbXBvbmVudC5yZW1vdmVkKVxuICAgICAgJiYgZGlmZi5lcXVhbHMoJycsIGxhc3RDb21wb25lbnQudmFsdWUpKSB7XG4gICAgY29tcG9uZW50c1tjb21wb25lbnRMZW4gLSAyXS52YWx1ZSArPSBsYXN0Q29tcG9uZW50LnZhbHVlO1xuICAgIGNvbXBvbmVudHMucG9wKCk7XG4gIH1cblxuICByZXR1cm4gY29tcG9uZW50cztcbn1cblxuZnVuY3Rpb24gY2xvbmVQYXRoKHBhdGgpIHtcbiAgcmV0dXJuIHsgbmV3UG9zOiBwYXRoLm5ld1BvcywgY29tcG9uZW50czogcGF0aC5jb21wb25lbnRzLnNsaWNlKDApIH07XG59XG4iXX0=


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Backbone.Native
 *
 * For all details and documentation:
 * http://github.com/inkling/backbone.native
 *
 * Copyright 2013 Inkling Systems, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The purpose of this library is to allow Backbone to work without needing to load jQuery or Zepto.
 * This file provides a basic jQuery-like implementation for Backbone, implementing the
 * minimum functionality for Backbone to function. We assume that Backbone applications using
 * this will not expect the standard jQuery API to work, and will instead use native JS functions.
 *
 * Keep in mind that due to the APIs in this, it will likely only work on recent browsers.
 *
 * Note:
 *  - Core Backbone only needs collections with single members, so that is all that has been
 *      supported in this library. It is expected that you will just use querySelectorAll instead.
 *      This will be most obvious if you make heavy use of 'view.$'.
 *  - Events delegated with selectors starting with '>' are not supported.
 *  - Due to 'currentTarget' being read-only on standard DOM events, we cannot make standard
 *      events behave identically to jQuery's events when delegation is used. The element matching
 *      the delegate selector is instead passed as the second argument to event handlers.
 *  - The '$.ajax' implementation is very simple and likely needs to be expanded to better support
 *      standard use-cases.
 *
 * Tested with Backbone v0.9.2 and 1.0.0.
 */
(function(){
    "use strict";

    // Regular expression to match an event name and/or a namespace.
    var namespaceRE = /^([^.]+)?(?:\.([^.]+))?$/;

    var matchesSelector = Element.prototype.matchesSelector || null;
    if (!matchesSelector){
        ['webkit', 'moz', 'o', 'ms'].forEach(function(prefix){
            var func = Element.prototype[prefix + 'MatchesSelector'];
            if (func) matchesSelector = func;
        });
    }

    // The element property to save the cache key on.
    var cacheKeyProp = 'backboneNativeKey' + Math.random();
    var id = 1;
    var handlers = {};
    var unusedKeys = [];

    /**
     * Get the event handlers for a given element, creating an empty set if one doesn't exist.
     *
     * To avoid constantly filling the handlers object with null values, we reuse old IDs that
     * have been created and then cleared.
     *
     * @param {Element} el The element to get handlers for.
     *
     * @return {Array} An array of handlers.
     */
    function handlersFor(el){
        if (!el[cacheKeyProp]){
            // Pick a new key, from the unused pool, or make a new one.
            el[cacheKeyProp] = unusedKeys.length === 0 ? ++id : unusedKeys.pop();
        }

        var cacheKey = el[cacheKeyProp];
        return handlers[cacheKey] || (handlers[cacheKey] = []);
    }

    /**
     * Clear the event handlers for a given element.
     *
     * @param {Element} el The element to clear.
     */
    function clearHandlers(el){
        var cacheKey = el[cacheKeyProp];
        if (handlers[cacheKey]){
            handlers[cacheKey] = null;
            el[cacheKeyProp] = null;
            unusedKeys.push(cacheKey);
        }
    }

    /**
     * Add event handlers to an element.
     *
     * @param {Element} parentElement The element to bind event handlers to.
     * @param {string} eventName The event to bind, e.g. 'click'.
     * @param {string} selector (Optional) The selector to match when an event propagates up.
     * @param {function(Event, Element)} callback The function to call when the event is fired.
     */
    function on(parentElement, eventName, selector, callback){
        // Adjust arguments if selector was not provided.
        if (typeof selector === 'function'){
            callback = selector;
            selector = null;
        }

        var parts = namespaceRE.exec(eventName);
        eventName = parts[1] || null;
        var namespace = parts[2] || null;

        if (!eventName) return;

        var handler = callback;
        var originalCallback = callback;
        if (selector){
            // Event delegation handler to match a selector for child element events.
            handler = function(event){
                for (var el = event.target; el && el !== parentElement; el = el.parentElement){
                    if (matchesSelector.call(el, selector)){
                        // jQuery does not include the second argument, but we have included it
                        // for simplicity because 'this' will likely be bound to the view inside
                        // the callback, and as noted above, we cannot override 'currentTarget'.
                        var result = originalCallback.call(el, event, el);
                        if (result === false){
                            event.stopPropagation();
                            event.preventDefault();
                        }
                        return result;
                    }
                }
            };
        } else {
            // Standard event handler bound directly to the element.
            handler = function(event){
                var result = originalCallback.call(parentElement, event, parentElement);
                if (result === false){
                    event.stopPropagation();
                    event.preventDefault();
                }
                return result;
            };
        }

        parentElement.addEventListener(eventName, handler, false);

        // Save event handler metadata so that the handler can be unbound later.
        handlersFor(parentElement).push({
            eventName: eventName,
            callback: callback,
            handler: handler,
            namespace: namespace,
            selector: selector
        });
    }

    /**
     * Remove an event handler from an element.
     *
     * @param {Element} parentElement The element to unbind event handlers from.
     * @param {string} eventName (Optional) The event to unbind, e.g. 'click'.
     * @param {string} selector (Optional) The selector to unbind.
     * @param {function(Event, Element)} callback (Optional) The function to unbind.
     */
    function off(parentElement, eventName, selector, callback){
        if (typeof selector === 'function'){
            callback = selector;
            selector = null;
        }

        var parts = namespaceRE.exec(eventName || '');
        eventName = parts[1];
        var namespace = parts[2];
        var handlers = handlersFor(parentElement) || [];

        if (!eventName && !namespace && !selector && !callback){
            // Fastpath to remove all handlers.
            handlers.forEach(function(item){
                parentElement.removeEventListener(item.eventName, item.handler, false);
            });
            clearHandlers(parentElement);
        } else {
            var matchedHandlers = handlers.filter(function(item){
                return ((!namespace || item.namespace === namespace) &&
                    (!eventName || item.eventName === eventName) &&
                    (!callback || item.callback === callback) &&
                    (!selector || item.selector === selector));
            });

            matchedHandlers.forEach(function(item){
                parentElement.removeEventListener(item.eventName, item.handler, false);

                handlers.splice(handlers.indexOf(item), 1);
            });

            if (handlers.length === 0) clearHandlers(parentElement);
        }
    }

    /**
     * Construct a new jQuery-style element representation.
     *
     * @param {string|Element|Window} element There are several different possible values for this
     *      argument:
     *      - {string} A snippet of HTML, if it starts with a '<', or a selector to find.
     *      - {Element} An existing element to wrap.
     *      - {Window} The window object to wrap.
     * @param {Element} context The context to search within, if a selector was given.
     *      Defaults to document.
     */
    function $(element, context){
        context = context || document;

        // Call as a constructor if it was used as a function.
        if (!(this instanceof $)) return new $(element, context);

        if (!element){
            this.length = 0;
        } else if (typeof element === 'string'){
            if (/^\s*</.test(element)){
                // Parse arbitrary HTML into an element.
                var div = document.createElement('div');
                div.innerHTML = element;
                this[0] = div.firstChild;
                div.removeChild(div.firstChild);
                this.length = 1;
            } else {
                this[0] = context.querySelector(element);
                this.length = 1;
            }
        } else {
            // This handles both the 'Element' and 'Window' case, as both support
            // event binding via 'addEventListener'.
            this[0] = element;
            this.length = 1;
        }
    }

    $.prototype = {
        /**
         * The following methods are used by Backbone, but only in code-paths for IE 6/7 support.
         * Since none of this will work for old IE anyway, they are not implemented, and
         * instead left for documentation purposes.
         *
         * Used in Backbone.History.prototype.start.
         */
        hide: null,
        appendTo: null,

        /**
         * Find is not supported to encourage the use of querySelector(All) as an alternative.
         *
         * e.g.
         * Instead of 'this.$(sel)', use 'this.el.querySelectorAll(sel)'.
         *
         * Used in Backbone.View.prototype.$, but not actually called internally.
         */
        find: null,

        /**
         * Add attributes to the element.
         *
         * Used in Backbone.View.prototype.make.
         *
         * @param {Object} attributes A set of attributes to apply to the element.
         *
         * @return {$} This instance.
         */
        attr: function(attrs){
            Object.keys(attrs).forEach(function(attr){
                switch (attr){
                    case 'html':
                        this[0].innerHTML = attrs[attr];
                        break;
                    case 'text':
                        this[0].textContent = attrs[attr];
                        break;
                    case 'class':
                        this[0].className = attrs[attr];
                        break;
                    default:
                        this[0].setAttribute(attr, attrs[attr]);
                        break;
                }
            }, this);
            return this;
        },

        /**
         * Set the HTML content of the element. Backbone does not use the no-argument version
         * to read innerHTML, so that has not been implemented.
         *
         * Used in Backbone.View.prototype.make.
         *
         * @param {string} html The HTML to set as the element content.
         *
         * @return {$} This instance.
         */
        html: function(html){
            this[0].innerHTML = html;
            return this;
        },

        /**
         * Remove an element from the DOM and remove all event handlers bound to it and
         * its child elements.
         *
         * Used in Backbone.View.prototype.remove.
         *
         * @return {$} This instance.
         */
        remove: function(){
            var el = this[0];
            if (el.parentElement) el.parentElement.removeChild(el);

            // Unbind all event handlers on the element and children.
            (function removeChildEvents(element){
                off(element);

                for (var i = 0, len = element.childNodes.length; i < len; i++){
                    if (element.childNodes[i].nodeType !== Node.TEXT_NODE){
                        removeChildEvents(element.childNodes[i]);
                    }
                }
            })(el);

            return this;
        },

        /**
         * Bind an event handler to this element.
         *
         * @param {string} eventName The event to bind, e.g. 'click'.
         * @param {string} selector (Optional) The selector to match when an event propagates up.
         * @param {function(Event, Element)} callback The function to call when the event is fired.
         */
        on: function(eventName, selector, callback){
            on(this[0], eventName, selector, callback);
            return this;
        },

        /**
         * Unbind an event handler to this element.
         *
         * @param {string} eventName (Optional) The event to unbind, e.g. 'click'.
         * @param {string} selector (Optional) The selector to unbind.
         * @param {function(Event, Element)} callback (Optional) The function to unbind.
         */
        off: function(eventName, selector, callback){
            off(this[0], eventName, selector, callback);
            return this;
        },

        // Backbone v0.9.2 support.
        bind: function(eventName, callback){
            return this.on(eventName, callback);
        },
        unbind: function(eventName, callback){
            return this.off(eventName, callback);
        },
        delegate: function(selector, eventName, callback){
            return this.on(eventName, selector, callback);
        },
        undelegate: function(selector, eventName, callback){
            return this.off(eventName, selector, callback);
        }
    };

    /**
     * Send an AJAX request.
     *
     * @param {Object} options The options to use for the connection:
     *      - {string} url The URL to connect to.
     *      - {string} type The type of request, e.g. 'GET', or 'POST'.
     *      - {string} dataType The type of data expected, 'json'.
     *      - {string} contentType The content-type of the data.
     *      - {string|object} data The content to send.
     *      - {function(XMLHttpRequest)} beforeSend A callback to call before sending.
     *      - {boolean} processData True if 'data' should be converted
     *          to a query string from an object.
     *      - {function({string|object}, {string}, {XMLHttpRequest})} success The success callback.
     *      - {function({XMLHttpRequest})} error The error callback.
     */
    $.ajax = function(options){
        options = options || {};
        var type = options.type || 'GET';
        var url = options.url;
        var processData = options.processData === undefined ? true : !!options.processData;

        // Process the data for sending.
        var data = options.data;
        if (processData && typeof data === 'object'){
            var params = Object.keys(data).map(function(prop){
                return encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]);
            });
            data = params.join('&');
        }

        // Data for GET and HEAD goes in the URL.
        if (data && (type === 'GET' || type === 'HEAD')){
            url += (url.indexOf('?') === -1 ? '?' : '&') + data;
            data = undefined;
        }

        var xhr = new XMLHttpRequest();
        xhr.open(type, url, true);

        if (options.contentType) xhr.setRequestHeader('Content-Type', options.contentType);
        if (options.beforeSend) options.beforeSend(xhr);

        xhr.onload = function(){
            var error = false;
            var content = xhr.responseText;

            // Parse the JSON before calling success.
            if (options.dataType === 'json'){
                try {
                    content = JSON.parse(content);
                } catch (e){
                    error = true
                }
            }

            if (!error && (xhr.status >= 200 && xhr.status < 300)){
                // The last two arguments only apply to v0.9.2.
                if (options.success) options.success(content, xhr.statusText, xhr);
            } else {
                // This signature is inconsistent with v0.9.2, but is correct for 1.0.0.
                if (options.error) options.error(xhr);
            }
        }.bind(this);

        xhr.onerror = xhr.onabort = function(){
            if (options.error) options.error(xhr);
        };

        xhr.send(data);

        return xhr;
    };

    // Expose on/off for external use with having to instantiate a wrapper.
    $.on = on;
    $.off = off;

    if(true) {
      return module.exports = $;
    }

    var root = this;
    var originalBackboneNative = root.Backbone ? root.Backbone.Native : null;
    var original$ = root.$;
    if (root.Backbone) root.Backbone.Native = $;
    root.$ = $;

    $.noConflict = function(deep){
        root.$ = original$;
        if (deep) root.Backbone.Native = originalBackboneNative;
        return $;
    };

    if (root.Backbone){
        if (root.Backbone.setDomLibrary){ // v0.9.2
            root.Backbone.setDomLibrary($);
        } else { // v1.0.0
            root.Backbone.$ = $;
        }
    }
}).call(this);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports.lineDiff = undefined;
exports. /*istanbul ignore end*/diffLines = diffLines;
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffTrimmedLines = diffTrimmedLines;

var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

/*istanbul ignore end*/
var /*istanbul ignore start*/_params = __webpack_require__(6) /*istanbul ignore end*/;

/*istanbul ignore start*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/var lineDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/lineDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
lineDiff.tokenize = function (value) {
  var retLines = [],
      linesAndNewlines = value.split(/(\n|\r\n)/);

  // Ignore the final empty token that occurs if the string ends with a new line
  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
    linesAndNewlines.pop();
  }

  // Merge the content and line separators into single tokens
  for (var i = 0; i < linesAndNewlines.length; i++) {
    var line = linesAndNewlines[i];

    if (i % 2 && !this.options.newlineIsToken) {
      retLines[retLines.length - 1] += line;
    } else {
      if (this.options.ignoreWhitespace) {
        line = line.trim();
      }
      retLines.push(line);
    }
  }

  return retLines;
};

function diffLines(oldStr, newStr, callback) {
  return lineDiff.diff(oldStr, newStr, callback);
}
function diffTrimmedLines(oldStr, newStr, callback) {
  var options = /*istanbul ignore start*/(0, _params.generateOptions) /*istanbul ignore end*/(callback, { ignoreWhitespace: true });
  return lineDiff.diff(oldStr, newStr, options);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL2xpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztnQ0E4QmdCLFMsR0FBQSxTO3lEQUNBLGdCLEdBQUEsZ0I7O0FBL0JoQixJLHlCQUFBLHlCLHdCQUFBOzs7Ozs7QUFDQSxJLHlCQUFBLG1DLHdCQUFBOzs7Ozt1QkFFTyxJQUFNLFcseUJBQUEsUSx3QkFBQSxXQUFXLEkseUJBQUEsbUIsd0JBQWpCO0FBQ1AsU0FBUyxRQUFULEdBQW9CLFVBQVMsS0FBVCxFQUFnQjtBQUNsQyxNQUFJLFdBQVcsRUFBZjtBQUFBLE1BQ0ksbUJBQW1CLE1BQU0sS0FBTixDQUFZLFdBQVosQ0FEdkI7OztBQUlBLE1BQUksQ0FBQyxpQkFBaUIsaUJBQWlCLE1BQWpCLEdBQTBCLENBQTNDLENBQUwsRUFBb0Q7QUFDbEQscUJBQWlCLEdBQWpCO0FBQ0Q7OztBQUdELE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxpQkFBaUIsTUFBckMsRUFBNkMsR0FBN0MsRUFBa0Q7QUFDaEQsUUFBSSxPQUFPLGlCQUFpQixDQUFqQixDQUFYOztBQUVBLFFBQUksSUFBSSxDQUFKLElBQVMsQ0FBQyxLQUFLLE9BQUwsQ0FBYSxjQUEzQixFQUEyQztBQUN6QyxlQUFTLFNBQVMsTUFBVCxHQUFrQixDQUEzQixLQUFpQyxJQUFqQztBQUNELEtBRkQsTUFFTztBQUNMLFVBQUksS0FBSyxPQUFMLENBQWEsZ0JBQWpCLEVBQW1DO0FBQ2pDLGVBQU8sS0FBSyxJQUFMLEVBQVA7QUFDRDtBQUNELGVBQVMsSUFBVCxDQUFjLElBQWQ7QUFDRDtBQUNGOztBQUVELFNBQU8sUUFBUDtBQUNELENBeEJEOztBQTBCTyxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkIsTUFBM0IsRUFBbUMsUUFBbkMsRUFBNkM7QUFBRSxTQUFPLFNBQVMsSUFBVCxDQUFjLE1BQWQsRUFBc0IsTUFBdEIsRUFBOEIsUUFBOUIsQ0FBUDtBQUFpRDtBQUNoRyxTQUFTLGdCQUFULENBQTBCLE1BQTFCLEVBQWtDLE1BQWxDLEVBQTBDLFFBQTFDLEVBQW9EO0FBQ3pELE1BQUksVSx5QkFBVSw0Qix3QkFBQSxDQUFnQixRQUFoQixFQUEwQixFQUFDLGtCQUFrQixJQUFuQixFQUExQixDQUFkO0FBQ0EsU0FBTyxTQUFTLElBQVQsQ0FBYyxNQUFkLEVBQXNCLE1BQXRCLEVBQThCLE9BQTlCLENBQVA7QUFDRCIsImZpbGUiOiJsaW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERpZmYgZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7Z2VuZXJhdGVPcHRpb25zfSBmcm9tICcuLi91dGlsL3BhcmFtcyc7XG5cbmV4cG9ydCBjb25zdCBsaW5lRGlmZiA9IG5ldyBEaWZmKCk7XG5saW5lRGlmZi50b2tlbml6ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGxldCByZXRMaW5lcyA9IFtdLFxuICAgICAgbGluZXNBbmROZXdsaW5lcyA9IHZhbHVlLnNwbGl0KC8oXFxufFxcclxcbikvKTtcblxuICAvLyBJZ25vcmUgdGhlIGZpbmFsIGVtcHR5IHRva2VuIHRoYXQgb2NjdXJzIGlmIHRoZSBzdHJpbmcgZW5kcyB3aXRoIGEgbmV3IGxpbmVcbiAgaWYgKCFsaW5lc0FuZE5ld2xpbmVzW2xpbmVzQW5kTmV3bGluZXMubGVuZ3RoIC0gMV0pIHtcbiAgICBsaW5lc0FuZE5ld2xpbmVzLnBvcCgpO1xuICB9XG5cbiAgLy8gTWVyZ2UgdGhlIGNvbnRlbnQgYW5kIGxpbmUgc2VwYXJhdG9ycyBpbnRvIHNpbmdsZSB0b2tlbnNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lc0FuZE5ld2xpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGxpbmUgPSBsaW5lc0FuZE5ld2xpbmVzW2ldO1xuXG4gICAgaWYgKGkgJSAyICYmICF0aGlzLm9wdGlvbnMubmV3bGluZUlzVG9rZW4pIHtcbiAgICAgIHJldExpbmVzW3JldExpbmVzLmxlbmd0aCAtIDFdICs9IGxpbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuaWdub3JlV2hpdGVzcGFjZSkge1xuICAgICAgICBsaW5lID0gbGluZS50cmltKCk7XG4gICAgICB9XG4gICAgICByZXRMaW5lcy5wdXNoKGxpbmUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXRMaW5lcztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWZmTGluZXMob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKSB7IHJldHVybiBsaW5lRGlmZi5kaWZmKG9sZFN0ciwgbmV3U3RyLCBjYWxsYmFjayk7IH1cbmV4cG9ydCBmdW5jdGlvbiBkaWZmVHJpbW1lZExpbmVzKG9sZFN0ciwgbmV3U3RyLCBjYWxsYmFjaykge1xuICBsZXQgb3B0aW9ucyA9IGdlbmVyYXRlT3B0aW9ucyhjYWxsYmFjaywge2lnbm9yZVdoaXRlc3BhY2U6IHRydWV9KTtcbiAgcmV0dXJuIGxpbmVEaWZmLmRpZmYob2xkU3RyLCBuZXdTdHIsIG9wdGlvbnMpO1xufVxuIl19


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports. /*istanbul ignore end*/parsePatch = parsePatch;
function parsePatch(uniDiff) {
  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/),
      delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      list = [],
      i = 0;

  function parseIndex() {
    var index = {};
    list.push(index);

    // Parse diff metadata
    while (i < diffstr.length) {
      var line = diffstr[i];

      // File header found, end parsing diff metadata
      if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
        break;
      }

      // Diff index
      var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);
      if (header) {
        index.index = header[1];
      }

      i++;
    }

    // Parse file headers if they are defined. Unified diff requires them, but
    // there's no technical issues to have an isolated hunk without file header
    parseFileHeader(index);
    parseFileHeader(index);

    // Parse hunks
    index.hunks = [];

    while (i < diffstr.length) {
      var _line = diffstr[i];

      if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
        break;
      } else if (/^@@/.test(_line)) {
        index.hunks.push(parseHunk());
      } else if (_line && options.strict) {
        // Ignore unexpected content unless in strict mode
        throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
      } else {
        i++;
      }
    }
  }

  // Parses the --- and +++ headers, if none are found, no lines
  // are consumed.
  function parseFileHeader(index) {
    var headerPattern = /^(---|\+\+\+)\s+([\S ]*)(?:\t(.*?)\s*)?$/;
    var fileHeader = headerPattern.exec(diffstr[i]);
    if (fileHeader) {
      var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
      index[keyPrefix + 'FileName'] = fileHeader[2];
      index[keyPrefix + 'Header'] = fileHeader[3];

      i++;
    }
  }

  // Parses a hunk
  // This assumes that we are at the start of a hunk.
  function parseHunk() {
    var chunkHeaderIndex = i,
        chunkHeaderLine = diffstr[i++],
        chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);

    var hunk = {
      oldStart: +chunkHeader[1],
      oldLines: +chunkHeader[2] || 1,
      newStart: +chunkHeader[3],
      newLines: +chunkHeader[4] || 1,
      lines: [],
      linedelimiters: []
    };

    var addCount = 0,
        removeCount = 0;
    for (; i < diffstr.length; i++) {
      // Lines starting with '---' could be mistaken for the "remove line" operation
      // But they could be the header for the next file. Therefore prune such cases out.
      if (diffstr[i].indexOf('--- ') === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf('+++ ') === 0 && diffstr[i + 2].indexOf('@@') === 0) {
        break;
      }
      var operation = diffstr[i][0];

      if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
        hunk.lines.push(diffstr[i]);
        hunk.linedelimiters.push(delimiters[i] || '\n');

        if (operation === '+') {
          addCount++;
        } else if (operation === '-') {
          removeCount++;
        } else if (operation === ' ') {
          addCount++;
          removeCount++;
        }
      } else {
        break;
      }
    }

    // Handle the empty block count case
    if (!addCount && hunk.newLines === 1) {
      hunk.newLines = 0;
    }
    if (!removeCount && hunk.oldLines === 1) {
      hunk.oldLines = 0;
    }

    // Perform optional sanity checking
    if (options.strict) {
      if (addCount !== hunk.newLines) {
        throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
      }
      if (removeCount !== hunk.oldLines) {
        throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
      }
    }

    return hunk;
  }

  while (i < diffstr.length) {
    parseIndex();
  }

  return list;
}
//# sourceMappingURL=data:application/json;base64,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LEtBQUosQ0FBVSx3REFBd0QsbUJBQW1CLENBQTNFLENBQVYsQ0FBTjtBQUNEO0FBQ0Y7O0FBRUQsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsU0FBTyxJQUFJLFFBQVEsTUFBbkIsRUFBMkI7QUFDekI7QUFDRDs7QUFFRCxTQUFPLElBQVA7QUFDRCIsImZpbGUiOiJwYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBwYXJzZVBhdGNoKHVuaURpZmYsIG9wdGlvbnMgPSB7fSkge1xuICBsZXQgZGlmZnN0ciA9IHVuaURpZmYuc3BsaXQoL1xcclxcbnxbXFxuXFx2XFxmXFxyXFx4ODVdLyksXG4gICAgICBkZWxpbWl0ZXJzID0gdW5pRGlmZi5tYXRjaCgvXFxyXFxufFtcXG5cXHZcXGZcXHJcXHg4NV0vZykgfHwgW10sXG4gICAgICBsaXN0ID0gW10sXG4gICAgICBpID0gMDtcblxuICBmdW5jdGlvbiBwYXJzZUluZGV4KCkge1xuICAgIGxldCBpbmRleCA9IHt9O1xuICAgIGxpc3QucHVzaChpbmRleCk7XG5cbiAgICAvLyBQYXJzZSBkaWZmIG1ldGFkYXRhXG4gICAgd2hpbGUgKGkgPCBkaWZmc3RyLmxlbmd0aCkge1xuICAgICAgbGV0IGxpbmUgPSBkaWZmc3RyW2ldO1xuXG4gICAgICAvLyBGaWxlIGhlYWRlciBmb3VuZCwgZW5kIHBhcnNpbmcgZGlmZiBtZXRhZGF0YVxuICAgICAgaWYgKC9eKFxcLVxcLVxcLXxcXCtcXCtcXCt8QEApXFxzLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBEaWZmIGluZGV4XG4gICAgICBsZXQgaGVhZGVyID0gKC9eKD86SW5kZXg6fGRpZmYoPzogLXIgXFx3KykrKVxccysoLis/KVxccyokLykuZXhlYyhsaW5lKTtcbiAgICAgIGlmIChoZWFkZXIpIHtcbiAgICAgICAgaW5kZXguaW5kZXggPSBoZWFkZXJbMV07XG4gICAgICB9XG5cbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICAvLyBQYXJzZSBmaWxlIGhlYWRlcnMgaWYgdGhleSBhcmUgZGVmaW5lZC4gVW5pZmllZCBkaWZmIHJlcXVpcmVzIHRoZW0sIGJ1dFxuICAgIC8vIHRoZXJlJ3Mgbm8gdGVjaG5pY2FsIGlzc3VlcyB0byBoYXZlIGFuIGlzb2xhdGVkIGh1bmsgd2l0aG91dCBmaWxlIGhlYWRlclxuICAgIHBhcnNlRmlsZUhlYWRlcihpbmRleCk7XG4gICAgcGFyc2VGaWxlSGVhZGVyKGluZGV4KTtcblxuICAgIC8vIFBhcnNlIGh1bmtzXG4gICAgaW5kZXguaHVua3MgPSBbXTtcblxuICAgIHdoaWxlIChpIDwgZGlmZnN0ci5sZW5ndGgpIHtcbiAgICAgIGxldCBsaW5lID0gZGlmZnN0cltpXTtcblxuICAgICAgaWYgKC9eKEluZGV4OnxkaWZmfFxcLVxcLVxcLXxcXCtcXCtcXCspXFxzLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmICgvXkBALy50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGluZGV4Lmh1bmtzLnB1c2gocGFyc2VIdW5rKCkpO1xuICAgICAgfSBlbHNlIGlmIChsaW5lICYmIG9wdGlvbnMuc3RyaWN0KSB7XG4gICAgICAgIC8vIElnbm9yZSB1bmV4cGVjdGVkIGNvbnRlbnQgdW5sZXNzIGluIHN0cmljdCBtb2RlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBsaW5lICcgKyAoaSArIDEpICsgJyAnICsgSlNPTi5zdHJpbmdpZnkobGluZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFBhcnNlcyB0aGUgLS0tIGFuZCArKysgaGVhZGVycywgaWYgbm9uZSBhcmUgZm91bmQsIG5vIGxpbmVzXG4gIC8vIGFyZSBjb25zdW1lZC5cbiAgZnVuY3Rpb24gcGFyc2VGaWxlSGVhZGVyKGluZGV4KSB7XG4gICAgY29uc3QgaGVhZGVyUGF0dGVybiA9IC9eKC0tLXxcXCtcXCtcXCspXFxzKyhbXFxTIF0qKSg/OlxcdCguKj8pXFxzKik/JC87XG4gICAgY29uc3QgZmlsZUhlYWRlciA9IGhlYWRlclBhdHRlcm4uZXhlYyhkaWZmc3RyW2ldKTtcbiAgICBpZiAoZmlsZUhlYWRlcikge1xuICAgICAgbGV0IGtleVByZWZpeCA9IGZpbGVIZWFkZXJbMV0gPT09ICctLS0nID8gJ29sZCcgOiAnbmV3JztcbiAgICAgIGluZGV4W2tleVByZWZpeCArICdGaWxlTmFtZSddID0gZmlsZUhlYWRlclsyXTtcbiAgICAgIGluZGV4W2tleVByZWZpeCArICdIZWFkZXInXSA9IGZpbGVIZWFkZXJbM107XG5cbiAgICAgIGkrKztcbiAgICB9XG4gIH1cblxuICAvLyBQYXJzZXMgYSBodW5rXG4gIC8vIFRoaXMgYXNzdW1lcyB0aGF0IHdlIGFyZSBhdCB0aGUgc3RhcnQgb2YgYSBodW5rLlxuICBmdW5jdGlvbiBwYXJzZUh1bmsoKSB7XG4gICAgbGV0IGNodW5rSGVhZGVySW5kZXggPSBpLFxuICAgICAgICBjaHVua0hlYWRlckxpbmUgPSBkaWZmc3RyW2krK10sXG4gICAgICAgIGNodW5rSGVhZGVyID0gY2h1bmtIZWFkZXJMaW5lLnNwbGl0KC9AQCAtKFxcZCspKD86LChcXGQrKSk/IFxcKyhcXGQrKSg/OiwoXFxkKykpPyBAQC8pO1xuXG4gICAgbGV0IGh1bmsgPSB7XG4gICAgICBvbGRTdGFydDogK2NodW5rSGVhZGVyWzFdLFxuICAgICAgb2xkTGluZXM6ICtjaHVua0hlYWRlclsyXSB8fCAxLFxuICAgICAgbmV3U3RhcnQ6ICtjaHVua0hlYWRlclszXSxcbiAgICAgIG5ld0xpbmVzOiArY2h1bmtIZWFkZXJbNF0gfHwgMSxcbiAgICAgIGxpbmVzOiBbXSxcbiAgICAgIGxpbmVkZWxpbWl0ZXJzOiBbXVxuICAgIH07XG5cbiAgICBsZXQgYWRkQ291bnQgPSAwLFxuICAgICAgICByZW1vdmVDb3VudCA9IDA7XG4gICAgZm9yICg7IGkgPCBkaWZmc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBMaW5lcyBzdGFydGluZyB3aXRoICctLS0nIGNvdWxkIGJlIG1pc3Rha2VuIGZvciB0aGUgXCJyZW1vdmUgbGluZVwiIG9wZXJhdGlvblxuICAgICAgLy8gQnV0IHRoZXkgY291bGQgYmUgdGhlIGhlYWRlciBmb3IgdGhlIG5leHQgZmlsZS4gVGhlcmVmb3JlIHBydW5lIHN1Y2ggY2FzZXMgb3V0LlxuICAgICAgaWYgKGRpZmZzdHJbaV0uaW5kZXhPZignLS0tICcpID09PSAwXG4gICAgICAgICAgICAmJiAoaSArIDIgPCBkaWZmc3RyLmxlbmd0aClcbiAgICAgICAgICAgICYmIGRpZmZzdHJbaSArIDFdLmluZGV4T2YoJysrKyAnKSA9PT0gMFxuICAgICAgICAgICAgJiYgZGlmZnN0cltpICsgMl0uaW5kZXhPZignQEAnKSA9PT0gMCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGV0IG9wZXJhdGlvbiA9IGRpZmZzdHJbaV1bMF07XG5cbiAgICAgIGlmIChvcGVyYXRpb24gPT09ICcrJyB8fCBvcGVyYXRpb24gPT09ICctJyB8fCBvcGVyYXRpb24gPT09ICcgJyB8fCBvcGVyYXRpb24gPT09ICdcXFxcJykge1xuICAgICAgICBodW5rLmxpbmVzLnB1c2goZGlmZnN0cltpXSk7XG4gICAgICAgIGh1bmsubGluZWRlbGltaXRlcnMucHVzaChkZWxpbWl0ZXJzW2ldIHx8ICdcXG4nKTtcblxuICAgICAgICBpZiAob3BlcmF0aW9uID09PSAnKycpIHtcbiAgICAgICAgICBhZGRDb3VudCsrO1xuICAgICAgICB9IGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJy0nKSB7XG4gICAgICAgICAgcmVtb3ZlQ291bnQrKztcbiAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICcgJykge1xuICAgICAgICAgIGFkZENvdW50Kys7XG4gICAgICAgICAgcmVtb3ZlQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHRoZSBlbXB0eSBibG9jayBjb3VudCBjYXNlXG4gICAgaWYgKCFhZGRDb3VudCAmJiBodW5rLm5ld0xpbmVzID09PSAxKSB7XG4gICAgICBodW5rLm5ld0xpbmVzID0gMDtcbiAgICB9XG4gICAgaWYgKCFyZW1vdmVDb3VudCAmJiBodW5rLm9sZExpbmVzID09PSAxKSB7XG4gICAgICBodW5rLm9sZExpbmVzID0gMDtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIG9wdGlvbmFsIHNhbml0eSBjaGVja2luZ1xuICAgIGlmIChvcHRpb25zLnN0cmljdCkge1xuICAgICAgaWYgKGFkZENvdW50ICE9PSBodW5rLm5ld0xpbmVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQWRkZWQgbGluZSBjb3VudCBkaWQgbm90IG1hdGNoIGZvciBodW5rIGF0IGxpbmUgJyArIChjaHVua0hlYWRlckluZGV4ICsgMSkpO1xuICAgICAgfVxuICAgICAgaWYgKHJlbW92ZUNvdW50ICE9PSBodW5rLm9sZExpbmVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVtb3ZlZCBsaW5lIGNvdW50IGRpZCBub3QgbWF0Y2ggZm9yIGh1bmsgYXQgbGluZSAnICsgKGNodW5rSGVhZGVySW5kZXggKyAxKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGh1bms7XG4gIH1cblxuICB3aGlsZSAoaSA8IGRpZmZzdHIubGVuZ3RoKSB7XG4gICAgcGFyc2VJbmRleCgpO1xuICB9XG5cbiAgcmV0dXJuIGxpc3Q7XG59XG4iXX0=


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports. /*istanbul ignore end*/generateOptions = generateOptions;
function generateOptions(options, defaults) {
  if (typeof options === 'function') {
    defaults.callback = options;
  } else if (options) {
    for (var name in options) {
      /* istanbul ignore else */
      if (options.hasOwnProperty(name)) {
        defaults[name] = options[name];
      }
    }
  }
  return defaults;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3BhcmFtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Z0NBQWdCLGUsR0FBQSxlO0FBQVQsU0FBUyxlQUFULENBQXlCLE9BQXpCLEVBQWtDLFFBQWxDLEVBQTRDO0FBQ2pELE1BQUksT0FBTyxPQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDLGFBQVMsUUFBVCxHQUFvQixPQUFwQjtBQUNELEdBRkQsTUFFTyxJQUFJLE9BQUosRUFBYTtBQUNsQixTQUFLLElBQUksSUFBVCxJQUFpQixPQUFqQixFQUEwQjs7QUFFeEIsVUFBSSxRQUFRLGNBQVIsQ0FBdUIsSUFBdkIsQ0FBSixFQUFrQztBQUNoQyxpQkFBUyxJQUFULElBQWlCLFFBQVEsSUFBUixDQUFqQjtBQUNEO0FBQ0Y7QUFDRjtBQUNELFNBQU8sUUFBUDtBQUNEIiwiZmlsZSI6InBhcmFtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU9wdGlvbnMob3B0aW9ucywgZGVmYXVsdHMpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZGVmYXVsdHMuY2FsbGJhY2sgPSBvcHRpb25zO1xuICB9IGVsc2UgaWYgKG9wdGlvbnMpIHtcbiAgICBmb3IgKGxldCBuYW1lIGluIG9wdGlvbnMpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBkZWZhdWx0c1tuYW1lXSA9IG9wdGlvbnNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWZhdWx0cztcbn1cbiJdfQ==


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Backbone = __webpack_require__(0);

module.exports = Backbone.Collection.extend({
	url: 'defaults.json',
	initialize: function() { this.fetch(); }
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(2);
var Backbone = __webpack_require__(0);
var $ = __webpack_require__(3);
var Typographie = __webpack_require__(26);

module.exports = Backbone.Model.extend({
	defaults: {
		in: 'plain',
		out: 'plain',
		highlight: true,
	},
	initialize: function() {
		this.engine = new Typographie([]);
		this.updateActions();

		this.bind('change:in change:out', _.bind(this.updateMode, this));
		this.get('options').bind('update change:active', _.bind(this.updateActions, this));
	},
	updateActions: function(e) {
		var actionlist = this.get('options')
			.where({ send: true, active: true })
			.map(function (model) {
				return model.get('name');
			});
		this.engine.actions(actionlist);
	},
	updateMode: function() {
		var input = this.get('in');
		var output = this.get('out');
		this.engine.mode(input, output);
	},
	process: function(raw) {
		return this.engine.process(raw);
	}
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(2);
var Backbone = __webpack_require__(0);
var $ = __webpack_require__(3);
var jsdiff = __webpack_require__(22);

module.exports = Backbone.View.extend({
	el: $('#editor'),
	initialize: function() {
		this.model.bind('change:in', _.bind(this.process, this));
		this.model.bind('change:out', _.bind(this.process, this));
		this.model.bind('change:highlight', _.bind(this.process, this));
		this.model.get('options').bind('change', _.bind(this.process, this));
	},
	events: {
		'click #input .controls #submit': 'process',
		'change #input #raw_input': 'liveProcess',
		'keyup #input #raw_input': 'liveProcess'
	},
	liveProcess: function() {
		if (this.model.get('options').where({ name: 'live', active: true }).length) {
			this.process();
		}
	},
	process: function() {
		var raw = $('#raw_input')[0].value;
		var result = this.model.process(raw);
		this.render(raw, result);
	},
	clean: function(text) {
		return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	},
	diff: function(raw, text) {
		var clean = this.clean;
		var chanks = jsdiff.diffChars(raw, text);
		return chanks.map(function(chank) {
			if (chank.removed) {
				return '';
			} else if (chank.added) {
				return '<span class="fix">' + clean(chank.value) + '</span>';
			} else {
				return clean(chank.value);
			}
			return ;
		}).join('');
	},
	render: function(raw, result) {
		if (this.model.get('highlight')) {
			result = this.diff(raw, result);
		} else {
			result = this.clean(result);
		}

		if (this.model.get('out') == 'html') {
			result = result.replace(/(&lt;.+?&gt;)/gi, '<span class="html">$1</span>');
		}

		$('#display').html(result);
	}
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(2);
var Backbone = __webpack_require__(0);
var $ = __webpack_require__(3);

module.exports = Backbone.View.extend({
	el: $('#highlight'),
	events: {
		'click': 'toggleHighlight',
	},
	initialize: function() {
		this.model.bind('change:highlight', _.bind(this.render, this));
	},
	toggleHighlight: function() {
		this.model.set({'highlight': !this.model.get('highlight')});
	},
	render: function() {
		if (this.model.get('highlight')) $('#hcheckbox')[0].setAttribute('checked', '')
		else $('#hcheckbox')[0].removeAttribute('checked');
	}
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(2);
var Backbone = __webpack_require__(0);
var $ = __webpack_require__(3);

module.exports = Backbone.View.extend({
	el: $('#input_mode'),
	events: {
		'click LI': 'switchInput',
	},
	initialize: function() {
		this.model.bind('change:in', _.bind(this.render, this));
	},
	switchInput: function(e) {
		var mode = e.target.getAttribute('data-mode');
		this.model.set({in: mode});
	},
	render: function() {
		$('.active', this.$el[0])[0].removeAttribute('class');
		$('[data-mode='+this.model.get('in')+']', this.$el[0])[0].className = 'active';
	}
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(2);
var Backbone = __webpack_require__(0);
var $ = __webpack_require__(3);

var OptionView = __webpack_require__(28);

module.exports = Backbone.View.extend({
	el: $('#options'),
	initialize: function() {
		this.model.get('options').bind('update', _.bind(this.render, this));
		$('#show_options').on('click', _.bind(this.showDialog, this));
		$('.hide_options').on('click', _.bind(this.hideDialog, this));
	},
	showDialog: function() {
		$('#dialog_wrapper')[0].style.display = 'block';
	},
	hideDialog: function(e) {
		if (/hide_options/.test(e.target.className)) {
			$('#dialog_wrapper')[0].style.display = 'none';
		}
	},
	render: function() {
		var prevOptionGroup;
		_.each(this.model.get('options').models, function(option) {
			var optionView = new OptionView({model: option});
			var optionElement = optionView.render().el;

			if (prevOptionGroup && prevOptionGroup != option.get('group')) {
				optionElement.className = 'first_in_group';
			}
			prevOptionGroup = option.get('group');

			this.el.appendChild(optionElement);
		}, this);
	}
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(2);
var Backbone = __webpack_require__(0);
var $ = __webpack_require__(3);

module.exports = Backbone.View.extend({
	el: $('#output_mode'),
	events: {
		'click LI': 'switchOutput',
	},
	initialize: function() {
		this.model.bind('change:out', _.bind(this.render, this));
	},
	switchOutput: function(e) {
		var mode = e.target.getAttribute('data-mode');
		this.model.set({out: mode});
	},
	render: function() {
		$('.active', this.$el[0])[0].removeAttribute('class');
		$('[data-mode='+this.model.get('out')+']', this.$el[0])[0].className = 'active';
	}
});


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports. /*istanbul ignore end*/convertChangesToDMP = convertChangesToDMP;
// See: http://code.google.com/p/google-diff-match-patch/wiki/API
function convertChangesToDMP(changes) {
  var ret = [],
      change = /*istanbul ignore start*/void 0 /*istanbul ignore end*/,
      operation = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
  for (var i = 0; i < changes.length; i++) {
    change = changes[i];
    if (change.added) {
      operation = 1;
    } else if (change.removed) {
      operation = -1;
    } else {
      operation = 0;
    }

    ret.push([operation, change.value]);
  }
  return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb252ZXJ0L2RtcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Z0NBQ2dCLG1CLEdBQUEsbUI7O0FBQVQsU0FBUyxtQkFBVCxDQUE2QixPQUE3QixFQUFzQztBQUMzQyxNQUFJLE1BQU0sRUFBVjtBQUFBLE1BQ0ksUyx5QkFBQSxNLHdCQURKO0FBQUEsTUFFSSxZLHlCQUFBLE0sd0JBRko7QUFHQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksUUFBUSxNQUE1QixFQUFvQyxHQUFwQyxFQUF5QztBQUN2QyxhQUFTLFFBQVEsQ0FBUixDQUFUO0FBQ0EsUUFBSSxPQUFPLEtBQVgsRUFBa0I7QUFDaEIsa0JBQVksQ0FBWjtBQUNELEtBRkQsTUFFTyxJQUFJLE9BQU8sT0FBWCxFQUFvQjtBQUN6QixrQkFBWSxDQUFDLENBQWI7QUFDRCxLQUZNLE1BRUE7QUFDTCxrQkFBWSxDQUFaO0FBQ0Q7O0FBRUQsUUFBSSxJQUFKLENBQVMsQ0FBQyxTQUFELEVBQVksT0FBTyxLQUFuQixDQUFUO0FBQ0Q7QUFDRCxTQUFPLEdBQVA7QUFDRCIsImZpbGUiOiJkbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTZWU6IGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9nb29nbGUtZGlmZi1tYXRjaC1wYXRjaC93aWtpL0FQSVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRDaGFuZ2VzVG9ETVAoY2hhbmdlcykge1xuICBsZXQgcmV0ID0gW10sXG4gICAgICBjaGFuZ2UsXG4gICAgICBvcGVyYXRpb247XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgIGNoYW5nZSA9IGNoYW5nZXNbaV07XG4gICAgaWYgKGNoYW5nZS5hZGRlZCkge1xuICAgICAgb3BlcmF0aW9uID0gMTtcbiAgICB9IGVsc2UgaWYgKGNoYW5nZS5yZW1vdmVkKSB7XG4gICAgICBvcGVyYXRpb24gPSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3BlcmF0aW9uID0gMDtcbiAgICB9XG5cbiAgICByZXQucHVzaChbb3BlcmF0aW9uLCBjaGFuZ2UudmFsdWVdKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIl19


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports. /*istanbul ignore end*/convertChangesToXML = convertChangesToXML;
function convertChangesToXML(changes) {
  var ret = [];
  for (var i = 0; i < changes.length; i++) {
    var change = changes[i];
    if (change.added) {
      ret.push('<ins>');
    } else if (change.removed) {
      ret.push('<del>');
    }

    ret.push(escapeHTML(change.value));

    if (change.added) {
      ret.push('</ins>');
    } else if (change.removed) {
      ret.push('</del>');
    }
  }
  return ret.join('');
}

function escapeHTML(s) {
  var n = s;
  n = n.replace(/&/g, '&amp;');
  n = n.replace(/</g, '&lt;');
  n = n.replace(/>/g, '&gt;');
  n = n.replace(/"/g, '&quot;');

  return n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb252ZXJ0L3htbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Z0NBQWdCLG1CLEdBQUEsbUI7QUFBVCxTQUFTLG1CQUFULENBQTZCLE9BQTdCLEVBQXNDO0FBQzNDLE1BQUksTUFBTSxFQUFWO0FBQ0EsT0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFFBQVEsTUFBNUIsRUFBb0MsR0FBcEMsRUFBeUM7QUFDdkMsUUFBSSxTQUFTLFFBQVEsQ0FBUixDQUFiO0FBQ0EsUUFBSSxPQUFPLEtBQVgsRUFBa0I7QUFDaEIsVUFBSSxJQUFKLENBQVMsT0FBVDtBQUNELEtBRkQsTUFFTyxJQUFJLE9BQU8sT0FBWCxFQUFvQjtBQUN6QixVQUFJLElBQUosQ0FBUyxPQUFUO0FBQ0Q7O0FBRUQsUUFBSSxJQUFKLENBQVMsV0FBVyxPQUFPLEtBQWxCLENBQVQ7O0FBRUEsUUFBSSxPQUFPLEtBQVgsRUFBa0I7QUFDaEIsVUFBSSxJQUFKLENBQVMsUUFBVDtBQUNELEtBRkQsTUFFTyxJQUFJLE9BQU8sT0FBWCxFQUFvQjtBQUN6QixVQUFJLElBQUosQ0FBUyxRQUFUO0FBQ0Q7QUFDRjtBQUNELFNBQU8sSUFBSSxJQUFKLENBQVMsRUFBVCxDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxVQUFULENBQW9CLENBQXBCLEVBQXVCO0FBQ3JCLE1BQUksSUFBSSxDQUFSO0FBQ0EsTUFBSSxFQUFFLE9BQUYsQ0FBVSxJQUFWLEVBQWdCLE9BQWhCLENBQUo7QUFDQSxNQUFJLEVBQUUsT0FBRixDQUFVLElBQVYsRUFBZ0IsTUFBaEIsQ0FBSjtBQUNBLE1BQUksRUFBRSxPQUFGLENBQVUsSUFBVixFQUFnQixNQUFoQixDQUFKO0FBQ0EsTUFBSSxFQUFFLE9BQUYsQ0FBVSxJQUFWLEVBQWdCLFFBQWhCLENBQUo7O0FBRUEsU0FBTyxDQUFQO0FBQ0QiLCJmaWxlIjoieG1sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRDaGFuZ2VzVG9YTUwoY2hhbmdlcykge1xuICBsZXQgcmV0ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBjaGFuZ2UgPSBjaGFuZ2VzW2ldO1xuICAgIGlmIChjaGFuZ2UuYWRkZWQpIHtcbiAgICAgIHJldC5wdXNoKCc8aW5zPicpO1xuICAgIH0gZWxzZSBpZiAoY2hhbmdlLnJlbW92ZWQpIHtcbiAgICAgIHJldC5wdXNoKCc8ZGVsPicpO1xuICAgIH1cblxuICAgIHJldC5wdXNoKGVzY2FwZUhUTUwoY2hhbmdlLnZhbHVlKSk7XG5cbiAgICBpZiAoY2hhbmdlLmFkZGVkKSB7XG4gICAgICByZXQucHVzaCgnPC9pbnM+Jyk7XG4gICAgfSBlbHNlIGlmIChjaGFuZ2UucmVtb3ZlZCkge1xuICAgICAgcmV0LnB1c2goJzwvZGVsPicpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0LmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVIVE1MKHMpIHtcbiAgbGV0IG4gPSBzO1xuICBuID0gbi5yZXBsYWNlKC8mL2csICcmYW1wOycpO1xuICBuID0gbi5yZXBsYWNlKC88L2csICcmbHQ7Jyk7XG4gIG4gPSBuLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcbiAgbiA9IG4ucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuXG4gIHJldHVybiBuO1xufVxuIl19


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports.arrayDiff = undefined;
exports. /*istanbul ignore end*/diffArrays = diffArrays;

var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/var arrayDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/arrayDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
arrayDiff.tokenize = arrayDiff.join = function (value) {
  return value.slice();
};

function diffArrays(oldArr, newArr, callback) {
  return arrayDiff.diff(oldArr, newArr, callback);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL2FycmF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Z0NBT2dCLFUsR0FBQSxVOztBQVBoQixJLHlCQUFBLHlCLHdCQUFBOzs7Ozs7O3VCQUVPLElBQU0sWSx5QkFBQSxRLHdCQUFBLFlBQVksSSx5QkFBQSxtQix3QkFBbEI7QUFDUCxVQUFVLFFBQVYsR0FBcUIsVUFBVSxJQUFWLEdBQWlCLFVBQVMsS0FBVCxFQUFnQjtBQUNwRCxTQUFPLE1BQU0sS0FBTixFQUFQO0FBQ0QsQ0FGRDs7QUFJTyxTQUFTLFVBQVQsQ0FBb0IsTUFBcEIsRUFBNEIsTUFBNUIsRUFBb0MsUUFBcEMsRUFBOEM7QUFBRSxTQUFPLFVBQVUsSUFBVixDQUFlLE1BQWYsRUFBdUIsTUFBdkIsRUFBK0IsUUFBL0IsQ0FBUDtBQUFrRCIsImZpbGUiOiJhcnJheS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaWZmIGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBhcnJheURpZmYgPSBuZXcgRGlmZigpO1xuYXJyYXlEaWZmLnRva2VuaXplID0gYXJyYXlEaWZmLmpvaW4gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUuc2xpY2UoKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWZmQXJyYXlzKG9sZEFyciwgbmV3QXJyLCBjYWxsYmFjaykgeyByZXR1cm4gYXJyYXlEaWZmLmRpZmYob2xkQXJyLCBuZXdBcnIsIGNhbGxiYWNrKTsgfVxuIl19


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports.characterDiff = undefined;
exports. /*istanbul ignore end*/diffChars = diffChars;

var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/var characterDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/characterDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
function diffChars(oldStr, newStr, callback) {
  return characterDiff.diff(oldStr, newStr, callback);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL2NoYXJhY3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O2dDQUdnQixTLEdBQUEsUzs7QUFIaEIsSSx5QkFBQSx5Qix3QkFBQTs7Ozs7Ozt1QkFFTyxJQUFNLGdCLHlCQUFBLFEsd0JBQUEsZ0JBQWdCLEkseUJBQUEsbUIsd0JBQXRCO0FBQ0EsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCLE1BQTNCLEVBQW1DLFFBQW5DLEVBQTZDO0FBQUUsU0FBTyxjQUFjLElBQWQsQ0FBbUIsTUFBbkIsRUFBMkIsTUFBM0IsRUFBbUMsUUFBbkMsQ0FBUDtBQUFzRCIsImZpbGUiOiJjaGFyYWN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlmZiBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgY29uc3QgY2hhcmFjdGVyRGlmZiA9IG5ldyBEaWZmKCk7XG5leHBvcnQgZnVuY3Rpb24gZGlmZkNoYXJzKG9sZFN0ciwgbmV3U3RyLCBjYWxsYmFjaykgeyByZXR1cm4gY2hhcmFjdGVyRGlmZi5kaWZmKG9sZFN0ciwgbmV3U3RyLCBjYWxsYmFjayk7IH1cbiJdfQ==


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports.cssDiff = undefined;
exports. /*istanbul ignore end*/diffCss = diffCss;

var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/var cssDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/cssDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
cssDiff.tokenize = function (value) {
  return value.split(/([{}:;,]|\s+)/);
};

function diffCss(oldStr, newStr, callback) {
  return cssDiff.diff(oldStr, newStr, callback);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL2Nzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O2dDQU9nQixPLEdBQUEsTzs7QUFQaEIsSSx5QkFBQSx5Qix3QkFBQTs7Ozs7Ozt1QkFFTyxJQUFNLFUseUJBQUEsUSx3QkFBQSxVQUFVLEkseUJBQUEsbUIsd0JBQWhCO0FBQ1AsUUFBUSxRQUFSLEdBQW1CLFVBQVMsS0FBVCxFQUFnQjtBQUNqQyxTQUFPLE1BQU0sS0FBTixDQUFZLGVBQVosQ0FBUDtBQUNELENBRkQ7O0FBSU8sU0FBUyxPQUFULENBQWlCLE1BQWpCLEVBQXlCLE1BQXpCLEVBQWlDLFFBQWpDLEVBQTJDO0FBQUUsU0FBTyxRQUFRLElBQVIsQ0FBYSxNQUFiLEVBQXFCLE1BQXJCLEVBQTZCLFFBQTdCLENBQVA7QUFBZ0QiLCJmaWxlIjoiY3NzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERpZmYgZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IGNzc0RpZmYgPSBuZXcgRGlmZigpO1xuY3NzRGlmZi50b2tlbml6ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS5zcGxpdCgvKFt7fTo7LF18XFxzKykvKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWZmQ3NzKG9sZFN0ciwgbmV3U3RyLCBjYWxsYmFjaykgeyByZXR1cm4gY3NzRGlmZi5kaWZmKG9sZFN0ciwgbmV3U3RyLCBjYWxsYmFjayk7IH1cbiJdfQ==


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports.jsonDiff = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports. /*istanbul ignore end*/diffJson = diffJson;
/*istanbul ignore start*/exports. /*istanbul ignore end*/canonicalize = canonicalize;

var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

/*istanbul ignore end*/
var /*istanbul ignore start*/_line = __webpack_require__(4) /*istanbul ignore end*/;

/*istanbul ignore start*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/

var objectPrototypeToString = Object.prototype.toString;

var jsonDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/jsonDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
// Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
// dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:
jsonDiff.useLongestToken = true;

jsonDiff.tokenize = /*istanbul ignore start*/_line.lineDiff. /*istanbul ignore end*/tokenize;
jsonDiff.castInput = function (value) {
  /*istanbul ignore start*/var /*istanbul ignore end*/undefinedReplacement = this.options.undefinedReplacement;


  return typeof value === 'string' ? value : JSON.stringify(canonicalize(value), function (k, v) {
    if (typeof v === 'undefined') {
      return undefinedReplacement;
    }

    return v;
  }, '  ');
};
jsonDiff.equals = function (left, right) {
  return (/*istanbul ignore start*/_base2['default']. /*istanbul ignore end*/prototype.equals(left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'))
  );
};

function diffJson(oldObj, newObj, options) {
  return jsonDiff.diff(oldObj, newObj, options);
}

// This function handles the presence of circular references by bailing out when encountering an
// object that is already on the "stack" of items being processed.
function canonicalize(obj, stack, replacementStack) {
  stack = stack || [];
  replacementStack = replacementStack || [];

  var i = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;

  for (i = 0; i < stack.length; i += 1) {
    if (stack[i] === obj) {
      return replacementStack[i];
    }
  }

  var canonicalizedObj = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;

  if ('[object Array]' === objectPrototypeToString.call(obj)) {
    stack.push(obj);
    canonicalizedObj = new Array(obj.length);
    replacementStack.push(canonicalizedObj);
    for (i = 0; i < obj.length; i += 1) {
      canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack);
    }
    stack.pop();
    replacementStack.pop();
    return canonicalizedObj;
  }

  if (obj && obj.toJSON) {
    obj = obj.toJSON();
  }

  if ( /*istanbul ignore start*/(typeof /*istanbul ignore end*/obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
    stack.push(obj);
    canonicalizedObj = {};
    replacementStack.push(canonicalizedObj);
    var sortedKeys = [],
        key = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
    for (key in obj) {
      /* istanbul ignore else */
      if (obj.hasOwnProperty(key)) {
        sortedKeys.push(key);
      }
    }
    sortedKeys.sort();
    for (i = 0; i < sortedKeys.length; i += 1) {
      key = sortedKeys[i];
      canonicalizedObj[key] = canonicalize(obj[key], stack, replacementStack);
    }
    stack.pop();
    replacementStack.pop();
  } else {
    canonicalizedObj = obj;
  }
  return canonicalizedObj;
}
//# sourceMappingURL=data:application/json;base64,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QWlCLElBQWpCLENBQXNCLGdCQUF0QjtBQUNBLFFBQUksYUFBYSxFQUFqQjtBQUFBLFFBQ0ksTSx5QkFBQSxNLHdCQURKO0FBRUEsU0FBSyxHQUFMLElBQVksR0FBWixFQUFpQjs7QUFFZixVQUFJLElBQUksY0FBSixDQUFtQixHQUFuQixDQUFKLEVBQTZCO0FBQzNCLG1CQUFXLElBQVgsQ0FBZ0IsR0FBaEI7QUFDRDtBQUNGO0FBQ0QsZUFBVyxJQUFYO0FBQ0EsU0FBSyxJQUFJLENBQVQsRUFBWSxJQUFJLFdBQVcsTUFBM0IsRUFBbUMsS0FBSyxDQUF4QyxFQUEyQztBQUN6QyxZQUFNLFdBQVcsQ0FBWCxDQUFOO0FBQ0EsdUJBQWlCLEdBQWpCLElBQXdCLGFBQWEsSUFBSSxHQUFKLENBQWIsRUFBdUIsS0FBdkIsRUFBOEIsZ0JBQTlCLENBQXhCO0FBQ0Q7QUFDRCxVQUFNLEdBQU47QUFDQSxxQkFBaUIsR0FBakI7QUFDRCxHQW5CRCxNQW1CTztBQUNMLHVCQUFtQixHQUFuQjtBQUNEO0FBQ0QsU0FBTyxnQkFBUDtBQUNEIiwiZmlsZSI6Impzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlmZiBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHtsaW5lRGlmZn0gZnJvbSAnLi9saW5lJztcblxuY29uc3Qgb2JqZWN0UHJvdG90eXBlVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5cbmV4cG9ydCBjb25zdCBqc29uRGlmZiA9IG5ldyBEaWZmKCk7XG4vLyBEaXNjcmltaW5hdGUgYmV0d2VlbiB0d28gbGluZXMgb2YgcHJldHR5LXByaW50ZWQsIHNlcmlhbGl6ZWQgSlNPTiB3aGVyZSBvbmUgb2YgdGhlbSBoYXMgYVxuLy8gZGFuZ2xpbmcgY29tbWEgYW5kIHRoZSBvdGhlciBkb2Vzbid0LiBUdXJucyBvdXQgaW5jbHVkaW5nIHRoZSBkYW5nbGluZyBjb21tYSB5aWVsZHMgdGhlIG5pY2VzdCBvdXRwdXQ6XG5qc29uRGlmZi51c2VMb25nZXN0VG9rZW4gPSB0cnVlO1xuXG5qc29uRGlmZi50b2tlbml6ZSA9IGxpbmVEaWZmLnRva2VuaXplO1xuanNvbkRpZmYuY2FzdElucHV0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgY29uc3Qge3VuZGVmaW5lZFJlcGxhY2VtZW50fSA9IHRoaXMub3B0aW9ucztcblxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlIDogSlNPTi5zdHJpbmdpZnkoY2Fub25pY2FsaXplKHZhbHVlKSwgZnVuY3Rpb24oaywgdikge1xuICAgIGlmICh0eXBlb2YgdiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRSZXBsYWNlbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdjtcbiAgfSwgJyAgJyk7XG59O1xuanNvbkRpZmYuZXF1YWxzID0gZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIERpZmYucHJvdG90eXBlLmVxdWFscyhsZWZ0LnJlcGxhY2UoLywoW1xcclxcbl0pL2csICckMScpLCByaWdodC5yZXBsYWNlKC8sKFtcXHJcXG5dKS9nLCAnJDEnKSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZGlmZkpzb24ob2xkT2JqLCBuZXdPYmosIG9wdGlvbnMpIHsgcmV0dXJuIGpzb25EaWZmLmRpZmYob2xkT2JqLCBuZXdPYmosIG9wdGlvbnMpOyB9XG5cbi8vIFRoaXMgZnVuY3Rpb24gaGFuZGxlcyB0aGUgcHJlc2VuY2Ugb2YgY2lyY3VsYXIgcmVmZXJlbmNlcyBieSBiYWlsaW5nIG91dCB3aGVuIGVuY291bnRlcmluZyBhblxuLy8gb2JqZWN0IHRoYXQgaXMgYWxyZWFkeSBvbiB0aGUgXCJzdGFja1wiIG9mIGl0ZW1zIGJlaW5nIHByb2Nlc3NlZC5cbmV4cG9ydCBmdW5jdGlvbiBjYW5vbmljYWxpemUob2JqLCBzdGFjaywgcmVwbGFjZW1lbnRTdGFjaykge1xuICBzdGFjayA9IHN0YWNrIHx8IFtdO1xuICByZXBsYWNlbWVudFN0YWNrID0gcmVwbGFjZW1lbnRTdGFjayB8fCBbXTtcblxuICBsZXQgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoc3RhY2tbaV0gPT09IG9iaikge1xuICAgICAgcmV0dXJuIHJlcGxhY2VtZW50U3RhY2tbaV07XG4gICAgfVxuICB9XG5cbiAgbGV0IGNhbm9uaWNhbGl6ZWRPYmo7XG5cbiAgaWYgKCdbb2JqZWN0IEFycmF5XScgPT09IG9iamVjdFByb3RvdHlwZVRvU3RyaW5nLmNhbGwob2JqKSkge1xuICAgIHN0YWNrLnB1c2gob2JqKTtcbiAgICBjYW5vbmljYWxpemVkT2JqID0gbmV3IEFycmF5KG9iai5sZW5ndGgpO1xuICAgIHJlcGxhY2VtZW50U3RhY2sucHVzaChjYW5vbmljYWxpemVkT2JqKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjYW5vbmljYWxpemVkT2JqW2ldID0gY2Fub25pY2FsaXplKG9ialtpXSwgc3RhY2ssIHJlcGxhY2VtZW50U3RhY2spO1xuICAgIH1cbiAgICBzdGFjay5wb3AoKTtcbiAgICByZXBsYWNlbWVudFN0YWNrLnBvcCgpO1xuICAgIHJldHVybiBjYW5vbmljYWxpemVkT2JqO1xuICB9XG5cbiAgaWYgKG9iaiAmJiBvYmoudG9KU09OKSB7XG4gICAgb2JqID0gb2JqLnRvSlNPTigpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbCkge1xuICAgIHN0YWNrLnB1c2gob2JqKTtcbiAgICBjYW5vbmljYWxpemVkT2JqID0ge307XG4gICAgcmVwbGFjZW1lbnRTdGFjay5wdXNoKGNhbm9uaWNhbGl6ZWRPYmopO1xuICAgIGxldCBzb3J0ZWRLZXlzID0gW10sXG4gICAgICAgIGtleTtcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgc29ydGVkS2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIHNvcnRlZEtleXMuc29ydCgpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBzb3J0ZWRLZXlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBrZXkgPSBzb3J0ZWRLZXlzW2ldO1xuICAgICAgY2Fub25pY2FsaXplZE9ialtrZXldID0gY2Fub25pY2FsaXplKG9ialtrZXldLCBzdGFjaywgcmVwbGFjZW1lbnRTdGFjayk7XG4gICAgfVxuICAgIHN0YWNrLnBvcCgpO1xuICAgIHJlcGxhY2VtZW50U3RhY2sucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgY2Fub25pY2FsaXplZE9iaiA9IG9iajtcbiAgfVxuICByZXR1cm4gY2Fub25pY2FsaXplZE9iajtcbn1cbiJdfQ==


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports.sentenceDiff = undefined;
exports. /*istanbul ignore end*/diffSentences = diffSentences;

var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/var sentenceDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/sentenceDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
sentenceDiff.tokenize = function (value) {
  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
};

function diffSentences(oldStr, newStr, callback) {
  return sentenceDiff.diff(oldStr, newStr, callback);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL3NlbnRlbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Z0NBUWdCLGEsR0FBQSxhOztBQVJoQixJLHlCQUFBLHlCLHdCQUFBOzs7Ozs7O3VCQUdPLElBQU0sZSx5QkFBQSxRLHdCQUFBLGVBQWUsSSx5QkFBQSxtQix3QkFBckI7QUFDUCxhQUFhLFFBQWIsR0FBd0IsVUFBUyxLQUFULEVBQWdCO0FBQ3RDLFNBQU8sTUFBTSxLQUFOLENBQVksdUJBQVosQ0FBUDtBQUNELENBRkQ7O0FBSU8sU0FBUyxhQUFULENBQXVCLE1BQXZCLEVBQStCLE1BQS9CLEVBQXVDLFFBQXZDLEVBQWlEO0FBQUUsU0FBTyxhQUFhLElBQWIsQ0FBa0IsTUFBbEIsRUFBMEIsTUFBMUIsRUFBa0MsUUFBbEMsQ0FBUDtBQUFxRCIsImZpbGUiOiJzZW50ZW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaWZmIGZyb20gJy4vYmFzZSc7XG5cblxuZXhwb3J0IGNvbnN0IHNlbnRlbmNlRGlmZiA9IG5ldyBEaWZmKCk7XG5zZW50ZW5jZURpZmYudG9rZW5pemUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUuc3BsaXQoLyhcXFMuKz9bLiE/XSkoPz1cXHMrfCQpLyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZGlmZlNlbnRlbmNlcyhvbGRTdHIsIG5ld1N0ciwgY2FsbGJhY2spIHsgcmV0dXJuIHNlbnRlbmNlRGlmZi5kaWZmKG9sZFN0ciwgbmV3U3RyLCBjYWxsYmFjayk7IH1cbiJdfQ==


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports.wordDiff = undefined;
exports. /*istanbul ignore end*/diffWords = diffWords;
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWordsWithSpace = diffWordsWithSpace;

var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

/*istanbul ignore end*/
var /*istanbul ignore start*/_params = __webpack_require__(6) /*istanbul ignore end*/;

/*istanbul ignore start*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/

// Based on https://en.wikipedia.org/wiki/Latin_script_in_Unicode
//
// Ranges and exceptions:
// Latin-1 Supplement, 0080–00FF
//  - U+00D7  × Multiplication sign
//  - U+00F7  ÷ Division sign
// Latin Extended-A, 0100–017F
// Latin Extended-B, 0180–024F
// IPA Extensions, 0250–02AF
// Spacing Modifier Letters, 02B0–02FF
//  - U+02C7  ˇ &#711;  Caron
//  - U+02D8  ˘ &#728;  Breve
//  - U+02D9  ˙ &#729;  Dot Above
//  - U+02DA  ˚ &#730;  Ring Above
//  - U+02DB  ˛ &#731;  Ogonek
//  - U+02DC  ˜ &#732;  Small Tilde
//  - U+02DD  ˝ &#733;  Double Acute Accent
// Latin Extended Additional, 1E00–1EFF
var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;

var reWhitespace = /\S/;

var wordDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/wordDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
wordDiff.equals = function (left, right) {
  return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
};
wordDiff.tokenize = function (value) {
  var tokens = value.split(/(\s+|\b)/);

  // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.
  for (var i = 0; i < tokens.length - 1; i++) {
    // If we have an empty string in the next field and we have only word chars before and after, merge
    if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
      tokens[i] += tokens[i + 2];
      tokens.splice(i + 1, 2);
      i--;
    }
  }

  return tokens;
};

function diffWords(oldStr, newStr, callback) {
  var options = /*istanbul ignore start*/(0, _params.generateOptions) /*istanbul ignore end*/(callback, { ignoreWhitespace: true });
  return wordDiff.diff(oldStr, newStr, options);
}
function diffWordsWithSpace(oldStr, newStr, callback) {
  return wordDiff.diff(oldStr, newStr, callback);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL3dvcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztnQ0ErQ2dCLFMsR0FBQSxTO3lEQUlBLGtCLEdBQUEsa0I7O0FBbkRoQixJLHlCQUFBLHlCLHdCQUFBOzs7Ozs7QUFDQSxJLHlCQUFBLG1DLHdCQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLElBQU0sb0JBQW9CLCtEQUExQjs7QUFFQSxJQUFNLGVBQWUsSUFBckI7O0FBRU8sSUFBTSxXLHlCQUFBLFEsd0JBQUEsV0FBVyxJLHlCQUFBLG1CLHdCQUFqQjtBQUNQLFNBQVMsTUFBVCxHQUFrQixVQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCO0FBQ3RDLFNBQU8sU0FBUyxLQUFULElBQW1CLEtBQUssT0FBTCxDQUFhLGdCQUFiLElBQWlDLENBQUMsYUFBYSxJQUFiLENBQWtCLElBQWxCLENBQWxDLElBQTZELENBQUMsYUFBYSxJQUFiLENBQWtCLEtBQWxCLENBQXhGO0FBQ0QsQ0FGRDtBQUdBLFNBQVMsUUFBVCxHQUFvQixVQUFTLEtBQVQsRUFBZ0I7QUFDbEMsTUFBSSxTQUFTLE1BQU0sS0FBTixDQUFZLFVBQVosQ0FBYjs7O0FBR0EsT0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE9BQU8sTUFBUCxHQUFnQixDQUFwQyxFQUF1QyxHQUF2QyxFQUE0Qzs7QUFFMUMsUUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFYLENBQUQsSUFBa0IsT0FBTyxJQUFJLENBQVgsQ0FBbEIsSUFDSyxrQkFBa0IsSUFBbEIsQ0FBdUIsT0FBTyxDQUFQLENBQXZCLENBREwsSUFFSyxrQkFBa0IsSUFBbEIsQ0FBdUIsT0FBTyxJQUFJLENBQVgsQ0FBdkIsQ0FGVCxFQUVnRDtBQUM5QyxhQUFPLENBQVAsS0FBYSxPQUFPLElBQUksQ0FBWCxDQUFiO0FBQ0EsYUFBTyxNQUFQLENBQWMsSUFBSSxDQUFsQixFQUFxQixDQUFyQjtBQUNBO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPLE1BQVA7QUFDRCxDQWhCRDs7QUFrQk8sU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCLE1BQTNCLEVBQW1DLFFBQW5DLEVBQTZDO0FBQ2xELE1BQUksVSx5QkFBVSw0Qix3QkFBQSxDQUFnQixRQUFoQixFQUEwQixFQUFDLGtCQUFrQixJQUFuQixFQUExQixDQUFkO0FBQ0EsU0FBTyxTQUFTLElBQVQsQ0FBYyxNQUFkLEVBQXNCLE1BQXRCLEVBQThCLE9BQTlCLENBQVA7QUFDRDtBQUNNLFNBQVMsa0JBQVQsQ0FBNEIsTUFBNUIsRUFBb0MsTUFBcEMsRUFBNEMsUUFBNUMsRUFBc0Q7QUFDM0QsU0FBTyxTQUFTLElBQVQsQ0FBYyxNQUFkLEVBQXNCLE1BQXRCLEVBQThCLFFBQTlCLENBQVA7QUFDRCIsImZpbGUiOiJ3b3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERpZmYgZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7Z2VuZXJhdGVPcHRpb25zfSBmcm9tICcuLi91dGlsL3BhcmFtcyc7XG5cbi8vIEJhc2VkIG9uIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xhdGluX3NjcmlwdF9pbl9Vbmljb2RlXG4vL1xuLy8gUmFuZ2VzIGFuZCBleGNlcHRpb25zOlxuLy8gTGF0aW4tMSBTdXBwbGVtZW50LCAwMDgw4oCTMDBGRlxuLy8gIC0gVSswMEQ3ICDDlyBNdWx0aXBsaWNhdGlvbiBzaWduXG4vLyAgLSBVKzAwRjcgIMO3IERpdmlzaW9uIHNpZ25cbi8vIExhdGluIEV4dGVuZGVkLUEsIDAxMDDigJMwMTdGXG4vLyBMYXRpbiBFeHRlbmRlZC1CLCAwMTgw4oCTMDI0RlxuLy8gSVBBIEV4dGVuc2lvbnMsIDAyNTDigJMwMkFGXG4vLyBTcGFjaW5nIE1vZGlmaWVyIExldHRlcnMsIDAyQjDigJMwMkZGXG4vLyAgLSBVKzAyQzcgIMuHICYjNzExOyAgQ2Fyb25cbi8vICAtIFUrMDJEOCAgy5ggJiM3Mjg7ICBCcmV2ZVxuLy8gIC0gVSswMkQ5ICDLmSAmIzcyOTsgIERvdCBBYm92ZVxuLy8gIC0gVSswMkRBICDLmiAmIzczMDsgIFJpbmcgQWJvdmVcbi8vICAtIFUrMDJEQiAgy5sgJiM3MzE7ICBPZ29uZWtcbi8vICAtIFUrMDJEQyAgy5wgJiM3MzI7ICBTbWFsbCBUaWxkZVxuLy8gIC0gVSswMkREICDLnSAmIzczMzsgIERvdWJsZSBBY3V0ZSBBY2NlbnRcbi8vIExhdGluIEV4dGVuZGVkIEFkZGl0aW9uYWwsIDFFMDDigJMxRUZGXG5jb25zdCBleHRlbmRlZFdvcmRDaGFycyA9IC9eW2EtekEtWlxcdXtDMH0tXFx1e0ZGfVxcdXtEOH0tXFx1e0Y2fVxcdXtGOH0tXFx1ezJDNn1cXHV7MkM4fS1cXHV7MkQ3fVxcdXsyREV9LVxcdXsyRkZ9XFx1ezFFMDB9LVxcdXsxRUZGfV0rJC91O1xuXG5jb25zdCByZVdoaXRlc3BhY2UgPSAvXFxTLztcblxuZXhwb3J0IGNvbnN0IHdvcmREaWZmID0gbmV3IERpZmYoKTtcbndvcmREaWZmLmVxdWFscyA9IGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gIHJldHVybiBsZWZ0ID09PSByaWdodCB8fCAodGhpcy5vcHRpb25zLmlnbm9yZVdoaXRlc3BhY2UgJiYgIXJlV2hpdGVzcGFjZS50ZXN0KGxlZnQpICYmICFyZVdoaXRlc3BhY2UudGVzdChyaWdodCkpO1xufTtcbndvcmREaWZmLnRva2VuaXplID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgbGV0IHRva2VucyA9IHZhbHVlLnNwbGl0KC8oXFxzK3xcXGIpLyk7XG5cbiAgLy8gSm9pbiB0aGUgYm91bmRhcnkgc3BsaXRzIHRoYXQgd2UgZG8gbm90IGNvbnNpZGVyIHRvIGJlIGJvdW5kYXJpZXMuIFRoaXMgaXMgcHJpbWFyaWx5IHRoZSBleHRlbmRlZCBMYXRpbiBjaGFyYWN0ZXIgc2V0LlxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAvLyBJZiB3ZSBoYXZlIGFuIGVtcHR5IHN0cmluZyBpbiB0aGUgbmV4dCBmaWVsZCBhbmQgd2UgaGF2ZSBvbmx5IHdvcmQgY2hhcnMgYmVmb3JlIGFuZCBhZnRlciwgbWVyZ2VcbiAgICBpZiAoIXRva2Vuc1tpICsgMV0gJiYgdG9rZW5zW2kgKyAyXVxuICAgICAgICAgICYmIGV4dGVuZGVkV29yZENoYXJzLnRlc3QodG9rZW5zW2ldKVxuICAgICAgICAgICYmIGV4dGVuZGVkV29yZENoYXJzLnRlc3QodG9rZW5zW2kgKyAyXSkpIHtcbiAgICAgIHRva2Vuc1tpXSArPSB0b2tlbnNbaSArIDJdO1xuICAgICAgdG9rZW5zLnNwbGljZShpICsgMSwgMik7XG4gICAgICBpLS07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWZmV29yZHMob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKSB7XG4gIGxldCBvcHRpb25zID0gZ2VuZXJhdGVPcHRpb25zKGNhbGxiYWNrLCB7aWdub3JlV2hpdGVzcGFjZTogdHJ1ZX0pO1xuICByZXR1cm4gd29yZERpZmYuZGlmZihvbGRTdHIsIG5ld1N0ciwgb3B0aW9ucyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGlmZldvcmRzV2l0aFNwYWNlKG9sZFN0ciwgbmV3U3RyLCBjYWxsYmFjaykge1xuICByZXR1cm4gd29yZERpZmYuZGlmZihvbGRTdHIsIG5ld1N0ciwgY2FsbGJhY2spO1xufVxuIl19


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports.canonicalize = exports.convertChangesToXML = exports.convertChangesToDMP = exports.parsePatch = exports.applyPatches = exports.applyPatch = exports.createPatch = exports.createTwoFilesPatch = exports.structuredPatch = exports.diffArrays = exports.diffJson = exports.diffCss = exports.diffSentences = exports.diffTrimmedLines = exports.diffLines = exports.diffWordsWithSpace = exports.diffWords = exports.diffChars = exports.Diff = undefined;
/*istanbul ignore end*/
var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

/*istanbul ignore end*/
var /*istanbul ignore start*/_character = __webpack_require__(17) /*istanbul ignore end*/;

var /*istanbul ignore start*/_word = __webpack_require__(21) /*istanbul ignore end*/;

var /*istanbul ignore start*/_line = __webpack_require__(4) /*istanbul ignore end*/;

var /*istanbul ignore start*/_sentence = __webpack_require__(20) /*istanbul ignore end*/;

var /*istanbul ignore start*/_css = __webpack_require__(18) /*istanbul ignore end*/;

var /*istanbul ignore start*/_json = __webpack_require__(19) /*istanbul ignore end*/;

var /*istanbul ignore start*/_array = __webpack_require__(16) /*istanbul ignore end*/;

var /*istanbul ignore start*/_apply = __webpack_require__(23) /*istanbul ignore end*/;

var /*istanbul ignore start*/_parse = __webpack_require__(5) /*istanbul ignore end*/;

var /*istanbul ignore start*/_create = __webpack_require__(24) /*istanbul ignore end*/;

var /*istanbul ignore start*/_dmp = __webpack_require__(14) /*istanbul ignore end*/;

var /*istanbul ignore start*/_xml = __webpack_require__(15) /*istanbul ignore end*/;

/*istanbul ignore start*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports. /*istanbul ignore end*/Diff = _base2['default'];
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffChars = _character.diffChars;
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWords = _word.diffWords;
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWordsWithSpace = _word.diffWordsWithSpace;
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffLines = _line.diffLines;
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffTrimmedLines = _line.diffTrimmedLines;
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffSentences = _sentence.diffSentences;
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffCss = _css.diffCss;
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffJson = _json.diffJson;
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffArrays = _array.diffArrays;
/*istanbul ignore start*/exports. /*istanbul ignore end*/structuredPatch = _create.structuredPatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/createTwoFilesPatch = _create.createTwoFilesPatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/createPatch = _create.createPatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatch = _apply.applyPatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatches = _apply.applyPatches;
/*istanbul ignore start*/exports. /*istanbul ignore end*/parsePatch = _parse.parsePatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/convertChangesToDMP = _dmp.convertChangesToDMP;
/*istanbul ignore start*/exports. /*istanbul ignore end*/convertChangesToXML = _xml.convertChangesToXML;
/*istanbul ignore start*/exports. /*istanbul ignore end*/canonicalize = _json.canonicalize; /* See LICENSE file for terms of use */

/*
 * Text diff implementation.
 *
 * This library supports the following APIS:
 * JsDiff.diffChars: Character by character diff
 * JsDiff.diffWords: Word (as defined by \b regex) diff which ignores whitespace
 * JsDiff.diffLines: Line based diff
 *
 * JsDiff.diffCss: Diff targeted at CSS content
 *
 * These methods are based on the implementation proposed in
 * "An O(ND) Difference Algorithm and its Variations" (Myers, 1986).
 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927
 */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQWdCQSxJLHlCQUFBLDhCLHdCQUFBOzs7Ozs7QUFDQSxJLHlCQUFBLHdDLHdCQUFBOztBQUNBLEkseUJBQUEsOEIsd0JBQUE7O0FBQ0EsSSx5QkFBQSw4Qix3QkFBQTs7QUFDQSxJLHlCQUFBLHNDLHdCQUFBOztBQUVBLEkseUJBQUEsNEIsd0JBQUE7O0FBQ0EsSSx5QkFBQSw4Qix3QkFBQTs7QUFFQSxJLHlCQUFBLGdDLHdCQUFBOztBQUVBLEkseUJBQUEsaUMsd0JBQUE7O0FBQ0EsSSx5QkFBQSxpQyx3QkFBQTs7QUFDQSxJLHlCQUFBLG1DLHdCQUFBOztBQUVBLEkseUJBQUEsK0Isd0JBQUE7O0FBQ0EsSSx5QkFBQSwrQix3QkFBQTs7Ozs7Z0NBR0UsSTt5REFFQSxTO3lEQUNBLFM7eURBQ0Esa0I7eURBQ0EsUzt5REFDQSxnQjt5REFDQSxhO3lEQUVBLE87eURBQ0EsUTt5REFFQSxVO3lEQUVBLGU7eURBQ0EsbUI7eURBQ0EsVzt5REFDQSxVO3lEQUNBLFk7eURBQ0EsVTt5REFDQSxtQjt5REFDQSxtQjt5REFDQSxZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogU2VlIExJQ0VOU0UgZmlsZSBmb3IgdGVybXMgb2YgdXNlICovXG5cbi8qXG4gKiBUZXh0IGRpZmYgaW1wbGVtZW50YXRpb24uXG4gKlxuICogVGhpcyBsaWJyYXJ5IHN1cHBvcnRzIHRoZSBmb2xsb3dpbmcgQVBJUzpcbiAqIEpzRGlmZi5kaWZmQ2hhcnM6IENoYXJhY3RlciBieSBjaGFyYWN0ZXIgZGlmZlxuICogSnNEaWZmLmRpZmZXb3JkczogV29yZCAoYXMgZGVmaW5lZCBieSBcXGIgcmVnZXgpIGRpZmYgd2hpY2ggaWdub3JlcyB3aGl0ZXNwYWNlXG4gKiBKc0RpZmYuZGlmZkxpbmVzOiBMaW5lIGJhc2VkIGRpZmZcbiAqXG4gKiBKc0RpZmYuZGlmZkNzczogRGlmZiB0YXJnZXRlZCBhdCBDU1MgY29udGVudFxuICpcbiAqIFRoZXNlIG1ldGhvZHMgYXJlIGJhc2VkIG9uIHRoZSBpbXBsZW1lbnRhdGlvbiBwcm9wb3NlZCBpblxuICogXCJBbiBPKE5EKSBEaWZmZXJlbmNlIEFsZ29yaXRobSBhbmQgaXRzIFZhcmlhdGlvbnNcIiAoTXllcnMsIDE5ODYpLlxuICogaHR0cDovL2NpdGVzZWVyeC5pc3QucHN1LmVkdS92aWV3ZG9jL3N1bW1hcnk/ZG9pPTEwLjEuMS40LjY5MjdcbiAqL1xuaW1wb3J0IERpZmYgZnJvbSAnLi9kaWZmL2Jhc2UnO1xuaW1wb3J0IHtkaWZmQ2hhcnN9IGZyb20gJy4vZGlmZi9jaGFyYWN0ZXInO1xuaW1wb3J0IHtkaWZmV29yZHMsIGRpZmZXb3Jkc1dpdGhTcGFjZX0gZnJvbSAnLi9kaWZmL3dvcmQnO1xuaW1wb3J0IHtkaWZmTGluZXMsIGRpZmZUcmltbWVkTGluZXN9IGZyb20gJy4vZGlmZi9saW5lJztcbmltcG9ydCB7ZGlmZlNlbnRlbmNlc30gZnJvbSAnLi9kaWZmL3NlbnRlbmNlJztcblxuaW1wb3J0IHtkaWZmQ3NzfSBmcm9tICcuL2RpZmYvY3NzJztcbmltcG9ydCB7ZGlmZkpzb24sIGNhbm9uaWNhbGl6ZX0gZnJvbSAnLi9kaWZmL2pzb24nO1xuXG5pbXBvcnQge2RpZmZBcnJheXN9IGZyb20gJy4vZGlmZi9hcnJheSc7XG5cbmltcG9ydCB7YXBwbHlQYXRjaCwgYXBwbHlQYXRjaGVzfSBmcm9tICcuL3BhdGNoL2FwcGx5JztcbmltcG9ydCB7cGFyc2VQYXRjaH0gZnJvbSAnLi9wYXRjaC9wYXJzZSc7XG5pbXBvcnQge3N0cnVjdHVyZWRQYXRjaCwgY3JlYXRlVHdvRmlsZXNQYXRjaCwgY3JlYXRlUGF0Y2h9IGZyb20gJy4vcGF0Y2gvY3JlYXRlJztcblxuaW1wb3J0IHtjb252ZXJ0Q2hhbmdlc1RvRE1QfSBmcm9tICcuL2NvbnZlcnQvZG1wJztcbmltcG9ydCB7Y29udmVydENoYW5nZXNUb1hNTH0gZnJvbSAnLi9jb252ZXJ0L3htbCc7XG5cbmV4cG9ydCB7XG4gIERpZmYsXG5cbiAgZGlmZkNoYXJzLFxuICBkaWZmV29yZHMsXG4gIGRpZmZXb3Jkc1dpdGhTcGFjZSxcbiAgZGlmZkxpbmVzLFxuICBkaWZmVHJpbW1lZExpbmVzLFxuICBkaWZmU2VudGVuY2VzLFxuXG4gIGRpZmZDc3MsXG4gIGRpZmZKc29uLFxuXG4gIGRpZmZBcnJheXMsXG5cbiAgc3RydWN0dXJlZFBhdGNoLFxuICBjcmVhdGVUd29GaWxlc1BhdGNoLFxuICBjcmVhdGVQYXRjaCxcbiAgYXBwbHlQYXRjaCxcbiAgYXBwbHlQYXRjaGVzLFxuICBwYXJzZVBhdGNoLFxuICBjb252ZXJ0Q2hhbmdlc1RvRE1QLFxuICBjb252ZXJ0Q2hhbmdlc1RvWE1MLFxuICBjYW5vbmljYWxpemVcbn07XG4iXX0=


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports. /*istanbul ignore end*/applyPatch = applyPatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatches = applyPatches;

var /*istanbul ignore start*/_parse = __webpack_require__(5) /*istanbul ignore end*/;

var /*istanbul ignore start*/_distanceIterator = __webpack_require__(25) /*istanbul ignore end*/;

/*istanbul ignore start*/
var _distanceIterator2 = _interopRequireDefault(_distanceIterator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/function applyPatch(source, uniDiff) {
  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if (typeof uniDiff === 'string') {
    uniDiff = /*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(uniDiff);
  }

  if (Array.isArray(uniDiff)) {
    if (uniDiff.length > 1) {
      throw new Error('applyPatch only works with a single input.');
    }

    uniDiff = uniDiff[0];
  }

  // Apply the diff to the input
  var lines = source.split(/\r\n|[\n\v\f\r\x85]/),
      delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      hunks = uniDiff.hunks,
      compareLine = options.compareLine || function (lineNumber, line, operation, patchContent) /*istanbul ignore start*/{
    return (/*istanbul ignore end*/line === patchContent
    );
  },
      errorCount = 0,
      fuzzFactor = options.fuzzFactor || 0,
      minLine = 0,
      offset = 0,
      removeEOFNL = /*istanbul ignore start*/void 0 /*istanbul ignore end*/,
      addEOFNL = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;

  /**
   * Checks if the hunk exactly fits on the provided location
   */
  function hunkFits(hunk, toPos) {
    for (var j = 0; j < hunk.lines.length; j++) {
      var line = hunk.lines[j],
          operation = line[0],
          content = line.substr(1);

      if (operation === ' ' || operation === '-') {
        // Context sanity check
        if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
          errorCount++;

          if (errorCount > fuzzFactor) {
            return false;
          }
        }
        toPos++;
      }
    }

    return true;
  }

  // Search best fit offsets for each hunk based on the previous ones
  for (var i = 0; i < hunks.length; i++) {
    var hunk = hunks[i],
        maxLine = lines.length - hunk.oldLines,
        localOffset = 0,
        toPos = offset + hunk.oldStart - 1;

    var iterator = /*istanbul ignore start*/(0, _distanceIterator2['default']) /*istanbul ignore end*/(toPos, minLine, maxLine);

    for (; localOffset !== undefined; localOffset = iterator()) {
      if (hunkFits(hunk, toPos + localOffset)) {
        hunk.offset = offset += localOffset;
        break;
      }
    }

    if (localOffset === undefined) {
      return false;
    }

    // Set lower text limit to end of the current hunk, so next ones don't try
    // to fit over already patched text
    minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
  }

  // Apply patch hunks
  for (var _i = 0; _i < hunks.length; _i++) {
    var _hunk = hunks[_i],
        _toPos = _hunk.offset + _hunk.newStart - 1;
    if (_hunk.newLines == 0) {
      _toPos++;
    }

    for (var j = 0; j < _hunk.lines.length; j++) {
      var line = _hunk.lines[j],
          operation = line[0],
          content = line.substr(1),
          delimiter = _hunk.linedelimiters[j];

      if (operation === ' ') {
        _toPos++;
      } else if (operation === '-') {
        lines.splice(_toPos, 1);
        delimiters.splice(_toPos, 1);
        /* istanbul ignore else */
      } else if (operation === '+') {
          lines.splice(_toPos, 0, content);
          delimiters.splice(_toPos, 0, delimiter);
          _toPos++;
        } else if (operation === '\\') {
          var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;
          if (previousOperation === '+') {
            removeEOFNL = true;
          } else if (previousOperation === '-') {
            addEOFNL = true;
          }
        }
    }
  }

  // Handle EOFNL insertion/removal
  if (removeEOFNL) {
    while (!lines[lines.length - 1]) {
      lines.pop();
      delimiters.pop();
    }
  } else if (addEOFNL) {
    lines.push('');
    delimiters.push('\n');
  }
  for (var _k = 0; _k < lines.length - 1; _k++) {
    lines[_k] = lines[_k] + delimiters[_k];
  }
  return lines.join('');
}

// Wrapper that supports multiple file patches via callbacks.
function applyPatches(uniDiff, options) {
  if (typeof uniDiff === 'string') {
    uniDiff = /*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(uniDiff);
  }

  var currentIndex = 0;
  function processIndex() {
    var index = uniDiff[currentIndex++];
    if (!index) {
      return options.complete();
    }

    options.loadFile(index, function (err, data) {
      if (err) {
        return options.complete(err);
      }

      var updatedContent = applyPatch(data, index, options);
      options.patched(index, updatedContent, function (err) {
        if (err) {
          return options.complete(err);
        }

        processIndex();
      });
    });
  }
  processIndex();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXRjaC9hcHBseS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Z0NBR2dCLFUsR0FBQSxVO3lEQStIQSxZLEdBQUEsWTs7QUFsSWhCLEkseUJBQUEsMkIsd0JBQUE7O0FBQ0EsSSx5QkFBQSx3RCx3QkFBQTs7Ozs7Ozt1QkFFTyxTQUFTLFVBQVQsQ0FBb0IsTUFBcEIsRUFBNEIsT0FBNUIsRUFBbUQ7MkJBQUEsSSx1QkFBZCxPQUFjLHlEQUFKLEVBQUk7O0FBQ3hELE1BQUksT0FBTyxPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CLGMseUJBQVUsc0Isd0JBQUEsQ0FBVyxPQUFYLENBQVY7QUFDRDs7QUFFRCxNQUFJLE1BQU0sT0FBTixDQUFjLE9BQWQsQ0FBSixFQUE0QjtBQUMxQixRQUFJLFFBQVEsTUFBUixHQUFpQixDQUFyQixFQUF3QjtBQUN0QixZQUFNLElBQUksS0FBSixDQUFVLDRDQUFWLENBQU47QUFDRDs7QUFFRCxjQUFVLFFBQVEsQ0FBUixDQUFWO0FBQ0Q7OztBQUdELE1BQUksUUFBUSxPQUFPLEtBQVAsQ0FBYSxxQkFBYixDQUFaO0FBQUEsTUFDSSxhQUFhLE9BQU8sS0FBUCxDQUFhLHNCQUFiLEtBQXdDLEVBRHpEO0FBQUEsTUFFSSxRQUFRLFFBQVEsS0FGcEI7QUFBQSxNQUlJLGNBQWMsUUFBUSxXQUFSLElBQXdCLFVBQUMsVUFBRCxFQUFhLElBQWIsRUFBbUIsU0FBbkIsRUFBOEIsWUFBOUIsRSx5QkFBQTtBQUFBLFcsd0JBQStDLFNBQVM7QUFBeEQ7QUFBQSxHQUoxQztBQUFBLE1BS0ksYUFBYSxDQUxqQjtBQUFBLE1BTUksYUFBYSxRQUFRLFVBQVIsSUFBc0IsQ0FOdkM7QUFBQSxNQU9JLFVBQVUsQ0FQZDtBQUFBLE1BUUksU0FBUyxDQVJiO0FBQUEsTUFVSSxjLHlCQUFBLE0sd0JBVko7QUFBQSxNQVdJLFcseUJBQUEsTSx3QkFYSjs7Ozs7QUFnQkEsV0FBUyxRQUFULENBQWtCLElBQWxCLEVBQXdC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QUFFRCxVQUFJLGlCQUFpQixXQUFXLElBQVgsRUFBaUIsS0FBakIsRUFBd0IsT0FBeEIsQ0FBckI7QUFDQSxjQUFRLE9BQVIsQ0FBZ0IsS0FBaEIsRUFBdUIsY0FBdkIsRUFBdUMsVUFBUyxHQUFULEVBQWM7QUFDbkQsWUFBSSxHQUFKLEVBQVM7QUFDUCxpQkFBTyxRQUFRLFFBQVIsQ0FBaUIsR0FBakIsQ0FBUDtBQUNEOztBQUVEO0FBQ0QsT0FORDtBQU9ELEtBYkQ7QUFjRDtBQUNEO0FBQ0QiLCJmaWxlIjoiYXBwbHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3BhcnNlUGF0Y2h9IGZyb20gJy4vcGFyc2UnO1xuaW1wb3J0IGRpc3RhbmNlSXRlcmF0b3IgZnJvbSAnLi4vdXRpbC9kaXN0YW5jZS1pdGVyYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVBhdGNoKHNvdXJjZSwgdW5pRGlmZiwgb3B0aW9ucyA9IHt9KSB7XG4gIGlmICh0eXBlb2YgdW5pRGlmZiA9PT0gJ3N0cmluZycpIHtcbiAgICB1bmlEaWZmID0gcGFyc2VQYXRjaCh1bmlEaWZmKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHVuaURpZmYpKSB7XG4gICAgaWYgKHVuaURpZmYubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcHBseVBhdGNoIG9ubHkgd29ya3Mgd2l0aCBhIHNpbmdsZSBpbnB1dC4nKTtcbiAgICB9XG5cbiAgICB1bmlEaWZmID0gdW5pRGlmZlswXTtcbiAgfVxuXG4gIC8vIEFwcGx5IHRoZSBkaWZmIHRvIHRoZSBpbnB1dFxuICBsZXQgbGluZXMgPSBzb3VyY2Uuc3BsaXQoL1xcclxcbnxbXFxuXFx2XFxmXFxyXFx4ODVdLyksXG4gICAgICBkZWxpbWl0ZXJzID0gc291cmNlLm1hdGNoKC9cXHJcXG58W1xcblxcdlxcZlxcclxceDg1XS9nKSB8fCBbXSxcbiAgICAgIGh1bmtzID0gdW5pRGlmZi5odW5rcyxcblxuICAgICAgY29tcGFyZUxpbmUgPSBvcHRpb25zLmNvbXBhcmVMaW5lIHx8ICgobGluZU51bWJlciwgbGluZSwgb3BlcmF0aW9uLCBwYXRjaENvbnRlbnQpID0+IGxpbmUgPT09IHBhdGNoQ29udGVudCksXG4gICAgICBlcnJvckNvdW50ID0gMCxcbiAgICAgIGZ1enpGYWN0b3IgPSBvcHRpb25zLmZ1enpGYWN0b3IgfHwgMCxcbiAgICAgIG1pbkxpbmUgPSAwLFxuICAgICAgb2Zmc2V0ID0gMCxcblxuICAgICAgcmVtb3ZlRU9GTkwsXG4gICAgICBhZGRFT0ZOTDtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBodW5rIGV4YWN0bHkgZml0cyBvbiB0aGUgcHJvdmlkZWQgbG9jYXRpb25cbiAgICovXG4gIGZ1bmN0aW9uIGh1bmtGaXRzKGh1bmssIHRvUG9zKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBodW5rLmxpbmVzLmxlbmd0aDsgaisrKSB7XG4gICAgICBsZXQgbGluZSA9IGh1bmsubGluZXNbal0sXG4gICAgICAgICAgb3BlcmF0aW9uID0gbGluZVswXSxcbiAgICAgICAgICBjb250ZW50ID0gbGluZS5zdWJzdHIoMSk7XG5cbiAgICAgIGlmIChvcGVyYXRpb24gPT09ICcgJyB8fCBvcGVyYXRpb24gPT09ICctJykge1xuICAgICAgICAvLyBDb250ZXh0IHNhbml0eSBjaGVja1xuICAgICAgICBpZiAoIWNvbXBhcmVMaW5lKHRvUG9zICsgMSwgbGluZXNbdG9Qb3NdLCBvcGVyYXRpb24sIGNvbnRlbnQpKSB7XG4gICAgICAgICAgZXJyb3JDb3VudCsrO1xuXG4gICAgICAgICAgaWYgKGVycm9yQ291bnQgPiBmdXp6RmFjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRvUG9zKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBTZWFyY2ggYmVzdCBmaXQgb2Zmc2V0cyBmb3IgZWFjaCBodW5rIGJhc2VkIG9uIHRoZSBwcmV2aW91cyBvbmVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaHVua3MubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgaHVuayA9IGh1bmtzW2ldLFxuICAgICAgICBtYXhMaW5lID0gbGluZXMubGVuZ3RoIC0gaHVuay5vbGRMaW5lcyxcbiAgICAgICAgbG9jYWxPZmZzZXQgPSAwLFxuICAgICAgICB0b1BvcyA9IG9mZnNldCArIGh1bmsub2xkU3RhcnQgLSAxO1xuXG4gICAgbGV0IGl0ZXJhdG9yID0gZGlzdGFuY2VJdGVyYXRvcih0b1BvcywgbWluTGluZSwgbWF4TGluZSk7XG5cbiAgICBmb3IgKDsgbG9jYWxPZmZzZXQgIT09IHVuZGVmaW5lZDsgbG9jYWxPZmZzZXQgPSBpdGVyYXRvcigpKSB7XG4gICAgICBpZiAoaHVua0ZpdHMoaHVuaywgdG9Qb3MgKyBsb2NhbE9mZnNldCkpIHtcbiAgICAgICAgaHVuay5vZmZzZXQgPSBvZmZzZXQgKz0gbG9jYWxPZmZzZXQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChsb2NhbE9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gU2V0IGxvd2VyIHRleHQgbGltaXQgdG8gZW5kIG9mIHRoZSBjdXJyZW50IGh1bmssIHNvIG5leHQgb25lcyBkb24ndCB0cnlcbiAgICAvLyB0byBmaXQgb3ZlciBhbHJlYWR5IHBhdGNoZWQgdGV4dFxuICAgIG1pbkxpbmUgPSBodW5rLm9mZnNldCArIGh1bmsub2xkU3RhcnQgKyBodW5rLm9sZExpbmVzO1xuICB9XG5cbiAgLy8gQXBwbHkgcGF0Y2ggaHVua3NcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBodW5rcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBodW5rID0gaHVua3NbaV0sXG4gICAgICAgIHRvUG9zID0gaHVuay5vZmZzZXQgKyBodW5rLm5ld1N0YXJ0IC0gMTtcbiAgICBpZiAoaHVuay5uZXdMaW5lcyA9PSAwKSB7IHRvUG9zKys7IH1cblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgaHVuay5saW5lcy5sZW5ndGg7IGorKykge1xuICAgICAgbGV0IGxpbmUgPSBodW5rLmxpbmVzW2pdLFxuICAgICAgICAgIG9wZXJhdGlvbiA9IGxpbmVbMF0sXG4gICAgICAgICAgY29udGVudCA9IGxpbmUuc3Vic3RyKDEpLFxuICAgICAgICAgIGRlbGltaXRlciA9IGh1bmsubGluZWRlbGltaXRlcnNbal07XG5cbiAgICAgIGlmIChvcGVyYXRpb24gPT09ICcgJykge1xuICAgICAgICB0b1BvcysrO1xuICAgICAgfSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICctJykge1xuICAgICAgICBsaW5lcy5zcGxpY2UodG9Qb3MsIDEpO1xuICAgICAgICBkZWxpbWl0ZXJzLnNwbGljZSh0b1BvcywgMSk7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgfSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICcrJykge1xuICAgICAgICBsaW5lcy5zcGxpY2UodG9Qb3MsIDAsIGNvbnRlbnQpO1xuICAgICAgICBkZWxpbWl0ZXJzLnNwbGljZSh0b1BvcywgMCwgZGVsaW1pdGVyKTtcbiAgICAgICAgdG9Qb3MrKztcbiAgICAgIH0gZWxzZSBpZiAob3BlcmF0aW9uID09PSAnXFxcXCcpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzT3BlcmF0aW9uID0gaHVuay5saW5lc1tqIC0gMV0gPyBodW5rLmxpbmVzW2ogLSAxXVswXSA6IG51bGw7XG4gICAgICAgIGlmIChwcmV2aW91c09wZXJhdGlvbiA9PT0gJysnKSB7XG4gICAgICAgICAgcmVtb3ZlRU9GTkwgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHByZXZpb3VzT3BlcmF0aW9uID09PSAnLScpIHtcbiAgICAgICAgICBhZGRFT0ZOTCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBIYW5kbGUgRU9GTkwgaW5zZXJ0aW9uL3JlbW92YWxcbiAgaWYgKHJlbW92ZUVPRk5MKSB7XG4gICAgd2hpbGUgKCFsaW5lc1tsaW5lcy5sZW5ndGggLSAxXSkge1xuICAgICAgbGluZXMucG9wKCk7XG4gICAgICBkZWxpbWl0ZXJzLnBvcCgpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChhZGRFT0ZOTCkge1xuICAgIGxpbmVzLnB1c2goJycpO1xuICAgIGRlbGltaXRlcnMucHVzaCgnXFxuJyk7XG4gIH1cbiAgZm9yIChsZXQgX2sgPSAwOyBfayA8IGxpbmVzLmxlbmd0aCAtIDE7IF9rKyspIHtcbiAgICBsaW5lc1tfa10gPSBsaW5lc1tfa10gKyBkZWxpbWl0ZXJzW19rXTtcbiAgfVxuICByZXR1cm4gbGluZXMuam9pbignJyk7XG59XG5cbi8vIFdyYXBwZXIgdGhhdCBzdXBwb3J0cyBtdWx0aXBsZSBmaWxlIHBhdGNoZXMgdmlhIGNhbGxiYWNrcy5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVBhdGNoZXModW5pRGlmZiwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHVuaURpZmYgPT09ICdzdHJpbmcnKSB7XG4gICAgdW5pRGlmZiA9IHBhcnNlUGF0Y2godW5pRGlmZik7XG4gIH1cblxuICBsZXQgY3VycmVudEluZGV4ID0gMDtcbiAgZnVuY3Rpb24gcHJvY2Vzc0luZGV4KCkge1xuICAgIGxldCBpbmRleCA9IHVuaURpZmZbY3VycmVudEluZGV4KytdO1xuICAgIGlmICghaW5kZXgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgb3B0aW9ucy5sb2FkRmlsZShpbmRleCwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmNvbXBsZXRlKGVycik7XG4gICAgICB9XG5cbiAgICAgIGxldCB1cGRhdGVkQ29udGVudCA9IGFwcGx5UGF0Y2goZGF0YSwgaW5kZXgsIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5wYXRjaGVkKGluZGV4LCB1cGRhdGVkQ29udGVudCwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5jb21wbGV0ZShlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvY2Vzc0luZGV4KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBwcm9jZXNzSW5kZXgoKTtcbn1cbiJdfQ==


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;
exports. /*istanbul ignore end*/structuredPatch = structuredPatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/createTwoFilesPatch = createTwoFilesPatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/createPatch = createPatch;

var /*istanbul ignore start*/_line = __webpack_require__(4) /*istanbul ignore end*/;

/*istanbul ignore start*/
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*istanbul ignore end*/function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  if (!options) {
    options = {};
  }
  if (typeof options.context === 'undefined') {
    options.context = 4;
  }

  var diff = /*istanbul ignore start*/(0, _line.diffLines) /*istanbul ignore end*/(oldStr, newStr, options);
  diff.push({ value: '', lines: [] }); // Append an empty value to make cleanup easier

  function contextLines(lines) {
    return lines.map(function (entry) {
      return ' ' + entry;
    });
  }

  var hunks = [];
  var oldRangeStart = 0,
      newRangeStart = 0,
      curRange = [],
      oldLine = 1,
      newLine = 1;
  /*istanbul ignore start*/
  var _loop = function _loop( /*istanbul ignore end*/i) {
    var current = diff[i],
        lines = current.lines || current.value.replace(/\n$/, '').split('\n');
    current.lines = lines;

    if (current.added || current.removed) {
      /*istanbul ignore start*/
      var _curRange;

      /*istanbul ignore end*/
      // If we have previous context, start with that
      if (!oldRangeStart) {
        var prev = diff[i - 1];
        oldRangeStart = oldLine;
        newRangeStart = newLine;

        if (prev) {
          curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
          oldRangeStart -= curRange.length;
          newRangeStart -= curRange.length;
        }
      }

      // Output our changes
      /*istanbul ignore start*/(_curRange = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/lines.map(function (entry) {
        return (current.added ? '+' : '-') + entry;
      })));

      // Track the updated file position
      if (current.added) {
        newLine += lines.length;
      } else {
        oldLine += lines.length;
      }
    } else {
      // Identical context lines. Track line changes
      if (oldRangeStart) {
        // Close out any changes that have been output (or join overlapping)
        if (lines.length <= options.context * 2 && i < diff.length - 2) {
          /*istanbul ignore start*/
          var _curRange2;

          /*istanbul ignore end*/
          // Overlapping
          /*istanbul ignore start*/(_curRange2 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange2 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines)));
        } else {
          /*istanbul ignore start*/
          var _curRange3;

          /*istanbul ignore end*/
          // end the range and output
          var contextSize = Math.min(lines.length, options.context);
          /*istanbul ignore start*/(_curRange3 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange3 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines.slice(0, contextSize))));

          var hunk = {
            oldStart: oldRangeStart,
            oldLines: oldLine - oldRangeStart + contextSize,
            newStart: newRangeStart,
            newLines: newLine - newRangeStart + contextSize,
            lines: curRange
          };
          if (i >= diff.length - 2 && lines.length <= options.context) {
            // EOF is inside this hunk
            var oldEOFNewline = /\n$/.test(oldStr);
            var newEOFNewline = /\n$/.test(newStr);
            if (lines.length == 0 && !oldEOFNewline) {
              // special case: old has no eol and no trailing context; no-nl can end up before adds
              curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
            } else if (!oldEOFNewline || !newEOFNewline) {
              curRange.push('\\ No newline at end of file');
            }
          }
          hunks.push(hunk);

          oldRangeStart = 0;
          newRangeStart = 0;
          curRange = [];
        }
      }
      oldLine += lines.length;
      newLine += lines.length;
    }
  };

  for (var i = 0; i < diff.length; i++) {
    /*istanbul ignore start*/
    _loop( /*istanbul ignore end*/i);
  }

  return {
    oldFileName: oldFileName, newFileName: newFileName,
    oldHeader: oldHeader, newHeader: newHeader,
    hunks: hunks
  };
}

function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  var diff = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);

  var ret = [];
  if (oldFileName == newFileName) {
    ret.push('Index: ' + oldFileName);
  }
  ret.push('===================================================================');
  ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
  ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

  for (var i = 0; i < diff.hunks.length; i++) {
    var hunk = diff.hunks[i];
    ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
    ret.push.apply(ret, hunk.lines);
  }

  return ret.join('\n') + '\n';
}

function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
  return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
}
//# sourceMappingURL=data:application/json;base64,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QixHQUR6QixHQUMrQixLQUFLLFFBRHBDLEdBRUUsS0FISjtBQUtBLFFBQUksSUFBSixDQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLEtBQUssS0FBekI7QUFDRDs7QUFFRCxTQUFPLElBQUksSUFBSixDQUFTLElBQVQsSUFBaUIsSUFBeEI7QUFDRDs7QUFFTSxTQUFTLFdBQVQsQ0FBcUIsUUFBckIsRUFBK0IsTUFBL0IsRUFBdUMsTUFBdkMsRUFBK0MsU0FBL0MsRUFBMEQsU0FBMUQsRUFBcUUsT0FBckUsRUFBOEU7QUFDbkYsU0FBTyxvQkFBb0IsUUFBcEIsRUFBOEIsUUFBOUIsRUFBd0MsTUFBeEMsRUFBZ0QsTUFBaEQsRUFBd0QsU0FBeEQsRUFBbUUsU0FBbkUsRUFBOEUsT0FBOUUsQ0FBUDtBQUNEIiwiZmlsZSI6ImNyZWF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZGlmZkxpbmVzfSBmcm9tICcuLi9kaWZmL2xpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3RydWN0dXJlZFBhdGNoKG9sZEZpbGVOYW1lLCBuZXdGaWxlTmFtZSwgb2xkU3RyLCBuZXdTdHIsIG9sZEhlYWRlciwgbmV3SGVhZGVyLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAodHlwZW9mIG9wdGlvbnMuY29udGV4dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBvcHRpb25zLmNvbnRleHQgPSA0O1xuICB9XG5cbiAgY29uc3QgZGlmZiA9IGRpZmZMaW5lcyhvbGRTdHIsIG5ld1N0ciwgb3B0aW9ucyk7XG4gIGRpZmYucHVzaCh7dmFsdWU6ICcnLCBsaW5lczogW119KTsgICAvLyBBcHBlbmQgYW4gZW1wdHkgdmFsdWUgdG8gbWFrZSBjbGVhbnVwIGVhc2llclxuXG4gIGZ1bmN0aW9uIGNvbnRleHRMaW5lcyhsaW5lcykge1xuICAgIHJldHVybiBsaW5lcy5tYXAoZnVuY3Rpb24oZW50cnkpIHsgcmV0dXJuICcgJyArIGVudHJ5OyB9KTtcbiAgfVxuXG4gIGxldCBodW5rcyA9IFtdO1xuICBsZXQgb2xkUmFuZ2VTdGFydCA9IDAsIG5ld1JhbmdlU3RhcnQgPSAwLCBjdXJSYW5nZSA9IFtdLFxuICAgICAgb2xkTGluZSA9IDEsIG5ld0xpbmUgPSAxO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZmYubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjdXJyZW50ID0gZGlmZltpXSxcbiAgICAgICAgICBsaW5lcyA9IGN1cnJlbnQubGluZXMgfHwgY3VycmVudC52YWx1ZS5yZXBsYWNlKC9cXG4kLywgJycpLnNwbGl0KCdcXG4nKTtcbiAgICBjdXJyZW50LmxpbmVzID0gbGluZXM7XG5cbiAgICBpZiAoY3VycmVudC5hZGRlZCB8fCBjdXJyZW50LnJlbW92ZWQpIHtcbiAgICAgIC8vIElmIHdlIGhhdmUgcHJldmlvdXMgY29udGV4dCwgc3RhcnQgd2l0aCB0aGF0XG4gICAgICBpZiAoIW9sZFJhbmdlU3RhcnQpIHtcbiAgICAgICAgY29uc3QgcHJldiA9IGRpZmZbaSAtIDFdO1xuICAgICAgICBvbGRSYW5nZVN0YXJ0ID0gb2xkTGluZTtcbiAgICAgICAgbmV3UmFuZ2VTdGFydCA9IG5ld0xpbmU7XG5cbiAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICBjdXJSYW5nZSA9IG9wdGlvbnMuY29udGV4dCA+IDAgPyBjb250ZXh0TGluZXMocHJldi5saW5lcy5zbGljZSgtb3B0aW9ucy5jb250ZXh0KSkgOiBbXTtcbiAgICAgICAgICBvbGRSYW5nZVN0YXJ0IC09IGN1clJhbmdlLmxlbmd0aDtcbiAgICAgICAgICBuZXdSYW5nZVN0YXJ0IC09IGN1clJhbmdlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBPdXRwdXQgb3VyIGNoYW5nZXNcbiAgICAgIGN1clJhbmdlLnB1c2goLi4uIGxpbmVzLm1hcChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICByZXR1cm4gKGN1cnJlbnQuYWRkZWQgPyAnKycgOiAnLScpICsgZW50cnk7XG4gICAgICB9KSk7XG5cbiAgICAgIC8vIFRyYWNrIHRoZSB1cGRhdGVkIGZpbGUgcG9zaXRpb25cbiAgICAgIGlmIChjdXJyZW50LmFkZGVkKSB7XG4gICAgICAgIG5ld0xpbmUgKz0gbGluZXMubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2xkTGluZSArPSBsaW5lcy5sZW5ndGg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElkZW50aWNhbCBjb250ZXh0IGxpbmVzLiBUcmFjayBsaW5lIGNoYW5nZXNcbiAgICAgIGlmIChvbGRSYW5nZVN0YXJ0KSB7XG4gICAgICAgIC8vIENsb3NlIG91dCBhbnkgY2hhbmdlcyB0aGF0IGhhdmUgYmVlbiBvdXRwdXQgKG9yIGpvaW4gb3ZlcmxhcHBpbmcpXG4gICAgICAgIGlmIChsaW5lcy5sZW5ndGggPD0gb3B0aW9ucy5jb250ZXh0ICogMiAmJiBpIDwgZGlmZi5sZW5ndGggLSAyKSB7XG4gICAgICAgICAgLy8gT3ZlcmxhcHBpbmdcbiAgICAgICAgICBjdXJSYW5nZS5wdXNoKC4uLiBjb250ZXh0TGluZXMobGluZXMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlbmQgdGhlIHJhbmdlIGFuZCBvdXRwdXRcbiAgICAgICAgICBsZXQgY29udGV4dFNpemUgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIG9wdGlvbnMuY29udGV4dCk7XG4gICAgICAgICAgY3VyUmFuZ2UucHVzaCguLi4gY29udGV4dExpbmVzKGxpbmVzLnNsaWNlKDAsIGNvbnRleHRTaXplKSkpO1xuXG4gICAgICAgICAgbGV0IGh1bmsgPSB7XG4gICAgICAgICAgICBvbGRTdGFydDogb2xkUmFuZ2VTdGFydCxcbiAgICAgICAgICAgIG9sZExpbmVzOiAob2xkTGluZSAtIG9sZFJhbmdlU3RhcnQgKyBjb250ZXh0U2l6ZSksXG4gICAgICAgICAgICBuZXdTdGFydDogbmV3UmFuZ2VTdGFydCxcbiAgICAgICAgICAgIG5ld0xpbmVzOiAobmV3TGluZSAtIG5ld1JhbmdlU3RhcnQgKyBjb250ZXh0U2l6ZSksXG4gICAgICAgICAgICBsaW5lczogY3VyUmFuZ2VcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChpID49IGRpZmYubGVuZ3RoIC0gMiAmJiBsaW5lcy5sZW5ndGggPD0gb3B0aW9ucy5jb250ZXh0KSB7XG4gICAgICAgICAgICAvLyBFT0YgaXMgaW5zaWRlIHRoaXMgaHVua1xuICAgICAgICAgICAgbGV0IG9sZEVPRk5ld2xpbmUgPSAoL1xcbiQvLnRlc3Qob2xkU3RyKSk7XG4gICAgICAgICAgICBsZXQgbmV3RU9GTmV3bGluZSA9ICgvXFxuJC8udGVzdChuZXdTdHIpKTtcbiAgICAgICAgICAgIGlmIChsaW5lcy5sZW5ndGggPT0gMCAmJiAhb2xkRU9GTmV3bGluZSkge1xuICAgICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2U6IG9sZCBoYXMgbm8gZW9sIGFuZCBubyB0cmFpbGluZyBjb250ZXh0OyBuby1ubCBjYW4gZW5kIHVwIGJlZm9yZSBhZGRzXG4gICAgICAgICAgICAgIGN1clJhbmdlLnNwbGljZShodW5rLm9sZExpbmVzLCAwLCAnXFxcXCBObyBuZXdsaW5lIGF0IGVuZCBvZiBmaWxlJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFvbGRFT0ZOZXdsaW5lIHx8ICFuZXdFT0ZOZXdsaW5lKSB7XG4gICAgICAgICAgICAgIGN1clJhbmdlLnB1c2goJ1xcXFwgTm8gbmV3bGluZSBhdCBlbmQgb2YgZmlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBodW5rcy5wdXNoKGh1bmspO1xuXG4gICAgICAgICAgb2xkUmFuZ2VTdGFydCA9IDA7XG4gICAgICAgICAgbmV3UmFuZ2VTdGFydCA9IDA7XG4gICAgICAgICAgY3VyUmFuZ2UgPSBbXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb2xkTGluZSArPSBsaW5lcy5sZW5ndGg7XG4gICAgICBuZXdMaW5lICs9IGxpbmVzLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG9sZEZpbGVOYW1lOiBvbGRGaWxlTmFtZSwgbmV3RmlsZU5hbWU6IG5ld0ZpbGVOYW1lLFxuICAgIG9sZEhlYWRlcjogb2xkSGVhZGVyLCBuZXdIZWFkZXI6IG5ld0hlYWRlcixcbiAgICBodW5rczogaHVua3NcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVR3b0ZpbGVzUGF0Y2gob2xkRmlsZU5hbWUsIG5ld0ZpbGVOYW1lLCBvbGRTdHIsIG5ld1N0ciwgb2xkSGVhZGVyLCBuZXdIZWFkZXIsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGlmZiA9IHN0cnVjdHVyZWRQYXRjaChvbGRGaWxlTmFtZSwgbmV3RmlsZU5hbWUsIG9sZFN0ciwgbmV3U3RyLCBvbGRIZWFkZXIsIG5ld0hlYWRlciwgb3B0aW9ucyk7XG5cbiAgY29uc3QgcmV0ID0gW107XG4gIGlmIChvbGRGaWxlTmFtZSA9PSBuZXdGaWxlTmFtZSkge1xuICAgIHJldC5wdXNoKCdJbmRleDogJyArIG9sZEZpbGVOYW1lKTtcbiAgfVxuICByZXQucHVzaCgnPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuICByZXQucHVzaCgnLS0tICcgKyBkaWZmLm9sZEZpbGVOYW1lICsgKHR5cGVvZiBkaWZmLm9sZEhlYWRlciA9PT0gJ3VuZGVmaW5lZCcgPyAnJyA6ICdcXHQnICsgZGlmZi5vbGRIZWFkZXIpKTtcbiAgcmV0LnB1c2goJysrKyAnICsgZGlmZi5uZXdGaWxlTmFtZSArICh0eXBlb2YgZGlmZi5uZXdIZWFkZXIgPT09ICd1bmRlZmluZWQnID8gJycgOiAnXFx0JyArIGRpZmYubmV3SGVhZGVyKSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWZmLmh1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgaHVuayA9IGRpZmYuaHVua3NbaV07XG4gICAgcmV0LnB1c2goXG4gICAgICAnQEAgLScgKyBodW5rLm9sZFN0YXJ0ICsgJywnICsgaHVuay5vbGRMaW5lc1xuICAgICAgKyAnICsnICsgaHVuay5uZXdTdGFydCArICcsJyArIGh1bmsubmV3TGluZXNcbiAgICAgICsgJyBAQCdcbiAgICApO1xuICAgIHJldC5wdXNoLmFwcGx5KHJldCwgaHVuay5saW5lcyk7XG4gIH1cblxuICByZXR1cm4gcmV0LmpvaW4oJ1xcbicpICsgJ1xcbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXRjaChmaWxlTmFtZSwgb2xkU3RyLCBuZXdTdHIsIG9sZEhlYWRlciwgbmV3SGVhZGVyLCBvcHRpb25zKSB7XG4gIHJldHVybiBjcmVhdGVUd29GaWxlc1BhdGNoKGZpbGVOYW1lLCBmaWxlTmFtZSwgb2xkU3RyLCBuZXdTdHIsIG9sZEhlYWRlciwgbmV3SGVhZGVyLCBvcHRpb25zKTtcbn1cbiJdfQ==


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*istanbul ignore start*/

exports.__esModule = true;

exports["default"] = /*istanbul ignore end*/function (start, minLine, maxLine) {
  var wantForward = true,
      backwardExhausted = false,
      forwardExhausted = false,
      localOffset = 1;

  return function iterator() {
    if (wantForward && !forwardExhausted) {
      if (backwardExhausted) {
        localOffset++;
      } else {
        wantForward = false;
      }

      // Check if trying to fit beyond text length, and if not, check it fits
      // after offset location (or desired location on first iteration)
      if (start + localOffset <= maxLine) {
        return localOffset;
      }

      forwardExhausted = true;
    }

    if (!backwardExhausted) {
      if (!forwardExhausted) {
        wantForward = true;
      }

      // Check if trying to fit before text beginning, and if not, check it fits
      // before offset location
      if (minLine <= start - localOffset) {
        return -localOffset++;
      }

      backwardExhausted = true;
      return iterator();
    }

    // We tried to fit hunk before text beginning and beyond text lenght, then
    // hunk can't fit on the text. Return undefined
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2Rpc3RhbmNlLWl0ZXJhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7NENBR2UsVUFBUyxLQUFULEVBQWdCLE9BQWhCLEVBQXlCLE9BQXpCLEVBQWtDO0FBQy9DLE1BQUksY0FBYyxJQUFsQjtBQUFBLE1BQ0ksb0JBQW9CLEtBRHhCO0FBQUEsTUFFSSxtQkFBbUIsS0FGdkI7QUFBQSxNQUdJLGNBQWMsQ0FIbEI7O0FBS0EsU0FBTyxTQUFTLFFBQVQsR0FBb0I7QUFDekIsUUFBSSxlQUFlLENBQUMsZ0JBQXBCLEVBQXNDO0FBQ3BDLFVBQUksaUJBQUosRUFBdUI7QUFDckI7QUFDRCxPQUZELE1BRU87QUFDTCxzQkFBYyxLQUFkO0FBQ0Q7Ozs7QUFJRCxVQUFJLFFBQVEsV0FBUixJQUF1QixPQUEzQixFQUFvQztBQUNsQyxlQUFPLFdBQVA7QUFDRDs7QUFFRCx5QkFBbUIsSUFBbkI7QUFDRDs7QUFFRCxRQUFJLENBQUMsaUJBQUwsRUFBd0I7QUFDdEIsVUFBSSxDQUFDLGdCQUFMLEVBQXVCO0FBQ3JCLHNCQUFjLElBQWQ7QUFDRDs7OztBQUlELFVBQUksV0FBVyxRQUFRLFdBQXZCLEVBQW9DO0FBQ2xDLGVBQU8sQ0FBQyxhQUFSO0FBQ0Q7O0FBRUQsMEJBQW9CLElBQXBCO0FBQ0EsYUFBTyxVQUFQO0FBQ0Q7Ozs7QUFJRixHQWxDRDtBQW1DRCxDIiwiZmlsZSI6ImRpc3RhbmNlLWl0ZXJhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSXRlcmF0b3IgdGhhdCB0cmF2ZXJzZXMgaW4gdGhlIHJhbmdlIG9mIFttaW4sIG1heF0sIHN0ZXBwaW5nXG4vLyBieSBkaXN0YW5jZSBmcm9tIGEgZ2l2ZW4gc3RhcnQgcG9zaXRpb24uIEkuZS4gZm9yIFswLCA0XSwgd2l0aFxuLy8gc3RhcnQgb2YgMiwgdGhpcyB3aWxsIGl0ZXJhdGUgMiwgMywgMSwgNCwgMC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXJ0LCBtaW5MaW5lLCBtYXhMaW5lKSB7XG4gIGxldCB3YW50Rm9yd2FyZCA9IHRydWUsXG4gICAgICBiYWNrd2FyZEV4aGF1c3RlZCA9IGZhbHNlLFxuICAgICAgZm9yd2FyZEV4aGF1c3RlZCA9IGZhbHNlLFxuICAgICAgbG9jYWxPZmZzZXQgPSAxO1xuXG4gIHJldHVybiBmdW5jdGlvbiBpdGVyYXRvcigpIHtcbiAgICBpZiAod2FudEZvcndhcmQgJiYgIWZvcndhcmRFeGhhdXN0ZWQpIHtcbiAgICAgIGlmIChiYWNrd2FyZEV4aGF1c3RlZCkge1xuICAgICAgICBsb2NhbE9mZnNldCsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FudEZvcndhcmQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgaWYgdHJ5aW5nIHRvIGZpdCBiZXlvbmQgdGV4dCBsZW5ndGgsIGFuZCBpZiBub3QsIGNoZWNrIGl0IGZpdHNcbiAgICAgIC8vIGFmdGVyIG9mZnNldCBsb2NhdGlvbiAob3IgZGVzaXJlZCBsb2NhdGlvbiBvbiBmaXJzdCBpdGVyYXRpb24pXG4gICAgICBpZiAoc3RhcnQgKyBsb2NhbE9mZnNldCA8PSBtYXhMaW5lKSB7XG4gICAgICAgIHJldHVybiBsb2NhbE9mZnNldDtcbiAgICAgIH1cblxuICAgICAgZm9yd2FyZEV4aGF1c3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCFiYWNrd2FyZEV4aGF1c3RlZCkge1xuICAgICAgaWYgKCFmb3J3YXJkRXhoYXVzdGVkKSB7XG4gICAgICAgIHdhbnRGb3J3YXJkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgaWYgdHJ5aW5nIHRvIGZpdCBiZWZvcmUgdGV4dCBiZWdpbm5pbmcsIGFuZCBpZiBub3QsIGNoZWNrIGl0IGZpdHNcbiAgICAgIC8vIGJlZm9yZSBvZmZzZXQgbG9jYXRpb25cbiAgICAgIGlmIChtaW5MaW5lIDw9IHN0YXJ0IC0gbG9jYWxPZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIC1sb2NhbE9mZnNldCsrO1xuICAgICAgfVxuXG4gICAgICBiYWNrd2FyZEV4aGF1c3RlZCA9IHRydWU7XG4gICAgICByZXR1cm4gaXRlcmF0b3IoKTtcbiAgICB9XG5cbiAgICAvLyBXZSB0cmllZCB0byBmaXQgaHVuayBiZWZvcmUgdGV4dCBiZWdpbm5pbmcgYW5kIGJleW9uZCB0ZXh0IGxlbmdodCwgdGhlblxuICAgIC8vIGh1bmsgY2FuJ3QgZml0IG9uIHRoZSB0ZXh0LiBSZXR1cm4gdW5kZWZpbmVkXG4gIH07XG59XG4iXX0=


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Typographie", [], factory);
	else if(typeof exports === 'object')
		exports["Typographie"] = factory();
	else
		root["Typographie"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 76);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(35)('wks')
  , uid        = __webpack_require__(16)
  , Symbol     = __webpack_require__(1).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(14)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7)
  , createDesc = __webpack_require__(20);
module.exports = __webpack_require__(2) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(5)
  , IE8_DOM_DEFINE = __webpack_require__(30)
  , toPrimitive    = __webpack_require__(37)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , hide      = __webpack_require__(6)
  , has       = __webpack_require__(3)
  , SRC       = __webpack_require__(16)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(9).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(41);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , core      = __webpack_require__(9)
  , hide      = __webpack_require__(6)
  , redefine  = __webpack_require__(8)
  , ctx       = __webpack_require__(11)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(48)
  , defined = __webpack_require__(12);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(27)
  , TAG = __webpack_require__(0)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(11)
  , call        = __webpack_require__(50)
  , isArrayIter = __webpack_require__(49)
  , anObject    = __webpack_require__(5)
  , toLength    = __webpack_require__(36)
  , getIterFn   = __webpack_require__(65)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(53)
  , $export        = __webpack_require__(13)
  , redefine       = __webpack_require__(8)
  , hide           = __webpack_require__(6)
  , has            = __webpack_require__(3)
  , Iterators      = __webpack_require__(10)
  , $iterCreate    = __webpack_require__(51)
  , setToStringTag = __webpack_require__(21)
  , getPrototypeOf = __webpack_require__(56)
  , ITERATOR       = __webpack_require__(0)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f
  , has = __webpack_require__(3)
  , TAG = __webpack_require__(0)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(35)('keys')
  , uid    = __webpack_require__(16);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(0)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(6)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15)
  , toLength  = __webpack_require__(36)
  , toIndex   = __webpack_require__(63);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(1).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(14)(function(){
  return Object.defineProperty(__webpack_require__(28)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(16)('meta')
  , isObject = __webpack_require__(4)
  , has      = __webpack_require__(3)
  , setDesc  = __webpack_require__(7).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(14)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(5)
  , dPs         = __webpack_require__(54)
  , enumBugKeys = __webpack_require__(29)
  , IE_PROTO    = __webpack_require__(22)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(28)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(46).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(8);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(23)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *	Typographie.js, v1.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *	(c) 2014–2017 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *	https://github.com/asleepwalker/typographie
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _he = __webpack_require__(73);

var _he2 = _interopRequireDefault(_he);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Typographie = function () {
	function Typographie(actionlist) {
		var input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'plain';
		var output = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'plain';

		_classCallCheck(this, Typographie);

		this.actions(actionlist);
		this.mode(input, output);
		this._preserved = [];
	}

	_createClass(Typographie, [{
		key: 'actions',
		value: function actions(actionlist) {
			this._actions = actionlist;
		}
	}, {
		key: 'mode',
		value: function mode(input, output) {
			this._in = input;
			this._out = output;
		}
	}, {
		key: 'process',
		value: function process(raw) {
			var _prepare = this.prepare(raw),
			    text = _prepare.text,
			    preserved = _prepare.parts;

			if (this._actions.includes('specials')) {
				text = this.processSpecials(text);
			}
			if (this._actions.includes('mathchars')) {
				text = this.processMath(text);
			}
			if (this._actions.includes('mathchars') || this._actions.includes('dashes')) {
				text = this.processMinuses(text);
			}
			if (this._actions.includes('punctuation')) {
				text = this.processPunctuation(text);
			}
			if (this._actions.includes('specialspaces')) {
				text = this.processSpecialSpaces(text);
			}
			if (this._actions.includes('angles')) {
				text = this.processAngles(text);
			}
			if (this._actions.includes('dblspace')) {
				text = this.processMultipleSpaces(text);
			}
			if (this._actions.includes('quotes')) {
				text = this.processQoutes(text);

				if (this._actions.includes('inquot')) {
					text = this.processInnerQoutes(text);
				} else {
					text = this.processStackingQoutes(text);
				}
			}
			if (this._actions.includes('dashes')) {
				text = this.processDashes(text);
			}
			if (this._actions.includes('nbsp')) {
				text = this.processNbsps(text);
			}
			if (this._actions.includes('hellip')) {
				text = this.processHellips(text);
			}

			return this.ready(text, preserved);
		}
	}, {
		key: 'processSpecials',
		value: function processSpecials(text) {
			var table = new Map([[/(\([cс]\))|(\{copy\})/gi, '\xA9'], [/(\(r\))|(\{reg\})/gi, '\xAE'], [/(\((тм|tm)\))|(\{(tm|trade)\})/gi, '\u2122'], [/\{(ss|sect)}/g, '\xA7'], [/\{(\*|deg)}/g, '\xB0'], [/\{euro}/g, '\u20AC'], [/\{cent}/g, '\xA2'], [/\{pound}/g, '\xA3'], [/\{(yen|yuan)}/g, '\xA5'], [/\{alpha\}/gi, '\u03B1'], [/\{beta\}/gi, '\u03B2'], [/\{gamma\}/gi, '\u03B3'], [/\{delta\}/gi, '\u03B4'], [/\{epsilon\}/gi, '\u03B5'], [/\{theta\}/gi, '\u03B8'], [/\{lambda\}/gi, '\u03BB'], [/\{mu\}/gi, '\u03BC'], [/\{nu\}/gi, '\u03BD'], [/\{pi\}/gi, '\u03C0'], [/\{rho\}/gi, '\u03C1'], [/\{sigma\}/gi, '\u03C3'], [/\{tau\}/gi, '\u03C4'], [/\{phi\}/gi, '\u03C6'], [/\{psi\}/gi, '\u03A8'], [/\{omega\}/gi, '\u03C9']]);
			return this.performReplace(text, table);
		}
	}, {
		key: 'processMath',
		value: function processMath(text) {
			var table = new Map([[/\{!=}/g, '\u2260'], [/\{~}/g, '\u2248'], [/\{equal}/g, '\u2261'], [/\{<=}/g, '\u2A7D'], [/\{=>}/g, '\u2A7E'], [/\+-/g, '\xB1'], [/\{-}/g, '\u2013'], [/\{multiple}/g, '\xD7'], [/\{divide}/g, '\xF7'], [/<->/g, '\u2194'], [/<=>/g, '\u21D4'], [/<-/g, '\u2190'], [/<=/g, '\u21D0'], [/->/g, '\u2192'], [/=>/g, '\u21D2'], [/\{\^1}/g, '\xB9'], [/\{\^2}/g, '\xB2'], [/\{\^3}/g, '\xB3'], [/\{1\/8}/g, '\u215B'], [/\{1\/6}/g, '\u2159'], [/\{1\/5}/g, '\u2155'], [/\{1\/4}/g, '\xBC'], [/\{1\/3}/g, '\u2153'], [/\{1\/2}/g, '\xBD'], [/\{2\/5}/g, '\u2156'], [/\{2\/3}/g, '\u2154'], [/\{3\/8}/g, '\u215C'], [/\{3\/5}/g, '\u2157'], [/\{3\/4}/g, '\xBE'], [/\{4\/5}/g, '\u2158'], [/\{5\/6}/g, '\u215A'], [/\{5\/8}/g, '\u215D'], [/\{7\/8}/g, '\u215E'], [/\{part}/g, '\u2202'], [/\{any}/g, '\u2200'], [/\{exist}/g, '\u2203'], [/\{sum}/g, '\u03A3'], [/\{empty}/g, '\u2205'], [/\{infinity}/g, '\u221E'], [/\{belong}/g, '\u2208'], [/\{!belong}/g, '\u2209'], [/\{union}/g, '\u222A'], [/\{intersection}/g, '\u2229'], [/\{v}/g, '\u221A'], [/\{v3}/g, '\u221B'], [/\{v4}/g, '\u221C'], [/\{ang}/g, '\u2220']]);
			return this.performReplace(text, table);
		}
	}, {
		key: 'processMinuses',
		value: function processMinuses(text) {
			return text.replace(/([ ])-(?=[\d])/g, '$1\u2013').replace(/^-(?=[\d])/gm, '\u2013');
		}
	}, {
		key: 'processPunctuation',
		value: function processPunctuation(text) {
			var table = new Map();

			if (this._actions.includes('dashes')) {
				table.set(/[-]{2,5}/g, '\u2013');
			}

			table.set(/(^|\s)([-\u2013])(?=[^\s])/gm, '$1$2 ');
			table.set(/([^\s])([-\u2013])($|\s)/gm, '$1 $2$3');
			table.set(/([.,!?:)])(?=[^ \n"\'.,;!?&:\]\)<»{)])/g, '$1 ');
			table.set(/[ ]*(?=[.,;!?:])/g, '');

			if (this._actions.includes('nbsp')) {
				table.set(/ ([-\u2013])/g, '\xA0$1');
			}

			var _preserveParts = this.preserveParts(text, [/[\d]+([.,][\d]+)+/g, /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/gi, /((([a-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[a-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[a-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi, /[:;.][\'_-]{0,2}[.,edpobnsu*#@|()&\$308ехорвъэ]/gi]),
			    preservedText = _preserveParts.text,
			    parts = _preserveParts.parts;

			preservedText = this.performReplace(preservedText, table);
			return this.restoreParts(preservedText, parts);
		}
	}, {
		key: 'processSpecialSpaces',
		value: function processSpecialSpaces(text) {
			var table = new Map([[/([\u2116\u00a7])[\s]*(?=[\d])/g, '$1 '], [/([\d])[\s]*(?=\u00b0[CСF])/g, '$1 '], [/([\d])[\s]*(?=%)/g, '$1']]);
			return this.performReplace(text, table);
		}
	}, {
		key: 'processAngles',
		value: function processAngles(text) {
			var table = new Map([[/(\d)\*/g, '$1\xB0'], [/(\d)\'/g, '$1\u2032'], [/(^[^"]*\d)"([^"]*$)/g, '$1\u2033$2'], [/("[^"]*\d)"([^"]*?")/g, '$1\u2033$2']]);
			return this.performReplace(text, table);
		}
	}, {
		key: 'processMultipleSpaces',
		value: function processMultipleSpaces(text) {
			return text.replace(/[ ]{2,}/g, ' ');
		}
	}, {
		key: 'processQoutes',
		value: function processQoutes(text) {
			var table = new Map([[/(^|[\s>};\(\[-])"/g, '$1\xAB'], [/"([\s-\.!,:;\?\)\]\n\r]|$)/g, '\xBB$1'], [/([^\s{])"([^\s}])/g, '$1\xBB$2'], [/(\u00ab[^\s\u00ab]*)\u00bb(.*?\u00bb.*?\u00bb)/g, '$1\xAB$2']]);
			return this.performReplace(text, table);
		}
	}, {
		key: 'processInnerQoutes',
		value: function processInnerQoutes(text) {
			while (text.match(/(\u00ab[^\u00ab\u00bb]*)\u00ab/m)) {
				text = text.replace(/(\u00ab[^\u00ab\u00bb]*)\u00ab/gm, '$1\u201E');
				text = text.replace(/(\u201e[^\u201e\u201c\u00ab\u00bb]*)\u00bb/gm, '$1\u201C');
			}
			return text;
		}
	}, {
		key: 'processStackingQoutes',
		value: function processStackingQoutes(text) {
			return text.replace(/\u00ab{2,}/g, '\xAB').replace(/\u00bb{2,}/g, '\xBB');
		}
	}, {
		key: 'processDashes',
		value: function processDashes(text) {
			var table = new Map([[/(^|\n|["\u201e\u00ab])--?(\s)/gm, '$1\u2014$2'], [/([\d])-(?=[\d])/gm, '$1\u2013']]);

			if (this._actions.includes('nbsp')) {
				table.set(/(\s)--?($|\s)/g, '\xA0\u2014$2');
			} else {
				table.set(/(\s)--?($|\s)/g, ' \u2014$2');
			}

			return this.performReplace(text, table);
		}
	}, {
		key: 'processNbsps',
		value: function processNbsps(text) {
			return text.replace(/((^|[\s])[a-zа-яёіїєґ\'′]{1,2})[ ]/gi, '$1\xA0');
		}
	}, {
		key: 'processHellips',
		value: function processHellips(text) {
			return text.replace(/\.{2,5}/g, '\u2026');
		}
	}, {
		key: 'performReplace',
		value: function performReplace(text, table) {
			table.forEach(function (o, i) {
				return text = text.replace(i, o);
			});
			return text;
		}
	}, {
		key: 'preserveParts',
		value: function preserveParts(text, exceptions) {
			var parts = new Map();
			exceptions.map(function (pattern) {
				return text = text.replace(pattern, function (match) {
					var code = String(Math.random()).substr(2);
					parts.set(code, match);
					return '{' + code + '}';
				});
			});
			return { text: text, parts: parts };
		}
	}, {
		key: 'restoreParts',
		value: function restoreParts(text, parts) {
			parts.forEach(function (o, i) {
				return text = text.replace('{' + i + '}', o);
			});
			return text;
		}
	}, {
		key: 'prepare',
		value: function prepare(text) {
			if (this._in == 'html' && this._out == 'plain') {
				text = text.replace(/[\n]*<br[\s\/]*>[\n]*/gi, '\n');
				text = text.replace(/<p[^>]*>(.*?)<\/p>[\s]*/gi, '$1\n\n');
				text = text.replace(/<[^>]+>/gi, '');
			} else if (this._in == 'plain' && this._out == 'html') {
				text = text.replace('<', '&lt;');
				text = text.replace('>', '&gt;');

				if (this._actions.includes('paragraphs')) {
					text = text.replace(/^(.+?)$/gm, '<p>$1</p>');
					text = text.replace(/<\/p>\n<p>/gi, '<br>\n');
				} else {
					text = text.replace(/[\n]/gi, '<br>\n');
				}
			}

			var preservations = [];
			if (this._out == 'html') {
				if (this._in == 'html') {
					if (this._actions.includes('safehtml')) {
						preservations.push(/<(code|pre)(\s[^>]*)*>.*?<\/\1>/gi);
					}
					preservations.push(/<[^>]+>/gi);
				} else {
					preservations.push(/<[\/]{0,1}p>/gi);
				}
			}

			return this.preserveParts(text, preservations);
		}
	}, {
		key: 'ready',
		value: function ready(text, preserved) {
			if (this._in == 'html' && this._out == 'plain') {
				text = _he2.default.decode(text, {
					isAttributeValue: true
				});
			} else if (this._actions.includes('entities') && this._out == 'html') {
				text = _he2.default.encode(text, {
					useNamedReferences: true
				});
			}

			return this.restoreParts(text, preserved);
		}
	}]);

	return Typographie;
}();

exports.default = Typographie;
module.exports = exports['default'];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70);
module.exports = __webpack_require__(9).Array.includes;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
__webpack_require__(69);
__webpack_require__(72);
__webpack_require__(67);
__webpack_require__(71);
module.exports = __webpack_require__(9).Map;

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(18);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(7).f
  , create      = __webpack_require__(33)
  , redefineAll = __webpack_require__(34)
  , ctx         = __webpack_require__(11)
  , anInstance  = __webpack_require__(25)
  , defined     = __webpack_require__(12)
  , forOf       = __webpack_require__(18)
  , $iterDefine = __webpack_require__(19)
  , step        = __webpack_require__(31)
  , setSpecies  = __webpack_require__(61)
  , DESCRIPTORS = __webpack_require__(2)
  , fastKey     = __webpack_require__(32).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(17)
  , from    = __webpack_require__(42);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(1)
  , $export           = __webpack_require__(13)
  , redefine          = __webpack_require__(8)
  , redefineAll       = __webpack_require__(34)
  , meta              = __webpack_require__(32)
  , forOf             = __webpack_require__(18)
  , anInstance        = __webpack_require__(25)
  , isObject          = __webpack_require__(4)
  , fails             = __webpack_require__(14)
  , $iterDetect       = __webpack_require__(52)
  , setToStringTag    = __webpack_require__(21)
  , inheritIfRequired = __webpack_require__(47);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).document && document.documentElement;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(4)
  , setPrototypeOf = __webpack_require__(60).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(27);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(10)
  , ITERATOR   = __webpack_require__(0)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(33)
  , descriptor     = __webpack_require__(20)
  , setToStringTag = __webpack_require__(21)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(6)(IteratorPrototype, __webpack_require__(0)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(0)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(7)
  , anObject = __webpack_require__(5)
  , getKeys  = __webpack_require__(58);

module.exports = __webpack_require__(2) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(59)
  , createDesc     = __webpack_require__(20)
  , toIObject      = __webpack_require__(15)
  , toPrimitive    = __webpack_require__(37)
  , has            = __webpack_require__(3)
  , IE8_DOM_DEFINE = __webpack_require__(30)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(2) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(3)
  , toObject    = __webpack_require__(64)
  , IE_PROTO    = __webpack_require__(22)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(3)
  , toIObject    = __webpack_require__(15)
  , arrayIndexOf = __webpack_require__(26)(false)
  , IE_PROTO     = __webpack_require__(22)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(57)
  , enumBugKeys = __webpack_require__(29);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4)
  , anObject = __webpack_require__(5);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(11)(Function.call, __webpack_require__(55).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(1)
  , dP          = __webpack_require__(7)
  , DESCRIPTORS = __webpack_require__(2)
  , SPECIES     = __webpack_require__(0)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23)
  , defined   = __webpack_require__(12);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(12);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(17)
  , ITERATOR  = __webpack_require__(0)('iterator')
  , Iterators = __webpack_require__(10);
module.exports = __webpack_require__(9).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(24)
  , step             = __webpack_require__(31)
  , Iterators        = __webpack_require__(10)
  , toIObject        = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(19)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(43);

// 23.1 Map Objects
module.exports = __webpack_require__(45)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(17)
  , test    = {};
test[__webpack_require__(0)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(8)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(62)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(19)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(13)
  , $includes = __webpack_require__(26)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(24)('includes');

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(13);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(44)('Map')});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(66)
  , redefine      = __webpack_require__(8)
  , global        = __webpack_require__(1)
  , hide          = __webpack_require__(6)
  , Iterators     = __webpack_require__(10)
  , wks           = __webpack_require__(0)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/he v1.1.1 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`.
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	// All astral symbols.
	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	// All ASCII symbols (not just printable ASCII) except those listed in the
	// first column of the overrides table.
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
	var regexAsciiWhitelist = /[\x01-\x7F]/g;
	// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
	// code points listed in the first column of the overrides table on
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.
	var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

	var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
	var encodeMap = {'\xAD':'shy','\u200C':'zwnj','\u200D':'zwj','\u200E':'lrm','\u2063':'ic','\u2062':'it','\u2061':'af','\u200F':'rlm','\u200B':'ZeroWidthSpace','\u2060':'NoBreak','\u0311':'DownBreve','\u20DB':'tdot','\u20DC':'DotDot','\t':'Tab','\n':'NewLine','\u2008':'puncsp','\u205F':'MediumSpace','\u2009':'thinsp','\u200A':'hairsp','\u2004':'emsp13','\u2002':'ensp','\u2005':'emsp14','\u2003':'emsp','\u2007':'numsp','\xA0':'nbsp','\u205F\u200A':'ThickSpace','\u203E':'oline','_':'lowbar','\u2010':'dash','\u2013':'ndash','\u2014':'mdash','\u2015':'horbar',',':'comma',';':'semi','\u204F':'bsemi',':':'colon','\u2A74':'Colone','!':'excl','\xA1':'iexcl','?':'quest','\xBF':'iquest','.':'period','\u2025':'nldr','\u2026':'mldr','\xB7':'middot','\'':'apos','\u2018':'lsquo','\u2019':'rsquo','\u201A':'sbquo','\u2039':'lsaquo','\u203A':'rsaquo','"':'quot','\u201C':'ldquo','\u201D':'rdquo','\u201E':'bdquo','\xAB':'laquo','\xBB':'raquo','(':'lpar',')':'rpar','[':'lsqb',']':'rsqb','{':'lcub','}':'rcub','\u2308':'lceil','\u2309':'rceil','\u230A':'lfloor','\u230B':'rfloor','\u2985':'lopar','\u2986':'ropar','\u298B':'lbrke','\u298C':'rbrke','\u298D':'lbrkslu','\u298E':'rbrksld','\u298F':'lbrksld','\u2990':'rbrkslu','\u2991':'langd','\u2992':'rangd','\u2993':'lparlt','\u2994':'rpargt','\u2995':'gtlPar','\u2996':'ltrPar','\u27E6':'lobrk','\u27E7':'robrk','\u27E8':'lang','\u27E9':'rang','\u27EA':'Lang','\u27EB':'Rang','\u27EC':'loang','\u27ED':'roang','\u2772':'lbbrk','\u2773':'rbbrk','\u2016':'Vert','\xA7':'sect','\xB6':'para','@':'commat','*':'ast','/':'sol','undefined':null,'&':'amp','#':'num','%':'percnt','\u2030':'permil','\u2031':'pertenk','\u2020':'dagger','\u2021':'Dagger','\u2022':'bull','\u2043':'hybull','\u2032':'prime','\u2033':'Prime','\u2034':'tprime','\u2057':'qprime','\u2035':'bprime','\u2041':'caret','`':'grave','\xB4':'acute','\u02DC':'tilde','^':'Hat','\xAF':'macr','\u02D8':'breve','\u02D9':'dot','\xA8':'die','\u02DA':'ring','\u02DD':'dblac','\xB8':'cedil','\u02DB':'ogon','\u02C6':'circ','\u02C7':'caron','\xB0':'deg','\xA9':'copy','\xAE':'reg','\u2117':'copysr','\u2118':'wp','\u211E':'rx','\u2127':'mho','\u2129':'iiota','\u2190':'larr','\u219A':'nlarr','\u2192':'rarr','\u219B':'nrarr','\u2191':'uarr','\u2193':'darr','\u2194':'harr','\u21AE':'nharr','\u2195':'varr','\u2196':'nwarr','\u2197':'nearr','\u2198':'searr','\u2199':'swarr','\u219D':'rarrw','\u219D\u0338':'nrarrw','\u219E':'Larr','\u219F':'Uarr','\u21A0':'Rarr','\u21A1':'Darr','\u21A2':'larrtl','\u21A3':'rarrtl','\u21A4':'mapstoleft','\u21A5':'mapstoup','\u21A6':'map','\u21A7':'mapstodown','\u21A9':'larrhk','\u21AA':'rarrhk','\u21AB':'larrlp','\u21AC':'rarrlp','\u21AD':'harrw','\u21B0':'lsh','\u21B1':'rsh','\u21B2':'ldsh','\u21B3':'rdsh','\u21B5':'crarr','\u21B6':'cularr','\u21B7':'curarr','\u21BA':'olarr','\u21BB':'orarr','\u21BC':'lharu','\u21BD':'lhard','\u21BE':'uharr','\u21BF':'uharl','\u21C0':'rharu','\u21C1':'rhard','\u21C2':'dharr','\u21C3':'dharl','\u21C4':'rlarr','\u21C5':'udarr','\u21C6':'lrarr','\u21C7':'llarr','\u21C8':'uuarr','\u21C9':'rrarr','\u21CA':'ddarr','\u21CB':'lrhar','\u21CC':'rlhar','\u21D0':'lArr','\u21CD':'nlArr','\u21D1':'uArr','\u21D2':'rArr','\u21CF':'nrArr','\u21D3':'dArr','\u21D4':'iff','\u21CE':'nhArr','\u21D5':'vArr','\u21D6':'nwArr','\u21D7':'neArr','\u21D8':'seArr','\u21D9':'swArr','\u21DA':'lAarr','\u21DB':'rAarr','\u21DD':'zigrarr','\u21E4':'larrb','\u21E5':'rarrb','\u21F5':'duarr','\u21FD':'loarr','\u21FE':'roarr','\u21FF':'hoarr','\u2200':'forall','\u2201':'comp','\u2202':'part','\u2202\u0338':'npart','\u2203':'exist','\u2204':'nexist','\u2205':'empty','\u2207':'Del','\u2208':'in','\u2209':'notin','\u220B':'ni','\u220C':'notni','\u03F6':'bepsi','\u220F':'prod','\u2210':'coprod','\u2211':'sum','+':'plus','\xB1':'pm','\xF7':'div','\xD7':'times','<':'lt','\u226E':'nlt','<\u20D2':'nvlt','=':'equals','\u2260':'ne','=\u20E5':'bne','\u2A75':'Equal','>':'gt','\u226F':'ngt','>\u20D2':'nvgt','\xAC':'not','|':'vert','\xA6':'brvbar','\u2212':'minus','\u2213':'mp','\u2214':'plusdo','\u2044':'frasl','\u2216':'setmn','\u2217':'lowast','\u2218':'compfn','\u221A':'Sqrt','\u221D':'prop','\u221E':'infin','\u221F':'angrt','\u2220':'ang','\u2220\u20D2':'nang','\u2221':'angmsd','\u2222':'angsph','\u2223':'mid','\u2224':'nmid','\u2225':'par','\u2226':'npar','\u2227':'and','\u2228':'or','\u2229':'cap','\u2229\uFE00':'caps','\u222A':'cup','\u222A\uFE00':'cups','\u222B':'int','\u222C':'Int','\u222D':'tint','\u2A0C':'qint','\u222E':'oint','\u222F':'Conint','\u2230':'Cconint','\u2231':'cwint','\u2232':'cwconint','\u2233':'awconint','\u2234':'there4','\u2235':'becaus','\u2236':'ratio','\u2237':'Colon','\u2238':'minusd','\u223A':'mDDot','\u223B':'homtht','\u223C':'sim','\u2241':'nsim','\u223C\u20D2':'nvsim','\u223D':'bsim','\u223D\u0331':'race','\u223E':'ac','\u223E\u0333':'acE','\u223F':'acd','\u2240':'wr','\u2242':'esim','\u2242\u0338':'nesim','\u2243':'sime','\u2244':'nsime','\u2245':'cong','\u2247':'ncong','\u2246':'simne','\u2248':'ap','\u2249':'nap','\u224A':'ape','\u224B':'apid','\u224B\u0338':'napid','\u224C':'bcong','\u224D':'CupCap','\u226D':'NotCupCap','\u224D\u20D2':'nvap','\u224E':'bump','\u224E\u0338':'nbump','\u224F':'bumpe','\u224F\u0338':'nbumpe','\u2250':'doteq','\u2250\u0338':'nedot','\u2251':'eDot','\u2252':'efDot','\u2253':'erDot','\u2254':'colone','\u2255':'ecolon','\u2256':'ecir','\u2257':'cire','\u2259':'wedgeq','\u225A':'veeeq','\u225C':'trie','\u225F':'equest','\u2261':'equiv','\u2262':'nequiv','\u2261\u20E5':'bnequiv','\u2264':'le','\u2270':'nle','\u2264\u20D2':'nvle','\u2265':'ge','\u2271':'nge','\u2265\u20D2':'nvge','\u2266':'lE','\u2266\u0338':'nlE','\u2267':'gE','\u2267\u0338':'ngE','\u2268\uFE00':'lvnE','\u2268':'lnE','\u2269':'gnE','\u2269\uFE00':'gvnE','\u226A':'ll','\u226A\u0338':'nLtv','\u226A\u20D2':'nLt','\u226B':'gg','\u226B\u0338':'nGtv','\u226B\u20D2':'nGt','\u226C':'twixt','\u2272':'lsim','\u2274':'nlsim','\u2273':'gsim','\u2275':'ngsim','\u2276':'lg','\u2278':'ntlg','\u2277':'gl','\u2279':'ntgl','\u227A':'pr','\u2280':'npr','\u227B':'sc','\u2281':'nsc','\u227C':'prcue','\u22E0':'nprcue','\u227D':'sccue','\u22E1':'nsccue','\u227E':'prsim','\u227F':'scsim','\u227F\u0338':'NotSucceedsTilde','\u2282':'sub','\u2284':'nsub','\u2282\u20D2':'vnsub','\u2283':'sup','\u2285':'nsup','\u2283\u20D2':'vnsup','\u2286':'sube','\u2288':'nsube','\u2287':'supe','\u2289':'nsupe','\u228A\uFE00':'vsubne','\u228A':'subne','\u228B\uFE00':'vsupne','\u228B':'supne','\u228D':'cupdot','\u228E':'uplus','\u228F':'sqsub','\u228F\u0338':'NotSquareSubset','\u2290':'sqsup','\u2290\u0338':'NotSquareSuperset','\u2291':'sqsube','\u22E2':'nsqsube','\u2292':'sqsupe','\u22E3':'nsqsupe','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u2295':'oplus','\u2296':'ominus','\u2297':'otimes','\u2298':'osol','\u2299':'odot','\u229A':'ocir','\u229B':'oast','\u229D':'odash','\u229E':'plusb','\u229F':'minusb','\u22A0':'timesb','\u22A1':'sdotb','\u22A2':'vdash','\u22AC':'nvdash','\u22A3':'dashv','\u22A4':'top','\u22A5':'bot','\u22A7':'models','\u22A8':'vDash','\u22AD':'nvDash','\u22A9':'Vdash','\u22AE':'nVdash','\u22AA':'Vvdash','\u22AB':'VDash','\u22AF':'nVDash','\u22B0':'prurel','\u22B2':'vltri','\u22EA':'nltri','\u22B3':'vrtri','\u22EB':'nrtri','\u22B4':'ltrie','\u22EC':'nltrie','\u22B4\u20D2':'nvltrie','\u22B5':'rtrie','\u22ED':'nrtrie','\u22B5\u20D2':'nvrtrie','\u22B6':'origof','\u22B7':'imof','\u22B8':'mumap','\u22B9':'hercon','\u22BA':'intcal','\u22BB':'veebar','\u22BD':'barvee','\u22BE':'angrtvb','\u22BF':'lrtri','\u22C0':'Wedge','\u22C1':'Vee','\u22C2':'xcap','\u22C3':'xcup','\u22C4':'diam','\u22C5':'sdot','\u22C6':'Star','\u22C7':'divonx','\u22C8':'bowtie','\u22C9':'ltimes','\u22CA':'rtimes','\u22CB':'lthree','\u22CC':'rthree','\u22CD':'bsime','\u22CE':'cuvee','\u22CF':'cuwed','\u22D0':'Sub','\u22D1':'Sup','\u22D2':'Cap','\u22D3':'Cup','\u22D4':'fork','\u22D5':'epar','\u22D6':'ltdot','\u22D7':'gtdot','\u22D8':'Ll','\u22D8\u0338':'nLl','\u22D9':'Gg','\u22D9\u0338':'nGg','\u22DA\uFE00':'lesg','\u22DA':'leg','\u22DB':'gel','\u22DB\uFE00':'gesl','\u22DE':'cuepr','\u22DF':'cuesc','\u22E6':'lnsim','\u22E7':'gnsim','\u22E8':'prnsim','\u22E9':'scnsim','\u22EE':'vellip','\u22EF':'ctdot','\u22F0':'utdot','\u22F1':'dtdot','\u22F2':'disin','\u22F3':'isinsv','\u22F4':'isins','\u22F5':'isindot','\u22F5\u0338':'notindot','\u22F6':'notinvc','\u22F7':'notinvb','\u22F9':'isinE','\u22F9\u0338':'notinE','\u22FA':'nisd','\u22FB':'xnis','\u22FC':'nis','\u22FD':'notnivc','\u22FE':'notnivb','\u2305':'barwed','\u2306':'Barwed','\u230C':'drcrop','\u230D':'dlcrop','\u230E':'urcrop','\u230F':'ulcrop','\u2310':'bnot','\u2312':'profline','\u2313':'profsurf','\u2315':'telrec','\u2316':'target','\u231C':'ulcorn','\u231D':'urcorn','\u231E':'dlcorn','\u231F':'drcorn','\u2322':'frown','\u2323':'smile','\u232D':'cylcty','\u232E':'profalar','\u2336':'topbot','\u233D':'ovbar','\u233F':'solbar','\u237C':'angzarr','\u23B0':'lmoust','\u23B1':'rmoust','\u23B4':'tbrk','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u23DC':'OverParenthesis','\u23DD':'UnderParenthesis','\u23DE':'OverBrace','\u23DF':'UnderBrace','\u23E2':'trpezium','\u23E7':'elinters','\u2423':'blank','\u2500':'boxh','\u2502':'boxv','\u250C':'boxdr','\u2510':'boxdl','\u2514':'boxur','\u2518':'boxul','\u251C':'boxvr','\u2524':'boxvl','\u252C':'boxhd','\u2534':'boxhu','\u253C':'boxvh','\u2550':'boxH','\u2551':'boxV','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2580':'uhblk','\u2584':'lhblk','\u2588':'block','\u2591':'blk14','\u2592':'blk12','\u2593':'blk34','\u25A1':'squ','\u25AA':'squf','\u25AB':'EmptyVerySmallSquare','\u25AD':'rect','\u25AE':'marker','\u25B1':'fltns','\u25B3':'xutri','\u25B4':'utrif','\u25B5':'utri','\u25B8':'rtrif','\u25B9':'rtri','\u25BD':'xdtri','\u25BE':'dtrif','\u25BF':'dtri','\u25C2':'ltrif','\u25C3':'ltri','\u25CA':'loz','\u25CB':'cir','\u25EC':'tridot','\u25EF':'xcirc','\u25F8':'ultri','\u25F9':'urtri','\u25FA':'lltri','\u25FB':'EmptySmallSquare','\u25FC':'FilledSmallSquare','\u2605':'starf','\u2606':'star','\u260E':'phone','\u2640':'female','\u2642':'male','\u2660':'spades','\u2663':'clubs','\u2665':'hearts','\u2666':'diams','\u266A':'sung','\u2713':'check','\u2717':'cross','\u2720':'malt','\u2736':'sext','\u2758':'VerticalSeparator','\u27C8':'bsolhsub','\u27C9':'suphsol','\u27F5':'xlarr','\u27F6':'xrarr','\u27F7':'xharr','\u27F8':'xlArr','\u27F9':'xrArr','\u27FA':'xhArr','\u27FC':'xmap','\u27FF':'dzigrarr','\u2902':'nvlArr','\u2903':'nvrArr','\u2904':'nvHarr','\u2905':'Map','\u290C':'lbarr','\u290D':'rbarr','\u290E':'lBarr','\u290F':'rBarr','\u2910':'RBarr','\u2911':'DDotrahd','\u2912':'UpArrowBar','\u2913':'DownArrowBar','\u2916':'Rarrtl','\u2919':'latail','\u291A':'ratail','\u291B':'lAtail','\u291C':'rAtail','\u291D':'larrfs','\u291E':'rarrfs','\u291F':'larrbfs','\u2920':'rarrbfs','\u2923':'nwarhk','\u2924':'nearhk','\u2925':'searhk','\u2926':'swarhk','\u2927':'nwnear','\u2928':'toea','\u2929':'tosa','\u292A':'swnwar','\u2933':'rarrc','\u2933\u0338':'nrarrc','\u2935':'cudarrr','\u2936':'ldca','\u2937':'rdca','\u2938':'cudarrl','\u2939':'larrpl','\u293C':'curarrm','\u293D':'cularrp','\u2945':'rarrpl','\u2948':'harrcir','\u2949':'Uarrocir','\u294A':'lurdshar','\u294B':'ldrushar','\u294E':'LeftRightVector','\u294F':'RightUpDownVector','\u2950':'DownLeftRightVector','\u2951':'LeftUpDownVector','\u2952':'LeftVectorBar','\u2953':'RightVectorBar','\u2954':'RightUpVectorBar','\u2955':'RightDownVectorBar','\u2956':'DownLeftVectorBar','\u2957':'DownRightVectorBar','\u2958':'LeftUpVectorBar','\u2959':'LeftDownVectorBar','\u295A':'LeftTeeVector','\u295B':'RightTeeVector','\u295C':'RightUpTeeVector','\u295D':'RightDownTeeVector','\u295E':'DownLeftTeeVector','\u295F':'DownRightTeeVector','\u2960':'LeftUpTeeVector','\u2961':'LeftDownTeeVector','\u2962':'lHar','\u2963':'uHar','\u2964':'rHar','\u2965':'dHar','\u2966':'luruhar','\u2967':'ldrdhar','\u2968':'ruluhar','\u2969':'rdldhar','\u296A':'lharul','\u296B':'llhard','\u296C':'rharul','\u296D':'lrhard','\u296E':'udhar','\u296F':'duhar','\u2970':'RoundImplies','\u2971':'erarr','\u2972':'simrarr','\u2973':'larrsim','\u2974':'rarrsim','\u2975':'rarrap','\u2976':'ltlarr','\u2978':'gtrarr','\u2979':'subrarr','\u297B':'suplarr','\u297C':'lfisht','\u297D':'rfisht','\u297E':'ufisht','\u297F':'dfisht','\u299A':'vzigzag','\u299C':'vangrt','\u299D':'angrtvbd','\u29A4':'ange','\u29A5':'range','\u29A6':'dwangle','\u29A7':'uwangle','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u29B0':'bemptyv','\u29B1':'demptyv','\u29B2':'cemptyv','\u29B3':'raemptyv','\u29B4':'laemptyv','\u29B5':'ohbar','\u29B6':'omid','\u29B7':'opar','\u29B9':'operp','\u29BB':'olcross','\u29BC':'odsold','\u29BE':'olcir','\u29BF':'ofcir','\u29C0':'olt','\u29C1':'ogt','\u29C2':'cirscir','\u29C3':'cirE','\u29C4':'solb','\u29C5':'bsolb','\u29C9':'boxbox','\u29CD':'trisb','\u29CE':'rtriltri','\u29CF':'LeftTriangleBar','\u29CF\u0338':'NotLeftTriangleBar','\u29D0':'RightTriangleBar','\u29D0\u0338':'NotRightTriangleBar','\u29DC':'iinfin','\u29DD':'infintie','\u29DE':'nvinfin','\u29E3':'eparsl','\u29E4':'smeparsl','\u29E5':'eqvparsl','\u29EB':'lozf','\u29F4':'RuleDelayed','\u29F6':'dsol','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A04':'xuplus','\u2A06':'xsqcup','\u2A0D':'fpartint','\u2A10':'cirfnint','\u2A11':'awint','\u2A12':'rppolint','\u2A13':'scpolint','\u2A14':'npolint','\u2A15':'pointint','\u2A16':'quatint','\u2A17':'intlarhk','\u2A22':'pluscir','\u2A23':'plusacir','\u2A24':'simplus','\u2A25':'plusdu','\u2A26':'plussim','\u2A27':'plustwo','\u2A29':'mcomma','\u2A2A':'minusdu','\u2A2D':'loplus','\u2A2E':'roplus','\u2A2F':'Cross','\u2A30':'timesd','\u2A31':'timesbar','\u2A33':'smashp','\u2A34':'lotimes','\u2A35':'rotimes','\u2A36':'otimesas','\u2A37':'Otimes','\u2A38':'odiv','\u2A39':'triplus','\u2A3A':'triminus','\u2A3B':'tritime','\u2A3C':'iprod','\u2A3F':'amalg','\u2A40':'capdot','\u2A42':'ncup','\u2A43':'ncap','\u2A44':'capand','\u2A45':'cupor','\u2A46':'cupcap','\u2A47':'capcup','\u2A48':'cupbrcap','\u2A49':'capbrcup','\u2A4A':'cupcup','\u2A4B':'capcap','\u2A4C':'ccups','\u2A4D':'ccaps','\u2A50':'ccupssm','\u2A53':'And','\u2A54':'Or','\u2A55':'andand','\u2A56':'oror','\u2A57':'orslope','\u2A58':'andslope','\u2A5A':'andv','\u2A5B':'orv','\u2A5C':'andd','\u2A5D':'ord','\u2A5F':'wedbar','\u2A66':'sdote','\u2A6A':'simdot','\u2A6D':'congdot','\u2A6D\u0338':'ncongdot','\u2A6E':'easter','\u2A6F':'apacir','\u2A70':'apE','\u2A70\u0338':'napE','\u2A71':'eplus','\u2A72':'pluse','\u2A73':'Esim','\u2A77':'eDDot','\u2A78':'equivDD','\u2A79':'ltcir','\u2A7A':'gtcir','\u2A7B':'ltquest','\u2A7C':'gtquest','\u2A7D':'les','\u2A7D\u0338':'nles','\u2A7E':'ges','\u2A7E\u0338':'nges','\u2A7F':'lesdot','\u2A80':'gesdot','\u2A81':'lesdoto','\u2A82':'gesdoto','\u2A83':'lesdotor','\u2A84':'gesdotol','\u2A85':'lap','\u2A86':'gap','\u2A87':'lne','\u2A88':'gne','\u2A89':'lnap','\u2A8A':'gnap','\u2A8B':'lEg','\u2A8C':'gEl','\u2A8D':'lsime','\u2A8E':'gsime','\u2A8F':'lsimg','\u2A90':'gsiml','\u2A91':'lgE','\u2A92':'glE','\u2A93':'lesges','\u2A94':'gesles','\u2A95':'els','\u2A96':'egs','\u2A97':'elsdot','\u2A98':'egsdot','\u2A99':'el','\u2A9A':'eg','\u2A9D':'siml','\u2A9E':'simg','\u2A9F':'simlE','\u2AA0':'simgE','\u2AA1':'LessLess','\u2AA1\u0338':'NotNestedLessLess','\u2AA2':'GreaterGreater','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA4':'glj','\u2AA5':'gla','\u2AA6':'ltcc','\u2AA7':'gtcc','\u2AA8':'lescc','\u2AA9':'gescc','\u2AAA':'smt','\u2AAB':'lat','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u2AAD':'late','\u2AAD\uFE00':'lates','\u2AAE':'bumpE','\u2AAF':'pre','\u2AAF\u0338':'npre','\u2AB0':'sce','\u2AB0\u0338':'nsce','\u2AB3':'prE','\u2AB4':'scE','\u2AB5':'prnE','\u2AB6':'scnE','\u2AB7':'prap','\u2AB8':'scap','\u2AB9':'prnap','\u2ABA':'scnap','\u2ABB':'Pr','\u2ABC':'Sc','\u2ABD':'subdot','\u2ABE':'supdot','\u2ABF':'subplus','\u2AC0':'supplus','\u2AC1':'submult','\u2AC2':'supmult','\u2AC3':'subedot','\u2AC4':'supedot','\u2AC5':'subE','\u2AC5\u0338':'nsubE','\u2AC6':'supE','\u2AC6\u0338':'nsupE','\u2AC7':'subsim','\u2AC8':'supsim','\u2ACB\uFE00':'vsubnE','\u2ACB':'subnE','\u2ACC\uFE00':'vsupnE','\u2ACC':'supnE','\u2ACF':'csub','\u2AD0':'csup','\u2AD1':'csube','\u2AD2':'csupe','\u2AD3':'subsup','\u2AD4':'supsub','\u2AD5':'subsub','\u2AD6':'supsup','\u2AD7':'suphsub','\u2AD8':'supdsub','\u2AD9':'forkv','\u2ADA':'topfork','\u2ADB':'mlcp','\u2AE4':'Dashv','\u2AE6':'Vdashl','\u2AE7':'Barv','\u2AE8':'vBar','\u2AE9':'vBarv','\u2AEB':'Vbar','\u2AEC':'Not','\u2AED':'bNot','\u2AEE':'rnmid','\u2AEF':'cirmid','\u2AF0':'midcir','\u2AF1':'topcir','\u2AF2':'nhpar','\u2AF3':'parsim','\u2AFD':'parsl','\u2AFD\u20E5':'nparsl','\u266D':'flat','\u266E':'natur','\u266F':'sharp','\xA4':'curren','\xA2':'cent','$':'dollar','\xA3':'pound','\xA5':'yen','\u20AC':'euro','\xB9':'sup1','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\xB2':'sup2','\u2154':'frac23','\u2156':'frac25','\xB3':'sup3','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\uD835\uDCB6':'ascr','\uD835\uDD52':'aopf','\uD835\uDD1E':'afr','\uD835\uDD38':'Aopf','\uD835\uDD04':'Afr','\uD835\uDC9C':'Ascr','\xAA':'ordf','\xE1':'aacute','\xC1':'Aacute','\xE0':'agrave','\xC0':'Agrave','\u0103':'abreve','\u0102':'Abreve','\xE2':'acirc','\xC2':'Acirc','\xE5':'aring','\xC5':'angst','\xE4':'auml','\xC4':'Auml','\xE3':'atilde','\xC3':'Atilde','\u0105':'aogon','\u0104':'Aogon','\u0101':'amacr','\u0100':'Amacr','\xE6':'aelig','\xC6':'AElig','\uD835\uDCB7':'bscr','\uD835\uDD53':'bopf','\uD835\uDD1F':'bfr','\uD835\uDD39':'Bopf','\u212C':'Bscr','\uD835\uDD05':'Bfr','\uD835\uDD20':'cfr','\uD835\uDCB8':'cscr','\uD835\uDD54':'copf','\u212D':'Cfr','\uD835\uDC9E':'Cscr','\u2102':'Copf','\u0107':'cacute','\u0106':'Cacute','\u0109':'ccirc','\u0108':'Ccirc','\u010D':'ccaron','\u010C':'Ccaron','\u010B':'cdot','\u010A':'Cdot','\xE7':'ccedil','\xC7':'Ccedil','\u2105':'incare','\uD835\uDD21':'dfr','\u2146':'dd','\uD835\uDD55':'dopf','\uD835\uDCB9':'dscr','\uD835\uDC9F':'Dscr','\uD835\uDD07':'Dfr','\u2145':'DD','\uD835\uDD3B':'Dopf','\u010F':'dcaron','\u010E':'Dcaron','\u0111':'dstrok','\u0110':'Dstrok','\xF0':'eth','\xD0':'ETH','\u2147':'ee','\u212F':'escr','\uD835\uDD22':'efr','\uD835\uDD56':'eopf','\u2130':'Escr','\uD835\uDD08':'Efr','\uD835\uDD3C':'Eopf','\xE9':'eacute','\xC9':'Eacute','\xE8':'egrave','\xC8':'Egrave','\xEA':'ecirc','\xCA':'Ecirc','\u011B':'ecaron','\u011A':'Ecaron','\xEB':'euml','\xCB':'Euml','\u0117':'edot','\u0116':'Edot','\u0119':'eogon','\u0118':'Eogon','\u0113':'emacr','\u0112':'Emacr','\uD835\uDD23':'ffr','\uD835\uDD57':'fopf','\uD835\uDCBB':'fscr','\uD835\uDD09':'Ffr','\uD835\uDD3D':'Fopf','\u2131':'Fscr','\uFB00':'fflig','\uFB03':'ffilig','\uFB04':'ffllig','\uFB01':'filig','fj':'fjlig','\uFB02':'fllig','\u0192':'fnof','\u210A':'gscr','\uD835\uDD58':'gopf','\uD835\uDD24':'gfr','\uD835\uDCA2':'Gscr','\uD835\uDD3E':'Gopf','\uD835\uDD0A':'Gfr','\u01F5':'gacute','\u011F':'gbreve','\u011E':'Gbreve','\u011D':'gcirc','\u011C':'Gcirc','\u0121':'gdot','\u0120':'Gdot','\u0122':'Gcedil','\uD835\uDD25':'hfr','\u210E':'planckh','\uD835\uDCBD':'hscr','\uD835\uDD59':'hopf','\u210B':'Hscr','\u210C':'Hfr','\u210D':'Hopf','\u0125':'hcirc','\u0124':'Hcirc','\u210F':'hbar','\u0127':'hstrok','\u0126':'Hstrok','\uD835\uDD5A':'iopf','\uD835\uDD26':'ifr','\uD835\uDCBE':'iscr','\u2148':'ii','\uD835\uDD40':'Iopf','\u2110':'Iscr','\u2111':'Im','\xED':'iacute','\xCD':'Iacute','\xEC':'igrave','\xCC':'Igrave','\xEE':'icirc','\xCE':'Icirc','\xEF':'iuml','\xCF':'Iuml','\u0129':'itilde','\u0128':'Itilde','\u0130':'Idot','\u012F':'iogon','\u012E':'Iogon','\u012B':'imacr','\u012A':'Imacr','\u0133':'ijlig','\u0132':'IJlig','\u0131':'imath','\uD835\uDCBF':'jscr','\uD835\uDD5B':'jopf','\uD835\uDD27':'jfr','\uD835\uDCA5':'Jscr','\uD835\uDD0D':'Jfr','\uD835\uDD41':'Jopf','\u0135':'jcirc','\u0134':'Jcirc','\u0237':'jmath','\uD835\uDD5C':'kopf','\uD835\uDCC0':'kscr','\uD835\uDD28':'kfr','\uD835\uDCA6':'Kscr','\uD835\uDD42':'Kopf','\uD835\uDD0E':'Kfr','\u0137':'kcedil','\u0136':'Kcedil','\uD835\uDD29':'lfr','\uD835\uDCC1':'lscr','\u2113':'ell','\uD835\uDD5D':'lopf','\u2112':'Lscr','\uD835\uDD0F':'Lfr','\uD835\uDD43':'Lopf','\u013A':'lacute','\u0139':'Lacute','\u013E':'lcaron','\u013D':'Lcaron','\u013C':'lcedil','\u013B':'Lcedil','\u0142':'lstrok','\u0141':'Lstrok','\u0140':'lmidot','\u013F':'Lmidot','\uD835\uDD2A':'mfr','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\uD835\uDD10':'Mfr','\uD835\uDD44':'Mopf','\u2133':'Mscr','\uD835\uDD2B':'nfr','\uD835\uDD5F':'nopf','\uD835\uDCC3':'nscr','\u2115':'Nopf','\uD835\uDCA9':'Nscr','\uD835\uDD11':'Nfr','\u0144':'nacute','\u0143':'Nacute','\u0148':'ncaron','\u0147':'Ncaron','\xF1':'ntilde','\xD1':'Ntilde','\u0146':'ncedil','\u0145':'Ncedil','\u2116':'numero','\u014B':'eng','\u014A':'ENG','\uD835\uDD60':'oopf','\uD835\uDD2C':'ofr','\u2134':'oscr','\uD835\uDCAA':'Oscr','\uD835\uDD12':'Ofr','\uD835\uDD46':'Oopf','\xBA':'ordm','\xF3':'oacute','\xD3':'Oacute','\xF2':'ograve','\xD2':'Ograve','\xF4':'ocirc','\xD4':'Ocirc','\xF6':'ouml','\xD6':'Ouml','\u0151':'odblac','\u0150':'Odblac','\xF5':'otilde','\xD5':'Otilde','\xF8':'oslash','\xD8':'Oslash','\u014D':'omacr','\u014C':'Omacr','\u0153':'oelig','\u0152':'OElig','\uD835\uDD2D':'pfr','\uD835\uDCC5':'pscr','\uD835\uDD61':'popf','\u2119':'Popf','\uD835\uDD13':'Pfr','\uD835\uDCAB':'Pscr','\uD835\uDD62':'qopf','\uD835\uDD2E':'qfr','\uD835\uDCC6':'qscr','\uD835\uDCAC':'Qscr','\uD835\uDD14':'Qfr','\u211A':'Qopf','\u0138':'kgreen','\uD835\uDD2F':'rfr','\uD835\uDD63':'ropf','\uD835\uDCC7':'rscr','\u211B':'Rscr','\u211C':'Re','\u211D':'Ropf','\u0155':'racute','\u0154':'Racute','\u0159':'rcaron','\u0158':'Rcaron','\u0157':'rcedil','\u0156':'Rcedil','\uD835\uDD64':'sopf','\uD835\uDCC8':'sscr','\uD835\uDD30':'sfr','\uD835\uDD4A':'Sopf','\uD835\uDD16':'Sfr','\uD835\uDCAE':'Sscr','\u24C8':'oS','\u015B':'sacute','\u015A':'Sacute','\u015D':'scirc','\u015C':'Scirc','\u0161':'scaron','\u0160':'Scaron','\u015F':'scedil','\u015E':'Scedil','\xDF':'szlig','\uD835\uDD31':'tfr','\uD835\uDCC9':'tscr','\uD835\uDD65':'topf','\uD835\uDCAF':'Tscr','\uD835\uDD17':'Tfr','\uD835\uDD4B':'Topf','\u0165':'tcaron','\u0164':'Tcaron','\u0163':'tcedil','\u0162':'Tcedil','\u2122':'trade','\u0167':'tstrok','\u0166':'Tstrok','\uD835\uDCCA':'uscr','\uD835\uDD66':'uopf','\uD835\uDD32':'ufr','\uD835\uDD4C':'Uopf','\uD835\uDD18':'Ufr','\uD835\uDCB0':'Uscr','\xFA':'uacute','\xDA':'Uacute','\xF9':'ugrave','\xD9':'Ugrave','\u016D':'ubreve','\u016C':'Ubreve','\xFB':'ucirc','\xDB':'Ucirc','\u016F':'uring','\u016E':'Uring','\xFC':'uuml','\xDC':'Uuml','\u0171':'udblac','\u0170':'Udblac','\u0169':'utilde','\u0168':'Utilde','\u0173':'uogon','\u0172':'Uogon','\u016B':'umacr','\u016A':'Umacr','\uD835\uDD33':'vfr','\uD835\uDD67':'vopf','\uD835\uDCCB':'vscr','\uD835\uDD19':'Vfr','\uD835\uDD4D':'Vopf','\uD835\uDCB1':'Vscr','\uD835\uDD68':'wopf','\uD835\uDCCC':'wscr','\uD835\uDD34':'wfr','\uD835\uDCB2':'Wscr','\uD835\uDD4E':'Wopf','\uD835\uDD1A':'Wfr','\u0175':'wcirc','\u0174':'Wcirc','\uD835\uDD35':'xfr','\uD835\uDCCD':'xscr','\uD835\uDD69':'xopf','\uD835\uDD4F':'Xopf','\uD835\uDD1B':'Xfr','\uD835\uDCB3':'Xscr','\uD835\uDD36':'yfr','\uD835\uDCCE':'yscr','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDD1C':'Yfr','\uD835\uDD50':'Yopf','\xFD':'yacute','\xDD':'Yacute','\u0177':'ycirc','\u0176':'Ycirc','\xFF':'yuml','\u0178':'Yuml','\uD835\uDCCF':'zscr','\uD835\uDD37':'zfr','\uD835\uDD6B':'zopf','\u2128':'Zfr','\u2124':'Zopf','\uD835\uDCB5':'Zscr','\u017A':'zacute','\u0179':'Zacute','\u017E':'zcaron','\u017D':'Zcaron','\u017C':'zdot','\u017B':'Zdot','\u01B5':'imped','\xFE':'thorn','\xDE':'THORN','\u0149':'napos','\u03B1':'alpha','\u0391':'Alpha','\u03B2':'beta','\u0392':'Beta','\u03B3':'gamma','\u0393':'Gamma','\u03B4':'delta','\u0394':'Delta','\u03B5':'epsi','\u03F5':'epsiv','\u0395':'Epsilon','\u03DD':'gammad','\u03DC':'Gammad','\u03B6':'zeta','\u0396':'Zeta','\u03B7':'eta','\u0397':'Eta','\u03B8':'theta','\u03D1':'thetav','\u0398':'Theta','\u03B9':'iota','\u0399':'Iota','\u03BA':'kappa','\u03F0':'kappav','\u039A':'Kappa','\u03BB':'lambda','\u039B':'Lambda','\u03BC':'mu','\xB5':'micro','\u039C':'Mu','\u03BD':'nu','\u039D':'Nu','\u03BE':'xi','\u039E':'Xi','\u03BF':'omicron','\u039F':'Omicron','\u03C0':'pi','\u03D6':'piv','\u03A0':'Pi','\u03C1':'rho','\u03F1':'rhov','\u03A1':'Rho','\u03C3':'sigma','\u03A3':'Sigma','\u03C2':'sigmaf','\u03C4':'tau','\u03A4':'Tau','\u03C5':'upsi','\u03A5':'Upsilon','\u03D2':'Upsi','\u03C6':'phi','\u03D5':'phiv','\u03A6':'Phi','\u03C7':'chi','\u03A7':'Chi','\u03C8':'psi','\u03A8':'Psi','\u03C9':'omega','\u03A9':'ohm','\u0430':'acy','\u0410':'Acy','\u0431':'bcy','\u0411':'Bcy','\u0432':'vcy','\u0412':'Vcy','\u0433':'gcy','\u0413':'Gcy','\u0453':'gjcy','\u0403':'GJcy','\u0434':'dcy','\u0414':'Dcy','\u0452':'djcy','\u0402':'DJcy','\u0435':'iecy','\u0415':'IEcy','\u0451':'iocy','\u0401':'IOcy','\u0454':'jukcy','\u0404':'Jukcy','\u0436':'zhcy','\u0416':'ZHcy','\u0437':'zcy','\u0417':'Zcy','\u0455':'dscy','\u0405':'DScy','\u0438':'icy','\u0418':'Icy','\u0456':'iukcy','\u0406':'Iukcy','\u0457':'yicy','\u0407':'YIcy','\u0439':'jcy','\u0419':'Jcy','\u0458':'jsercy','\u0408':'Jsercy','\u043A':'kcy','\u041A':'Kcy','\u045C':'kjcy','\u040C':'KJcy','\u043B':'lcy','\u041B':'Lcy','\u0459':'ljcy','\u0409':'LJcy','\u043C':'mcy','\u041C':'Mcy','\u043D':'ncy','\u041D':'Ncy','\u045A':'njcy','\u040A':'NJcy','\u043E':'ocy','\u041E':'Ocy','\u043F':'pcy','\u041F':'Pcy','\u0440':'rcy','\u0420':'Rcy','\u0441':'scy','\u0421':'Scy','\u0442':'tcy','\u0422':'Tcy','\u045B':'tshcy','\u040B':'TSHcy','\u0443':'ucy','\u0423':'Ucy','\u045E':'ubrcy','\u040E':'Ubrcy','\u0444':'fcy','\u0424':'Fcy','\u0445':'khcy','\u0425':'KHcy','\u0446':'tscy','\u0426':'TScy','\u0447':'chcy','\u0427':'CHcy','\u045F':'dzcy','\u040F':'DZcy','\u0448':'shcy','\u0428':'SHcy','\u0449':'shchcy','\u0429':'SHCHcy','\u044A':'hardcy','\u042A':'HARDcy','\u044B':'ycy','\u042B':'Ycy','\u044C':'softcy','\u042C':'SOFTcy','\u044D':'ecy','\u042D':'Ecy','\u044E':'yucy','\u042E':'YUcy','\u044F':'yacy','\u042F':'YAcy','\u2135':'aleph','\u2136':'beth','\u2137':'gimel','\u2138':'daleth'};

	var regexEscape = /["&'<>`]/g;
	var escapeMap = {
		'"': '&quot;',
		'&': '&amp;',
		'\'': '&#x27;',
		'<': '&lt;',
		// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
		// following is not strictly necessary unless it’s part of a tag or an
		// unquoted attribute value. We’re only escaping it to support those
		// situations, and for XML support.
		'>': '&gt;',
		// In Internet Explorer ≤ 8, the backtick character can be used
		// to break out of (un)quoted attribute values or HTML comments.
		// See http://html5sec.org/#102, http://html5sec.org/#108, and
		// http://html5sec.org/#133.
		'`': '&#x60;'
	};

	var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
	var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var regexDecode = /&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)([=a-zA-Z0-9])?/g;
	var decodeMap = {'aacute':'\xE1','Aacute':'\xC1','abreve':'\u0103','Abreve':'\u0102','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','acy':'\u0430','Acy':'\u0410','aelig':'\xE6','AElig':'\xC6','af':'\u2061','afr':'\uD835\uDD1E','Afr':'\uD835\uDD04','agrave':'\xE0','Agrave':'\xC0','alefsym':'\u2135','aleph':'\u2135','alpha':'\u03B1','Alpha':'\u0391','amacr':'\u0101','Amacr':'\u0100','amalg':'\u2A3F','amp':'&','AMP':'&','and':'\u2227','And':'\u2A53','andand':'\u2A55','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsd':'\u2221','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','aogon':'\u0105','Aogon':'\u0104','aopf':'\uD835\uDD52','Aopf':'\uD835\uDD38','ap':'\u2248','apacir':'\u2A6F','ape':'\u224A','apE':'\u2A70','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','aring':'\xE5','Aring':'\xC5','ascr':'\uD835\uDCB6','Ascr':'\uD835\uDC9C','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','bcy':'\u0431','Bcy':'\u0411','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','beta':'\u03B2','Beta':'\u0392','beth':'\u2136','between':'\u226C','bfr':'\uD835\uDD1F','Bfr':'\uD835\uDD05','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bnot':'\u2310','bNot':'\u2AED','bopf':'\uD835\uDD53','Bopf':'\uD835\uDD39','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxhD':'\u2565','boxHd':'\u2564','boxHD':'\u2566','boxhu':'\u2534','boxhU':'\u2568','boxHu':'\u2567','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsol':'\\','bsolb':'\u29C5','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpe':'\u224F','bumpE':'\u2AAE','bumpeq':'\u224F','Bumpeq':'\u224E','cacute':'\u0107','Cacute':'\u0106','cap':'\u2229','Cap':'\u22D2','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','ccaron':'\u010D','Ccaron':'\u010C','ccedil':'\xE7','Ccedil':'\xC7','ccirc':'\u0109','Ccirc':'\u0108','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','cdot':'\u010B','Cdot':'\u010A','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','chcy':'\u0447','CHcy':'\u0427','check':'\u2713','checkmark':'\u2713','chi':'\u03C7','Chi':'\u03A7','cir':'\u25CB','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cire':'\u2257','cirE':'\u29C3','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','colone':'\u2254','Colone':'\u2A74','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','cscr':'\uD835\uDCB8','Cscr':'\uD835\uDC9E','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cup':'\u222A','Cup':'\u22D3','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','dArr':'\u21D3','Darr':'\u21A1','dash':'\u2010','dashv':'\u22A3','Dashv':'\u2AE4','dbkarow':'\u290F','dblac':'\u02DD','dcaron':'\u010F','Dcaron':'\u010E','dcy':'\u0434','Dcy':'\u0414','dd':'\u2146','DD':'\u2145','ddagger':'\u2021','ddarr':'\u21CA','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','delta':'\u03B4','Delta':'\u0394','demptyv':'\u29B1','dfisht':'\u297F','dfr':'\uD835\uDD21','Dfr':'\uD835\uDD07','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','djcy':'\u0452','DJcy':'\u0402','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','dopf':'\uD835\uDD55','Dopf':'\uD835\uDD3B','dot':'\u02D9','Dot':'\xA8','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','downarrow':'\u2193','Downarrow':'\u21D3','DownArrow':'\u2193','DownArrowBar':'\u2913','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVector':'\u21BD','DownLeftVectorBar':'\u2956','DownRightTeeVector':'\u295F','DownRightVector':'\u21C1','DownRightVectorBar':'\u2957','DownTee':'\u22A4','DownTeeArrow':'\u21A7','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','dscr':'\uD835\uDCB9','Dscr':'\uD835\uDC9F','dscy':'\u0455','DScy':'\u0405','dsol':'\u29F6','dstrok':'\u0111','Dstrok':'\u0110','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','dzcy':'\u045F','DZcy':'\u040F','dzigrarr':'\u27FF','eacute':'\xE9','Eacute':'\xC9','easter':'\u2A6E','ecaron':'\u011B','Ecaron':'\u011A','ecir':'\u2256','ecirc':'\xEA','Ecirc':'\xCA','ecolon':'\u2255','ecy':'\u044D','Ecy':'\u042D','eDDot':'\u2A77','edot':'\u0117','eDot':'\u2251','Edot':'\u0116','ee':'\u2147','efDot':'\u2252','efr':'\uD835\uDD22','Efr':'\uD835\uDD08','eg':'\u2A9A','egrave':'\xE8','Egrave':'\xC8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','emacr':'\u0113','Emacr':'\u0112','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp':'\u2003','emsp13':'\u2004','emsp14':'\u2005','eng':'\u014B','ENG':'\u014A','ensp':'\u2002','eogon':'\u0119','Eogon':'\u0118','eopf':'\uD835\uDD56','Eopf':'\uD835\uDD3C','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','epsilon':'\u03B5','Epsilon':'\u0395','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','esim':'\u2242','Esim':'\u2A73','eta':'\u03B7','Eta':'\u0397','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','fcy':'\u0444','Fcy':'\u0424','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','ffr':'\uD835\uDD23','Ffr':'\uD835\uDD09','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','fopf':'\uD835\uDD57','Fopf':'\uD835\uDD3D','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','gamma':'\u03B3','Gamma':'\u0393','gammad':'\u03DD','Gammad':'\u03DC','gap':'\u2A86','gbreve':'\u011F','Gbreve':'\u011E','Gcedil':'\u0122','gcirc':'\u011D','Gcirc':'\u011C','gcy':'\u0433','Gcy':'\u0413','gdot':'\u0121','Gdot':'\u0120','ge':'\u2265','gE':'\u2267','gel':'\u22DB','gEl':'\u2A8C','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','ges':'\u2A7E','gescc':'\u2AA9','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','gfr':'\uD835\uDD24','Gfr':'\uD835\uDD0A','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','gjcy':'\u0453','GJcy':'\u0403','gl':'\u2277','gla':'\u2AA5','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','gopf':'\uD835\uDD58','Gopf':'\uD835\uDD3E','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','gscr':'\u210A','Gscr':'\uD835\uDCA2','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gt':'>','Gt':'\u226B','GT':'>','gtcc':'\u2AA7','gtcir':'\u2A7A','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','hardcy':'\u044A','HARDcy':'\u042A','harr':'\u2194','hArr':'\u21D4','harrcir':'\u2948','harrw':'\u21AD','Hat':'^','hbar':'\u210F','hcirc':'\u0125','Hcirc':'\u0124','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','hstrok':'\u0127','Hstrok':'\u0126','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','iacute':'\xED','Iacute':'\xCD','ic':'\u2063','icirc':'\xEE','Icirc':'\xCE','icy':'\u0438','Icy':'\u0418','Idot':'\u0130','iecy':'\u0435','IEcy':'\u0415','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','igrave':'\xEC','Igrave':'\xCC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','ijlig':'\u0133','IJlig':'\u0132','Im':'\u2111','imacr':'\u012B','Imacr':'\u012A','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','in':'\u2208','incare':'\u2105','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','int':'\u222B','Int':'\u222C','intcal':'\u22BA','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','iocy':'\u0451','IOcy':'\u0401','iogon':'\u012F','Iogon':'\u012E','iopf':'\uD835\uDD5A','Iopf':'\uD835\uDD40','iota':'\u03B9','Iota':'\u0399','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','itilde':'\u0129','Itilde':'\u0128','iukcy':'\u0456','Iukcy':'\u0406','iuml':'\xEF','Iuml':'\xCF','jcirc':'\u0135','Jcirc':'\u0134','jcy':'\u0439','Jcy':'\u0419','jfr':'\uD835\uDD27','Jfr':'\uD835\uDD0D','jmath':'\u0237','jopf':'\uD835\uDD5B','Jopf':'\uD835\uDD41','jscr':'\uD835\uDCBF','Jscr':'\uD835\uDCA5','jsercy':'\u0458','Jsercy':'\u0408','jukcy':'\u0454','Jukcy':'\u0404','kappa':'\u03BA','Kappa':'\u039A','kappav':'\u03F0','kcedil':'\u0137','Kcedil':'\u0136','kcy':'\u043A','Kcy':'\u041A','kfr':'\uD835\uDD28','Kfr':'\uD835\uDD0E','kgreen':'\u0138','khcy':'\u0445','KHcy':'\u0425','kjcy':'\u045C','KJcy':'\u040C','kopf':'\uD835\uDD5C','Kopf':'\uD835\uDD42','kscr':'\uD835\uDCC0','Kscr':'\uD835\uDCA6','lAarr':'\u21DA','lacute':'\u013A','Lacute':'\u0139','laemptyv':'\u29B4','lagran':'\u2112','lambda':'\u03BB','Lambda':'\u039B','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larr':'\u2190','lArr':'\u21D0','Larr':'\u219E','larrb':'\u21E4','larrbfs':'\u291F','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','lat':'\u2AAB','latail':'\u2919','lAtail':'\u291B','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','lcaron':'\u013E','Lcaron':'\u013D','lcedil':'\u013C','Lcedil':'\u013B','lceil':'\u2308','lcub':'{','lcy':'\u043B','Lcy':'\u041B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','leftarrow':'\u2190','Leftarrow':'\u21D0','LeftArrow':'\u2190','LeftArrowBar':'\u21E4','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVector':'\u21C3','LeftDownVectorBar':'\u2959','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','Leftrightarrow':'\u21D4','LeftRightArrow':'\u2194','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTee':'\u22A3','LeftTeeArrow':'\u21A4','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangle':'\u22B2','LeftTriangleBar':'\u29CF','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVector':'\u21BF','LeftUpVectorBar':'\u2958','LeftVector':'\u21BC','LeftVectorBar':'\u2952','leg':'\u22DA','lEg':'\u2A8B','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','les':'\u2A7D','lescc':'\u2AA8','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','lfr':'\uD835\uDD29','Lfr':'\uD835\uDD0F','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','ljcy':'\u0459','LJcy':'\u0409','ll':'\u226A','Ll':'\u22D8','llarr':'\u21C7','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','lmidot':'\u0140','Lmidot':'\u013F','lmoust':'\u23B0','lmoustache':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','Longleftarrow':'\u27F8','LongLeftArrow':'\u27F5','longleftrightarrow':'\u27F7','Longleftrightarrow':'\u27FA','LongLeftRightArrow':'\u27F7','longmapsto':'\u27FC','longrightarrow':'\u27F6','Longrightarrow':'\u27F9','LongRightArrow':'\u27F6','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','lopf':'\uD835\uDD5D','Lopf':'\uD835\uDD43','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','lstrok':'\u0142','Lstrok':'\u0141','lt':'<','Lt':'\u226A','LT':'<','ltcc':'\u2AA6','ltcir':'\u2A79','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','map':'\u21A6','Map':'\u2905','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','mcy':'\u043C','Mcy':'\u041C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','mfr':'\uD835\uDD2A','Mfr':'\uD835\uDD10','mho':'\u2127','micro':'\xB5','mid':'\u2223','midast':'*','midcir':'\u2AF0','middot':'\xB7','minus':'\u2212','minusb':'\u229F','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','mopf':'\uD835\uDD5E','Mopf':'\uD835\uDD44','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','mu':'\u03BC','Mu':'\u039C','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','nacute':'\u0144','Nacute':'\u0143','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natur':'\u266E','natural':'\u266E','naturals':'\u2115','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','ncaron':'\u0148','Ncaron':'\u0147','ncedil':'\u0146','Ncedil':'\u0145','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','ncy':'\u043D','Ncy':'\u041D','ndash':'\u2013','ne':'\u2260','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','nfr':'\uD835\uDD2B','Nfr':'\uD835\uDD11','nge':'\u2271','ngE':'\u2267\u0338','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','ngt':'\u226F','nGt':'\u226B\u20D2','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','njcy':'\u045A','NJcy':'\u040A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nle':'\u2270','nlE':'\u2266\u0338','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nlt':'\u226E','nLt':'\u226A\u20D2','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','not':'\xAC','Not':'\u2AEC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangle':'\u22EA','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangle':'\u22EB','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','npar':'\u2226','nparallel':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','npre':'\u2AAF\u0338','nprec':'\u2280','npreceq':'\u2AAF\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrc':'\u2933\u0338','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','nscr':'\uD835\uDCC3','Nscr':'\uD835\uDCA9','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsube':'\u2288','nsubE':'\u2AC5\u0338','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupe':'\u2289','nsupE':'\u2AC6\u0338','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','ntilde':'\xF1','Ntilde':'\xD1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','nu':'\u03BD','Nu':'\u039D','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','oacute':'\xF3','Oacute':'\xD3','oast':'\u229B','ocir':'\u229A','ocirc':'\xF4','Ocirc':'\xD4','ocy':'\u043E','Ocy':'\u041E','odash':'\u229D','odblac':'\u0151','Odblac':'\u0150','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','oelig':'\u0153','OElig':'\u0152','ofcir':'\u29BF','ofr':'\uD835\uDD2C','Ofr':'\uD835\uDD12','ogon':'\u02DB','ograve':'\xF2','Ograve':'\xD2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','omacr':'\u014D','Omacr':'\u014C','omega':'\u03C9','Omega':'\u03A9','omicron':'\u03BF','Omicron':'\u039F','omid':'\u29B6','ominus':'\u2296','oopf':'\uD835\uDD60','Oopf':'\uD835\uDD46','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','or':'\u2228','Or':'\u2A54','orarr':'\u21BB','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','oscr':'\u2134','Oscr':'\uD835\uDCAA','oslash':'\xF8','Oslash':'\xD8','osol':'\u2298','otilde':'\xF5','Otilde':'\xD5','otimes':'\u2297','Otimes':'\u2A37','otimesas':'\u2A36','ouml':'\xF6','Ouml':'\xD6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','par':'\u2225','para':'\xB6','parallel':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','pcy':'\u043F','Pcy':'\u041F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','pfr':'\uD835\uDD2D','Pfr':'\uD835\uDD13','phi':'\u03C6','Phi':'\u03A6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','pi':'\u03C0','Pi':'\u03A0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plus':'+','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','pr':'\u227A','Pr':'\u2ABB','prap':'\u2AB7','prcue':'\u227C','pre':'\u2AAF','prE':'\u2AB3','prec':'\u227A','precapprox':'\u2AB7','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportion':'\u2237','Proportional':'\u221D','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','pscr':'\uD835\uDCC5','Pscr':'\uD835\uDCAB','psi':'\u03C8','Psi':'\u03A8','puncsp':'\u2008','qfr':'\uD835\uDD2E','Qfr':'\uD835\uDD14','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','qscr':'\uD835\uDCC6','Qscr':'\uD835\uDCAC','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','racute':'\u0155','Racute':'\u0154','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarr':'\u2192','rArr':'\u21D2','Rarr':'\u21A0','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','rarrtl':'\u21A3','Rarrtl':'\u2916','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','rcaron':'\u0159','Rcaron':'\u0158','rcedil':'\u0157','Rcedil':'\u0156','rceil':'\u2309','rcub':'}','rcy':'\u0440','Rcy':'\u0420','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','Re':'\u211C','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','rho':'\u03C1','Rho':'\u03A1','rhov':'\u03F1','RightAngleBracket':'\u27E9','rightarrow':'\u2192','Rightarrow':'\u21D2','RightArrow':'\u2192','RightArrowBar':'\u21E5','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVector':'\u21C2','RightDownVectorBar':'\u2955','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTee':'\u22A2','RightTeeArrow':'\u21A6','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangle':'\u22B3','RightTriangleBar':'\u29D0','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVector':'\u21BE','RightUpVectorBar':'\u2954','RightVector':'\u21C0','RightVectorBar':'\u2953','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoust':'\u23B1','rmoustache':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','sacute':'\u015B','Sacute':'\u015A','sbquo':'\u201A','sc':'\u227B','Sc':'\u2ABC','scap':'\u2AB8','scaron':'\u0161','Scaron':'\u0160','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','scedil':'\u015F','Scedil':'\u015E','scirc':'\u015D','Scirc':'\u015C','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','scy':'\u0441','Scy':'\u0421','sdot':'\u22C5','sdotb':'\u22A1','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','sfr':'\uD835\uDD30','Sfr':'\uD835\uDD16','sfrown':'\u2322','sharp':'\u266F','shchcy':'\u0449','SHCHcy':'\u0429','shcy':'\u0448','SHcy':'\u0428','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','sigma':'\u03C3','Sigma':'\u03A3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','softcy':'\u044C','SOFTcy':'\u042C','sol':'/','solb':'\u29C4','solbar':'\u233F','sopf':'\uD835\uDD64','Sopf':'\uD835\uDD4A','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','squ':'\u25A1','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squf':'\u25AA','srarr':'\u2192','sscr':'\uD835\uDCC8','Sscr':'\uD835\uDCAE','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','star':'\u2606','Star':'\u22C6','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','sube':'\u2286','subE':'\u2AC5','subedot':'\u2AC3','submult':'\u2AC1','subne':'\u228A','subnE':'\u2ACB','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succ':'\u227B','succapprox':'\u2AB8','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup':'\u2283','Sup':'\u22D1','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','supdot':'\u2ABE','supdsub':'\u2AD8','supe':'\u2287','supE':'\u2AC6','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supne':'\u228B','supnE':'\u2ACC','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','tau':'\u03C4','Tau':'\u03A4','tbrk':'\u23B4','tcaron':'\u0165','Tcaron':'\u0164','tcedil':'\u0163','Tcedil':'\u0162','tcy':'\u0442','Tcy':'\u0422','tdot':'\u20DB','telrec':'\u2315','tfr':'\uD835\uDD31','Tfr':'\uD835\uDD17','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','theta':'\u03B8','Theta':'\u0398','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','thinsp':'\u2009','ThinSpace':'\u2009','thkap':'\u2248','thksim':'\u223C','thorn':'\xFE','THORN':'\xDE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','times':'\xD7','timesb':'\u22A0','timesbar':'\u2A31','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','top':'\u22A4','topbot':'\u2336','topcir':'\u2AF1','topf':'\uD835\uDD65','Topf':'\uD835\uDD4B','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','tscr':'\uD835\uDCC9','Tscr':'\uD835\uDCAF','tscy':'\u0446','TScy':'\u0426','tshcy':'\u045B','TSHcy':'\u040B','tstrok':'\u0167','Tstrok':'\u0166','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','uacute':'\xFA','Uacute':'\xDA','uarr':'\u2191','uArr':'\u21D1','Uarr':'\u219F','Uarrocir':'\u2949','ubrcy':'\u045E','Ubrcy':'\u040E','ubreve':'\u016D','Ubreve':'\u016C','ucirc':'\xFB','Ucirc':'\xDB','ucy':'\u0443','Ucy':'\u0423','udarr':'\u21C5','udblac':'\u0171','Udblac':'\u0170','udhar':'\u296E','ufisht':'\u297E','ufr':'\uD835\uDD32','Ufr':'\uD835\uDD18','ugrave':'\xF9','Ugrave':'\xD9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','umacr':'\u016B','Umacr':'\u016A','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','uogon':'\u0173','Uogon':'\u0172','uopf':'\uD835\uDD66','Uopf':'\uD835\uDD4C','uparrow':'\u2191','Uparrow':'\u21D1','UpArrow':'\u2191','UpArrowBar':'\u2912','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','Updownarrow':'\u21D5','UpDownArrow':'\u2195','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','upsilon':'\u03C5','Upsilon':'\u03A5','UpTee':'\u22A5','UpTeeArrow':'\u21A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','uring':'\u016F','Uring':'\u016E','urtri':'\u25F9','uscr':'\uD835\uDCCA','Uscr':'\uD835\uDCB0','utdot':'\u22F0','utilde':'\u0169','Utilde':'\u0168','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','uuml':'\xFC','Uuml':'\xDC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','vcy':'\u0432','Vcy':'\u0412','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','vee':'\u2228','Vee':'\u22C1','veebar':'\u22BB','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','vfr':'\uD835\uDD33','Vfr':'\uD835\uDD19','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','vopf':'\uD835\uDD67','Vopf':'\uD835\uDD4D','vprop':'\u221D','vrtri':'\u22B3','vscr':'\uD835\uDCCB','Vscr':'\uD835\uDCB1','vsubne':'\u228A\uFE00','vsubnE':'\u2ACB\uFE00','vsupne':'\u228B\uFE00','vsupnE':'\u2ACC\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','wcirc':'\u0175','Wcirc':'\u0174','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','wfr':'\uD835\uDD34','Wfr':'\uD835\uDD1A','wopf':'\uD835\uDD68','Wopf':'\uD835\uDD4E','wp':'\u2118','wr':'\u2240','wreath':'\u2240','wscr':'\uD835\uDCCC','Wscr':'\uD835\uDCB2','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','xfr':'\uD835\uDD35','Xfr':'\uD835\uDD1B','xharr':'\u27F7','xhArr':'\u27FA','xi':'\u03BE','Xi':'\u039E','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','xopf':'\uD835\uDD69','Xopf':'\uD835\uDD4F','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','xscr':'\uD835\uDCCD','Xscr':'\uD835\uDCB3','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','yacute':'\xFD','Yacute':'\xDD','yacy':'\u044F','YAcy':'\u042F','ycirc':'\u0177','Ycirc':'\u0176','ycy':'\u044B','Ycy':'\u042B','yen':'\xA5','yfr':'\uD835\uDD36','Yfr':'\uD835\uDD1C','yicy':'\u0457','YIcy':'\u0407','yopf':'\uD835\uDD6A','Yopf':'\uD835\uDD50','yscr':'\uD835\uDCCE','Yscr':'\uD835\uDCB4','yucy':'\u044E','YUcy':'\u042E','yuml':'\xFF','Yuml':'\u0178','zacute':'\u017A','Zacute':'\u0179','zcaron':'\u017E','Zcaron':'\u017D','zcy':'\u0437','Zcy':'\u0417','zdot':'\u017C','Zdot':'\u017B','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','zeta':'\u03B6','Zeta':'\u0396','zfr':'\uD835\uDD37','Zfr':'\u2128','zhcy':'\u0436','ZHcy':'\u0416','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','zscr':'\uD835\uDCCF','Zscr':'\uD835\uDCB5','zwj':'\u200D','zwnj':'\u200C'};
	var decodeMapLegacy = {'aacute':'\xE1','Aacute':'\xC1','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','aelig':'\xE6','AElig':'\xC6','agrave':'\xE0','Agrave':'\xC0','amp':'&','AMP':'&','aring':'\xE5','Aring':'\xC5','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','brvbar':'\xA6','ccedil':'\xE7','Ccedil':'\xC7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','eacute':'\xE9','Eacute':'\xC9','ecirc':'\xEA','Ecirc':'\xCA','egrave':'\xE8','Egrave':'\xC8','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','iacute':'\xED','Iacute':'\xCD','icirc':'\xEE','Icirc':'\xCE','iexcl':'\xA1','igrave':'\xEC','Igrave':'\xCC','iquest':'\xBF','iuml':'\xEF','Iuml':'\xCF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','ntilde':'\xF1','Ntilde':'\xD1','oacute':'\xF3','Oacute':'\xD3','ocirc':'\xF4','Ocirc':'\xD4','ograve':'\xF2','Ograve':'\xD2','ordf':'\xAA','ordm':'\xBA','oslash':'\xF8','Oslash':'\xD8','otilde':'\xF5','Otilde':'\xD5','ouml':'\xF6','Ouml':'\xD6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','thorn':'\xFE','THORN':'\xDE','times':'\xD7','uacute':'\xFA','Uacute':'\xDA','ucirc':'\xFB','Ucirc':'\xDB','ugrave':'\xF9','Ugrave':'\xD9','uml':'\xA8','uuml':'\xFC','Uuml':'\xDC','yacute':'\xFD','Yacute':'\xDD','yen':'\xA5','yuml':'\xFF'};
	var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
	var invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	var contains = function(array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};

	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var result = {};
		var key;
		for (key in defaults) {
			// A `hasOwnProperty` check is not needed here, since only recognized
			// option names are used anyway. Any others are ignored.
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};

	// Modified version of `ucs2encode`; see https://mths.be/punycode.
	var codePointToSymbol = function(codePoint, strict) {
		var output = '';
		if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
			// See issue #4:
			// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
			// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
			// REPLACEMENT CHARACTER.”
			if (strict) {
				parseError('character reference outside the permissible Unicode range');
			}
			return '\uFFFD';
		}
		if (has(decodeMapNumeric, codePoint)) {
			if (strict) {
				parseError('disallowed character reference');
			}
			return decodeMapNumeric[codePoint];
		}
		if (strict && contains(invalidReferenceCodePoints, codePoint)) {
			parseError('disallowed character reference');
		}
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};

	var hexEscape = function(codePoint) {
		return '&#x' + codePoint.toString(16).toUpperCase() + ';';
	};

	var decEscape = function(codePoint) {
		return '&#' + codePoint + ';';
	};

	var parseError = function(message) {
		throw Error('Parse error: ' + message);
	};

	/*--------------------------------------------------------------------------*/

	var encode = function(string, options) {
		options = merge(options, encode.options);
		var strict = options.strict;
		if (strict && regexInvalidRawCodePoint.test(string)) {
			parseError('forbidden code point');
		}
		var encodeEverything = options.encodeEverything;
		var useNamedReferences = options.useNamedReferences;
		var allowUnsafeSymbols = options.allowUnsafeSymbols;
		var escapeCodePoint = options.decimal ? decEscape : hexEscape;

		var escapeBmpSymbol = function(symbol) {
			return escapeCodePoint(symbol.charCodeAt(0));
		};

		if (encodeEverything) {
			// Encode ASCII symbols.
			string = string.replace(regexAsciiWhitelist, function(symbol) {
				// Use named references if requested & possible.
				if (useNamedReferences && has(encodeMap, symbol)) {
					return '&' + encodeMap[symbol] + ';';
				}
				return escapeBmpSymbol(symbol);
			});
			// Shorten a few escapes that represent two symbols, of which at least one
			// is within the ASCII range.
			if (useNamedReferences) {
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;')
					.replace(/&#x66;&#x6A;/g, '&fjlig;');
			}
			// Encode non-ASCII symbols.
			if (useNamedReferences) {
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function(string) {
					// Note: there is no need to check `has(encodeMap, string)` here.
					return '&' + encodeMap[string] + ';';
				});
			}
			// Note: any remaining non-ASCII symbols are handled outside of the `if`.
		} else if (useNamedReferences) {
			// Apply named character references.
			// Encode `<>"'&` using named character references.
			if (!allowUnsafeSymbols) {
				string = string.replace(regexEscape, function(string) {
					return '&' + encodeMap[string] + ';'; // no need to check `has()` here
				});
			}
			// Shorten escapes that represent two symbols, of which at least one is
			// `<>"'&`.
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;');
			// Encode non-ASCII symbols that can be replaced with a named reference.
			string = string.replace(regexEncodeNonAscii, function(string) {
				// Note: there is no need to check `has(encodeMap, string)` here.
				return '&' + encodeMap[string] + ';';
			});
		} else if (!allowUnsafeSymbols) {
			// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
			// using named character references.
			string = string.replace(regexEscape, escapeBmpSymbol);
		}
		return string
			// Encode astral symbols.
			.replace(regexAstralSymbols, function($0) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return escapeCodePoint(codePoint);
			})
			// Encode any remaining BMP symbols that are not printable ASCII symbols
			// using a hexadecimal escape.
			.replace(regexBmpWhitelist, escapeBmpSymbol);
	};
	// Expose default options (so they can be overridden globally).
	encode.options = {
		'allowUnsafeSymbols': false,
		'encodeEverything': false,
		'strict': false,
		'useNamedReferences': false,
		'decimal' : false
	};

	var decode = function(html, options) {
		options = merge(options, decode.options);
		var strict = options.strict;
		if (strict && regexInvalidEntity.test(html)) {
			parseError('malformed character reference');
		}
		return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7) {
			var codePoint;
			var semicolon;
			var decDigits;
			var hexDigits;
			var reference;
			var next;
			if ($1) {
				// Decode decimal escapes, e.g. `&#119558;`.
				decDigits = $1;
				semicolon = $2;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(decDigits, 10);
				return codePointToSymbol(codePoint, strict);
			}
			if ($3) {
				// Decode hexadecimal escapes, e.g. `&#x1D306;`.
				hexDigits = $3;
				semicolon = $4;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint, strict);
			}
			if ($5) {
				// Decode named character references with trailing `;`, e.g. `&copy;`.
				reference = $5;
				if (has(decodeMap, reference)) {
					return decodeMap[reference];
				} else {
					// Ambiguous ampersand. https://mths.be/notes/ambiguous-ampersands
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					return $0;
				}
			}
			// If we’re still here, it’s a legacy reference for sure. No need for an
			// extra `if` check.
			// Decode named character references without trailing `;`, e.g. `&amp`
			// This is only a parse error if it gets converted to `&`, or if it is
			// followed by `=` in an attribute context.
			reference = $6;
			next = $7;
			if (next && options.isAttributeValue) {
				if (strict && next == '=') {
					parseError('`&` did not start a character reference');
				}
				return $0;
			} else {
				if (strict) {
					parseError(
						'named character reference was not terminated by a semicolon'
					);
				}
				// Note: there is no need to check `has(decodeMapLegacy, reference)`.
				return decodeMapLegacy[reference] + (next || '');
			}
		});
	};
	// Expose default options (so they can be overridden globally).
	decode.options = {
		'isAttributeValue': false,
		'strict': false
	};

	var escape = function(string) {
		return string.replace(regexEscape, function($0) {
			// Note: there is no need to check `has(escapeMap, $0)` here.
			return escapeMap[$0];
		});
	};

	/*--------------------------------------------------------------------------*/

	var he = {
		'version': '1.1.1',
		'encode': encode,
		'decode': decode,
		'escape': escape,
		'unescape': decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return he;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = he;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in he) {
				has(he, key) && (freeExports[key] = he[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.he = he;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(75)(module), __webpack_require__(74)))

/***/ }),
/* 74 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typographie = __webpack_require__(38);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_typographie).default;
  }
});

__webpack_require__(39);

__webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=typographie.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(2);
var Backbone = __webpack_require__(0);

module.exports = Backbone.View.extend({
	tagName: 'li',
	itemTemplate: _.template('<div><div class="checkbox"<% if(active) { %> checked<% } %>>&nbsp;</div><label><%= caption %></label></div>'),
	events: {
		'click DIV': 'toggleOption',
	},
	initialize: function() {
		this.model.bind('change:active', _.bind(this.render, this));
	},
	toggleOption: function(e) {
		this.model.set({'active': !this.model.get('active')});
	},
	render: function() {
		this.$el.html(this.itemTemplate(this.model.toJSON()));
		return this;
	}
});


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

window.onload = function() {
	var OptionsCollection = __webpack_require__(7);
	var TypographieModel = __webpack_require__(8);
	var EditorView = __webpack_require__(9);
	var InputSwitcherView = __webpack_require__(11);
	var OutputSwitcherView = __webpack_require__(13);
	var HighlightCheckboxView = __webpack_require__(10);
	var OptionsDialogView = __webpack_require__(12);

	var optionsCollection = new OptionsCollection();
	var typographieModel = new TypographieModel({options: optionsCollection});
	var editorView = new EditorView({model: typographieModel});
	var inputSwitcherView = new InputSwitcherView({model: typographieModel});
	var outputSwitcherView = new OutputSwitcherView({model: typographieModel});
	var highlightCheckboxView = new HighlightCheckboxView({model: typographieModel});
	var optionsDialogView = new OptionsDialogView({model: typographieModel});
};


/***/ })
/******/ ]);