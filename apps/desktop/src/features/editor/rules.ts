export const heading = /^ {0,3}(#{1,6})$/;
export const thematicBreak = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})$/;
export const blockquote = /^ {0,3}>$/;
export const list = /^ {0,3}(?:[*+-]|(\d{1,9})[.)])$/;
export const listGfm = /^\[( |x)\]$/;
