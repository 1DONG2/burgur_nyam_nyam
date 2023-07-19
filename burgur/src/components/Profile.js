import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onChange = (event) =>{
    const{
      target: {value},
    } = event;
    setNewDisplayName(value);
  }

  const onLogOutClick = async () => {
    try {
      await authService.signOut();
      navigate("/");
    } catch (error) {
      // Handle any error that occurs during logout
      console.log("Error occurred during logout:", error);
    }
  };

  // const getMyNweets = async () => {
  //   const nweets = await dbService.collection("nweets")
  //   .where("creatorId", "==", userObj.uid)
  //   .orderBy("createdAt", "asc").get();

  //   console.log(nweets.docs.map((doc) => doc.data()));
  // };

  // useEffect(() => {
  //   getMyNweets();
  // }, []);

  const  onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName){
      await userObj.updateProfile({displayName: newDisplayName});
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" placeholder="수정할 이름" 
        value={newDisplayName} />
        <input type="submit" value="수정"/>
      </form>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};

export default Profile;
