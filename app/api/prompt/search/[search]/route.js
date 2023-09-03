import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDb()

        const searchParam = params.search;
        console.log(searchParam)
        const regex = new RegExp(searchParam, "i");
        /*const prompts = await Prompt.find({
            $or: [
                { tag: { $regex: regex } }, //array
                { prompt: { $regex: regex } }, //string
                // can't be done this way cause creator isn't populated yet { "creator.username": { $regex: regex } }
            ]
        }).populate('creator')*/
        const prompts = await Prompt.aggregate([
            {
                $lookup: {
                    from: 'users', // name of the referenced collection
                    localField: 'creator',
                    foreignField: '_id',
                    as: 'creator'
                }
            },
            { $unwind: '$creator' },
            {
                $match: {
                    $or: [
                        { tag: { $regex: regex } }, //array
                        { prompt: { $regex: regex } }, //string
                        { 'creator.username': { $regex: regex } }
                    ]
                }
            }
        ])
        /*
        the $lookup stage performs a left outer join between the Prompt and User collections on the creator and _id fields, respectively.
        The joined documents are stored in a new array field called creator.
        The $unwind stage deconstructs this array field and outputs a document for each element in the array.
        Finally, the $match stage filters the documents with $or condition that combines the conditions from all queries.
        */
        //console.log(JSON.stringify("searched" + prompts))

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 