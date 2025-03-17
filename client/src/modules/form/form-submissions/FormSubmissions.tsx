import { useStoreMap } from "effector-react"
import { $formDetails } from "@/pages/form/model"
import {
  FormElementInstance,
  FormElementType,
} from "@/entities/form-element/model"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import {format, formatDistance} from "date-fns"
import {Badge} from "@/shared/ui/badge";
import {ReactNode} from "react";

type Row = { [key: string]: string } & {
  submittedAt: Date
}

export const FormSubmissions = () => {
  const { form, submissions } = useStoreMap($formDetails, (state) => ({
    form: state!.form,
    submissions: state!.submissions,
  }))

  const formElements = JSON.parse(form.content) as FormElementInstance[]
  const columns: {
    id: string
    label: string
    required: boolean
    type: FormElementType
  }[] = []

  formElements.forEach((element, index) => {
    switch (element.type) {
      case "TextField":
      case "NumberField":
      case "TextareaField":
      case "DateField":
      case "SelectField":
      case "CheckboxField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        })
        break
      default:
        break
    }
  })

  const rows: Row[] = []

  submissions.forEach((submission) => {
    const content = JSON.parse(submission.content)
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    })
  })

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">
                Submitted At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  ></RowCell>
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

type RowCellProps = {
  type: FormElementType
  value: string
}

const RowCell = ({ type, value }: RowCellProps) => {
  let node: ReactNode = value

  if (type === "CheckboxField" && value) {
    node = value === "true" ? "Yes" : "No"
  }

  if (type === "DateField" && value) {
    const date = new Date(value)
    node = <Badge variant="outline">
      {format(date, "dd/MM/yyyy")}
    </Badge>
  }

  return <TableCell>{node}</TableCell>
}
