import { Client, Account } from 'appwrite'



const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65bd5c9432b61a6032bf');

export const ACCOUNT = new Account(client)