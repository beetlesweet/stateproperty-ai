import { POST } from '../app/api/generate-hooks/route'
import { generateText } from 'ai'

jest.mock('ai', () => ({
  generateText: jest.fn(),
}))

describe('generate-hooks API', () => {
  it('parses JSON from generateText', async () => {
    const mockedGenerateText = generateText as jest.MockedFunction<typeof generateText>
    mockedGenerateText.mockResolvedValue({ text: JSON.stringify([{ id: 'hook1', text: 't', description: 'd' }]) })
    const req = new Request('http://localhost/api/generate-hooks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productInput: 'info', productUrl: 'url' }),
    })
    const res = await POST(req)
    const data = await res.json()
    expect(data).toEqual({ hooks: [{ id: 'hook1', text: 't', description: 'd' }] })
  })
})
