export const ContentSchema = {
    $id: 'https://example.com/content.schema.json',
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Content",
    description: "All the information required for a content object",
    required: [ "contentTitle", "contentDescription", "contentBody" ],
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

export interface ContentInstance {
    _id: string,
    contentAuthor: string,
    contentTitle: string,
    contentDescription: string,
    contentBody: string
}

