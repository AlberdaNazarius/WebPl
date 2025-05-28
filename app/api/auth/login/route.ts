import ApiService from '@/app/services/api.service';
import { HttpMethods } from '@/app/types/enums/HttpMethods';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const response = await ApiService.makeHttpsRequest({
    url: `${process.env.NEXT_PRIVATE_HOST_API}/auth/login`,
    method: HttpMethods.POST,
    req: req

  });

  return NextResponse.json({data: response});
}