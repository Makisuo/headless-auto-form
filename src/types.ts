import type { FieldApi, FieldValidators } from "@tanstack/react-form"
import type * as z from "zod"
import type { ComponentType } from "react"

export type InputComponents = {
	checkbox: ComponentType<AutoFormInputComponentProps>,
	date: ComponentType<AutoFormInputComponentProps>,
	select: ComponentType<AutoFormInputComponentProps>,
	combobox: ComponentType<AutoFormInputComponentProps>,
	radio: ComponentType<AutoFormInputComponentProps>,
	switch: ComponentType<AutoFormInputComponentProps>,
	textarea: ComponentType<AutoFormInputComponentProps>,
	number: ComponentType<AutoFormInputComponentProps>,
	fallback: ComponentType<AutoFormInputComponentProps>,
}

export type ZodObjectOrWrapped = z.ZodObject<any, any> | z.ZodEffects<z.ZodObject<any, any>>

export type FieldConfigItem = {
	description?: React.ReactNode
	inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
		showLabel?: boolean
	}
	fieldType?: keyof InputComponents | React.FC<AutoFormInputComponentProps>

	renderParent?: (props: {
		children: React.ReactNode
	}) => React.ReactElement | null

	fieldValidators?: Omit<FieldValidators<any, any>, "onChange">
}

export type FieldConfig<SchemaType extends z.infer<z.ZodObject<any, any>>> = {
	// If SchemaType.key is an object, create a nested FieldConfig, otherwise FieldConfigItem
	[Key in keyof SchemaType]?: SchemaType[Key] extends object ? FieldConfig<z.infer<SchemaType[Key]>> : FieldConfigItem
}

export enum DependencyType {
	DISABLES = 0,
	REQUIRES = 1,
	HIDES = 2,
	SETS_OPTIONS = 3,
}

type BaseDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> = {
	sourceField: keyof SchemaType
	type: DependencyType
	targetField: keyof SchemaType
	when: (sourceFieldValue: any, targetFieldValue: any) => boolean
}

export type ValueDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> = BaseDependency<SchemaType> & {
	type: DependencyType.DISABLES | DependencyType.REQUIRES | DependencyType.HIDES
}

export type EnumValues = readonly [string, ...string[]]

export type OptionsDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> = BaseDependency<SchemaType> & {
	type: DependencyType.SETS_OPTIONS

	// Partial array of values from sourceField that will trigger the dependency
	options: EnumValues
}

export type Dependency<SchemaType extends z.infer<z.ZodObject<any, any>>> =
	| ValueDependency<SchemaType>
	| OptionsDependency<SchemaType>

/**
 * A FormInput component can handle a specific Zod type (e.g. "ZodBoolean")
 */
export type AutoFormInputComponentProps = {
	zodInputProps: React.InputHTMLAttributes<HTMLInputElement>
	field: FieldApi<any, any>
	fieldConfigItem: FieldConfigItem
	label: string
	isRequired: boolean
	fieldProps: any
	zodItem: z.ZodAny
	className?: string
}