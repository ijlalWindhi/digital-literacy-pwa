import ThreadList from "./ThreadList";
import CategoryInfo from "./CategoryInfo";

export default function ForumCategory({
  categoryId,
}: {
  readonly categoryId: string;
}) {
  return (
    <div className="container mx-auto space-y-6">
      <CategoryInfo categoryId={categoryId} />
      <ThreadList categoryId={categoryId} />
    </div>
  );
}
