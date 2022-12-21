import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, getAccount } from "../features/account/accountSlice";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import ViewItems from "./ViewItems";

const Account = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { response, isLoading, isSuccess, isError, message } = useSelector(state => state.account);

  const [account, setAccount] = useState({});
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (isSuccess || response) {
      setAccount(response.user);
      setItems(response.items);
    }
    if (isError) {
      setError(message);
    }
    dispatch(reset());
  }, [response, isSuccess, isError, message, dispatch]);

  useEffect(() => {
    dispatch(getAccount(params.username));
  }, [params, dispatch]);
  
  if (isLoading) {
    return (
      <main id="account-page">
        <Loader />
      </main>
    );
  } else if (error) {
    return (
      <main id="account-page">
        {error}
      </main>
    );
  }

  return (
    <main id="account-page">
      <div className="account-info">
        <div className="account-name">{account.username}</div>
        <div className="account-age">Created on {new Date(account.created_on).toLocaleString()}</div>
      </div>
      <ViewItems items={items} />
    </main>
  );
}

export default Account;
