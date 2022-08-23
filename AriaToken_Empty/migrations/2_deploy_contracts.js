var Adoption = artifacts.require("Adoption");
var AriaToken = artifacts.require("AriaToken");

module.exports = function(deployer) {
  deployer.deploy(Adoption);
  deployer.deploy(AriaToken);
};