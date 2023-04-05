const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__filename, "../db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(contacts);
}

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const result = contacts.splice(index, 1);

  await updateContacts(contacts);

  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
