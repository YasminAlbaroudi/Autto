import { useAuth } from "../Context/AuthContext";
import { firestore } from "./Firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

export async function getWorkflows(userID) {
  return getDocs(
    collection(
      firestore,
      "users",
       userID,
      "workflows"
    )
  ).then((docs) => {
    let workflows = [];
    docs.forEach((doc) => {
        //add the doc id to the data
        let data=doc.data();
        data.id=doc.id;
      workflows.push(data);
    });
    return workflows;
  }).catch(
      (err)=>{
          console.log(err);
          alert("Error getting workflows");
      }
  );
}

export async function getWorkflow({userID,workflowID}) {
    return getDoc(
        doc(
            firestore,
            "users",
            userID,
            "workflows",
            workflowID
        )
    ).then((doc) => {
        return doc.data();
    }
    ).catch(
        (err)=>{
            console.log(err);
            alert("Error getting workflow");
        }
    );
}

export async function storeWorkflow({userID,name,desc,icon,nodes,edges}){
   return addDoc(collection(firestore,"users",userID,"workflows"),{
        name:name,
        description:desc,
        icon:icon,
        nodes:nodes,
        edges:edges,
    }).then((docRef)=>{
      return docRef.id;
    }).catch((err)=>{
      console.log(err);
      alert("Error creating workflow");
    });

}

export async function updateWorkflowStructure({userID,workflowID,nodes,edges}){
  console.log("UPDATE STRUCTURE",userID,workflowID,nodes,edges);
  const docRef=doc(firestore,"users",userID,"workflows",workflowID);
  console.log("UPDATE DOC",docRef);
    await updateDoc(docRef,{
        nodes:nodes,
        edges:edges,
    }).catch((err)=>{
      console.log(err);
      alert("Error updating workflow");
    });
}

export async function updateWorkflowMetadata({userID,workflowID,name,description,icon}){

  const docRef=doc(firestore,"users",userID,"workflows",workflowID);
  await updateDoc(docRef,{
    name:name,
    description:description,
    icon:icon,
  }).then(()=>{
    return true;
  }).catch((err)=>{
    console.log(err);
    alert("Error updating workflow");
    return false;
  })
}

export async function deleteWorkflow({userID,workflowID}){
  const docRef=doc(firestore,"users",userID,"workflows",workflowID);
  await deleteDoc(docRef).then(()=>{
    return true;
  }).catch((err)=>{
    console.log(err);
    alert("Error deleting workflow");
    return false;
  })
}