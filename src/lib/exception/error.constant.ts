import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export interface ErrorObject<T> {
  errorCode: T;
  message: string;
  status: HttpStatus;
}

const dynamicRecord = <T extends { [key in keyof T]: ErrorObject<key> }>(
  errorObject: T,
): T & Record<string, ErrorObject<keyof T>> => errorObject;

export const isErrorObject = (object: object): object is ErrorObject<string> => {
  return typeof object === 'object' && object !== null && 'errorCode' in object && 'message' in object;
};

export const ERROR_CODE = dynamicRecord({
  /**
   * 공통
   */
  INVALID_DATA: { errorCode: 'INVALID_DATA', message: '입력값이 올바르지 않습니다.', status: HttpStatus.BAD_REQUEST },
  INTERNAL_SERVER_ERROR: {
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: '서버에 오류가 발생했습니다.',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },

  /**
   * 앨범
   */
  SHARE_ALBUM_NOT_FOUND: {
    errorCode: 'SHARE_ALBUM_NOT_FOUND',
    message: '앨범을 찾을 수 없습니다.',
    status: HttpStatus.NOT_FOUND,
  },
  SHARE_ALBUM_INVITE_CODE_NOT_FOUND: {
    errorCode: 'SHARE_ALBUM_INVITE_CODE_NOT_FOUND',
    message: '초대코드를 찾을 수 없습니다.',
    status: HttpStatus.NOT_FOUND,
  },
  SHARE_ALBUM_MEMBER_NOT_FOUND: {
    errorCode: 'SHARE_ALBUM_MEMBER_NOT_FOUND',
    message: '멤버를 찾을 수 없습니다.',
    status: HttpStatus.NOT_FOUND,
  },
});

// 스웨거 Exception Description을 위한 데코레이터
export const GenerateSwaggerDocumentByErrorCode = (errorList: ErrorObject<string>[]) => {
  const badRequest = errorList
    .filter((error) => error.status === HttpStatus.BAD_REQUEST)
    .map((error) => `${error.errorCode}: ${error.message}`)
    .join('</br>');
  const notFound = errorList
    .filter((error) => error.status === HttpStatus.NOT_FOUND)
    .map((error) => `${error.errorCode}: ${error.message}`)
    .join('</br>');
  const internalServerError = errorList
    .filter((error) => error.status === HttpStatus.INTERNAL_SERVER_ERROR)
    .map((error) => `${error.errorCode}: ${error.message}`)
    .join('</br>');

  return applyDecorators(
    ApiBadRequestResponse({ description: badRequest }),
    ApiNotFoundResponse({ description: notFound }),
    ApiInternalServerErrorResponse({ description: internalServerError }),
  );
};
