export interface Attachment {
    id: string;
    type: AttachmentType;
    name: string;
    url: string;
}

export enum AttachmentType {
    Image = "Image"
}