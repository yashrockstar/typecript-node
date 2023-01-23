import { CallbackError, DocumentDefinition, FilterQuery, ObjectId } from "mongoose";
import User, { UserDocument } from "../model/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getUser(input: ObjectId) {
    try {
        return await User.findById(input);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateUser(id: ObjectId, input: DocumentDefinition<UserDocument>) {
    try {
        return await User.findByIdAndUpdate(id, input, { returnOriginal: false });
    } catch (error: any) {
        throw new Error(error);
    }
}
export async function deleteUser(input: string) {
    try {
        console.log("before deletion");
        const deleted = await User.findByIdAndDelete(input);
        console.log("after deletion");
        console.log(deleted);
        return deleted;
    } catch (error: any) {
        throw new Error(error);
    }
}