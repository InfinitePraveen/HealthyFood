
import {
  Body,
  Controller,
  Post,
  ServiceUnavailableException,
  BadRequestException
} from '@nestjs/common';

interface InteractionRequest {
  medications?: string[];
  foods?: string[];
  medication_data_complete?: boolean;
}

@Controller('v1/interactions')
export class InteractionsController {
  @Post('evaluate')
  async evaluate(@Body() body: InteractionRequest) {
    if (
      !body ||
      !Array.isArray(body.medications) ||
      !Array.isArray(body.foods)
    ) {
      throw new BadRequestException(
        'medications and foods must be arrays'
      );
    }

    const clinicalEngineUrl =
      process.env.CLINICAL_ENGINE_URL ?? 'http://localhost:8001';

    try {
      const response = await fetch(
        `${clinicalEngineUrl}/v1/interactions/evaluate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            medications: body.medications,
            foods: body.foods,
            medication_data_complete:
              body.medication_data_complete ?? false
          }),
          signal: AbortSignal.timeout(5000)
        }
      );

      if (!response.ok) {
        throw new Error(
          `Clinical Engine returned HTTP ${response.status}`
        );
      }

      return await response.json();
    } catch {
      throw new ServiceUnavailableException({
        status: 'UNVERIFIED',
        message:
          'Clinical evaluation is unavailable. Do not assume the meal is safe.'
      });
    }
  }
}
