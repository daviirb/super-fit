import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { auth } from '@/auth';

import logout from '../_logout/logoutAction';
import { HomeClient } from './home/_components/HomeClient';

type HomeProps = {
  children: ReactNode;
};

export default async function HomeLayout({ children }: HomeProps) {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }
  const name = session.user?.name;

  return (
    <HomeClient userName={name!} onLogout={logout}>
      {children}
    </HomeClient>
  );
}
