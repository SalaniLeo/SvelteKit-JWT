// @ts-nocheck
import Cookies from 'js-cookie';
import { writable } from 'svelte/store';

export const currentTheme = writable("light");
let newTheme = 'light'

export function setCookie(name, args){
	Cookies.set(name, args, { expires: 365 });
}

export function getCookie(name){
	return Cookies.get(name);
}

export function setTheme(theme, save) {
    console.log("currentTheme")
    document.documentElement.dataset.theme = theme;
    currentTheme.set(theme);
    if (save) setCookie("theme", theme);
}

export function getTheme() {
  return getCookie('theme');
}

export function loadTheme() {
  if (getCookie('theme') != null) {
    newTheme = getCookie('theme');
    document.documentElement.dataset.theme == newTheme;
    setTheme(newTheme, false);
  } else {
    setTheme(newTheme, true);
  }
}