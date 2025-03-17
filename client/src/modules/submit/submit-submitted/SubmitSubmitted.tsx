import { Section } from "@/shared/ui/section"

export const SubmitSubmitted = () => {
  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <Section className="max-w-[620px] flex flex-col gap-4 h-full w-full rounded-2xl p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold">Form Submitted</h1>
        <p className="text-muted-foreground">
          Thank you for submitting the form, you can close this page now.
        </p>
      </Section>
    </div>
  )
}
