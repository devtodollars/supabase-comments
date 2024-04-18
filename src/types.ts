
export interface DisplayUser {
  id: string;
  name: string;
  avatar: string;
}
export interface Comment {
  id: string;
  user_id: string;
  parent_id: string | null;
  topic: string;
  comment: string;
  created_at: string;
  replies_count: number;
  user: DisplayUser;
}
