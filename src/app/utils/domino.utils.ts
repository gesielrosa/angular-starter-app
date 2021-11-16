import * as domino from 'domino';
import { PathLike, readFileSync } from 'fs';

export function applyDomino(global: any, templatePath: PathLike) {
  const template = readFileSync(templatePath).toString();
  const win = domino.createWindow(template);

  // mock window //
  global['window'] = win;
  // mock document
  global['document'] = win.document;
  // mock navigator
  global['navigator'] = win.navigator;
  // not implemented property and functions
  Object.defineProperty(win.document.body.style, 'transform', createTransformOptions());
  global['CSS'] = null;
  // global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
  global['Prism'] = null;
  global['MutationObserver'] = getMockMutationObserver();
}

function createTransformOptions() {
  const value = () => ({
    enumerable: true,
    configurable: true
  });
  return {value};
}

function getMockMutationObserver() {
  return {} as MutationObserver;
}
