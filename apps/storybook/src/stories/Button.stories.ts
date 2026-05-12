import type { Meta, StoryObj } from "@storybook/vue3"
import { BaseButton } from "@repo/ui"

const meta: Meta<typeof BaseButton> = {
  title: "UI/BaseButton",
  component: BaseButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] }
  }
}

export default meta
type Story = StoryObj<typeof BaseButton>

export const Primary: Story = {
  args: { label: "Button", variant: "primary" }
}

export const Secondary: Story = {
  args: { label: "Button", variant: "secondary" }
}
