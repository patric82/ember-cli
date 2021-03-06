'use strict';

var upstreamMergeTrees = require('broccoli-merge-trees');
var EMPTY_MERGE_TREE;

function overrideEmptyTree(tree) {
  EMPTY_MERGE_TREE = tree;
}

function getEmptyTree() {
  if (EMPTY_MERGE_TREE) {
    return EMPTY_MERGE_TREE;
  }

  return EMPTY_MERGE_TREE = upstreamMergeTrees([], {
    annotation: 'EMPTY_MERGE_TREE',
    description: 'EMPTY_MERGE_TREE'
  });
}

module.exports = function mergeTrees(_inputTrees, options) {
  var inputTrees = _inputTrees.filter(function(input) {
    return input && input !== getEmptyTree();
  });

  switch (inputTrees.length) {
  case 0:
    return getEmptyTree();
  case 1:
    return inputTrees[0];
  default:
    options = options || {};
    options.description = options.annotation;
    var tree = upstreamMergeTrees(inputTrees, options);

    tree.description = options && options.description;

    return tree;
  }
};

module.exports._overrideEmptyTree = overrideEmptyTree;
