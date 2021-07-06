import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { db } from '../fireconfig'
import PlaceDetails from '../components/PlaceDetails';
import CommentModal from '../components/CommentModal';
import {UserContext} from '../providers/fire'
function PostDetails({ route, navigation }) {
  const [commentData, setCommentData] = useState();
  const [modalVisable, setModalVisable] = useState(false);
  const [comment, setComment] = useState('');
  const { item } = route.params;

  async function fetchData() {
    let data = []
    const dataRef = db.collection('places').doc(item.docID).collection('comments')
    const snapshot = await dataRef.get()

    if (snapshot.empty) {
      console.log('NADA');
      return;
    }
    snapshot.forEach(doc => {
      let tempDoc = doc.data()
      tempDoc['docID'] = doc.id
      data.push(tempDoc)
    })
    return data
  }

  async function setData() {
    const data = await fetchData()
    setCommentData(data)

  }

  useEffect(() => {
    setData()
  }, [])

  console.log(commentData)

  const handleCommentPost = () => {
    console.log('ran')
    db.collection('places').doc(item.docID).collection('comments').add({
      content: comment,
      user: 'Daniel Bobwishyman'
    })

    db.collection('places').doc(item.docID).update({
      commentnum: item.commentnum + 1
    })

    setModalVisable(false);
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <PlaceDetails item={item} />
      <View style={{ paddingTop: 0, backgroundColor: 'white', marginTop: 0 }}>
        <CommentModal handleCommentPost={handleCommentPost} comment={comment} setComment={setComment} modalVisable={modalVisable} setModalVisable={setModalVisable} />
      </View>
      {commentData ?
        <View style={{ paddingTop: 10, backgroundColor: 'white' }}>
          {commentData.map((element, index) => {
            return (
              <View key={index} style={{ flexDirection: 'row' }}>
                <Text>{element.user}: </Text>
                <Text >{element.content}</Text>
              </View>
            )
          })}
        </View>
        : <Text>No data</Text>}

    </ScrollView>
  );
}

export default PostDetails;