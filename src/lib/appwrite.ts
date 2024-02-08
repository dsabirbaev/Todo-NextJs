import { COLLECTION_ID } from '@/lib/appwrite';
import { Account, Client, Databases, ID, Storage } from 'appwrite'


const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65bd5c9432b61a6032bf');

export const ACCOUNT = new Account(client)
export const DATABASE = new Databases(client)
export const UNIQUE_ID = ID.unique()
export const STORAGE = new Storage(client)



export const DB_ID = "65c0fcff3b71c3430d82"
export const COLLECTION_TODOS_ID = "65c0fd2f5f0bdc9eaa9c"
export const COLLECTION_USERS_ID = "65c3d015b7e736c4c7eb"


export const STORAGE_ID = "65c35d035f0e22465817"

