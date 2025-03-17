import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { formatDistance } from "date-fns"
import { EyeIcon, FileStackIcon, MoveRightIcon, PencilIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { FormWithoutContent } from "@/entities/form/model"

type FormCardProps = {
  form: FormWithoutContent
}

export const FormCard = ({ form }: FormCardProps) => {
  return (
    <Card className="h-200px">
      <CardHeader className="flex flex-col gap-1">
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="font-bold">{form.title}</span>
          {form.isPublished ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant="destructive">Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          {form.isPublished ? (
            <span className="flex items-center gap-2 font-medium">
              <EyeIcon className="text-muted-foreground h-5" />
              <span>{form.visits}</span>
              <FileStackIcon className="text-muted-foreground h-5" />
              <span>{form.submissions}</span>
            </span>
          ) : null}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.isPublished ? (
          <Button asChild className="w-full mt-2 text-md gap-2">
            <Link to={`/form/${form.id}`}>
              View Submissions <MoveRightIcon className="h-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild className="w-full mt-2 text-md gap-2 border" variant="secondary">
            <Link to={`/builder/${form.id}`}>
              Edit Form <PencilIcon className="h-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
