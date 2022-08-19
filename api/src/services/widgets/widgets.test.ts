import {
  widgets,
  widget,
  createWidget,
  updateWidget,
  deleteWidget,
} from './widgets'
import type { StandardScenario } from './widgets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('widgets', () => {
  scenario('returns all widgets', async (scenario: StandardScenario) => {
    const result = await widgets()

    expect(result.length).toEqual(Object.keys(scenario.widget).length)
  })

  scenario('returns a single widget', async (scenario: StandardScenario) => {
    const result = await widget({ id: scenario.widget.one.id })

    expect(result).toEqual(scenario.widget.one)
  })

  scenario('creates a widget', async () => {
    const result = await createWidget({
      input: { name: 'String813390' },
    })

    expect(result.name).toEqual('String813390')
  })

  scenario('updates a widget', async (scenario: StandardScenario) => {
    const original = await widget({ id: scenario.widget.one.id })
    const result = await updateWidget({
      id: original.id,
      input: { name: 'String95714852' },
    })

    expect(result.name).toEqual('String95714852')
  })

  scenario('deletes a widget', async (scenario: StandardScenario) => {
    const original = await deleteWidget({ id: scenario.widget.one.id })
    const result = await widget({ id: original.id })

    expect(result).toEqual(null)
  })
})
