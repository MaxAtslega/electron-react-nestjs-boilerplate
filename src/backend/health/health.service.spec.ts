import { Test, TestingModule } from '@nestjs/testing'
import { HealthService } from './health.service'

describe('HealthService', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [HealthService],
    }).compile()
  })

  describe('Health check', () => {
    it('should return "OK"', () => {
      const result = app.get<HealthService>(HealthService).sendOk()
      expect(result).toBe('OK')
    })
  })
})
