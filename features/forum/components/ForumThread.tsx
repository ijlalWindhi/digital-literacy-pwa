import ThreadDetail from "./ThreadDetail";
import ThreadReplies from "./ThreadReplies";
import ReplyForm from "./ReplyForm";

export default function ForumThread({
  threadId,
}: Readonly<{ threadId: string }>) {
  return (
    <div className="container mx-auto space-y-6">
      <ThreadDetail threadId={threadId} />
      <ThreadReplies threadId={threadId} />
      <ReplyForm threadId={threadId} />
    </div>
  );
}
