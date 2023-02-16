import { Component } from "react";
import shortid from 'shortid';
import Section from "./Section";
import Form from './Form';
import Filter from "./Filter";
import List from "./List";
import css from './app.module.scss';

const LS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (parsedContacts) {
      try {
        this.setState({ contacts: parsedContacts });
      }
      catch (error) {
        console.log(error.message)
      }};
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }
  }

  addContact = ({name, number}) => {
    if (this.isDublicate(name)) {
      alert(`${name} is already in contacts`); 
      return false;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  isDublicate(newName) {
    const normaliazedName = newName.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name }) => {
      return (name.toLowerCase() === normaliazedName)
    });
    return Boolean(result);
  }

  getContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={css.div}>
        <Section title="Phonebook">
          <Form onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />
          <List
            contacts={this.getContacts()}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
};
