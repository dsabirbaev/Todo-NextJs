import { Account, Client, Databases, ID } from 'appwrite'


const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65bd5c9432b61a6032bf');

export const ACCOUNT = new Account(client)
export const DATABASE = new Databases(client)
export const UNIQUE_ID = ID.unique()


export const DB_ID = "65c0fcff3b71c3430d82"
export const COLLECTION_ID = "65c0fd2f5f0bdc9eaa9c"