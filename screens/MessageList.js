import { query, onSnapshot, getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState, Fragment} from 'react';
import { db } from '../firebase';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity, 
  Text,
  Image,
  FlatList,
  View,
  Dimensions,
} from 'react-native';

const MessageScreen = ({navigation,route})=>{
    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width;

      const [notiUsers, setNotiUsers] = useState([])
      const [Users, setUsers] = useState([])

      useEffect(() => {
        const getUserContacts = () => {
          const q = query(doc(db, "users", route.params.user_id));
          const unsubscribe = onSnapshot(q,  async(snapshot) => {
            const contactsObject = snapshot.data().realFriend;
            const contactsSnap = await Promise.all(contactsObject.map((c) => getDoc(doc(db, "users",c))))
            const contactDetails = contactsSnap.map((d)=> ({
              id: d.uid,
              ...d.data()
            }))
            setNotiUsers(contactDetails);
          })}
      
      
        getUserContacts();
      }, [navigation])

    return(
      <Fragment>
      <View style={{backgroundColor: '#F8B000',flex:1, alignItems: 'center'}}>
      <Image source={require('../assets/download.png')} style={styles.backgroundImage} />
          <View style={styles.Container}>
              <FlatList
                  data={notiUsers}
                  renderItem={({item}) => (
                  <TouchableOpacity onPress={() => navigation.navigate('Chat', {name: item.name, uid: item.uid, avatar:item.avatar})} >
                      <View style={styles.card} >
                          <Image style={styles.userImageST} source={{uri: item.avatar}} />
                        <View style={styles.textArea}>
                      <Text style={styles.nameText} >{item.name}</Text>
                      <Text style={styles.msgContent} >{item.email}</Text>
                      </View>
                      </View>
                      </TouchableOpacity>
                  )}
                  />
          </View>
      </View>
      </Fragment>
     
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4E50F7',
    alignItems: 'center',
    justifyContent: 'center',
},
backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
},
    Contain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
  Container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    height: 'auto',
    marginHorizontal: 30,
    marginVertical: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImage: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImageST: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }, 
  textArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    width: 300,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'Verdana'
  },
  msgTime: {
    textAlign: 'right',
    fontSize: 11,
    marginTop: -20,
  },
  msgContent: {
    paddingTop: 5,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

})

export default MessageScreen;
