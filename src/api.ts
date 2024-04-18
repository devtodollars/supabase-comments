import { SupabaseClient } from "@supabase/supabase-js";
import { Comment, DisplayUser } from "./types";

export interface GetCommentsOptions {
  topic: string;
  parentId: string | null;
}

export const createApiClient = (supabase: SupabaseClient) => {
  async function getComments({
    topic,
    parentId = null,
  }: GetCommentsOptions): Promise<Comment[]> {
    const query = supabase
      .from("sc_comments_with_metadata")
      .select()
      .eq("topic", topic)
      .order("created_at", { ascending: true });

    if (parentId) {
      query.eq("parent_id", parentId);
    } else {
      query.is("parent_id", null);
    }
    const response = await query;
    // assertResponseOk(response); // TODO: Potentially add this;
    return response.data as Comment[];
  }

  async function getComment(id: string): Promise<Comment> {
    const query = supabase
      .from("sc_comments_with_metadata")
      .select()
      .eq("id", id)
      .single();

    const response = await query;
    // assertResponseOk(response); // TODO: potentially add this
    return response.data as Comment;
  }

  async function getUser(id: string): Promise<DisplayUser> {
    const query = supabase
      .from("sc_display_users")
      .select("*")
      .eq("id", id)
      .single();

    const response = await query;
    // assertResponseOk(response); // TODO: potenntially add this
    return response.data as DisplayUser;
  }
  return { getComment, getComments, getUser };
};
