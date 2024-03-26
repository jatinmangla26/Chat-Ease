import { BiLogOut } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { signInStart, logOutSuccess } from "../../redux/userSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const logout = async () => {
    dispatch(signInStart());
    try {
      const res = await fetch("https://chat-ease-qx9h.onrender.com/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        dispatch(signInFailure(data.error));
        return;
      }
      dispatch(logOutSuccess());
    } catch (err) {
      console.log(err);
      dispatch(signInFailure(err));
      return;
    }
  };
  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={logout} />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default LogoutButton;
