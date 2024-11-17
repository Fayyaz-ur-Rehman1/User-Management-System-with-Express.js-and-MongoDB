const User = require("../models/user");

// list all user with HTML document
async function getAllUsersHtmlDocument(req, res) {
    const user = await User.find({});
    const html = `
     <table border="1px"> 
     <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>IP Address</th>
                </tr>
            </thead>

        <tbody>
                ${user.map(elm => `
                    <tr>
                        <td>${elm.firstName}</td>
                        <td>${elm.lastName}</td>
                        <td>${elm.email}</td>
                        <td>${elm.gender}</td>
                        <td>${elm.job_title}</td>
                    </tr>
                `).join('')}
            </tbody>
     </table>
    `
    res.send(html);
}

// List all user data with JSON formet
async function getAllUsersJsonFormet(req, res) {
    const allUserApi = await User.find({});
    res.json(allUserApi)
}

// Get Specific User  with JSON fromet
async function getSpecificUsers(req, res) {
    const specificUserApi = await User.findById(req.params.id);
    if (!specificUserApi) return res.status(404).json({ error: "user not found" })
    res.json(specificUserApi);
}

// delete Users in all place
async function deleteUser(req, res) {
    try {
        await User.deleteOne({ _id: req.params.id });
        return res.json({ status: "Success" });
    } catch (error) {
        return res.status(500).json({ status: "Error", message: error.message });
    }
}

// Edit User in all place
async function editUser(req, res) {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        return res.json({ status: "Success", data: updatedUser });
    } catch (error) {

        return res.status(500).json({ status: "Error", message: error.message });
    }
}

// create new user in database
async function createUser(req, res) {
    const body = req.body;

    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All field are required..." });
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })
    return res.status(201).json({ msg: "success" });
}

// export
module.exports = {
    getAllUsersHtmlDocument,
    getAllUsersJsonFormet,
    getSpecificUsers,
    deleteUser,
    editUser,
    createUser,
}