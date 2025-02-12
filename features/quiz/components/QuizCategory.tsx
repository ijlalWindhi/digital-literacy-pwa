import QuizCategoryList from "./QuizCategoryList";
import QuizCategoryInfo from "./QuizCategoryInfo";

export default function QuizCategory({
  categoryId,
}: {
  readonly categoryId: string;
}) {
  return (
    <div className="container mx-auto space-y-6">
      <QuizCategoryInfo categoryId={categoryId} />
      <QuizCategoryList categoryId={categoryId} />
    </div>
  );
}
