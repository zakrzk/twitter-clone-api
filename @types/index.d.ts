import { Request } from "express"
import { Response } from "express"

export interface RequestExtended extends Request {
    userId: number,
    body: {
        value: string,
        tweetId: number
    }

}
export interface ResponseExtended extends Response {
    status: any,

}