import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '@models/user';
import { connectToDb } from '@utils/database';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password', placeholder: '' }
            },
            async authorize(credentials, req) {
                try {
                    // Add logic here to look up the user from the credentials supplied
                    const user = await User.findOne({ username: credentials.username });
                    if (user && await bcrypt.compare(credentials.password, user.password)) {
                        // If a matching user is found and their password is correct, return their user object
                        return { id: user.id, name: user.username, email: user.email };
                    } else {
                        // If no matching user is found or their password is incorrect, return null
                        return null;
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ account, profile, user, credentials }) {
            //console.log(JSON.stringify(credentials) + "\n" + JSON.stringify(profile))
            try {
                if (credentials) {
                    try {
                        // Add logic here to look up the user from the credentials supplied
                        const user = await User.findOne({ username: credentials.username });
                        if (user && await bcrypt.compare(credentials.password, user.password)) {
                            // If a matching user is found and their password is correct, return their user object
                            return { id: user.id, name: user.username, email: user.email };
                        } else {
                            // If no matching user is found or their password is incorrect, return null
                            return null;
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
                else if (profile) {
                    try {
                        await connectToDb();

                        // check if user already exists
                        const userExists = await User.findOne({ email: profile.email });
                        // if not, create a new document and save user in MongoDB
                        if (!userExists) {
                            await User.create({
                                email: profile.email,
                                username: profile.name.replace(" ", "").toLowerCase(),
                                image: profile.picture,
                            });
                        }

                        return true
                    } catch (error) {
                        console.log("Error checking if user exists: ", error.message);
                        return false
                    }
                }
            } catch (error) {
                console.log("Error signing in: ", error.message);
                return false
            }
        },
    }
})

export { handler as GET, handler as POST }