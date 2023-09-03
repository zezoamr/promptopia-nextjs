import { connectToDb } from '@utils/database';
import User from '@models/user';
import bcrypt from 'bcryptjs';

export const POST = async function (req, res) {
    try {
        await connectToDb();

        // Get the user's information from the request body
        const { username, email, password, image } = await req.json();
        
        // Check if a user with the same email already exists
        const exists = await User.findOne({ email });
        const exists2 = await User.findOne({ username });
        if (exists || exists2) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 })
        }

        // Hash the password before storing it in the database
        const saltRounds = 8;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Create a new user document and save it to the database
        await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            image: image,
        });

        // Return a success response
        return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 200 })
    } catch (error) {
        console.log("Error creating user: ", error.message);
        return new Response(JSON.stringify({ message: 'An error occurred while creating the user' }), { status: 500 })
    }
}
