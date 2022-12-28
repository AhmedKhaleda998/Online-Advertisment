const roles = require("../../enum/role")
const superAdminPolicy = require("./superAdminPolicy")
const adminPolicy = require("./adminPolicy")
const userPolicy = require("./userPolicy")

const opts = {
    [roles.SUPER_ADMIN]: { can: superAdminPolicy },
    [roles.ADMIN]: { can: adminPolicy },
    [roles.USER]: { can: userPolicy }
}

module.exports = opts