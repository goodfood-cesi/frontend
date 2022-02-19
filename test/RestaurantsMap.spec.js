import { mount } from "@vue/test-utils"
import RestaurantsMap from "@/components/restaurants/Map.vue"

describe("RestaurantsMap", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(RestaurantsMap)
    expect(wrapper.vm).toBeTruthy()
  })
})
