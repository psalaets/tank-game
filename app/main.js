var React = require('react');
var ReactDOM = require('react-dom');

var a = <div>hello there!</div>;


var header = document.querySelector('[data-message]')
console.dir(header)

ReactDOM.render(a, header)

console.log('test')