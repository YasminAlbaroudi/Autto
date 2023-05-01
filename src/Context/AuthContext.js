import { createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updateProfile } from 'firebase/auth';
import React from 'react';
import {auth,googleProvider,firestore} from "../Firebase/Firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"; 
// import { initializeApp } from "firebase/app";
const AuthContext=React.createContext();

export function useAuth()
{
    return React.useContext(AuthContext);
}
export function AuthProvider({children}){
    const [currentUser,setCurrentUser]=React.useState();
    const [authLoading,setAuthLoading]=React.useState(true);
    React.useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged(user=>{
            setCurrentUser(user);
            setAuthLoading(false);
        })
        return unsubscribe;
    },[])
    async function signUpEmail(email,password,firstName,lastName){
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {displayName: firstName+" "+lastName});
            const id= userCredential.user.uid;
            const userDocRef= doc(firestore, "users", id);
            await setDoc(userDocRef, {
                uid: id, 
                email: email,
                firstName: firstName,
                lastName: lastName,
            });
            await addDoc(collection(userDocRef, "workflows"), {
                name: "My First Workflow",
                description: "This is my first workflow",
                nodes:`[{"id":"1Ipedhb7p_h_JnWMZLswy","position":{"x":-2.90911865234375,"y":274},"type":"customComponent","data":{"label":"Start","function":{"id":5,"name":"Start","params":[],"description":"Initial workflow block","icon":{"type":{"type":{},"compare":null},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}},"category":"Trigger","connections":{"inbound":[],"outbound":[{"type":"then","val":""}]}}},"width":162,"height":92,"selected":false,"positionAbsolute":{"x":-2.90911865234375,"y":274},"dragging":false},{"id":"o1Pos5CiP4-HOP1aiZEHA","position":{"x":604.0908813476562,"y":370},"type":"customComponent","data":{"label":"END","function":{"id":18,"name":"END","params":[],"description":"End the flow","icon":{"type":{"type":{},"compare":null},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}},"category":"Flow","connections":{"inbound":[{"type":"then","val":""}],"outbound":[]}}},"width":120,"height":92,"selected":true,"positionAbsolute":{"x":604.0908813476562,"y":370},"dragging":false},{"id":"XsLz1Er3lxNIoXMjPuhih","position":{"x":242.09088134765625,"y":281},"type":"customComponent","data":{"label":"Alert","function":{"id":19,"name":"Alert","enviroment":"content","params":[{"name":"message","type":"string","value":"Hello Autto!","default":""}],"description":"Display a message as a browser alert","icon":{"type":{"type":{},"compare":null},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}},"category":"Browser","connections":{"inbound":[{"type":"then","val":""}],"outbound":[{"type":"then","val":""}]}}},"width":263,"height":164,"selected":false,"positionAbsolute":{"x":242.09088134765625,"y":281},"dragging":false}]`,
                edges:`[{"source":"1Ipedhb7p_h_JnWMZLswy","sourceHandle":null,"target":"XsLz1Er3lxNIoXMjPuhih","targetHandle":null,"id":"uXZyc1hVyrcl85E6O6RDX"},{"source":"XsLz1Er3lxNIoXMjPuhih","sourceHandle":null,"target":"o1Pos5CiP4-HOP1aiZEHA","targetHandle":null,"id":"z2lISPue-FKX7O6EjcGFc"}]`,    
                icon:"world"
            });
        } catch (error) {
            if(error.code==="auth/email-already-in-use"){
                window.alert("Email already in use");
            }
            console.log(error);
            return false;
        }
    }
    function signInEmail({email,password}){
        return signInWithEmailAndPassword(auth,email,password);
        
    }
    async function signUpGmail(){
        // return signInWithPopup(auth,googleProvider);
        try{
        const userCredential= await signInWithPopup(auth,googleProvider);
        const additionalUserInfo =  getAdditionalUserInfo(userCredential);
        if(additionalUserInfo.isNewUser){
        const id= userCredential.user.uid;
        const userDocRef= doc(firestore, "users", id);
        getDoc(userDocRef).then( async (docSnapshot) => {
        if (!docSnapshot.exists()) {
        await setDoc(userDocRef, {
            uid: id, 
            email: userCredential.user.email,
            firstName: userCredential.user.displayName,
            lastName: "",
        });
        await addDoc(collection(userDocRef, "workflows"), {
            name: "My First Workflow",
            description: "This is my first workflow",
            nodes:`[{"id":"1Ipedhb7p_h_JnWMZLswy","position":{"x":-2.90911865234375,"y":274},"type":"customComponent","data":{"label":"Start","function":{"id":5,"name":"Start","params":[],"description":"Initial workflow block","icon":{"type":{"type":{},"compare":null},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}},"category":"Trigger","connections":{"inbound":[],"outbound":[{"type":"then","val":""}]}}},"width":162,"height":92,"selected":false,"positionAbsolute":{"x":-2.90911865234375,"y":274},"dragging":false},{"id":"o1Pos5CiP4-HOP1aiZEHA","position":{"x":604.0908813476562,"y":370},"type":"customComponent","data":{"label":"END","function":{"id":18,"name":"END","params":[],"description":"End the flow","icon":{"type":{"type":{},"compare":null},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}},"category":"Flow","connections":{"inbound":[{"type":"then","val":""}],"outbound":[]}}},"width":120,"height":92,"selected":true,"positionAbsolute":{"x":604.0908813476562,"y":370},"dragging":false},{"id":"XsLz1Er3lxNIoXMjPuhih","position":{"x":242.09088134765625,"y":281},"type":"customComponent","data":{"label":"Alert","function":{"id":19,"name":"Alert","enviroment":"content","params":[{"name":"message","type":"string","value":"Hello Autto!","default":""}],"description":"Display a message as a browser alert","icon":{"type":{"type":{},"compare":null},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}},"category":"Browser","connections":{"inbound":[{"type":"then","val":""}],"outbound":[{"type":"then","val":""}]}}},"width":263,"height":164,"selected":false,"positionAbsolute":{"x":242.09088134765625,"y":281},"dragging":false}]`,
            edges:`[{"source":"1Ipedhb7p_h_JnWMZLswy","sourceHandle":null,"target":"XsLz1Er3lxNIoXMjPuhih","targetHandle":null,"id":"uXZyc1hVyrcl85E6O6RDX"},{"source":"XsLz1Er3lxNIoXMjPuhih","sourceHandle":null,"target":"o1Pos5CiP4-HOP1aiZEHA","targetHandle":null,"id":"z2lISPue-FKX7O6EjcGFc"}]`,
            icon:"world"
        });
    }
    });
    }   
    } catch (error) {
        console.log(error);
        return false;
    }

        //choose between redirect or popup
    }
    function logOut(){
        return signOut(auth);
    }
    function resetPassword(email){
        return sendPasswordResetEmail(auth,email);
    }
    function updateEmail(email){
        return currentUser.updateEmail(email);
    }
    function updatePassword(password){
        return currentUser.updatePassword(password);
    }
    const value={
        currentUser,
        signInEmail,
        signUpEmail,
        signUpGmail,
        logOut,
        resetPassword,
        updateEmail,
        updatePassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!authLoading && children}
        </AuthContext.Provider>
    )
}