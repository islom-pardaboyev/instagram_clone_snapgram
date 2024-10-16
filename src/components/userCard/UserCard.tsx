import { useFollowMutation } from "../../redux/api/users-api";
import { User } from "../../types";

type Props = {
  item: User;
};

function UserCard({ item }: Props) {
  const { fullName, photo, username } = item;
  const [follow] = useFollowMutation();
   
  
  return (
   
  );
}

export default UserCard;
