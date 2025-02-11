import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function FeedbackForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
        <CardDescription>
          Help us improve your learning experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">
              How satisfied are you with the learning materials?
            </h3>
            <RadioGroup defaultValue="satisfied" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-satisfied" id="very-satisfied" />
                <Label htmlFor="very-satisfied">Very Satisfied</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="satisfied" id="satisfied" />
                <Label htmlFor="satisfied">Satisfied</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral">Neutral</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unsatisfied" id="unsatisfied" />
                <Label htmlFor="unsatisfied">Unsatisfied</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <label className="font-medium">
              What aspects could be improved?
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Content Quality",
                "Navigation",
                "Quizzes",
                "Technical Issues",
                "User Interface",
                "Learning Experience",
              ].map((aspect) => (
                <label key={aspect} className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>{aspect}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="feedback" className="font-medium">
              Detailed Feedback
            </label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts, suggestions, or concerns..."
              className="min-h-[150px]"
            />
          </div>

          <Button className="w-full">Submit Feedback</Button>
        </form>
      </CardContent>
    </Card>
  );
}
