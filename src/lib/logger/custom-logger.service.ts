import { ConsoleLogger } from '@nestjs/common';
import * as Sentry from '@sentry/node';

export class CustomLogger extends ConsoleLogger {
  error(message: any, stack: any, context = 'social'): void {
    const errorStack = stack;
    console.log(`[${context}] ${message}`);
    console.error(errorStack);

    if (stack instanceof Error) {
      errorStack.name = `[${stack.name}] ${message}`;
    }

    Sentry.captureException(errorStack, {
      tags: { context },
      extra: { errorMessage: message, errorDetails: stack },
    });
  }
}
