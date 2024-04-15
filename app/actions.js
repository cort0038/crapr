'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function login(response, token) {
  //set the cookie
  console.log('LOGIN SET', token);
  const expires = new Date(Date.now() + 30 * 1000); //30 seconds expiry for the token cookie
  await response.cookies.set('token', token, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    expires: expires,
  });
}

export async function logout() {
  //clear the cookie
  await cookies().delete('token');
  // await cookies().set('token', '', { expires: new Date(0) });
}

export async function getSession() {
  //get the cookie
  const token = await cookies().get('token'); //token object
  console.log('getSession -', token?.value, token?.value ? 'has cookie token' : 'no cookie token');
  if (!token) return null;
  revalidatePath('/');
  return token;
}

export async function updateSession(request) {
  //refresh the cookie expiry because we navigated
  const token = request.cookies.get('token')?.value;
  //if we needed to extract a new token from search or headers we could do that here
  if (!token) {
    console.log('updateSession - no token cookie');
  }
  if (!token) return;

  // Refresh the session cookie so it doesn't expire
  const expires = new Date(Date.now() + 30 * 1000); //30 seconds
  const resp = NextResponse.next();
  resp.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    expires: expires,
  });
  return resp;
}
