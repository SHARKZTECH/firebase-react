import './App.css';
import {useState,useEffect} from "react"
import {db} from "./firebase";
import {collection, getDocs,addDoc,deleteDoc,doc,updateDoc} from "firebase/firestore"
import {Card,Button, Container,Form} from "react-bootstrap"

function App() {
  const [name,setName]=useState('')
  const [age,setAge]=useState(0)

  const [users,setUsers]=useState([])
  const usersColl=collection(db,"users")

  const createUser= async (e)=>{
      e.preventDefault();
      if(name==="" || age===0){
         alert("fill all fields")
      }else{
        await addDoc(usersColl,{name:name,age:Number(age)});
        setName('')
        setAge(0) 
      }     
  }

  const deleteUser=async (id)=>{
    const userDoc=doc(db,"users",id)
    await deleteDoc(userDoc)
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };
  useEffect(()=>{
    const getUsers=async ()=>{
      const data= await getDocs(usersColl);
      setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
    }
    getUsers()
  },[users,age]);

  return (
    <Container>
      <Form onSubmit={createUser}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter name..."
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control 
          type="number" 
          placeholder="Enter age..."
          value={age}
          onChange={(event) => {
            setAge(event.target.value);
          }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 mb-3">Create User</Button>
      </Form>
     
           {users?.map((user)=>(
          <Card key={user.id} className="mb-3">
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Subtitle>{user.age}</Card.Subtitle>
              <Button
               variant="primary"
                className="m-1"
                onClick={()=>updateUser(user.id,user.age)}
                >Edit</Button>
              <Button variant="danger" onClick={()=>deleteUser(user.id)}>Delete</Button>{' '}
            </Card.Body>
          </Card>
        )
       )}
    </Container>
  );
}

export default App;
