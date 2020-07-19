import { DBInfo } from "@textile/threads-client";
import {Libp2pCryptoIdentity} from '@textile/threads-core';
import { JSONSchema, Database, Collection } from "@textile/threads-database";
import { ThreadID, KeyInfo, Client } from '@textile/hub';
import { ContentSchema, ContentInstance } from './helpers';

class ThreadsDbHelper {
    public threadID: ThreadID;
    private client: Client;
    private db?: Database;
    private identity?: Libp2pCryptoIdentity;
    private content?: Collection<ContentInstance>;

    constructor() {
        this.client = new Client();
        this.threadID = ThreadID.fromRandom();
    }

    init = async (id:string, keyKey:string, keySecret: string, keyType: number): Promise<ThreadsDbHelper> => {
        // An `id` is parsed in as a param
        // Making an id string to either recover or create a new ID
        let identityString:string;
        // Trying to restore the id if it exists 
        try {
            var storedIdent = id;
            if (storedIdent === null) {
                throw new Error('No identity');
            }
            const restored = await Libp2pCryptoIdentity.fromString(storedIdent);
            this.identity = restored;
            identityString = this.identity.toString();
            // If the ID does not exist, it creates a new ID
        } catch (e) {
            try {
                // Generates a random ID
                const genIdentity = await Libp2pCryptoIdentity.fromRandom();
                this.identity = genIdentity;
                identityString = genIdentity.toString();
            } catch (err) {
                // Catches if there is an error
                return err.message;
            }
        }
        // Constructs the key from the parsed in key info
        let keyInfo:KeyInfo = {
            key: keyKey,
            secret: keySecret,
            // @ts-ignore
            type: keyType
        };
        // Creates a database with the key info and thread ID
        this.db = await Database.withKeyInfo(keyInfo, this.threadID.toString());
        // Returns the class
        return this;
    }

    createContent = async () => {
        // Checks there is an ID
        if (!this.identity) {
            throw new Error('Identity not found')
        }
        // Checks there is a db
        if (!this.db) {
            throw new Error('Database not setup')
        }
        // Start with an empty thread
        await this.db.start(this.identity, {threadID: this.threadID});
    
        await this.createCollection();
        // this.storeCurrentRoom()
        return this.threadID;
    }

    loadContent = async () => {

    }

    createCollection = async () => {
        if (!this.db) {
            throw new Error('No db')
        }
        const {collections} = this.db
        if (collections.get('basic-content')) {
            // Chat exists, so just use it as the reference
            this.content = collections.get('basic-content')
        } else {
            // Chat doesn't exist, create it
            this.content = await this.db.newCollection<ContentInstance>(
                'basic-content',
                ContentSchema
            );
        }
        // this.storeCurrentRoom()
    }
}

export { ThreadsDbHelper };