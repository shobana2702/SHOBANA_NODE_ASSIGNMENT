var fs = require("fs");
var find = require("arraysearch").Finder;
var ignoreCase = require("ignore-case");
var products = JSON.parse(fs.readFileSync("./data/db.json", "utf8"));
var filter = require("filter-values");
var groupArray = require("group-array");
module.exports = {
  getProducts: function(params) {
    return products.slice(
      params.offset,
      Number(params.offset) + Number(params.limit)
    );
  },
  addProduct: function(params) {
    params.id =
      Number(
        products.reduce(function(max, x) {
          return x.id > max ? x.id : max;
        }, 0)
      ) + Number(1);

    products.push(params);
    fs.writeFileSync("./data/db.json", JSON.stringify(products));
    return products;
  },
  removeProduct: function(params) {
    let pIndex = products.findIndex(p => p.id === params.id);
    if (pIndex > -1) {
      products.splice(pIndex, 1);
      fs.writeFileSync("./data/db.json", JSON.stringify(products));
      return products;
    } else {
      return null;
    }
  },
  updateProduct: function(params) {
    let pIndex = products.findIndex(p => p.id === params.id);
    if (pIndex > -1) {
      products[pIndex] = params;
      fs.writeFileSync("./data/db.json", JSON.stringify(products));
      return products;
    } else {
      return null;
    }
  },

  searchProductByNameOrId: function(params) {
    if (params.id != undefined) {
      return find.all.in(products).with({ id: params.id });
    } else {
      return products.filter(n =>
        ignoreCase.includes(n.productName, params.name)
      );
    }
  },

  searchProductByName: function(params) {
    var searchArray = products.filter(n =>
      ignoreCase.includes(n.productName, params.name)
    );
    return searchArray.slice(
      params.offset,
      Number(params.offset) + Number(params.limit)
    );
  },

  globalSearch: function(params) {
    var searchArray = [];

    products.forEach(function(n) {
      filter(n, function(value, key, obj) {
        if (
          params.searchKey !== undefined &&
          ignoreCase.includes(value, params.searchKey)
        ) {
          let pIndex = searchArray.findIndex(p => p.id === obj.id);
          if (pIndex === -1) {
            searchArray.push(obj);
          }
        }
      });
    });
    return searchArray;
  },

  groupByCategory: function(params) {
    return groupArray(products, "category");
  }
};
