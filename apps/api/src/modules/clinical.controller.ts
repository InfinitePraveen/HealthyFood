import { Body, Controller, Post, ServiceUnavailableException } from '@nestjs/common';

@Controller('v1/interactions')
export class ClinicalController {
  @Post('evaluate')
  async evaluate(@Body() body: { medications?: string[]; foods?: string[] }) {
    const base = process.env.CLINICAL_ENGINE_URL ?? 'http://localhost:8001';
    try {
      const response = await fetch(`${base}/v1/interactions/evaluate`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body ?? {})
      });
      if (!response.ok) throw new Error(`Clinical engine returned ${response.status}`);
      return await response.json();
    } catch {
      throw new ServiceUnavailableException({
        status: 'UNVERIFIED',
        message: 'Clinical evaluation is unavailable. Do not assume the meal is safe.'
      });
    }
  }
}
