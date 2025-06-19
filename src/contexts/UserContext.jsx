import { createContext, useContext, useState } from "react";

const UserContext = createContext()

const useUserContext = () => useContext(UserContext)

export default useUserContext;

const usersList = [
    {
        id:1,
        name:'Sameer Ghose',
        email:'samer@gmail.com',
    }
]
const addressesList = [
    {
        id:1,
        address:'41,Shakespere Sarani,Kolkata',
        pin:700001,
        userName: 'Sameer Ghose'
    }
]

export const UserContextProvider = ({children})=>{

    const [users,setUsers] = useState(usersList);
    const [addresses,setAddresses] = useState(addressesList);
    const [orderedItems,setOrderItems] = useState([])
    const [finalCheckout,setFinalCheckout] = useState([])


    return(
        <UserContext.Provider value={{users,addresses,orderedItems,finalCheckout,setAddresses}}>
            {children}
        </UserContext.Provider>
    )
}