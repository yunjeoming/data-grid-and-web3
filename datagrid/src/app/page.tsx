import { Users } from '@/features/users';
import { UserService } from '@/services/users';

export default async function Home() {
  const users = (await UserService.getUsers()) || [];

  return (
    <main className="h-screen w-full flex justify-center">
      <div className="h-full p-8">
        <Users data={users} />
      </div>
    </main>
  );
}
