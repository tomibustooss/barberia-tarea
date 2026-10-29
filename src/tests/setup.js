if (!globalThis.queueMicrotask) {
  globalThis.queueMicrotask = function queueMicrotask(callback) {
    Promise.resolve().then(callback);
  };
}

if (!globalThis.cancelMicrotask) {
  globalThis.cancelMicrotask = function cancelMicrotask(handle) {
    clearTimeout(handle);
  };
}
