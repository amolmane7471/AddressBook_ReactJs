import React from 'react';
import './Home.css'
import AddressBookService from '../../service/AddressBookService';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

class Home extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            bookList : []
        }

    }

    fetchData = () =>{
        AddressBookService.getAllAddressBook().then( (response) => {
            this.setState({
                bookList : response.data.data
            });
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    updateRecord = (personId) => {
        console.log("Person id :", personId)
        this.props.history.push(`addressbook-form/`,{personId});
    }

    deleteRecord = (personId) =>{
        AddressBookService.deleteAddressBook(personId).then( ()=>{
            window.location.reload();
        })
        
    }


    render() {
        
        return (
               
            <div>
                <div className="main-content">
                    <div className="header-content">
                        <div className="person-detail-text">
                            Person Details
                        </div>
                        <a href="/addressbook-form" >
                            <Button variant='contained' startIcon={<PersonAddAlt1Icon />}>Add User</Button>
                        </a>
                    </div>
                
                    <div className="table-main">
                        <table id="table-display" class="table">
                            <tr>
                                <th>Full Name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Zip</th>
                                <th>Actions</th>
                            </tr>
                                                                         
                            { this.state.bookList.map( (addBook) => (
                                    <tr key={addBook.personId}>
                                        <td>{addBook.firstName} {addBook.lastName}</td>
                                        <td>{addBook.address}</td>
                                        <td>{addBook.city}</td>
                                        <td>{addBook.state}</td>   
                                        <td>{addBook.email}</td>
                                        <td>{addBook.contact}</td>
                                        <td>{addBook.zip}</td>
                                        <td>
                                            <DeleteOutlineIcon onClick={() => this.deleteRecord(addBook.personId)} />
                                            <EditIcon onClick={() => this.updateRecord(addBook.personId)} />
                                        </td>
                                    </tr>
                                ) )
                            }
                                                        
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
