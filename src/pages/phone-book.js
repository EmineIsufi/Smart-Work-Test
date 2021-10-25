export default class ContactService {
    constructor() {
        this.PhoneBookList = [];
    }

    loadAll() {
        if (localStorage.getItem('PhoneBookList')) {
            this.PhoneBookList = JSON.parse(localStorage.getItem('PhoneBookList'));
        }
        return this.PhoneBookList
    }
    saveAll() {
        const parsed = JSON.stringify(this.PhoneBookList);
        localStorage.setItem('PhoneBookList', parsed);
    }
    getList() {
        return this.PhoneBookList;
    }
    saveContact(contact) {
        this.addContact(contact);
        this.saveAll();
    }

    addContact(contact) {
        this.PhoneBookList.push({ ...contact });
    }
    updateContact(editedContact) {
        this.PhoneBookList.splice(
            this.PhoneBookList.indexOf(
                this.PhoneBookList.find(contact => contact.id === editedContact.id)
            ), 1, editedContact
        );
        this.saveAll();
    }
    removeContact(contact) {
        this.PhoneBookList = this.PhoneBookList.filter(item => item.id !== contact)
        this.saveAll();
    }
}