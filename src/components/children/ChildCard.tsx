import { Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Child } from "@/types/user";

const ChildCard = ({
  child,
  onEdit,
  onDelete,
}: {
  child: Child;
  onEdit: (child: Child) => void;
  onDelete: (childId: string) => void;
}) => {
  return (
    <Card className="border-medium-green/20">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-dark-green dark:text-off-white">
              {child.name}
            </h3>
            <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
              <div>
                <span className="font-medium text-forest-green dark:text-lime/80">
                  Age:
                </span>{" "}
                {child.age} years old
              </div>
              <div>
                <span className="font-medium text-forest-green dark:text-lime/80">
                  Grade:
                </span>{" "}
                {child.grade}
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-forest-green dark:text-lime/80">
                  School:
                </span>{" "}
                {child.school}
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-forest-green dark:text-lime/80">
                  Subjects:
                </span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {child.subjects.map((subject) => (
                    <Badge
                      key={subject}
                      variant="secondary"
                      className="text-xs"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(child)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(child._id)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChildCard;
