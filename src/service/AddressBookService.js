import axios from 'axios'

class AddressBookService{
    baseUrl ="http://localhost:8082/addressbook";
    
     addAddressBook(data){
        return axios.post(`${this.baseUrl}/create`,data)
    }
    getAllAddressBook() {
        return axios.get(`${this.baseUrl}/get`);
    }

    getAddressBookById(personId){
        return axios.get(`${this.baseUrl}/get/${personId}`)
    }

    deleteAddressBook(personId){
        return axios.delete(`${this.baseUrl}/delete/${personId}`)
    }

    updateAddressBook(personId, data){
        return axios.put(`${this.baseUrl}/update/${personId}`, data);
    }

}

export default new AddressBookService();
