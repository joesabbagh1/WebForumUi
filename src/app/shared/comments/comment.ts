import {Reply} from "../replies/reply";

export class Comment {
  id!: string
  username!: string
  post_id!: string
  content: string = ''
  date_created!: string
  replies: Array<Reply> = new Array<Reply>()
}
