import React , {useState , useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ViewAdminProfile.css';


function TenantView() {
    const [userData , setUserData] = useState(null);
const [editMode , setEditMode] = useState(false);
const [editedData , setEditedData] = useState([]);
const [apartmentData , setApartmentData] = useState(null);

useEffect(() => {
    fetchUserData();
}, []);

const fetchUserData = async () => {
    try {
        //Get the token from local storage
        const token = window.localStorage.getItem('token');
        //Fetch the user's profile data from the server with the token in the headers
        //Fetch the user's profile data from the server 
        const response = await axios.get('/api/profile', {
            headers: {
                Authorization: `${token}`,
            },
        });
        setUserData(response.data);
        console.log(response.data);
        setEditedData(response.data);

        //Fetch apartment based on the user's profile (tenant ID)
        const apartmentResponse = await axios.get(`/api/apartment/${response.data.profileId}`,{
            headers: {
                Authorization : `${token}`,
            },
            
        });
        setApartmentData(apartmentResponse.data);
    }catch(error) {
        console.error('Error fetching user data:' , error);
    }

};


const handleEditClick = () => {
    setEditMode(true);
}

const handleCancelEdit = () => {
    setEditMode(false);
    setEditedData(userData);
}

const handleInputChange = (e) => {
    const {name , value} = e.target;
    setEditedData((prevData) => ({
        ...prevData,
        [name] : value,
    }));
};

const handleSaveChanges = async () => {
    try {
        //Send a PUT request to update the user's profile data on the server 
        const token = window.localStorage.getItem('token'); //Assuming you store the token in local storage
        //Send a PUT request to update the user's profile data on the Server
        await axios.put('/api/tenant/profile', editedData , {
            headers: {
                Authorization: `${token}`,
            },
        });
    }  catch (error) {
        console.error('Error fetching user data:' , error);
    }
}
  return (
    <div className='container my-4'>
        {userData ? (
            <>
            {!editMode ? (
            <>
            <div className='profile-section'>
                <h2>User Profile</h2>
                <div className= 'profile-details'>
                    <p><strong>Name: </strong> {userData.name}</p>
                    <p><strong>Email: </strong> {userData.email}</p>
                    <p><strong>Address: </strong> {userData.address}</p>
                    <p><strong>Cellphone: </strong> {userData.cellphone}</p>
                </div>
                {apartmentData && (
                    <div className='apartment-section mt-4'>
                        <h2>Apartment Details</h2>
                        <div className='profile-details'>
                            <p><strong>Name: </strong> {apartmentData.name}</p>
                            <p><strong>Floor: </strong> {apartmentData.floor}</p>
                            <p><strong>Square meters: </strong>{apartmentData.square_meters}</p>
                            <p><strong>Owner: </strong>{apartmentData.owner ? 'Yes' : 'No'}</p>
                            <p><strong> Load Factor (Fi): </strong>{apartmentData.fi}</p>
                            <p><strong>Heating Factor: </strong>{apartmentData.heating}</p>
                            <p><strong>Elevator Factor: </strong>{apartmentData.elevator}</p>
                            <p><strong>General Expenses Factor: </strong>{apartmentData.general_expenses}</p>
                        </div>
                        </div>
                    )}
                    <button className='btn btn-primary' onClick={handleEditClick}> Edit User Profile </button>
                </div>
                </>
               
            ):(

            <> 
            <h2> Edit User Profile</h2>
            <form>
                <div className='mb-3'>
                <label htmlFor='name' className='form-label'> Name: </label>
                <input
                    type='text'
                    id='name'
                    name="name"
                    className='form-control'
                    value={editedData.name || ''}
                    onChange={handleInputChange}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className='form-control'
                        value={editedData.email || ''}
                        onChange={handleInputChange}
                        />
                </div>
                <div className='mb-3'>
                    <label htmlFor='address' className='form-label'> Address: </label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        className='form-control'
                        value={editedData.address || ''}
                        onChange={handleInputChange}
                        />
                </div>
                <div className='mb-3'>
                    <label htmlFor='cellphone' className='form-label'>Cellphone: </label>
                    <input  
                        type='number'
                        id='cellphone'
                        name='cellphone'
                        className='form-control'
                        valuue={editedData.cellphone || ''}
                        onChange = {handleInputChange}
                        />
                </div>
            </form>
                <button className='btn btn-primary me-2' onClick={handleSaveChanges}>Save</button>
                <button className='btn btn-secondary' onClick={handleCancelEdit}>Cancel </button>
            </>
            )}
            </>
            
        ):(
            <p> Loading User data...</p>
        )}
    </div>
  );
}


export default TenantView;
