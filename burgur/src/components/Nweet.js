import React from 'react';
import { dbService, storageService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function Nweet({ nweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      await deleteDoc(doc(dbService, 'nweets', `${nweetObj.id}`));
      const desertRef = ref(storageService, nweetObj.attachmentUrl);
      await deleteObject(desertRef);
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div className='nweet'>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className='container nweetEdit'>
            <input
              type='text'
              placeholder='수정해보세요'
              value={newNweet}
              required
              onChange={onChange}
              autoFocus
              className='formInput'
            />
            <input type='submit' value='Update' className='formBtn' />
          </form>
          <span onClick={toggleEditing} className='formBtn cancelBtn'>
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} alt='attachment' />
          )}
          {isOwner && (
            <div className='nweet__actions'>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Nweet;
