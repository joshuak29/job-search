import { render, screen } from "@testing-library/vue";
import axios from "axios";

import SpotLight from "@/components/jobSearch/SpotLight.vue";

vi.mock("axios");

describe("SpotLight", () => {
	const renderSpotLight = (prop) => {
		render(SpotLight, {
			slots: {
				default: `<template v-slot:default="slotProps">
								<h1> {{ slotProps.${prop} }}</h1>
							</template>`
			}
		});
	}
	const mockResponse = (spotlight = {}) => {
		axios.get.mockResolvedValue({
			data: [
				{
					id: 2,
					img: "some image",
					title: "ohh noo",
					description: "Some desc",
					...spotlight
				},
			],
		});
	}
	it("provides image url to parent component", async () => {
		const spotlight = {img: "image"};
		mockResponse(spotlight);

		renderSpotLight("img");

		const text = await screen.findByText("image");

		expect(text).toBeInTheDocument();
	});
	it("provides the title to parent component", async () => {
		const spotlight = {title: "some title"};
		mockResponse(spotlight);

		renderSpotLight("title");

		const text = await screen.findByText("some title");

		expect(text).toBeInTheDocument();
	});
	it("provides the description to parent component", async () => {
		mockResponse();
		
		renderSpotLight("description");

		const text = await screen.findByText("Some desc");

		expect(text).toBeInTheDocument();
	});
});