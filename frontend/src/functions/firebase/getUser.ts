import { User } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../../firebase';

const getFirebaseUser = async (username: string) => {
  const q = query(
    collection(db, 'users'),
    where('displayName', '==', username)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs[0]?.data() !== undefined) {
    return querySnapshot.docs[0]?.data() as User;
  } else {
    return undefined;
  }
};

export default getFirebaseUser;
