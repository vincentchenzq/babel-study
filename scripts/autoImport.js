/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const compiler = require('vue-template-compiler')
const t = require('@babel/types')
