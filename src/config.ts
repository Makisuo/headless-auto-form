import type { InputComponents } from "./types.js"



/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
	[key: string]: keyof InputComponents
} = {
	ZodBoolean: "checkbox",
	ZodDate: "date",
	ZodEnum: "select",
	ZodNativeEnum: "select",
	ZodNumber: "number",
}
