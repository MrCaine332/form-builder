import { createEvent, createStore, sample } from "effector"
import { FormElementInstance } from "@/entities/form-element/model"
import { $formStore, BuilderGate } from "@/pages/builder/model"

/** Stores */
/** =================================== */
export const $formElements = createStore<FormElementInstance[]>([]).reset(
  BuilderGate.close
)

export const $selectedFormElement = createStore<FormElementInstance | null>(
  null
).reset(BuilderGate.close)

/** Events */
/** =================================== */
export const addFormElement = createEvent<{
  index: number
  element: FormElementInstance
}>()

export const removeFormElement = createEvent<number>()

export const moveFormElement = createEvent<{
  oldIndex: number
  newIndex: number
}>()

export const selectFormElement = createEvent<number>()

export const unselectFormElement = createEvent()

type UpdateSelectedFormElement = {
  id: string
  attributes: Record<string, any>
}

export const updateSelectedFormElement =
  createEvent<UpdateSelectedFormElement>()

/** Samples */
/** =================================== */

sample({
  source: $formStore,
  filter: (form) => !!form,
  fn: (form) => {
    if (form!.content !== "[]") {
      return JSON.parse(form!.content)
    }
    return []
  },
  target: $formElements,
})

sample({
  clock: selectFormElement,
  source: $formElements,
  fn: (state, index) => state[index],
  target: $selectedFormElement,
})

/** Subscriptions */
/** =================================== */
$formElements.on(addFormElement, (state, payload) => {
  const stateCopy = [...state]

  if (stateCopy.length === 0 || payload.index === stateCopy.length) {
    stateCopy.push(payload.element)
    return stateCopy
  }

  stateCopy.splice(payload.index, 0, payload.element)
  return stateCopy
})

$formElements.on(removeFormElement, (state, index) => {
  const stateCopy = [...state]
  stateCopy.splice(index, 1)
  return stateCopy
})

$formElements.on(moveFormElement, (state, { oldIndex, newIndex }) => {
  const stateCopy = [...state]

  if (newIndex > oldIndex && oldIndex !== newIndex - 1) {
    const elementToMove = stateCopy.splice(oldIndex, 1)[0]
    stateCopy.splice(newIndex - 1, 0, elementToMove)
  }

  if (newIndex < oldIndex) {
    const elementToMove = stateCopy.splice(oldIndex, 1)[0]
    stateCopy.splice(newIndex, 0, elementToMove)
  }

  return stateCopy
})

$formElements.on(updateSelectedFormElement, (state, { id, attributes }) => {
  return state.map((element) =>
    element.id === id
      ? {
          ...element,
          extraAttributes: attributes,
        }
      : element
  )
})

$selectedFormElement.reset(unselectFormElement)
