import { useSession } from "next-auth/react";

const User: React.FC = () => {
  //   const { data: session } = useSession();
  return (
    <div className="">
      User
      {/* <img src="" alt="" /> */}
      {/* {
        session ? <div>
            <img src={session.user?.image} alt="" />
            <h4>{session.user.name}</h4>
        </div>
      } */}
    </div>
  );
};

export default User;
