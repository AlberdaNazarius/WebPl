import Bottleneck from "bottleneck";
// import {fetchAccessToken} from "@utils/fetchAccessToken";
import axios from "axios";
import { ResponseTypes } from '@/app/types/enums/ResponseTypes';
import { HttpMethods } from '@/app/types/enums/HttpMethods';
import ApiErrorHandler from '@/app/helpers/ApiErrorHandler';
import { ApiRequestOptions, HttpsRequestOptions } from '@/app/types/interfaces/api';
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

// const makeAuthenticatedApiRequest = async (options: ApiRequestOptions) => {
//   let accessToken: string | null = null;
//   if (typeof window !== 'undefined') {
//     accessToken = localStorage.getItem('access_token');
//   }
//   if (!accessToken) {
//     accessToken = await fetchAccessToken();
//   }
//   return await makeApiRequest(options, accessToken);
// }

const makeApiRequest = async (options: ApiRequestOptions, token?: string) => {
  const limiter = new Bottleneck({
    minTime: 1000,
  });
  const {url, method, body, headers} = options;
  const headersParams = headers || defaultHeaders;
  const responseType = options?.responseType || ResponseTypes.JSON;

  if (token) {
    headersParams['Authorization'] = `Bearer ${token}`;
  }

  try {
    let response: any;
    await limiter.schedule(async () => {
      console.log(`${method} request to ${url}`, body ? body : '');
      switch (method) {
        case HttpMethods.GET: {
          if (body) {
            response = await axios.get(`${url}`,{
              params: body,
              headers: headersParams,
              responseType
            });
          } else {
            response = await axios.get(`${url}`, {
              headers: headersParams,
              responseType
            });
          }
          break;
        }
        case HttpMethods.POST: {
          response = await axios.post(`${url}`, body, {
            headers: headersParams,
            responseType
          });
          break;
        }
        case HttpMethods.PATCH: {
          response = await axios.patch(`${url}`, body, {
            headers: headersParams,
            responseType
          });
          break;
        }
        case HttpMethods.DELETE: {
          response = await axios.delete(`${url}`, {
            headers: headersParams,
            responseType
          });
          break;
        }
      }
    });

    if (options.log) {
      console.log('Backend response', response.data);
    }
    return response.data;
  } catch (error) {
    if (!options?.notShowError) {
      ApiErrorHandler.handleError(error);
    }
    throw error;
  }
}

const makeHttpsRequest = async (options: HttpsRequestOptions) => {
  const {req, res, url, method, contentType} = options;
  const headersParams = {
    'Content-Type': `${contentType ? contentType : 'application/json'}`,
    'Accept': '*/*',
  };

  const authHeader = req.headers.authorization;
  if (authHeader) {
    headersParams['Authorization'] = `${authHeader}`;
  }

  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headersParams,
      responseType: options?.responseType || ResponseTypes.JSON,
      ...(req.body && {data: req.body}),
      maxRedirects: 0,
    });

    console.log('Response from backend:', response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 302) {
      try {
        const redirectUrl = error.response.headers.location;

        console.log('Redirecting to:', redirectUrl);

        const redirectResponse = await axios({
          method: HttpMethods.GET,
          url: redirectUrl,
          headers: headersParams
        });

        return res.status(redirectResponse.status).json(redirectResponse.data);
      } catch (redirectError) {
        console.error('Error during redirect:', redirectError);
        if (error.response) {
          return res.status(error.response.status).json({error: error.response.data});
        } else {
          return res.status(500).json({message: 'Internal Server Error'});
        }
      }
    }

    console.error('Error from backend:', error);
    if (error.response) {
      return res.status(error.response.status).json({error: error.response.data});
    } else {
      return res.status(500).json({message: 'Internal Server Error'});
    }
  }
}

const apiService = {
  makeHttpsRequest,
  makeApiRequest,
  // makeAuthenticatedApiRequest
}


export default apiService;