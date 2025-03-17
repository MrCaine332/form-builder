import { Form } from "@/entities/form/model"
import { BuilderPreview, BuilderPublish, BuilderSave } from "./ui"

type BuilderHeaderProps = {
  form: Form
}

export const BuilderHeader = ({ form }: BuilderHeaderProps) => {
  return (
    <nav className="flex justify-between items-center gap-3 border-b p-4">
      <h2 className="font-medium">
        <span className="text-muted-foreground mr-2">Form:</span>
        {form.title}
      </h2>
      <div className="flex items-center gap-2">
        <BuilderPreview />
        {form.isPublished ? null : (
          <>
            <BuilderSave />
            <BuilderPublish />
          </>
        )}
      </div>
    </nav>
  )
}
