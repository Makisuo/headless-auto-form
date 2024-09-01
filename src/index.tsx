"use client"

import { type FormApi, useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { ZodError, type z } from "zod"
import type { AutoFormInputComponentProps, FieldConfig, InputComponents, ZodObjectOrWrapped } from "./types.js"

import { cn } from "@pixelshades/cn"
import { type ForwardedRef, type ReactElement, type ReactNode, forwardRef } from "react"
import { AutoFormObject } from "./fields/auto-form-object.js"
import { FormProvider, useFormContext } from "./form-provider.js"
import { getObjectFormSchema, minDelay } from "./utils.js"

export type { ZodObjectOrWrapped }

export type OnSubmit<SchemaType extends ZodObjectOrWrapped> = (data: {
	value: z.infer<SchemaType>
	formApi: FormApi<z.infer<SchemaType>, ReturnType<typeof zodValidator>>
}) => Promise<any>

export type AutoFormProps<SchemaType extends ZodObjectOrWrapped> = {
	className?: string
	formSchema: SchemaType
	defaultValues?: Partial<z.infer<SchemaType>>

	onSubmit?: OnSubmit<SchemaType>
	onSubmitInvalid?: OnSubmit<SchemaType>

	children?: ReactNode
	innerClassName?: string

	debounceMs?: number

	inputComponents: InputComponents

	onError?: (errorString: string) => void

	fieldConfig?: FieldConfig<z.infer<SchemaType>>
}

export const BaseAutoForm = <SchemaType extends ZodObjectOrWrapped>(
	{
		className,
		formSchema,
		debounceMs,
		defaultValues,
		children,
		innerClassName,
		fieldConfig,
		onSubmit: onSubmitProp,
		onSubmitInvalid,
	
		inputComponents,

		onError,
	}: AutoFormProps<SchemaType>,
	ref: ForwardedRef<HTMLFormElement>,
) => {
	const form = useForm({
		asyncDebounceMs: debounceMs,
		defaultValues,
		onSubmit: onSubmit,
		onSubmitInvalid: onSubmitInvalid,
		validatorAdapter: zodValidator(),
	})

	function onSubmit(data: {
		value: z.infer<SchemaType>
		formApi: FormApi<z.infer<SchemaType>, ReturnType<typeof zodValidator>>
	}) {
		try {
			const parsedData = formSchema.parse(data.value)

			onSubmitProp?.({ formApi: data.formApi, value: parsedData })
		} catch (error: unknown) {
			if (error instanceof ZodError) {
				onError?.(error.message)
				return
			}
		}
	}

	const objectFormSchema = getObjectFormSchema(formSchema)

	return (
		<div className={cn("w-full", className)}>
			<FormProvider form={form}>
				<form
					ref={ref}
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()

						form.handleSubmit()
					}}
				>
					<AutoFormObject inputComponents={inputComponents} className={innerClassName} schema={objectFormSchema} fieldConfig={fieldConfig} />

					{children}
				</form>
			</FormProvider>
		</div>
	)
}

function AutoFormSubmit({
	children,
}: {
	children?: ReactNode
}) {
	const form = useFormContext()

	return (
		<form.Subscribe
			selector={(state) => [state.canSubmit, state.isSubmitting]}
			// biome-ignore lint/correctness/noChildrenProp: <explanation>
			children={([canSubmit, isSubmitting]) => children}
		/>
	)
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
function fixedForwardRef<T, P = {}>(
	render: (props: P, ref: React.Ref<T>) => React.ReactNode,
): (props: P & React.RefAttributes<T>) => React.ReactNode {
	return forwardRef(render as any) as any
}

const AutoForm = fixedForwardRef(BaseAutoForm)

export { AutoForm, AutoFormSubmit }

export type * from "./types.js"

export { getBaseSchema, getBaseType } from "./utils.js"
