import { DBInfo } from "@textile/threads-client";
import {Libp2pCryptoIdentity} from '@textile/threads-core';
import { JSONSchema, Database, Collection } from "@textile/threads-database";
import { ThreadID, KeyInfo, Client, UserAuth, Identity } from '@textile/hub';
import { fromEvent } from 'rxjs';

interface ContentInstance {
    _id: string,
    contentAuthor: string,
    contentTitle: string,
    contentDescription: string,
    contentBody: string
}

interface ContentState {
    contents: ContentInstance[],
    threadID?: string,
    invite?: string
}

/**
 * Schema taken from https://json-schema.org/learn/miscellaneous-examples.html
 * Additional info https://json-schema.org/learn/getting-started-step-by-step.html
*/
let ContentSchema: JSONSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Content",
    description: "All the information required for a content object",
    required: [ "_id", "contentTitle", "contentDescription", "contentBody" ],
    type: "object",
    properties: {
        _id: {
            type: 'string',
            description: "The instance's id.",
        },
        contentAuthor: {
            type: "string",
            description: "The author of the content"
        },
        contentTitle: {
            type: "string",
            description: "The title for the content"
        },
        contentDescription: {
            type: "string",
            description: "A description for the content"
        },
        contentBody: {
            type: "string",
            description: "The body of the content. Either mark down or HTML"
        }
    }
};

class ThreadsDbHelper {
    public threadID: ThreadID;
    private client: Client;
    private clientToken: string;
    private auth: UserAuth;
    private keyInfo: KeyInfo;
    private db?: Database;
    private identity?: Libp2pCryptoIdentity;
    private idIdentity?: Identity;
    private collection?: Collection<ContentInstance>;

    constructor() {        
        this.threadID = ThreadID.fromRandom();
    }

    init = async (id:string, keyKey:string, keySecret: string, keyType: number): Promise<Array<any>> => {
        console.log("in init");
        // Constructs the key from the parsed in key info
        this.keyInfo = {
            key: keyKey,
            secret: keySecret,
            // @ts-ignore
            type: keyType
        };
        
        // Setting up the client
        this.client = await Client.withKeyInfo(this.keyInfo);
        
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
            this.idIdentity = restored;
            // If the ID does not exist, it creates a new ID
        } catch (e) {
            try {
                // Generates a random ID
                const genIdentity = await Libp2pCryptoIdentity.fromRandom();
                this.identity = genIdentity;
                identityString = genIdentity.toString();
                this.idIdentity = genIdentity;
            } catch (err) {
                // Catches if there is an error
                return err.message;
            }
        }
        // setting up clients token
        let clientToken = await this.client.getToken(
            this.identity
        );
        this.clientToken = clientToken;

        await this.client.newDB(this.threadID);

        await this.client.newCollection(
            this.threadID, 
            'basic-content', 
            ContentSchema
        );

        console.log("Init complete")

        // Returns the class
        return [
            this.threadID,
            identityString,
            this.identity
        ];
    }

    storeContent = async () => {
        const content = this.threadID.toString();
        console.log("Should be storing content: ");
        console.log(content);
    }

    public getInfoString = async () => {
        if (!this.db) {
            throw new Error('No db')
        }
        const info = await this.db.getDBInfo(true)
        return JSON.stringify(info)
    }

    createContent = async (
            _id: string,
            contentAuthor: string,
            contentTitle: string,
            contentDescription: string,
            contentBody: string
    ) => {
        console.log(">>>HERE 1");
        let content:ContentInstance = {
            _id,
            contentAuthor,
            contentTitle,
            contentDescription,
            contentBody
        };

        console.log(">>>HERE 2");

        const ids = await this.client.create(
            this.threadID, 
            'basic-content', 
            [content]
        );

        console.log("inserting")
      }

    loadContent = async (): Promise<any> => {
        if (!this.identity) {
            throw new Error('Identity not found')
        }

        let content = await this.client.find(
            this.threadID, 
            'basic-content', 
            {}
        );

        return content;
    }

    emitter = async (db:Database) => {
        return fromEvent(db.emitter, 'Player.*.0'); 
        // fromEvent returns an Observable
    }
}

export { ThreadsDbHelper };