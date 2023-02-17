import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { nextTick } from "vue";
import { useUserStore } from "@/stores/user";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersSidebarSkills from "@/components/jobs/jobFilters/JobFiltersSidebarSkills.vue";

describe("JobFiltersSidebarSkills", () => {
  it("renders the skill input", () => {
    const pinia = createTestingPinia();

    render(JobFiltersSidebarSkills, {
      global: { plugins: [pinia]}
    });

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });
  describe("when user types in a word", () => {
    it("sends the right message to the state", async () => {
      const pinia = createTestingPinia();
      render(JobFiltersSidebarSkills, {
        global: {
          plugins: [pinia]
        }
      });

      const input = screen.getByRole("textbox");
      userEvent.type(input, "Joshua");

      await nextTick();

      const userStore = useUserStore();
      expect(userStore.updateSearch).toHaveBeenCalled()
    });
  });
});