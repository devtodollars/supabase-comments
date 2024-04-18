import { SupabaseClient } from "@supabase/supabase-js";
import { Comment, DisplayUser } from "@/types";

export interface GetCommentsOptions {
  topic: string;
  parentId: string | null;
}

export interface AddCommentPayload {
  comment: string;
  topic: string;
  parent_id: string | null;
}

export const createApiClient = (supabase: SupabaseClient) => {
  async function getComments({
    topic,
    parentId = null,
  }: GetCommentsOptions): Promise<Comment[]> {
    const query = supabase
      .from("sc_comments_with_metadata")
      .select("*,user:sc_display_users(*)")
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
      .select("*,user:sc_display_users(*)")
      .eq("id", id)
      .single();

    const response = await query;
    // assertResponseOk(response); // TODO: potentially add this
    return response.data as Comment;
  }

  const addComment = async (payload: AddCommentPayload): Promise<Comment> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user == null) throw new Error("User is not logged in");
    const query = supabase
      .from("sc_comments")
      .insert({
        ...payload,
        user_id: user.id,
      })
      .select()
      .single();

    const response = await query;
    // assertResponseOk(response);
    return response.data as Comment;
  };

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
  return { getComment, getComments, getUser, addComment };
};
