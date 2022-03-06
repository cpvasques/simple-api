import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiResponse,
	ApiResponseMetadata,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const CommonResponse = (args: ApiResponseMetadata[]) => {
	const decorators: any = [
		ApiBadRequestResponse({ description: 'Bad request' }),
		ApiUnauthorizedResponse({ description: 'Unauthorized' }),
		ApiForbiddenResponse({ description: 'Forbidden' }),
		ApiNotFoundResponse({ description: 'Not found' }),
		ApiNoContentResponse({ description: 'No Content' }),
		ApiResponse({ status: 500, description: 'Server error' }),
	];

	for (const { status, ...options } of args) {
		if (status === 200) decorators.push(ApiOkResponse(options));
		if (status === 201) decorators.push(ApiCreatedResponse(options));
	}

	return applyDecorators(...decorators);
};
