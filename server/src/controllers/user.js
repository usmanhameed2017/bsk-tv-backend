const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// Create user
const createUser = async (request, response) => {
    const { name, email, password } = request.body;
    if(!name?.trim()) throw new ApiError(400, "Name is required");
    if(!email?.trim()) throw new ApiError(400, "Email is required");
    if(!password?.trim()) throw new ApiError(400, "Password is required");

    try 
    {
        // Find user with email
        const isEmailExist = await User.getUser(email);
        if(isEmailExist) throw new ApiError(400, "This email is already taken");

        // Password validation
        if(password?.trim()?.length < 8) throw new ApiError(400, "Password must be at least 8 characters long");

        // Create in db
        const user = await User.create(request.body);
        if(!user) throw new ApiError(400, "Failed to create a user");

        // Exclude password
        const payload = user.toObject();
        delete payload.password;

        // Response
        return response.status(201).json(new ApiResponse(201, payload, "User created"));
    } 
    catch(error) 
    {
        throw error;
    }
};

module.exports = { createUser };