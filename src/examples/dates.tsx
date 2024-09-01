"use client"

import * as z from "zod"
import { AutoForm, AutoFormSubmit } from "../index.js"
import { inputComponents } from "./defaultComponents.js"

const formSchema = z.object({
	birthday: z.coerce.date({
		required_error: "Birthday is required.",
	}),
})

export function DatesAutoFormExample() {
	return (
		<div className="mx-auto my-6 max-w-lg">
			<AutoForm
				inputComponents={inputComponents}
				formSchema={formSchema}
				onSubmit={async (e) => console.log(e)}
				fieldConfig={{
					birthday: {
						description: "We need your birthday to send you a gift.",
					},
				}}
			>
				<AutoFormSubmit>Send now</AutoFormSubmit>
			</AutoForm>
		</div>
	)
}
