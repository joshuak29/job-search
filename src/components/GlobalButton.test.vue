import { render, screen } from "@testing-library/vue";
import {describe, it, expect} from "vitest";

import GlobalButton from "@/components/GlobalButton.vue";

describe("GlobalButton" () => {
	it("renders text", () => {
		render(GlobalButton, {
			props: {
				text: "Click Me",
				type: "primary"
			}
		});
		const button = screen.geByRole('buttton', {
			name: /click me/i
		});
		expect(button).toBeInTheDocument();
	})
	it("applies a class", () => {
		render(GlobalButton, {
			props: {
				text: "Search",
				type: "secondary"
			}
	}
		})
		button = screen.queryByRole('button', {
			name: /search/i,
		})
		expect(button).toHaveClass("secondary")
		
	})
})