import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";
vi.mock("vue-router");

const useRouterMock = useRouter as Mock;

import JobFiltersSidebar from "@/components/jobs/jobFilters/JobFiltersSidebar.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import type { Mock } from "vitest";

describe("JobFiltersSidebar", () => {
  const renderJobFiltersSidebar = () => {
    const pinia = createTestingPinia();
    // const router = useRouterMock.mockReturnValue({push as Mock})

    const jobsStore = useJobsStore();
    const userStore = useUserStore();
    vi.mock("userStore");

    render(JobFiltersSidebar, {
      global: {
        plugins: [pinia],
      }
    })
    return {jobsStore, userStore}
  };
  it("displays the clear filters button", () => {
    const { jobsStore, userStore } = renderJobFiltersSidebar();

    const clearButton = screen.getByRole("button", {
      name: /clear filters/i
    });
    expect(clearButton).toBeInTheDocument();
  });
  describe("when 'Clear Filters' button is clicked", () => {
    it("calls the right store action", async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebar();

      const clearButton = screen.getByRole("button", {
        name: /clear filters/i
      });
      
      await userEvent.click(clearButton);
      expect(userStore.clearFilters).toHaveBeenCalled();
    });
    it("re routes to the first page of the results", async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebar();
      // console.log(useRouterMock);
      const router = useRouterMock.mockReturnValue({push: ""});
      // console.log(useRouterMock);
      console.log(router.push);
    });
  });
});