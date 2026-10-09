import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Globally suppress all console output across the entire application
const noop = () => {};
console.log = noop;
console.info = noop;
console.warn = noop;
console.error = noop;
console.debug = noop;
console.table = noop;
console.dir = noop;
console.trace = noop;
if (typeof window !== 'undefined' && window.console) {
  window.console.log = noop;
  window.console.info = noop;
  window.console.warn = noop;
  window.console.error = noop;
  window.console.debug = noop;
  window.console.table = noop;
  window.console.dir = noop;
  window.console.trace = noop;
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(() => {});