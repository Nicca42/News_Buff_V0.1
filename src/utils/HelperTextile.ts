import { DBInfo } from "@textile/threads-client";
import {Libp2pCryptoIdentity} from '@textile/threads-core';
import { JSONSchema, Database, Collection } from "@textile/threads-database";
import { ThreadID, KeyInfo, Client } from '@textile/hub';

const contentInstance = {
    "$id": "",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Content",
    "description": "All the information required for a content object",
    "required": [ "contentTitle", "contentDescription", "contentBody" ],
    "type": "object",
    "properties": {
        "contentTitle": {
            "type": "string",
            "description": "The title for the content"
        },
        "contentDescription": {
            "type": "string",
            "description": "A description for the content"
        },
        "contentBody": {
            "type": "string",
            "description": "The body of the content. Either mark down or HTML"
        }
    }
};

class ThreadsDbHelper {
    public threadID: ThreadID;
    private client: Client;
    private db?: Database;
    private identity?: Libp2pCryptoIdentity;
    // private content?: Collection<contentInstance>;

    constructor() {
        this.client = new Client();
        this.threadID = ThreadID.fromRandom();
    }

    init = async (id:string, keyKey:string, keySecret: string, keyType: number): Promise<ThreadsDbHelper> => {
        let identityString:string;
        
        try {
            var storedIdent = id;
            if (storedIdent === null) {
                throw new Error('No identity');
            }
            const restored = await Libp2pCryptoIdentity.fromString(storedIdent);
            this.identity = restored;
            identityString = this.identity.toString();
            }
        catch (e) {
            /**
             * If any error, create a new identity.
             */
            try {
                const genIdentity = await Libp2pCryptoIdentity.fromRandom();
                this.identity = genIdentity;
                identityString = genIdentity.toString();
            } catch (err) {
                return err.message;
            }
        }

        let keyInfo:KeyInfo = {
            key: keyKey,
            secret: keySecret,
            // @ts-ignore
            type: keyType
        };

        const key: KeyInfo = {key: process.env.REACT_APP_API_KEY || ''}
        this.db = await Database.withKeyInfo(key, this.threadID.toString());
        return this;
    }

    createModel = async (clientInstance:Client, threadID: ThreadID, collectionName:string, schema:any) => {
        const instance = clientInstance.newCollection(
            threadID,
            collectionName,
            schema
        );
    }
}

export { ThreadsDbHelper };