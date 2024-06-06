
import logo from './logo.svg';
import './App.css';
import contacts from  "./contacts.json";
import React,{ useState } from 'react';

function App() {
  const initialContacts = contacts.slice(0,5);
  const initialRemainingContacts = contacts.slice(5);

  const[displayedContacts, setDisplayContacts] = useState(initialContacts);
  const [remainingContacts, setRemainingContacts] = useState(initialRemainingContacts);

  const addRandomContact = () => {
    if(remainingContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingContacts.length);
      const randomContact = remainingContacts[randomIndex];

      setDisplayContacts((prevContacts) => [...prevContacts, randomContact]);

      const updatedRemainingContacts = remainingContacts.filter(
        (contact) => contact.id !== randomContact.id
      );

      setRemainingContacts(updatedRemainingContacts);
    } else{
      console.log('No more contacts to add!');
    }
  };

  const deleteContact = (id) => {
    const updatedDisplayedContacts = displayedContacts.filter((contact) => contact.id !== id);
    setDisplayContacts(updatedDisplayedContacts);

    const deleteContact = displayedContacts.find((contact) => contact.id === id);
    if(deleteContact) {
      setRemainingContacts((prevRemaining) => [...prevRemaining, deleteContact]);
    }
  };
  const sortByName = () => {
    const sortedContacts = [...displayedContacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setDisplayContacts(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...displayedContacts].sort((a, b) => b.popularity - a.popularity);
    setDisplayContacts(sortedContacts);
  };

  return (
    <div className="App">
    
      <div className="container">
        <h1>Contact List</h1>
        <button onClick={addRandomContact}>Add Random Contact</button>
        <button onClick={sortByName}>Sort by Name</button>
        <button onClick={sortByPopularity}>Sort by Popularity</button>
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won an Oscar</th>
              <th>Won an Emmy</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedContacts.map((contact) => (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} alt={contact.name} style={{ width: '50px' }} />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar ? '🏆' : '-'}</td>
                <td>{contact.wonEmmy ? '🏆' : '-'}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteContact(contact.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
