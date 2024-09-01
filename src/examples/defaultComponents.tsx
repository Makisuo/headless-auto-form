import { getLocalTimeZone, parseAbsolute, parseDateTime } from "@internationalized/date"
import { Checkbox, DatePicker, type DateValue, Select, TextField } from "@pixelshades/ui/components"
import { useMemo } from "react"
import type { z } from "zod"
import { getBaseSchema } from "../index.js"
import type { InputComponents } from "../types.js"

export const transformEnumValues = (values: any) => {
	if (!Array.isArray(values)) {
		return Object.entries(values)
	}

	return values.map((value) => [value, value])
}

export const inputComponents: InputComponents = {
	checkbox: ({ label, isRequired, field, fieldConfigItem, fieldProps }) => {
		return (
			<Checkbox
				onChange={field.handleChange}
				onBlur={field.handleBlur}
				defaultSelected={field.state.value}
				label={label}
				isRequired={isRequired}
				helperText={fieldConfigItem.description}
				{...fieldProps}
			/>
		)
	},
	date: ({ label, isRequired, field, fieldConfigItem, fieldProps }) => {
		const { ...fieldPropsWithoutShowLabel } = fieldProps

		const parsedValue = useMemo(() => {
			if (field.state.value) {
				let dateVal: DateValue
				try {
					dateVal = parseAbsolute(field.state.value.toISOString(), getLocalTimeZone())
				} catch (err) {
					dateVal = parseDateTime(field.state.value.toISOString())
				}

				return dateVal
			}

			return undefined
		}, [field.state.value])

		return (
			<DatePicker
				defaultValue={parsedValue}
				onChange={(v) => field.handleChange(v.toDate(getLocalTimeZone()))}
				onBlur={field.handleBlur}
				isRequired={isRequired}
				granularity="day"
				label={label}
				helperText={fieldConfigItem.description}
				{...fieldPropsWithoutShowLabel}
			/>
		)
	},
	select: ({ label, isRequired, field, fieldConfigItem, zodItem, fieldProps }) => {
		const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def.values

		const values = transformEnumValues(baseValues)

		return (
			<Select
				label={label}
				helperText={fieldConfigItem.description}
				isRequired={isRequired}
				onSelectionChange={field.handleChange}
				onBlur={field.handleBlur}
				placeholder="Select an option"
				defaultSelectedKey={field.state.value}
				{...fieldProps}
			>
				{values.map(([label, value]) => (
					<Select.Item key={value} id={value}>
						{label}
					</Select.Item>
				))}
			</Select>
		)
	},
	combobox: ({ field, label, isRequired, fieldConfigItem, fieldProps }) => {
		const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
		const showLabel = _showLabel === undefined ? true : _showLabel
		const type = fieldProps.type || "text"

		return (
			<TextField
				type={type}
				value={field.state.value}
				onChange={field.handleChange}
				onBlur={field.handleBlur}
				validationBehavior="aria"
				label={showLabel ? label : undefined}
				isRequired={isRequired}
				helperText={fieldConfigItem.description}
				{...fieldPropsWithoutShowLabel}
			/>
		)
	},
	radio: ({ field, label, isRequired, fieldConfigItem, fieldProps }) => {
		const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
		const showLabel = _showLabel === undefined ? true : _showLabel
		const type = fieldProps.type || "text"

		return (
			<TextField
				type={type}
				value={field.state.value}
				onChange={field.handleChange}
				onBlur={field.handleBlur}
				validationBehavior="aria"
				label={showLabel ? label : undefined}
				isRequired={isRequired}
				helperText={fieldConfigItem.description}
				{...fieldPropsWithoutShowLabel}
			/>
		)
	},
	switch: ({ field, label, isRequired, fieldConfigItem, fieldProps }) => {
		const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
		const showLabel = _showLabel === undefined ? true : _showLabel
		const type = fieldProps.type || "text"

		return (
			<TextField
				type={type}
				value={field.state.value}
				onChange={field.handleChange}
				onBlur={field.handleBlur}
				validationBehavior="aria"
				label={showLabel ? label : undefined}
				isRequired={isRequired}
				helperText={fieldConfigItem.description}
				{...fieldPropsWithoutShowLabel}
			/>
		)
	},
	textarea: ({ field, label, isRequired, fieldConfigItem, fieldProps }) => {
		const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
		const showLabel = _showLabel === undefined ? true : _showLabel
		const type = fieldProps.type || "text"

		return (
			<TextField
				type={type}
				value={field.state.value}
				onChange={field.handleChange}
				onBlur={field.handleBlur}
				validationBehavior="aria"
				label={showLabel ? label : undefined}
				isRequired={isRequired}
				helperText={fieldConfigItem.description}
				{...fieldPropsWithoutShowLabel}
			/>
		)
	},
	number: ({ field, label, isRequired, fieldConfigItem, fieldProps }) => {
		const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
		const showLabel = _showLabel === undefined ? true : _showLabel
		const type = fieldProps.type || "text"

		return (
			<TextField
				type={type}
				value={field.state.value}
				onChange={field.handleChange}
				onBlur={field.handleBlur}
				validationBehavior="aria"
				label={showLabel ? label : undefined}
				isRequired={isRequired}
				helperText={fieldConfigItem.description}
				{...fieldPropsWithoutShowLabel}
			/>
		)
	},
	fallback: ({ field, label, isRequired, fieldConfigItem, fieldProps }) => {
		const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
		const showLabel = _showLabel === undefined ? true : _showLabel
		const type = fieldProps.type || "text"

		return (
			<TextField
				type={type}
				value={field.state.value}
				onChange={field.handleChange}
				onBlur={field.handleBlur}
				validationBehavior="aria"
				label={showLabel ? label : undefined}
				isRequired={isRequired}
				helperText={fieldConfigItem.description}
				{...fieldPropsWithoutShowLabel}
			/>
		)
	},
}
