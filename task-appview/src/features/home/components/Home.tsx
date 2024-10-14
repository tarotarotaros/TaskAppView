import { UserService } from "../../../infrastructures/UserService";
import SideMenuWithHeader from "../../menu/components/SideMenuWithHeader";

const Home = () => {

  return (
    <div>
      <SideMenuWithHeader userService={new UserService()} />
    </div>
  );
};

export default Home;
