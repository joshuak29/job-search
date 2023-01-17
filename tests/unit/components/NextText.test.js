import {describe, it, expect} from "vitest";
import NextText from "@/utils/NextText.js";

describe(("nextText"), () => {
	it(("renders the next text in list"), () => {
		const list = ['a', 'b', 'c', 'd', 'e'];
		const val = 'b';
		const newVal = NextText(list, val)
		expect(newVal).toBe('c')
	})
	it(("renders the first after the last"), () => {
		const list = ['a', 'b', 'c', 'd', 'e'];
		const val = 'e';
		const newVal = NextText(list, val)
		expect(newVal).toBe('a')
	})
})