import {render, screen} from '@testing-library/vue';
import { nextTick } from "vue"
import TheHeadline from "@/components/TheHeadline.vue";

describe("TheHeadline", () => {
	/* it("tracks wether the mock function has been called", () => {
		/* const mockFunction = vi.fn(); //the vi.fn() vitest mock function can be tracked eg if it has been called or the arguments it was called with
		mockFunction()
		expect(mockFunction).toHaveBeenCalledWith();
		
		
	}) */
	beforeEach(() => {
		vi.useFakeTimers() //use vitest time instead of trying to wait for the real time before each test
	})
	afterEach(() => {
		vi.useRealTimers() //cleanup fake timers after each test
	})
	it("displays initial text", () => {
		// vi.useFakeTimers(); //use vitest time instead of trying to wait for the real time
		render(TheHeadline);
		
		const text = screen.getByRole("heading", {
			name: /build for everyone/i
		});
		expect(text).toBeInTheDocument();
		// vi.useRealTimers(); //cleanup the fake timers
	});
	it("changes text according to the setInterval", () => {
		const mock = vi.fn(); //initilize a mock function
		vi.stubGlobal("setInterval", mock); //swipe setInterval with mock
		
		render(TheHeadline);
		
		expect(mock).toHaveBeenCalled();
		
	});
	it("swaps the text", async () => {
		render(TheHeadline);
		vi.advanceTimersToNextTimer(); //run all the setInerval(s) once
		
		await nextTick(); //wait for the component to update before assertion
		const text = screen.getByRole("heading", {
			name: /code for everyone/i
		});
		
		expect(text).toBeInTheDocument()
		
	})
	it("clears interval after unMount", () => {
		const clearIntervalMock = vi.fn();
		vi.stubGlobal("clearInterval", clearIntervalMock);
		
		const { unmount } = render(TheHeadline);
		unmount()
		
		expect(clearIntervalMock).toHaveBeenCalled();
	})
})
