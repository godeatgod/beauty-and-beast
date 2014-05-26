var items = {
  key: {
    text:"The basement key"
  },

  rose: {
    text:"Magical Rose"
  }


};

module.exports = {

  getItem:function(name) {
    items[name].count = 1;
    $("ul.items").append($("<li class='item " + name + "'></li>"));
    require("./achievement").showUnlock("Item", name + "-item", items[name].text);
  },

  hasItem:function(name) {
    return items[name] !== undefined && items[name].count !== undefined;
  }
};
