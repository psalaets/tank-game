var React = require('react');
var ReactDOM = require('react-dom');

var a = <h1>hello world</h1>;

var header = document.querySelector('[data-message]')
console.dir(header);

ReactDOM.render(a, header);

console.log('test');
