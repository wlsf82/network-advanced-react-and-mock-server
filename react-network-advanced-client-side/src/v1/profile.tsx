import { useEffect, useState } from "react";
import { Friends } from "./friends.tsx";
import { get } from "../utils.ts";
import { About } from "./about.tsx";
import {User} from "../types.ts";

function useService<T>(url: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [data, setData] = useState<T | undefined>(undefined);

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await get<T>(url);
      setData(data);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    fetch,
  };
}

const Profile = ({ id }: { id: string }) => {
  const {
    loading,
    error,
    data: user,
    fetch: fetchUser,
  } = useService<User>(`/users/${id}`);

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      {user && <About user={user} />}
      <Friends id={id} />
    </>
  );
};

export { Profile };
