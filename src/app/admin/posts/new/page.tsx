import { FormShell } from "@/components/admin/form-shell";
import { PostForm } from "@/components/admin/post-form";

export default function NewPostPage() {
  return (
    <FormShell title="New post" backHref="/admin/posts">
      <PostForm />
    </FormShell>
  );
}
