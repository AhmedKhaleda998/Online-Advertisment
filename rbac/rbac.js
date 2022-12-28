const RBAC = require("easy-rbac")
const opts = require("./policy/index")
const rbac = RBAC.create(opts)

module.exports = rbac