const bcrypt = require('bcrypt');
const express = require('express');

const a = '123';
const aa = bcrypt(a);
console.log(a);

