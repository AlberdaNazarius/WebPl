import { HttpMethods } from '@/app/types/enums/HttpMethods';
import { ResponseTypes } from '@/app/types/enums/ResponseTypes';


export interface HttpsRequestOptions {
  url: string;
  req: any;
  res?: any;
  method: HttpMethods;
  data?: any;
  contentType?: string;
  responseType?: ResponseTypes;
}

export interface ApiRequestOptions {
  url: string;
  method: HttpMethods;
  body?: any;
  headers?: any;
  responseType?: ResponseTypes;
  notShowError?: boolean;
  log?: boolean;
}